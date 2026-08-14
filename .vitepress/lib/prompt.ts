// Vendored from system-prompt-proxy src/report.ts — the corpus's single shared definitions.
// The online diff MUST use these exact functions, or the site re-mints the confounds the corpus
// spent months killing (date lines, kernel lines). If the instrument's definitions change, re-vendor.

/** Strip the two measured capture-environment confounds; everything else is real content. */
export function normalizePrompt(promptText: string): string {
  return promptText
    .replace(/^( - )?OS Version: .*$/m, 'OS Version: <normalized>')
    .replace(/^Today's date: .*$/m, "Today's date: <normalized>")
}

/** Split a prompt into top-level markdown sections; content before the first heading is '(intro)'. */
export function sectionsOf(promptText: string): Map<string, string> {
  const sections = new Map<string, string>()
  let name = '(intro)'
  let buffer: string[] = []
  const flush = () => {
    const content = buffer.join('\n')
    if (content.trim().length > 0 || name !== '(intro)') sections.set(name, content)
  }
  for (const line of promptText.split('\n')) {
    if (line.startsWith('# ')) {
      flush()
      name = line.slice(2).trim()
      buffer = []
    } else {
      buffer.push(line)
    }
  }
  flush()
  return sections
}

/** The prompt family, from its identity line / leading structure. */
export function familyOf(promptText: string, sections: Map<string, string>): string {
  const firstHeading = [...sections.keys()].find(k => k !== '(intro)')
  if (firstHeading === 'Harness') return 'harness'
  if (promptText.startsWith('You are Claude Code')) return 'claude-code'
  if (promptText.startsWith('You are a Claude agent')) return 'sdk-agent'
  return 'other'
}

/** Semver-ish compare good for CLI versions (numeric segments, missing = 0). */
export function compareVersions(left: string, right: string): number {
  const a = left.split('.').map(Number)
  const b = right.split('.').map(Number)
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

/** One capture cell as the diff tool sees it. Kept terse: the index ships to every visitor. */
export type DiffRow = {
  /** tree: 'sdk' | 'cli' */
  t: 'sdk' | 'cli'
  /** cli version */
  v: string
  /** requested model */
  m: string
  /** capture date, YYYY-MM-DD */
  d: string
  /** status: 'ok' | exclusion reason */
  s: string
  /** prompt sha256 (full) — text lives at diff/texts/<sha12>.txt; absent on exclusions */
  sha?: string
  /** prompt bytes */
  b?: number
  /** prompt sha256 (full) — text lives at diff/texts/<sha12>.txt; absent on exclusions */
  sha?: string
  /** sha256 of the NORMALIZED prompt, first 12 hex — powers "identical after normalization" marks */
  n?: string
  /** exclusion detail, trimmed */
  x?: string
}
