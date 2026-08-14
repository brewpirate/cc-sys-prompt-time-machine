<script setup lang="ts">
// The online diff. Two capture cells in, three views out: metadata, section-level summary,
// word-highlighted unified diff. Uses the corpus's vendored normalizePrompt/sectionsOf so a
// shared URL always shows what the instrument's own `bun run diff` would show.
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { diffLines, diffWordsWithSpace } from 'diff'
import { compareVersions, normalizePrompt, sectionsOf, type DiffRow } from '../lib/prompt'

type Side = { t: 'sdk' | 'cli'; v: string; m: string }

const rows = ref<DiffRow[]>([])
const a = reactive<Side>({ t: 'sdk', v: '', m: 'claude-opus-5' })
const b = reactive<Side>({ t: 'sdk', v: '', m: 'claude-opus-5' })
const normalized = ref(true)
const split = ref(true)
const texts = new Map<string, string>()
const textA = ref<string | null>(null)
const textB = ref<string | null>(null)
const loading = ref(true)
const loadError = ref<string | null>(null)

// Index lookups are precomputed: the dropdowns render ~780 options, and anything per-option must be
// O(1) — a linear scan there multiplied into millions of comparisons per re-render (measured as
// visible input lag).
const byKey = computed(() => {
  const map = new Map<string, DiffRow>()
  for (const r of rows.value) map.set(`${r.t}|${r.v}|${r.m}`, r)
  return map
})
const versionsByTree = computed(() => {
  const map = new Map<string, string[]>()
  for (const t of ['sdk', 'cli']) {
    map.set(t, [...new Set(rows.value.filter(r => r.t === t).map(r => r.v))].sort(compareVersions))
  }
  return map
})
const cell = (s: Side) => byKey.value.get(`${s.t}|${s.v}|${s.m}`)
const cellA = computed(() => cell(a))
const cellB = computed(() => cell(b))

function versions(t: string): string[] {
  return versionsByTree.value.get(t) ?? []
}
function models(s: Side): string[] {
  return [...new Set(rows.value.filter(r => r.t === s.t && r.v === s.v).map(r => r.m))].sort()
}

/** Versions on `side` whose prompt is identical to the other side's cell — disabled in the dropdown,
 * which turns it into a map of where changes happened. Recomputed only when a selection changes. */
function identicalSet(side: Side, other: DiffRow | undefined): Set<string> {
  const out = new Set<string>()
  if (other?.sha === undefined) return out
  for (const r of rows.value) {
    if (r.t !== side.t || r.m !== side.m || r.sha === undefined || r.v === side.v) continue
    if (normalized.value ? r.n === other.n : r.sha === other.sha) out.add(r.v)
  }
  return out
}
const identicalA = computed(() => identicalSet(a, cellB.value))
const identicalB = computed(() => identicalSet(b, cellA.value))

async function fetchText(sha: string): Promise<string> {
  const key = sha.slice(0, 12)
  if (!texts.has(key)) {
    const res = await fetch(withBase(`/diff/texts/${key}.txt`))
    texts.set(key, res.ok ? await res.text() : '')
  }
  return texts.get(key)!
}

async function load() {
  const [ca, cb] = [cellA.value, cellB.value]
  textA.value = ca?.sha ? await fetchText(ca.sha) : null
  textB.value = cb?.sha ? await fetchText(cb.sha) : null
  syncUrl()
}

function syncUrl() {
  const q = new URLSearchParams()
  q.set('a', `${a.t}/${a.v}/${a.m}`)
  q.set('b', `${b.t}/${b.v}/${b.m}`)
  if (!normalized.value) q.set('raw', '1')
  if (!split.value) q.set('view', 'unified')
  history.replaceState(null, '', `?${q}`)
}

function readUrl() {
  const q = new URLSearchParams(location.search)
  for (const [key, side] of [['a', a], ['b', b]] as const) {
    const parts = (q.get(key) ?? '').split('/')
    if (parts.length === 3 && (parts[0] === 'sdk' || parts[0] === 'cli')) {
      side.t = parts[0] as 'sdk' | 'cli'
      side.v = parts[1]
      side.m = parts[2]
    }
  }
  if (q.get('raw') === '1') normalized.value = false
  if (q.get('view') === 'unified') split.value = false
}

function step(side: Side, delta: number) {
  const list = versions(side.t)
  const index = list.indexOf(side.v) + delta
  if (index >= 0 && index < list.length) side.v = list[index]
}
function swap() {
  const hold = { ...a }
  Object.assign(a, b)
  Object.assign(b, hold)
}
function preset(pa: Side, pb: Side) {
  Object.assign(a, pa)
  Object.assign(b, pb)
}

