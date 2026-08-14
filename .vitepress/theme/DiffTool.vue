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

const cell = (s: Side) => rows.value.find(r => r.t === s.t && r.v === s.v && r.m === s.m)
const cellA = computed(() => cell(a))
const cellB = computed(() => cell(b))

function versions(t: string): string[] {
  return [...new Set(rows.value.filter(r => r.t === t).map(r => r.v))].sort(compareVersions)
}
function models(s: Side): string[] {
  return [...new Set(rows.value.filter(r => r.t === s.t && r.v === s.v).map(r => r.m))].sort()
}

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
      const words = diffWordsWithSpace(part.value, parts[i + 1].value)
      const del = words.filter(w => !w.added).map(w => (w.removed ? `<del>${esc(w.value)}</del>` : esc(w.value))).join('')
      const ins = words.filter(w => !w.removed).map(w => (w.added ? `<ins>${esc(w.value)}</ins>` : esc(w.value))).join('')
      rows.push({ kind: 'change', left: del, right: ins })
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
  const res = await fetch(withBase('/diff/index.json'))
  rows.value = (await res.json()).rows
  const list = versions('sdk')
  a.v = list.at(-2) ?? list.at(-1) ?? ''
  b.v = list.at(-1) ?? ''
  readUrl()
  loading.value = false
  await load()
})
watch([a, b, normalized], load)
</script>

<template>
  <div class="difftool" v-if="!loading">
    <div class="pickers">
      <div class="side">
        <span class="label">A</span>
        <select v-model="a.t"><option value="sdk">sdk (-p)</option><option value="cli">cli (interactive)</option></select>
        <button @click="step(a, -1)" title="previous version">‹</button>
        <select v-model="a.v"><option v-for="v in versions(a.t)" :key="v" :value="v">{{ v }}</option></select>
        <button @click="step(a, +1)" title="next version">›</button>
        <select v-model="a.m"><option v-for="m in models(a)" :key="m" :value="m">{{ m }}</option></select>
      </div>
      <div class="side">
        <span class="label">B</span>
        <select v-model="b.t"><option value="sdk">sdk (-p)</option><option value="cli">cli (interactive)</option></select>
        <button @click="step(b, -1)" title="previous version">‹</button>
        <select v-model="b.v"><option v-for="v in versions(b.t)" :key="v" :value="v">{{ v }}</option></select>
        <button @click="step(b, +1)" title="next version">›</button>
        <select v-model="b.m"><option v-for="m in models(b)" :key="m" :value="m">{{ m }}</option></select>
      </div>
      <div class="controls">
        <button @click="swap">⇄ swap</button>
        <label><input type="checkbox" v-model="normalized" /> normalized (strip date/kernel confounds)</label>
        <label><input type="checkbox" v-model="split" /> side-by-side</label>
      </div>
      <div class="presets">
        seams:
        <a @click="preset({ t: 'cli', v: '1.0.2', m: 'claude-opus-4-5' }, { t: 'cli', v: '1.0.3', m: 'claude-opus-4-5' })">1.0.2→1.0.3</a>
        <a @click="preset({ t: 'sdk', v: '2.1.149', m: 'claude-opus-5' }, { t: 'sdk', v: '2.1.154', m: 'claude-opus-5' })">Harness rewrite</a>
        <a @click="preset({ t: 'cli', v: b.v, m: b.m }, { t: 'sdk', v: b.v, m: b.m })">cli↔sdk @ B</a>
      </div>
    </div>

    <div class="meta">
      <div v-for="(c, i) in [cellA, cellB]" :key="i" class="metacard" :class="{ missing: !c || c.s !== 'ok' }">
        <template v-if="c && c.s === 'ok'">{{ c.d }} · {{ c.b }} B · {{ c.f }} · <code>{{ c.sha?.slice(0, 8) }}</code></template>
        <template v-else-if="c">excluded — {{ c.s }}<span v-if="c.x">: {{ c.x }}</span></template>
        <template v-else>no capture for this cell</template>
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
    </div>
    <p v-else class="identical">
      Select two captured cells to diff. Excluded cells show their exclusion cause instead — an honest hole, not a blank.
    </p>
  </div>
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
.identical { padding: 0.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; }
</style>
