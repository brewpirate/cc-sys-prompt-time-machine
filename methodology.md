# Methodology — how to trust this corpus, and how it distrusts itself

Everything this project claims rests on one rule:

> **Attestation requires an observer outside the system being attested.**

Three instances of that rule structure the whole method, each learned the hard way:

1. **A model's self-report is not evidence.** Agents describe their own prompts wrongly. The corpus
   captures what the CLI puts on the wire — byte-exact, not declinable, recorded before the request is
   forwarded.
2. **In-process counters are not persistence.** An ingest once reported 9,520 captures with exit code 0;
   400 had reached disk (WAL commits never checkpointed). Every summary number in the corpus tooling is
   now a post-write read from a second vantage, and ingest throws when inserted ≠ persisted.
3. **Green tests are not coverage.** Thirteen passing tests were blind to a broken version-ordering
   weight because the fixture's real-world versions never exercised it. A mutation that survives the
   suite is the evidence; the suite passing is a claim.

## What a capture is

`ANTHROPIC_BASE_URL` points the CLI at a local loopback proxy. The proxy records the request's `system`
field and tool definitions, forwards the request untouched (the CLI's own credentials), and reads the
response — because the response is the only place model identity lives. A run becomes a capture only if
the API confirmed serving the requested model (`judge()` in `src/capture.ts`); everything else is
recorded as an exclusion with a reason:

| exclusion | meaning |
| --- | --- |
| `model-unavailable` | API answered 404 — the composed prompt exists but is not attributable |
| `upstream-error` / `transport-error` | nothing about the model was proven |
| `model-remapped` | the CLI substituted a different model client-side (interactive catalogs do this, nondeterministically) |
| `model-substituted` | the API served a different model than requested |
| `no-prompt-captured` | the CLI never sent a prompt (timeout diagnostics say which side of the API it died on) |

An unavailable model still receives a fully composed prompt — the API rejects it *after* composition.
Writing that prompt down as the model's prompt would be fabrication; this taxonomy is what prevents it.

## Comparability rules

Two captures are comparable only under identical conditions. These are join keys, not hopes:

- **Entrypoint**: `-p` (sdk-cli) and interactive (cli) compose different documents. Separate trees
  (`captures/`, `captures-cli/`), and `diff` refuses to compare across them without `--force`.
- **Capture profile**: container vs host (kernel line), scratch vs real HOME (measured 2.3KB), frozen
  vs live feature flags, account connectors. The research database records these in `profiles` and
  cross-version queries join on `profile_id`.
- **Raw vs normalized sha**: `prompt_sha256` in frontmatter is raw — it binds the file byte-exactly.
  Comparisons across capture days or container boundaries use the normalized form
  (`normalizePrompt()`), which masks exactly two measured confounds and nothing else.
- **Version ordering** is numeric by segment (`2.1.9` < `2.1.100`); lexical ordering silently reverses
  history.
- **Three-state reporting**: carried / absent / **unlisted**. Unlisted means *not captured* and says
  nothing. Conflating it with absence produced a retracted finding (below).
- **Launch facts are curated, not derived**: old CLIs happily compose prompts for models that do not
  exist yet, so "when did X launch" comes from the changelog and freeze analysis, marked with tiers.

## The instrument-confound catalog

Every entry below produced (or nearly produced) a false finding before it was caught. Magnitudes are
measured, not estimated.

| confound | magnitude | where it bit |
| --- | --- | --- |
| capture tool measuring its own output directory | +25KB per prompt, growing per run | the retracted "38KB era"; old sweep's "92 of 93 versions differ" |
| random temp-dir cwd quoted inside the prompt | every sha unique | made "compare over time" meaningless until the cwd was pinned |
| real HOME composed into the prompt | ~2.3KB (CLAUDE.md, live git status) | scratch-HOME isolation exists because of it |
| host vs container kernel line | ±3B, new sha | manufactured freeze breaks at exactly the host-healed versions |
| `Today's date` embedded pre-2.1.55 | raw 1.0.x churn 41% vs true 22% | any backfill crossing midnight |
| live feature flags | prompt composition can change mid-sweep | frozen via nonessential-traffic kill switch |
| account connectors (`cp__*`/`mcp__*` tools) | whole tool suites appear | 1,055 entries stripped; filtered at capture since |
| `WaitForMcpServers` startup race | 11 of 4,760 sidecars | would read as a tool appearing/vanishing across versions |
| `cc_attestation` | flips at capture-session boundaries | looks exactly like a CLI-version signal; never date by it |
| npm `time` map remembers unpublished versions | one ghost (2.1.88) | "was it published?" must be answered from the `versions` array |
| interactive model-catalog remap | nondeterministic per run | a remap exclusion is retryable, not structural |
| WAL persistence | 92% of an ingest silently lost | all corpus counts now read post-checkpoint from disk |

The general lesson: **the instrument lies more often than the subject.** Most analysis effort in this
project went into distrusting the measurement, and every confound above was found because a result
looked slightly too interesting.

## Evidence tiers

- **[V] verified** — isolated capture, API-confirmed. The default currency.
- **[U] unverified** — the old contaminated sweep; survives only as a bracket-narrowing aid. One
  [U]-derived claim was falsified outright; treat the remainder with matching suspicion. (One was also
  vindicated exactly: the Professional-objectivity bracket.)
- **[S] source** — read from CLI source snapshots; wire-checked where possible.
- **[I] inference** — the change is fact; the attributed cause is abduction. Always labelled.
- **[C] corroborated** — lines up with an official source (changelog, docs). Note: the changelog
  documents completion, not arrival — tool descriptions roll out per-model ahead of their entries.

## Retraction log

Claims this project made and later killed with its own data. They stay on the record because the
corrections are the strongest evidence the method works.

| retracted claim | what was actually true | root cause |
| --- | --- | --- |
| "the 38KB era" (1.0.x prompts collapsed from 38KB) | no 1.0.x prompt exceeded 13.8KB | instrument measured its own output |
| "a 20-version pre-launch freeze" | 5 captured samples across 16 published versions | sampling density read as behaviour |
| "prompt churn is constant across eras (36–39%)" | 22% / 39% / 20% — 2.0.x is the experimentation peak | date-line confound + sparse sampling |
| freeze null rate 62%, p≈0.008/0.013 per window | 73% null; individually marginal (p≈0.04/0.06); the *replication* is the evidence (joint p≈0.003) | raw shas inflated the change rate |
| "2.1.202/2.1.203 were never published" | both published and captured | absence in one directory read as absence upstream |
| "LS died at 1.0.93" | 1.0.98 | stride gap |
| "2.1.88 will appear as a dated hole" | unlisted — it says nothing | category error against the three-state rule, caught within hours |
| security revert window (2.1.17,2.1.21] / restore (2.1.21,2.1.28] | exactly 2.1.20 → 2.1.23, two days, fleet-wide | bracket arithmetic on sparse samples |

## Verification habits

- `bun run doctor <tree>` after any sync, heal, or concurrent sweep — sha bindings, manifest↔disk
  agreement, contamination, coverage. ERROR means the corpus lies somewhere; warn means incomplete.
- Regenerate, don't re-derive: every generated doc is deterministic from the captures.
- Mutation-test anything whose failure would mint findings (ingest, ordering, exclusion rules).
- When a number is surprising, suspect the instrument first. It has the better track record.
