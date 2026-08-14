#!/usr/bin/env bun
// Build the diff tool's static data from the checked-in capture trees.
//
//   public/diff/index.json        — every (tree × version × model) cell, captures AND exclusions
//   public/diff/texts/<sha12>.txt — prompt bodies, deduped by prompt sha (the corpus is highly
//                                   repetitive: ~1500 cells collapse to a few hundred distinct texts)
//
// The manifests are authoritative for cell status (exclusions have no file); the .md files carry
// the bytes. prompt_sha256 comes from the manifest — computed at capture time, verified by the
// instrument's doctor, so the site never re-derives identity.

import { mkdir, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { familyOf, normalizePrompt, sectionsOf, compareVersions, type DiffRow } from '../.vitepress/lib/prompt.ts'

const TREES = [
  { t: 'sdk' as const, dir: 'sdk-capture' },
  { t: 'cli' as const, dir: 'cli-capture' },
]
const OUT = 'public/diff'

/** Prompt body = everything after the frontmatter fence and its one blank separator line. */
function promptOf(fileText: string): string {
  const match = fileText.match(/^---\n[\s\S]*?\n---\n\n?/)
  if (match === null) throw new Error('no frontmatter fence')
  const body = fileText.slice(match[0].length)
  // Excluded evidence files carry a warning block; the prompt starts after the explicit marker.
  const marker = body.indexOf('<!-- prompt-below -->')
  return marker === -1 ? body : body.slice(marker + '<!-- prompt-below -->\n'.length)
}

await rm(OUT, { recursive: true, force: true })
await mkdir(join(OUT, 'texts'), { recursive: true })

const rows: DiffRow[] = []
const written = new Set<string>()
let files = 0

for (const tree of TREES) {
  const manifest = await Bun.file(join(tree.dir, 'manifest.json')).json()
  for (const run of manifest.runs) {
    const row: DiffRow = {
      t: tree.t,
      v: run.cliVersion,
      m: run.requestedModel,
      d: (run.captureDate ?? '').slice(0, 10),
      s: run.status === 'captured' ? 'ok' : (run.exclusionReason ?? 'excluded'),
    }
    if (run.status === 'captured' && run.outputPath) {
      const file = Bun.file(join(tree.dir, run.outputPath))
      if (!(await file.exists())) {
        console.warn(`warn: manifest names ${tree.dir}/${run.outputPath} but the file is missing — skipping cell`)
        continue
      }
      const prompt = promptOf(await file.text())
      if (Buffer.byteLength(prompt, 'utf8') !== run.promptBytes) {
        console.warn(`warn: ${tree.dir}/${run.outputPath} body is ${Buffer.byteLength(prompt, 'utf8')}B, manifest says ${run.promptBytes}B`)
      }
      row.sha = run.promptSha256
      row.b = run.promptBytes
      const hasher = new Bun.CryptoHasher('sha256')
      hasher.update(normalizePrompt(prompt))
      row.n = hasher.digest('hex').slice(0, 12)
      row.f = familyOf(prompt, sectionsOf(prompt))
      const short = run.promptSha256.slice(0, 12)
      if (!written.has(short)) {
        await Bun.write(join(OUT, 'texts', `${short}.txt`), prompt)
        written.add(short)
        files++
      }
    } else if (run.exclusionDetail) {
      row.x = String(run.exclusionDetail).slice(0, 400)
    }
    rows.push(row)
  }
}

rows.sort((a, b) => a.t.localeCompare(b.t) || compareVersions(a.v, b.v) || a.m.localeCompare(b.m))

// A tree with zero rows means its manifest was empty, missing, or mid-sync — an index published in
// that state renders an inexplicably half-empty diff tool. Refuse loudly instead.
for (const tree of TREES) {
  const count = rows.filter(r => r.t === tree.t).length
  if (count === 0) {
    console.error(`site-data: FATAL — ${tree.dir}/manifest.json produced 0 rows (empty, missing, or mid-sync?). Not writing a lopsided index.`)
    process.exit(1)
  }
}

await Bun.write(join(OUT, 'index.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), rows }))
const captured = rows.filter(r => r.s === 'ok').length
console.error(`site-data: ${rows.length} cells (${captured} captured, ${rows.length - captured} excluded) -> ${files} distinct texts in ${OUT}`)