const view = computed(() => {
  if (textA.value === null || textB.value === null) return null
  const left = normalized.value ? normalizePrompt(textA.value) : textA.value
  const right = normalized.value ? normalizePrompt(textB.value) : textB.value
  if (left === right) return { identical: true, sections: [], rows: [] }

  const sa = sectionsOf(left)
  const sb = sectionsOf(right)
  const sections: { name: string; kind: 'added' | 'removed' | 'changed' }[] = []
  for (const name of sa.keys()) {
    if (!sb.has(name)) sections.push({ name, kind: 'removed' })
    else if (sa.get(name) !== sb.get(name)) sections.push({ name, kind: 'changed' })
  }
  for (const name of sb.keys()) if (!sa.has(name)) sections.push({ name, kind: 'added' })

  // Aligned change rows power both render modes: unified stacks del-then-ins, side-by-side puts
  // them in one grid row. Word-level marks come from pairing each removed block with the added
  // block that follows it.
  const parts = diffLines(left, right)
  const rows: { kind: 'same' | 'change'; text?: string; left?: string | null; right?: string | null }[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part.added && !part.removed) {
      rows.push({ kind: 'same', text: part.value })
    } else if (part.removed && parts[i + 1]?.added) {
      const added = parts[i + 1]
      // A pair where one side has no visible text is REALLY a one-sided change (the other part is
      // whitespace) — word marks would render a strikethrough wall against an empty colored slab.
      if (added.value.trim().length === 0) {
        rows.push({ kind: 'change', left: esc(part.value), right: null })
      } else if (part.value.trim().length === 0) {
        rows.push({ kind: 'change', left: null, right: esc(added.value) })
      } else {
        const words = diffWordsWithSpace(part.value, added.value)
        const del = words.filter(w => !w.added).map(w => (w.removed ? `<del>${esc(w.value)}</del>` : esc(w.value))).join('')
        const ins = words.filter(w => !w.removed).map(w => (w.added ? `<ins>${esc(w.value)}</ins>` : esc(w.value))).join('')
        rows.push({ kind: 'change', left: del, right: ins })
      }
      i++
    } else if (part.removed) {
      rows.push({ kind: 'change', left: esc(part.value), right: null })
    } else {
      rows.push({ kind: 'change', left: null, right: esc(part.value) })
    }
  }
  return { identical: false, sections, rows }
})

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function context(text: string): string {
  const lines = text.split('\n')
  if (lines.length <= 7) return text
  return [...lines.slice(0, 3), `··· ${lines.length - 6} unchanged lines ···`, ...lines.slice(-3)].join('\n')
}

onMounted(async () => {
  try {
    const res = await fetch(withBase('/diff/index.json'))
    if (!res.ok) throw new Error(`${res.status} for diff/index.json`)
    const data = await res.json()
    rows.value = data.rows
    docVersions.value = data.versions ?? []
  } catch (error) {
    loadError.value = `Capture index failed to load (${error instanceof Error ? error.message : String(error)}). If this is a local checkout, generate the data first: bun run data`
    loading.value = false
    return
  }
  const list = versions('sdk')
  a.v = list.at(-2) ?? list.at(-1) ?? ''
  b.v = list.at(-1) ?? ''
  readUrl()
  loading.value = false
  await load()
  await loadChangelog()
})
watch([a, b, normalized], load)

// Changelog range panel: every release note in (A, B], walked over the COMPLETE doc-version list
// (not just captured versions — a strided corpus must not hide the release notes between samples).
const docVersions = ref<string[]>([])
const changelog = ref<{ v: string; text: string }[]>([])
const changelogTruncated = ref(false)
const changelogLabel = ref('')
const changelogCache = new Map<string, string | null>()

function versionDocHref(v: string): string {
  return withBase(`/versions/${v}.html`)
}

async function fetchChangelog(v: string): Promise<string | null> {
  if (!changelogCache.has(v)) {
    const res = await fetch(withBase(`/diff/changelog/${v}.txt`))
    changelogCache.set(v, res.ok ? await res.text() : null)
  }
  return changelogCache.get(v) ?? null
}

async function loadChangelog() {
  const list = docVersions.value
  let lo = list.indexOf(a.v)
  let hi = list.indexOf(b.v)
  if (lo === -1 || hi === -1) {
    changelog.value = []
    return
  }
  if (lo > hi) [lo, hi] = [hi, lo]
  const range = lo === hi ? [list[hi]] : list.slice(lo + 1, hi + 1)
  changelogLabel.value = lo === hi ? `for ${list[hi]}` : `(${list[lo]} → ${list[hi]}]`
  const capped = range.slice(-30)
  changelogTruncated.value = range.length > capped.length
  const entries = await Promise.all(capped.map(async v => ({ v, text: await fetchChangelog(v) })))
  changelog.value = entries.filter((e): e is { v: string; text: string } => e.text !== null).reverse()
}
watch([a, b], loadChangelog)
</script>

