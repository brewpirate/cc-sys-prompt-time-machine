import { readdirSync } from 'node:fs'
import { withMermaid } from 'vitepress-plugin-mermaid'

// Sidebars are DERIVED from the tree at build time — this repo's content is regenerated wholesale
// (389 version docs, 45 tool dossiers), so a hand-maintained sidebar would rot within a release.
function pages(dir: string): { text: string; link: string }[] {
  return readdirSync(dir)
    .filter(name => name.endsWith('.md') && name !== 'README.md')
    .map(name => name.replace(/\.md$/, ''))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(name => ({ text: name, link: `/${dir}/${name}` }))
}

export default withMermaid({
  title: 'CC System Prompt Time Machine',
  description:
    'Every Claude Code system prompt, every version, both entrypoints — captured on the wire, byte-exact, diffable.',
  base: '/cc-sys-prompt-time-machine/',
  srcDir: '.',
  srcExclude: ['capture/**', 'sdk-capture/**', 'cli-capture/**', 'node_modules/**'],
  // Generated docs link into the capture trees (excluded above) — those links resolve on GitHub,
  // which is where the byte-exact evidence lives. The site's own view of the bytes is the diff tool.
  // Prompts are quoted inside fenced code blocks, which VitePress renders v-pre, so there is no
  // moustache-interpolation risk in content (audited: zero `{{` outside fences).
  ignoreDeadLinks: true,
  markdown: {
    // The generated docs quote prompt text and changelog lines containing raw pseudo-tags
    // (<env>, <editor>, <command-name>…) outside code fences. GitHub's sanitizer silently strips
    // them; Vue's template compiler rejects them. Render them as VISIBLE text instead, passing
    // through only the HTML the generators use deliberately: <details>/<summary> collapsibles.
    config(md) {
      const SAFE_TAG = /^<\/?([A-Z][A-Za-z]*|details|summary|br)(\s[^>]*)?\/?>/
      for (const rule of ['html_block', 'html_inline'] as const) {
        md.renderer.rules[rule] = (tokens, idx) => {
          const content = tokens[idx].content
          return SAFE_TAG.test(content.trim()) ? content : md.utils.escapeHtml(content)
        }
      }

      // The capture trees are srcExclude'd (6,900 prompt files are data, not pages), so relative
      // links into them from the generated docs would 404 on the site. Rewrite them to GitHub blob
      // URLs at build time — GitHub renders the .md captures and serves the .tools.json sidecars,
      // which is the byte-exact evidence those links promise. The site's own view is the diff tool.
      const REPO_BLOB = 'https://github.com/brewpirate/cc-sys-prompt-time-machine/blob/main/'
      md.core.ruler.push('capture-tree-links', state => {
        const walk = (tokens: typeof state.tokens) => {
          for (const token of tokens) {
            if (token.type === 'link_open') {
              const href = token.attrGet('href') ?? ''
              const match = href.match(/^(?:\.\.\/)*((?:(?:cli|sdk)-capture|capture\/(?:cli|sdk))\/.+)$/)
              if (match) {
                // Trees live at capture/{sdk,cli}; legacy flat names in older synced docs map there.
                const path = decodeURI(match[1]).replace(/^sdk-capture\//, 'capture/sdk/').replace(/^cli-capture\//, 'capture/cli/')
                token.attrSet('href', REPO_BLOB + path)
              }
            }
            if (token.children) walk(token.children)
          }
        }
        walk(state.tokens)
      })
    },
  },
  themeConfig: {
    nav: [
      { text: 'Diff', link: '/diff' },
      { text: 'Versions', link: '/versions/README' },
      { text: 'Models', link: '/models/claude-opus-5' },
      { text: 'Tools', link: '/tools' },
      {
        text: 'More',
        items: [
          { text: 'Methodology', link: '/methodology' },
          { text: 'Corrections', link: '/corrections' },
          { text: 'Launches', link: '/launches' },
          { text: 'Watch board', link: '/watch' },
          { text: 'Releases', link: '/releases' },
        ],
      },
    ],
    sidebar: {
      '/models/': [{ text: 'Model dossiers', items: pages('models') }],
      '/tools/': [{ text: 'Tool dossiers', collapsed: false, items: pages('tools') }],
      '/versions/': [
        { text: 'Version index', link: '/versions/README' },
        { text: 'Diff any two', link: '/diff' },
      ],
      '/': [
        { text: 'Methodology', link: '/methodology' },
        { text: 'Corrections ledger', link: '/corrections' },
        { text: 'Launch playbook', link: '/launches' },
        { text: 'Watch board', link: '/watch' },
        { text: 'Releases', link: '/releases' },
        { text: 'Toolset timeline', link: '/tools' },
      ],
    },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/brewpirate/cc-sys-prompt-time-machine' }],
    outline: { level: [2, 3] },
  },
  mermaid: {},
})
