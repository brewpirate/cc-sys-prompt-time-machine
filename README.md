# Docs map

Which files are **generated** (edit the generator, never the file) and which are **authored**
(edit freely). Regeneration overwrites generated files without warning — hand edits to them are lost.

## Generated — regenerate, don't edit

| tree / file | command | source of truth |
| --- | --- | --- |
| [`releases.md`](releases.md) | `bun run releases` | npm registry (versions, dates, deprecations, weekly downloads) |
| [`tools.md`](tools.md) | `bun run tools` | `.tools.json` sidecars in `capture/sdk/` |
| [`models/`](models/) | `bun run models` | both capture trees + `corpus/versions.json` |
| [`versions/`](versions/) | `bun run version-docs` | both capture trees + changelog cache + `corpus/versions.json` |

## Authored — prose judgment is the content

| file | what it is |
| --- | --- |
| [`prompt-evolution.md`](prompt-evolution.md) | the thematic chart: dated events, eras, findings, standing caveats — evidence-tiered |
| [`prompt-ownership.md`](prompt-ownership.md) | the Safeguards ownership chain for the security clause |
| [`methodology.md`](methodology.md) | how to trust (and distrust) this corpus: confound catalog, tiers, retraction log |
| [`entrypoint-eras.md`](entrypoint-eras.md) | which models each CLI era's interactive mode can reach: the remap/passthrough/fallback seams, dated and wire-verified |
| [`tldr/`](tldr/) | dated public-facing summaries, kept as written |
| [`../corpus/README.md`](../corpus/README.md) | the research database: schema, design rules, query guide |

## Evidence, not docs

| tree | written by |
| --- | --- |
| `capture/sdk/` | the capture tool only (sdk-cli entrypoint) — byte-exact, sha-bound |
| `capture/cli/` | the capture tool only (interactive entrypoint) — a **separate corpus**, never mixed with the above |
| `corpus/research.db` | `bun run corpus/ingest.ts` — a disposable index over the captures; delete and rebuild freely |

## Conventions (project-wide)

- **Era colors** (mermaid section backgrounds, identical in every diagram):
  amber `#b45309` claude-code · blue `#1d4ed8` sdk-legacy · green `#047857` harness
- **Event glyphs**: 🟢 added · 🔴 removed · 🟠 reworded/rewrite · 🔷 family flip · ⚪ first capture
- **Evidence tiers**: [V] verified capture · [U] unverified old sweep · [S] source-read · [I] inference ·
  [C] corroborated by official source — defined in [`methodology.md`](methodology.md)
- Versions order by numeric segments (`2.1.9` < `2.1.100`); "unlisted" in any versions output means
  *not captured*, never *absent*

## Reading order

1. [`releases.md`](releases.md) — what shipped when
2. [`versions/`](versions/) — what each release changed, both channels, both entrypoints
3. [`models/`](models/) — each model's story
4. [`prompt-evolution.md`](prompt-evolution.md) — what it all means
5. [`methodology.md`](methodology.md) — why you can believe any of it