<template>
  <div class="difftool" v-if="!loading">
    <div class="controls">
      <button @click="swap">⇄ swap</button>
      <label><input type="checkbox" v-model="normalized" /> normalized (strip date/kernel confounds)</label>
      <label><input type="checkbox" v-model="split" /> side-by-side</label>
      <span class="presets">
        seams:
        <a @click="preset({ t: 'cli', v: '1.0.2', m: 'claude-opus-4-5' }, { t: 'cli', v: '1.0.3', m: 'claude-opus-4-5' })">1.0.2→1.0.3</a>
        <a @click="preset({ t: 'sdk', v: '2.1.149', m: 'claude-opus-5' }, { t: 'sdk', v: '2.1.154', m: 'claude-opus-5' })">Harness rewrite</a>
        <a @click="preset({ t: 'cli', v: b.v, m: b.m }, { t: 'sdk', v: b.v, m: b.m })">cli↔sdk @ B</a>
      </span>
    </div>

    <div class="headgrid">
      <div class="col" v-for="(s, i) in [a, b]" :key="i">
        <div class="side">
          <span class="label">{{ i === 0 ? 'A' : 'B' }}</span>
          <select v-model="s.t"><option value="sdk">sdk (-p)</option><option value="cli">cli (interactive)</option></select>
          <button @click="step(s, -1)" title="previous version">‹</button>
          <select v-model="s.v">
            <option v-for="v in versions(s.t)" :key="v" :value="v" :disabled="(i === 0 ? identicalA : identicalB).has(v)">
              {{ v }}{{ (i === 0 ? identicalA : identicalB).has(v) ? (i === 0 ? ' (=B)' : ' (=A)') : '' }}
            </option>
          </select>
          <button @click="step(s, +1)" title="next version">›</button>
          <select v-model="s.m"><option v-for="m in models(s)" :key="m" :value="m">{{ m }}</option></select>
          <span v-if="versions(s.t).length === 0" class="warn">index has no {{ s.t }} rows — regenerate: bun run data</span>
        </div>
        <div class="metacard" :class="{ missing: !(i === 0 ? cellA : cellB) || (i === 0 ? cellA : cellB)?.s !== 'ok' }">
          <template v-if="(i === 0 ? cellA : cellB)?.s === 'ok'">
            <strong>v{{ s.v }}</strong> · {{ s.t === 'sdk' ? 'headless (-p)' : 'interactive TUI' }} · captured {{ (i === 0 ? cellA : cellB)!.d }}<br />
            {{ (i === 0 ? cellA : cellB)!.f }} family · {{ (i === 0 ? cellA : cellB)!.b?.toLocaleString() }} B
            <template v-if="(i === 0 ? cellA : cellB)!.tc !== undefined"> · {{ (i === 0 ? cellA : cellB)!.tc }} tools</template>
            · sha <code>{{ (i === 0 ? cellA : cellB)!.sha?.slice(0, 8) }}</code>
            · <a :href="versionDocHref(s.v)">version doc</a>
          </template>
          <template v-else-if="i === 0 ? cellA : cellB">excluded — {{ (i === 0 ? cellA : cellB)!.s }}<span v-if="(i === 0 ? cellA : cellB)!.x">: {{ (i === 0 ? cellA : cellB)!.x }}</span></template>
          <template v-else>no capture for this cell</template>
        </div>
      </div>
    </div>

    <div v-if="view" class="result">
      <p v-if="view.identical" class="identical">Byte-identical<span v-if="normalized"> after normalization</span>.</p>
      <template v-else>
        <div class="chips">
          <span v-for="s in view.sections" :key="s.name" class="chip" :class="s.kind">{{ s.kind }}: {{ s.name }}</span>
          <span v-if="view.sections.length === 0" class="chip changed">intra-section wording changes only</span>
        </div>
        <div v-if="split" class="sxs">
          <template v-for="(r, i) in view.rows" :key="i">
            <pre v-if="r.kind === 'same'" class="cell same">{{ context(r.text!) }}</pre>
            <pre v-if="r.kind === 'same'" class="cell same">{{ context(r.text!) }}</pre>
            <pre v-if="r.kind === 'change'" class="cell" :class="r.left !== null ? 'del' : 'empty'"><span v-if="r.left !== null" v-html="r.left"></span></pre>
            <pre v-if="r.kind === 'change'" class="cell" :class="r.right !== null ? 'ins' : 'empty'"><span v-if="r.right !== null" v-html="r.right"></span></pre>
          </template>
        </div>
        <pre v-else class="diff"><template v-for="(r, i) in view.rows" :key="i"><span v-if="r.kind === 'same'" class="same">{{ context(r.text!) }}</span><template v-else><span v-if="r.left !== null" class="del" v-html="r.left"></span><span v-if="r.right !== null" class="ins" v-html="r.right"></span></template></template></pre>
      </template>

      <div v-if="changelog.length > 0" class="changelog">
        <h3>Changelog {{ changelogLabel }}</h3>
        <div v-for="entry in changelog" :key="entry.v" class="clentry">
          <a :href="versionDocHref(entry.v)"><strong>{{ entry.v }}</strong></a>
          <pre>{{ entry.text }}</pre>
        </div>
        <p v-if="changelogTruncated" class="warn">range is long — showing the newest {{ changelog.length }} versions with entries; see the version index for the rest</p>
      </div>
    </div>
    <p v-else class="identical">
      Select two captured cells to diff. Excluded cells show their exclusion cause instead — an honest hole, not a blank.
    </p>
  </div>
  <p v-else-if="loadError" class="identical">{{ loadError }}</p>
  <p v-else>Loading capture index…</p>
</template>

<style scoped>
.difftool { margin-top: 1rem; }
.pickers { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.side { display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap; }
.label { font-weight: 700; width: 1.2em; }
select, button { border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0.15rem 0.4rem; background: var(--vp-c-bg-soft); font-size: 0.85rem; }
.controls, .presets { display: flex; gap: 0.8rem; align-items: center; font-size: 0.85rem; flex-wrap: wrap; }
.presets a { cursor: pointer; text-decoration: underline; }
.meta { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 0.75rem 0; }
.metacard { font-size: 0.8rem; padding: 0.4rem 0.6rem; background: var(--vp-c-bg-soft); border-radius: 6px; }
.metacard.missing { color: var(--vp-c-danger-1); }
.chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.chip { font-size: 0.75rem; padding: 0.1rem 0.5rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); }
.chip.added { background: var(--vp-c-green-soft); }
.chip.removed { background: var(--vp-c-red-soft); }
.chip.changed { background: var(--vp-c-yellow-soft); }
.diff { font-size: 0.78rem; line-height: 1.45; white-space: pre-wrap; word-break: break-word; padding: 0.75rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.diff .same { opacity: 0.55; }
.diff .del { background: var(--vp-c-red-soft); display: block; }
.diff .ins { background: var(--vp-c-green-soft); display: block; }
.diff :deep(del) { background: var(--vp-c-red-3); color: var(--vp-c-white); text-decoration: line-through; }
.diff :deep(ins) { background: var(--vp-c-green-3); color: var(--vp-c-white); text-decoration: none; }
.sxs { display: grid; grid-template-columns: 1fr 1fr; gap: 0 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 0.5rem; }
.sxs .cell { margin: 0; font-size: 0.78rem; line-height: 1.45; white-space: pre-wrap; word-break: break-word; padding: 0.1rem 0.4rem; border-radius: 3px; background: transparent; border: none; }
.sxs .cell.same { opacity: 0.55; }
.sxs .cell.del { background: var(--vp-c-red-soft); }
.sxs .cell.ins { background: var(--vp-c-green-soft); }
.sxs .cell.empty { background: repeating-linear-gradient(45deg, transparent, transparent 6px, var(--vp-c-bg-soft) 6px, var(--vp-c-bg-soft) 12px); }
.sxs :deep(del) { background: var(--vp-c-red-3); color: var(--vp-c-white); text-decoration: line-through; }
.sxs :deep(ins) { background: var(--vp-c-green-3); color: var(--vp-c-white); text-decoration: none; }
@media (max-width: 720px) { .sxs { grid-template-columns: 1fr; } }
.headgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 0.75rem 0; }
.headgrid .col { display: flex; flex-direction: column; gap: 0.4rem; }
.headgrid .metacard { flex: 1; line-height: 1.6; }
.headgrid .metacard a { text-decoration: underline; }
.changelog { margin-top: 1.5rem; }
.changelog h3 { margin: 0 0 0.5rem; font-size: 1rem; }
.clentry { border-left: 3px solid var(--vp-c-divider); padding-left: 0.75rem; margin-bottom: 0.9rem; }
.clentry pre { margin: 0.2rem 0 0; font-size: 0.8rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word; background: transparent; padding: 0; }
@media (max-width: 720px) { .headgrid { grid-template-columns: 1fr; } }
.identical { padding: 0.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; }
.warn { font-size: 0.8rem; color: var(--vp-c-danger-1); }
</style>
