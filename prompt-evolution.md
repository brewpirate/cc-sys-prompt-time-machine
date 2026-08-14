# Claude Code harness prompt evolution — thematic chart

Scope: `-p` / `sdk-cli` entrypoint, isolated baseline (scratch HOME, env allowlist), opus-5 lineage as
spine with per-model divergences noted. The mechanical layer regenerates from the capture trees;
the interactive (cli) entrypoint's era behavior is charted separately in
[`entrypoint-eras.md`](entrypoint-eras.md).

Evidence tiers used throughout:
- **[V]** verified — isolated capture, API-confirmed ([`capture/sdk`](capture/sdk/), 1.0.0 → 2.1.232)
- **[S]** source — read from a CLI source snapshot
- **[I]** inference — interpretation; the change is fact, the attributed problem is abduction
- **[C]** corroborated — lines up with an official source (changelog, published docs)

## Era map

```
1.0.0 ──── "You are Claude Code" era ──── 1.0.125 │ 1.0.128 ──── sdk-legacy era ──────────► (sonnet/haiku/opus-4-x still here at 2.1.232)
   flat 12.2–13.8KB throughout (no collapse)       │   12KB → 26.6KB, doubling at (2.1.78,2.1.85]
   Proactiveness present; gone by 2.0.13           │                 │ (2.1.153, 2.1.157] Harness era, per-model:
                                                   │                 ├── opus-4-8, opus-5, fable-5 only
                                                   │                 │   26KB → 5.4KB (−80%), regrows to 9.5KB by 2.1.219
```

- Family split is **per model, not per version** [V]: at 2.1.232, opus-5 runs a 9.5KB `# Harness`
  prompt while sonnet-5 — a newer model — runs the 27KB legacy prompt. Rollout gated by hand-maintained
  model lists in source (`@[MODEL LAUNCH]` markers) [S].
- Identity-line transition (`You are Claude Code` → `You are a Claude agent`): **exactly 1.0.128**
  [V] — 1.0.127 is the last `Claude Code` prompt, 1.0.128 the first `Claude agent` one (+332B).
  The last major event to carry a bracket; the census is closed.
- **The corpus is complete**: every installable version since 1.0.0 is captured (389/389). One
  version is permanently uncapturable — **2.1.88 was published 2026-03-30 and then UNPUBLISHED**,
  the only withdrawn release in the product's history (0.2.109/0.2.119 were merely deprecated,
  left installable). It survives as a ghost in the registry's `time` map but not its `versions`
  array — so "was it published?" must be answered from the `versions` array; the time map
  remembers ghosts.
- Harness introduction: **(2.1.153, 2.1.157]** [V].

## Dated events and themes (what each change was solving)

All brackets below are from the verified corpus (full-resolution spine, 1.0.0 → 2.1.232).

### The 1.0.x era — instructions later absorbed into training [V]
- `Following conventions` and `Code style` exist through 1.0.125 and are **gone by 2.0.0**. Their text
  is the codebase-etiquette canon: "Mimic code style, use existing libraries and utilities, and follow
  existing patterns", "NEVER assume that a given library is available… check that this codebase already
  uses [it]", and the famous "IMPORTANT: DO NOT ADD ***ANY*** COMMENTS unless asked".
- [I] These are the most-quoted Claude Code behaviors and they stopped being *instructions* at 2.0 —
  they survive today only as one compressed Harness line ("match its comment density, naming, and
  idiom"). Clearest example in the corpus of prose graduating into trained behavior.

### Security policy — the one approval-gated clause [V+S]
- Absent entirely until **(1.0.22, 1.0.32]**, then **defensive-only** ("Refuse to create, modify, or
  improve code that may be used maliciously"); **liberalized at exactly 2.0.24** to authorized
  dual-use ("CTF challenges… Dual-use security tools require clear authorization context");
  **reverted to defensive-only at exactly 2.1.20** (published 2026-01-27), **restored at exactly
  2.1.23** (2026-01-29) — a fleet-wide, three-release, TWO-DAY reversion window, bounded on both
  sides by full-resolution capture (research.db `versions` query; corrects this file's earlier
  (2.1.17, 2.1.21] / (2.1.21, 2.1.28] brackets). Unchanged since.
- Only three changes in 94 versions, always wholesale swaps, always in the top ~2% of the prompt, and
  the only behavioral content to survive the Harness 80% cut into the 5410B minimum.
- Owned by a different team than the rest of the prompt (Safeguards; source file carries an
  approval-gate notice) — full inference chain, ownership signature, and the consequence that custom
  `--system-prompt-file` runs **delete this clause**: see [`prompt-ownership.md`](prompt-ownership.md).

### Sycophancy — `Professional objectivity`
- Added **exactly 1.0.106** [V]. Text: "Prioritize
  technical accuracy and truthfulness over validating the user's beliefs… disagrees when necessary,
  even if it may not be what the user wants to hear."
- Rewritten at exactly 2.0.28; **removed** in the 2.1.55 restructure; absent from every Harness prompt.

### Proactiveness — the steerability clause, deleted [V]
- `Proactiveness` runs 1.0.80 → 2.0.10 and is **removed at exactly 2.0.11** (with the gen-1→2 cliff;
  2.0.12 is a +1B tweak). Full text: "You are allowed
  to be proactive, but only when the user asks you to do something… **Not surprising the user with
  actions you take without asking**… if the user asks you how to approach something, you should do your
  best to answer their question first, **and not immediately jump into taking actions**."
- [I] This is the single clearest data point on the autonomy axis: the clause instructing the model to
  answer-before-acting was deleted in 2.0.13, and its opposite (`Delivering work`: finish the whole
  task, don't block) arrived at 2.1.219. The inversion is dated end
  to end, with the deleted text recoverable verbatim from the corpus.

### Time estimates — `Planning without timelines` → `No time estimates`
- Added **exactly 2.0.43**, replaced by `No time estimates` **(2.1.6, 2.1.10]**, removed at the
  2.1.55 restructure. Two iterations, then absorption.

### The anti-over-engineering doctrine — born at exactly 2.0.47 [V]
- +1190B into `Doing tasks` in one build: "Avoid over-engineering. Only make changes that are
  directly requested or clearly necessary… Don't add error handling, fallbacks, or validation for
  scenarios that can't happen… Don't create helpers, utilities, or abstractions for one-time
  operations… the right amount of complexity is the minimum needed for the current task — three
  similar lines of code is better than a premature abstraction." Plus, same build: "NEVER propose
  changes to code you haven't read."
- The most-quoted modern Claude Code doctrine has an exact birthday (2.0.47, 2025-11-19), previously
  invisible inside a stride gap. Its prohibitions later die at the Harness cliff (see the correction
  log), completing the observe → patch → train → delete lifecycle.

### 2.0.x at full resolution — what stride sampling hid [V]
All 70 published 2.0.x versions are now captured; 27 of 69 transitions changed the prompt — 39%,
and NOT the corpus norm: with capture-day artifacts normalized out, era churn is 22% (1.0.x),
**39% (2.0.x — the experimentation peak)**, 20% (2.1.x). The behavioral-experiment era (over-
engineering doctrine, self-documentation, asking-questions, time estimates — all born AND mostly
buried in 2.0.x) edited the prompt at double the rate of the eras around it. An earlier draft
claimed the rate was constant across eras; full 1.0.x resolution falsified that.
Events invisible to the old stride:
- **A rollback-and-reland at (2.0.2, 2.0.8]**: the parallel-tool-call instruction ("make all
  independent tool calls in parallel… Never use placeholders or guess missing parameters") shipped
  at 2.0.2, was REVERTED to the older wording at 2.0.5 (byte-exact restoration, −135B prompt /
  −1004B tools), and re-landed at 2.0.8. The only observed prompt rollback outside the security
  policy's (2.1.17, 2.1.28] revert cycle.
- **Tool arrivals, dated exactly**: `Skill` at 2.0.20, `EnterPlanMode` at 2.0.51 (+3685B),
  `AgentOutputTool` at 2.0.60, `AskUserQuestion` at 2.0.71 (co-shipped with its prompt section),
  `SlashCommand` REMOVED at 2.0.73.

### 1.0.x at full resolution — the calm era, and a new instrument confound [V]
106 of 121 published 1.0.x versions are now captured. Two results:
- **True churn is 22% — the calmest era** — but only after discovering that 1.0.x prompts embed
  `Today's date`. The backfill sweep crossed midnight, so raw shas showed 41% churn; half of all
  "changes" were the calendar. The date line exists from 1.0.0 and dies at the 2.1.55 restructure
  with the rest of the old env block. Every cross-day sha comparison in the 1.0.x–2.1.54 range
  must normalize it (see standing caveats).
- **Exact pins for the era's events**: `Professional objectivity` added at exactly **1.0.106**.
  Tool channel (date-immune): `exit_plan_mode` born 1.0.19, renamed `ExitPlanMode` at 1.0.57;
  `TodoRead` dies 1.0.44; `NotebookRead` dies 1.0.68; `BashOutput`/`KillBash` born 1.0.72;
  `KillBash`→`KillShell` at (1.0.108, 1.0.114]; `LS` dies 1.0.98 (not 1.0.93 as the sparse sample
  suggested); `SlashCommand` born (1.0.117, 1.0.125] — completing its arc to removal at 2.0.73.

### Self-documentation — `Looking up your own documentation:` [V]
- Added **exactly 2.0.45**, removed **exactly 2.0.77** — the final 2.0.x build; it never reached 2.1.
  Lifespan ~30 versions, the shortest-lived section in the corpus after `Output efficiency`.

### Question-asking / steerability — `Asking questions as you work`
- Added **exactly 2.0.71 — in the same build as the `AskUserQuestion` tool** (prompt section and its
  tool co-shipped, one cross-channel event), **removed** at the 2.1.55 restructure.
- [I] Added, kept ~40 versions, deleted — the steerability side has
  been tried and abandoned twice now (with `Proactiveness`).

### The 2.1.55 restructure — biggest structural event of the legacy era [V]
- Bracket **(2.1.51, 2.1.55]** (earlier estimate said 2.1.62; the finer corpus moves it).
  +`System` +`Executing actions with care` +`Using your tools` +`Environment`;
  −`Professional objectivity` −`No time estimates` −`Task Management` −`Asking questions as you work`
  −`Tool usage policy` −`Code References`.
- `auto memory` is **not** part of it — it arrives separately at (2.1.55, 2.1.62].
- [I] Rewrite from behavioral-rules-list to operating-manual: irreversible-action care gets its own
  section (post-incident shape), the environment block is formalized.

### The memory inversion — largest single content event in 2.x [V]
- At **(2.1.78, 2.1.85]** the prompt doubles 15984B → 26592B. The growth is **one section**:
  `auto memory` 2155B → 12630B (6×). No new section is involved — `Session-specific guidance` doesn't
  arrive until (2.1.85, 2.1.90].
- The rewrite **inverts what memory is for**, category for category:

| 2.1.78 "What to save" | 2.1.85 "What NOT to save in memory" |
|---|---|
| "Key architectural decisions, important file paths, and project structure" | "Code patterns, conventions, architecture, file paths, or project structure — these can be derived by reading the current project state" |
| "Solutions to recurring problems and debugging insights" | "Debugging solutions or fix recipes — the fix is in the code; the commit message has the context" |
| "Stable patterns and conventions confirmed across multiple interactions" | (same categories, now forbidden) |

- New in the same rewrite: a **"Before recommending from memory"** discipline — "If the memory names a
  file path: check the file exists. If the memory names a function or flag: grep for it. If the user is
  about to act on your recommendation… verify first" — plus "Memory records can become stale over time.
  Use memory as context for what was true at a given point in time."
- [I] Anthropic hit the memory-vs-recall failure mode at scale and shipped the fix as prompt text:
  memory is for *what cannot be re-derived* (who the user is, feedback, project intent), never for
  facts the repo already answers, and stored facts must be re-verified before they drive a
  recommendation. Notably the same discipline the `check-yo-self` skill encodes independently.

### Output discipline — three attempts [V]
- `Output efficiency` added **(2.1.74, 2.1.78]**, removed **(2.1.98, 2.1.105]** — lifespan ~27 versions.
- Replaced by `Text output (does not apply to tool calls)` **(2.1.105, 2.1.112]**.
- Numeric length anchors exist in source gated to Anthropic employees, annotated "~1.2% output token
  reduction" [S].
- [I] Persistent unsolved problem; expect further churn.

### Long-session continuity — `Context management` **(2.1.117, 2.1.122]** [V]
- "When the conversation grows long… you don't need to wrap up early or hand off mid-task."
- [I] Fix for agents wrapping up prematurely when context fills.

### The Harness rewrite — **exactly 2.1.154**, opus-4-8/opus-5/fable-5 [V+C]
- Pinned to a single version, not a bracket: 2.1.152 is legacy, 2.1.154 is Harness, and 2.1.153 is the
  only unsampled version between them. Corroborated three ways — the changelog at 2.1.154 says "The
  lean system prompt is now the default for all models except Haiku, Sonnet, and Opus 4.7 and earlier"
  (naming exactly the measured model set), and Opus 4.8 launched in the same build, 2026-05-28.
- 26KB → 5.4KB (−80%), retaining **7% of sentences** — measured, not estimated. Everything the legacy
  prompt spells out is presumed trained; what survives is operational fact (env, memory mechanics,
  session guidance) plus a compact `# Harness` contract.
- Then it **regrows**: opus-5 5.5KB → 5.9KB → 9.2KB by 2.1.228 (+`Delivering work` +`Corrections`);
  fable-5 starts at 10KB with `Communicating with the user` and a model-identity paragraph; opus-4-8
  stays minimal at 2.1.228 [V].
- [I] The regrowth is the live feed of post-launch regressions being patched in prompt space:
  - `Delivering work` and `Corrections`: shipped at **exactly 2.1.219 — the Opus 5 GA build** ("now the
    default Opus model" per the official changelog), for opus-5 only [V+C]. Launch-day behavioral
    patches: scope discipline / "finish the whole task" on the autonomy side, anti-rumination on the
    corrections side. The same build touched only `Environment` for every other model.
  - Per-model sections = per-model weakness patches (fable: readability rules, e.g. banning arrow-chain
    fragments; opus: correction discipline).

### Dense window, per-version resolution (2.1.200 → 2.1.228) [V]

290 runs — all 29 published versions in the window × 10 models, zero exclusions. Tools sidecars exist
for all but 2.1.202/2.1.203, which were captured before `--keep-tools` shipped (their prompts are
byte-identical to 2.1.201 and 2.1.204, so no prompt finding is missing; only tool resolution is).
CORRECTION: an earlier draft of this file claimed 2.1.202/2.1.203 "were never published" — false,
inferred from their absence in one capture directory rather than checked. `npm view` lists both and
both are captured. Absence in our tree is never evidence of absence upstream.
What per-version resolution shows that stride sampling cannot:

- **2.1.207** — system-authority rewrite: "`<system-reminder>` tags… injected by the harness" became
  "The system may send updates, reminders, or *modifications to rules* via mid-conversation system
  turns. These are system-controlled, unlike function results." [I] trust-hierarchy maintenance,
  likely paving for a new injection mechanism.
- **2.1.208** — the they/them pronoun rule landed **simultaneously in all three prompt families**, in
  each family's communication section (`Harness` / `Communicating with the user` / `Text output`).
  First directly observed cross-family synchronized content push.
- **2.1.219** — Opus 5 GA: `Delivering work` + `Corrections` for opus-5 only [V+C].
- **2.1.227** — `Memory` section rewritten across families (`Memory` / `auto memory`) plus `Agent` and
  `SendMessage` tool updates in the same build.
- **Tool churn outpaces prompt churn.** Most transitions in the window are tool-only:
  `EnterWorktree`/`ScheduleWakeup`/`SendMessage` (bracketed (2.1.201, 2.1.204] — 202/203 have no
  sidecar), `ScheduleWakeup` (207), `Agent` (211), `ReportFindings` gained a ≤60-char `short_summary`
  schema field (212 — UI
  features visible in tool schemas before release), `Skill` (216, 218), `Workflow` (217, 219),
  `SendMessage` (222), `Bash` (219; 224 fable), `Workflow` (229 — "cpu cores − 2" → "available
  CPUs − 2", fleet-wide, prompts byte-frozen; the description shadow of the changelogged
  container-CPU fix, a third documented-as-side-effect case). Most tool changes apply to all models
  at once, but tool descriptions can roll out in per-model waves (see the Bash case in the
  changelog-alignment section); prompt changes are family-specific. The channels have different
  maintenance models.
- **Regrowth is continuous, not step-wise**: opus-5 5737B (204) → 5795 (207) → 6158 (208) → 9206+
  (219 onward). Small accumulating patches, version by version.

### Verbatim findings — what the text says (sha diffs locate; only reading classifies) [V]

- **2.1.219 removed a destructive-action guard from opus-5 — and only opus-5.** 2.1.218: "Before
  deleting or overwriting, look at the target — *if what you find contradicts how it was described, or
  you didn't create it, surface that instead of proceeding.*" 2.1.219 for opus-5: "Before deleting or
  overwriting, look at the target." The surface-instead-of-proceeding clause is gone; fable-5 and
  opus-4-8 still carry it at 2.1.228. The flagship launched with a weaker stop-and-check rule on
  deletions than its siblings, in the build that added "keep building" doctrine.
- **The anti-refusal doctrine** (`Delivering work`, 2.1.219): "If you raise a concern about a request
  and the user repeats or reaffirms it, treat that as their decision, communicate this, and proceed
  with the full request… Refusals are only for requests that are genuinely harmful or clearly
  prohibited." Compliance-on-reaffirm, shipped at GA.
- **Models were fabricating subagent results** (`Agent` tool, 2.1.211): "Never fabricate or predict a
  pending agent's results — the notification is never something you write yourself; if the user asks
  before it arrives, say it's still running." [I] a rule this specific is written because it happened
  at scale.
- **Infrastructure economics disclosed only to the model** (`ScheduleWakeup`, 2.1.207): pacing guidance
  rewrote from "the Anthropic prompt cache has a 5-minute TTL… think in cache windows" to "this
  session's requests use a 1-hour Anthropic prompt-cache TTL… If the session enters usage overage,
  later requests drop to the 5-minute TTL." Cache-TTL degradation on overage appears in no user-facing
  doc we know of (confidence 0.6).
- **The prompt lied about the product for two versions**: fast mode's Environment line kept claiming
  Opus 4.7 support until 2.1.221, though the changelog removed 4.7 from fast mode at 2.1.219. Prompt
  facts lag product facts; the model was wrong about its own harness for two releases.
- **Skill invocation authority shifted toward the user** (2.1.216): "check if any of the available
  skills match" (proactive capability-matching) became "a packaged set of instructions the user or
  project has set up" — plus background-fork semantics at 2.1.218.
- **Agent resurrection semantics, never announced** (`SendMessage`, 2.1.204): "names keep working after
  an agent completes (a send resumes it from its transcript)."
- **2.1.227's Memory "rewrite" is a punctuation purge**: em-dashes replaced by colons and periods
  across the section — the AI-tell scrub applied to their own prompts.
- **Backgrounding discipline tightened** (`Agent` tool, 2.1.227): synchronous runs only "when your very
  next action depends on this agent's result and nothing else could usefully happen while it runs."

### Changelog alignment over the dense window [V+C]

Every measured instruction-channel change cross-referenced against the official CHANGELOG.md entry of
its arriving version (word-boundary tool-name matching; account-connector noise excluded):

- **Prompt-section changes: 15 across 12 releases — 0 of 15 changelogged.** The pronoun rule shipped in
  a 46-entry release (2.1.208) without a word; `Delivering work`/`Corrections` shipped in the GA
  release (2.1.219, 24 entries) unmentioned. Prompt text is a fully silent channel, measured, not
  asserted.
- **Tool-definition changes: 15 (opus-5 spine) — 2 documented, 13 silent (87%).** The documented two
  are side effects of feature entries (Agent: nested subagent forwarding; SendMessage: truncation fix).
- **Changelog entries can lag the actual rollout.** "Changed the Bash tool description to always note
  that command output is displayed to the model" appears at 2.1.224 — but opus-5 received exactly that
  line ("Command output is displayed to you, not reliably to the user") at **2.1.219**, five versions
  earlier. Tool descriptions roll out in per-model waves; the changelog documents completion, not
  arrival. Any correlation of behavior with changelog dates inherits this skew.
- **Per-model commit attribution**: at 2.1.219 opus-5's Bash description changed its suggested git
  trailer from `Co-Authored-By: Claude` to `Co-Authored-By: Claude Opus 5` — model identity now flows
  into commit history via the tool channel.
- **A third instruction surface exists that this corpus does not capture**: changelog prose describes
  behavioral changes to *background-session* prompts (2.1.221: "Changed background sessions to commit
  and push… follow your CLAUDE.md git instructions") and refusal-time injections (2.1.222: "Claude is
  now told to ask you to run the skill instead"). Subagent/background prompts are a separate channel —
  capturable with the same proxy, different spawn mode.
- **Tools-channel noise source**: captures taken with a claude.ai-connected account carry
  `mcp__claude_ai_*` connector tools (account state, not CLI state). Isolation cannot remove them —
  they arrive via the OAuth account. Filter `mcp__*` names in any cross-version tool analysis.

### Deep dive: delegation policy is per-model, and it inverted for opus-5 [V+C]

Opus-5 has been through three delegation-policy states, measured verbatim:

| State | Versions | Text |
|---|---|---|
| promoted | ≤2.1.153 (legacy family) | "For broad codebase exploration or research that'll take more than 3 queries, spawn Agent with subagent_type=Explore" |
| neutral | 2.1.157–2.1.218 (Harness era) | all delegation guidance removed; session guidance reduced to skills-only |
| banned | 2.1.219+ (GA) | "Do not call the AgentTool unless the user requested it" / "Do not use workflows or deep-research unless the user requested it" |

- **Same build, opposite instructions**: at 2.1.228 sonnet-5 is still actively told to "spawn Agent
  with subagent_type=Explore" while opus-5 is forbidden unprompted AgentTool use. Tool inventory is
  identical; only the prompt-side policy differs. fable-5 and opus-4-8 sit in the neutral state.
- **The ban lines are bare, unheaded, and terminal** — appended after `Corrections` at the very end of
  the prompt (highest-recency position), consistent with an ad-hoc per-model patch rather than a
  registry section.
- **Cross-channel escalation, dated** [C]: 2.1.217 caps concurrent subagents (default 20, "so one
  message can't fan out unbounded background agents") and disables nested spawning; the Workflow tool
  description gains "even one that would clearly benefit from parallelism — do NOT call this tool".
  2.1.218 makes `/deep-research` manual-only ("Claude no longer launches it on its own"). 2.1.219 ships
  the opus-5 prompt bans — and simultaneously RE-loosens capability: nested spawning returns at depth 3,
  workflows get an advisory (not hard) size guideline; 2.1.224 removes the 200-subagent session cap.
- [I] Read as a sequence: harness-level caps contained the fan-out while opus-5 was pre-GA; at GA the
  restraint moved into the model-specific prompt so the capability could be loosened for everyone else.
  Enforcement migrated UP the layer stack (capability → prompt) — the inverse of the "lowest layer that
  can hold it" doctrine, chosen so one model's failure mode doesn't tax every model's feature set.
- Cross-reference: independent long-run behavioral testing measured "Do not call the AgentTool unless the
  user requested it" as the rule shape that "held perfectly across a 12-hour run" — Anthropic's chosen
  patch shape (named action + trigger, no disposition) matches the shape that empirically holds.

## The correction log — behaviour patches, dated [V]

Prohibitions are corrections in disguise: "never fabricate a pending agent's results" is only written
after models did. Extracting every sentence containing a prohibition marker (`do not`, `don't`, `never`,
`avoid`, `must not`, `rather than`, `instead of`) and chaining rewordings the way `lineage` does gives a
dated log of behaviours Anthropic had to correct.

**108 distinct prohibitions across 113 versions. 19 live at 2.1.228; 89 retired (82%).**

### Corrections are mostly temporary

| Cleared by | Date | Count | Event |
|---|---|---|---|
| 2.1.154 | 2026-05-28 | **38** | Harness rewrite |
| 2.1.111 | 2026-04-16 | 15 | Opus 4.7 launch |
| 2.1.54 | 2026-02-25 | 11 | the restructure |
| 2.0.9 / 2.0.12 | 2025-10-06/09 | 11 | `Proactiveness` era clear-out |

82% of all corrections were eventually deleted, and they go in **bulk at rewrites** rather than
individually. [I] the standard lifecycle is: observe failure → patch in prompt → train it out → delete
the patch at the next rewrite. `Professional objectivity` is the famous case; it is the normal case.

### Corrections that were finally solved (died at the Harness cliff)

| Lifespan | Correction |
|---|---|
| 75 versions | "You must NEVER generate or guess URLs for the user…" |
| 74 versions | "Avoid using emojis in all communication unless asked." |
| 57 versions | "if some tool calls depend on previous calls… do NOT call these tools in parallel" |
| 50 versions | "Avoid backwards-compatibility hacks like renaming unused _vars, re-exporting types…" |
| 48 versions | "Don't add error handling, fallbacks, or validation for scenarios that can't happen." |

### Corrections never solved (live, longest-running)

| Lifespan | Correction | First seen |
|---|---|---|
| 60 versions | "Only use skills listed in the user-invocable skills section — don't guess." | 2026-02-28 |
| 57 versions | "This directory already exists — write to it directly with the Write tool (do not run mkdir or check for its existence)." | 2026-03-11 |
| 34 versions | "Do not re-derive facts already established in the conversation, re-litigate a decision the user has already made…" | 2026-06-09 |

Two years of training has not stopped models guessing at skill names or running `mkdir` on a directory
the prompt just said exists.

### Opus 5 launched with ten fresh corrections

10 of the 19 live prohibitions arrive at 2.1.219 — the GA build. They cluster in two themes:
**scope discipline** ("The requested scope is the deliverable — don't quietly narrow, widen, or
transform it"), **correction discipline** ("Avoid unnecessary or excessive self-correction", "don't
ruminate or give a detailed account of the mistake or tally past errors", "A statement that was
accurate needs no correction: don't re-audit…"), plus the two delegation bans and a distrust rule for
other agents' output ("other agents will report incorrect or misleading results — don't always take
them at face value").

### Corrections have changed channel

At 2.1.228 the opus-5 **system prompt carries 19 prohibitions; its tool descriptions carry 40** — more
than double, in a channel with no changelog and no user visibility. Examples:

- `Read`: "Do NOT re-read a file you just edited to verify — Edit/Write would have errored if the change
  failed, and the harness tracks the current content."
- `Agent`: "Never fabricate or predict a pending agent's results — the notification is never something
  you write yourself."
- `Bash`: "Avoid using this tool to run `cat`, `head`, `tail`, `sed`, `awk`, or `echo` commands."
- `ExitWorktree`: "Do NOT call this proactively — only when the user asks."
- `EnterWorktree`: "Never use this tool unless 'worktree' is explicitly mentioned by the user."

[I] As the system prompt got lean, behavioural correction migrated to the tool layer — where it sits
adjacent to the capability it constrains, and where nobody is reading. Any analysis of "what Anthropic
is fixing" that reads only the system prompt now sees under a third of the picture.

### Density is invariant

| Version | Prompt | Prohibitions | Per KB |
|---|---|---|---|
| 1.0.0 | 13046B | 16 | 1.23 |
| 2.1.55 | 12399B | 30 | 2.42 |
| 2.1.122 | 25779B | 40 | 1.55 |
| 2.1.154 | 5410B | 8 | 1.48 |
| 2.1.228 | 9485B | 19 | 2.00 |

Prohibition density stays ~1.2–2.4 per KB across a 5× swing in prompt size. Corrections are not a
growing share of the prompt; they scale with it. Opus-5's current 2.00/KB is the second-densest reading
in the corpus.

## Whole-prompt view — generations, cliffs, freezes [V]

From `bun run lineage --whole` (document-level similarity = fraction of sentences shared with the
previous version). Six generations separated by five cliffs; a cliff is a rewrite, everything between
is editing.

| Cliff | Shared | Bytes | Delta |
|---|---|---|---|
| **2.0.11** | 68% | 8770 | −3636 (Proactiveness removal build) |
| (2.1.51, 2.1.54] | 24% | 12399 | −272 |
| (2.1.78, 2.1.85] | 53% | 26592 | **+10608** (memory inversion) |
| (2.1.152, **2.1.154**] | **7%** | 5410 | **−20782** (Harness rewrite) |
| (2.1.218, **2.1.219**] | 57% | 9510 | +3352 (Opus 5 GA) |

| Gen | Versions | Sampled | Bytes |
|---|---|---|---|
| 1 | 1.0.0 → 2.0.9 | 19 | 13046 → 12406 |
| 2 | 2.0.12 → 2.1.51 | 32 | 8770 → 12671 |
| 3 | 2.1.54 → 2.1.78 | 8 | 12399 → 15984 |
| 4 | 2.1.85 → 2.1.152 | 16 | 26592 → 26192 |
| 5 | 2.1.154 → 2.1.218 | 28 | 5410 → 6158 |
| 6 | 2.1.219 → 2.1.228 | 10 | 9510 → 9485 |

Note the 2.1.51→2.1.54 restructure shares only **24%** of sentences while changing just −272 bytes:
near-total rewrite at constant size. Byte deltas are a poor proxy for change; sentence overlap is not.

### The lean rewrite ended one-prompt-fits-all

Cross-model shared sentences at 2.1.228:

| | opus-4-8 | opus-5 | fable-5 | the other seven |
|---|---|---|---|---|
| opus-4-8 (6146B) | — | 62% | 58% | 10% |
| opus-5 (9485B) | 62% | — | 46% | 9% |
| fable-5 (10625B) | 58% | 46% | — | 9% |
| legacy seven (27.7KB) | 10% | 9% | 9% | **99–100%** |

The seven legacy models run **the same document** — 99–100% shared, differing only in model-name lines.
The three Harness models share 46–62%. So the lean rewrite did not merely shrink the prompt; it
**replaced one shared document with per-model documents**, and opus-5/fable-5 are now further from each
other than either is from opus-4-8. The per-model patches (`Delivering work`, fable's communication
rules, the ban lines) are not exceptions to a common prompt — they are the substance of three separate
ones.

### Sentence-level durability

From `bun run lineage`: **zero sentences survive all 113 versions verbatim**, which is why exact
matching reports nothing. Chained by similarity, the most durable content is:

| Span | Edits | Range | Content |
|---|---|---|---|
| 113/113 | 1 | 1.0.0 → 2.1.228 | "You are an interactive agent that helps users with software engineering tasks." (was "interactive CLI tool") |
| 96 | **0** | 1.0.128 → 2.1.228 | "You are a Claude agent, built on Anthropic's Claude Agent SDK." |
| 88 | **0** | 2.0.30 → 2.1.228 | the Safeguards security clause (all three sentences, never reworded) |
| 75 | 0 | 1.0.0 → **2.1.152** | the URL rule — dies exactly at the Harness cliff |

The zero-edit ranking is mechanical confirmation of the ownership finding: the single most stable
behavioural content in the corpus is the one clause with an external approval gate.

## The tool channel — the majority instruction surface [V]

Full-corpus tool sidecars now run 1.0.0 → 2.1.228 (every version except 2.1.202/2.1.203), which puts
numbers on the channel the sections above mostly ignore. The prompt was never the main instruction
surface:

| Version | Prompt | Tool descriptions | Total | Prompt share |
|---|---|---|---|---|
| 1.0.0 | 13046B | 29788B | 42834B | 30% |
| 2.1.152 | 26192B | 51231B | 77423B | 34% |
| 2.1.154 | 5410B | 51627B | 57037B | **9%** |
| 2.1.228 | 9485B | 46374B | 55859B | 17% |

- **The Harness cliff was a deletion, not a migration** [V]. Across (2.1.152, 2.1.154] the prompt lost
  20782B while tool descriptions moved **+396B**. Nothing moved into the tool channel at the cliff; the
  channel-move ambiguity is resolved for the biggest single event in the corpus. The 20KB is genuinely
  gone — presumed trained, now with the alternative hypothesis eliminated.
- **The deferred-tools experiment: 2.1.69, fleet-wide, ~26 hours** [V]. 2.1.69 (published 2026-03-04
  21:46) replaced the entire 18-tool roster with a single `ToolSearch` tool ("Search for or select
  deferred tools to make them available for use… **MANDATORY PREREQUISITE — THIS IS A HARD
  REQUIREMENT**… deferred tools are NOT available until you load them"), for every model at once
  (opus-5 and sonnet-5 measured; description budget 45.5KB → 3.1KB). 2.1.70 (2026-03-06 00:09) reverted
  it wholesale. A whole tool-architecture change shipped and rolled back within a day — invisible in
  prompt bytes, absent from every section above, and the largest single event in either channel by
  byte count.
- **The tool channel's quiet cut is pinned to exactly 2.1.187** [V]: `AskUserQuestion`,
  `EnterPlanMode` and `ExitPlanMode` removed (26 → 23 tools, −6980B of descriptions) — the
  interactive plan-mode surface withdrawn from the sdk-cli entrypoint, the largest legitimate
  reduction in the channel's history. The version before it, **2.1.186, added `SendMessage`**
  (agent-to-agent messaging arrives): capability arriving and interactivity leaving in adjacent
  builds.
- Two attribution negatives worth recording: `served_model` snapshot ids never rotated for any model
  across all 222 captured versions (every capture of a given model was served by the same dated
  snapshot — cross-version diffs compare against a fixed model) [V]; and `system` block structure is
  invariant — two blocks everywhere, billing-header block 57B → 62B at the identity transition,
  so cache engineering happened *within* the prompt block, never by re-partitioning it [V].
- **The two-products split extends into the tool channel** [V, research.db tool surface]: the seven
  legacy models' Bash description carries "NEVER run destructive git commands" (99 lines); all three
  Harness models run a 14-line Bash with no destructive-git guard — the same lean-tier pattern as the
  system prompt's deletion guard, in the channel carrying ~8× more text. Per-tool holes for opus-5
  (`absent … tool`): `Agent` lacks the never-fabricate-pending-results block its siblings carry;
  `Bash` lacks the amend and cwd rules. The trained-not-told hypothesis now has to cover tool
  descriptions too, and the lean tier's tool text shrank in the same proportion as its prompt.
- Instrument note, measured: `WaitForMcpServers` appears in 11 of 4,760 sidecars, ten of them one
  model at scattered versions — a startup race, excluded from the corpus index, never a feature.

## Launch signature — replication across seven launches [V]

**Replicated: 7 of 7 launches change the launching model's own prompt.** Two shapes — fleet-wide
(8–10 models move together: Opus 4.6, 4.7, 4.8, Fable 5, Sonnet 5, Opus 5) and single-model
(Sonnet 4.6 at 2.1.45 moved only its own prompt). Tool churn at launch scales with significance:
11 tools at the Opus 4.8 + lean-prompt build, 1–2 at the smaller launches.

**Split verdict: the FLEET-wide freeze is falsified; the LAUNCHING-model freeze survives 7/7.**
Method note: all shas below are computed over kernel-line-normalized bodies (`OS Version:` line
replaced), which removes the docker/host capture-mode artifact instead of discarding the three
host-mode versions (2.1.96, 2.1.105, 2.1.183 — heals; naive sha comparison manufactures freeze
breaks at exactly those points, measured: fable 2.1.104 vs 2.1.105 differed *only* in
`…linuxkit` vs `…deb13-amd64`).

| Launch | Freeze window | Coverage | Fleet frozen | Launching model frozen |
|---|---|---|---|---|
| Opus 4.6 | 2.1.28 → 2.1.31 | 4/4 | yes | yes |
| Sonnet 4.6 | 2.1.42 → 2.1.44 | 2/2 | yes | yes |
| Opus 4.7 | 2.1.104 → 2.1.105 | 2/2 | yes (host artifact eliminated by normalization) | yes |
| **Opus 4.8** | 2.1.142 → 2.1.152 | **10/10** | **yes — complete, all 9 transitions** | **yes** |
| **Fable 5** | 2.1.154 → 2.1.165 | **10/10** | **NO** — all seven legacy models changed at exactly **2.1.162** | **yes — complete, all 9 transitions** (prompt text only; see below) |
| **Sonnet 5** | 2.1.170 → 2.1.190 | **16/16** | **NO** — fable-5 changed at (2.1.170, 2.1.172] (identified below) | **yes — complete, all 15 transitions** |
| Opus 5 | 2.1.208 → 2.1.218 | 11/11 | yes | yes |

- **Statistical weight varies enormously and the short windows have none.** With the date-line and
  kernel-line artifacts normalized out, the fleet prompt is unchanged across **73%** of ALL adjacent
  transitions (277/377) — an earlier draft used 62%, computed on raw shas inflated by capture-day
  noise. Under the corrected null a 1-transition "freeze" (Sonnet 4.6, Opus 4.7) is chance —
  p≈0.73. Opus 4.6 (3 transitions) p≈0.39. Even the long windows are individually marginal:
  Opus 5 (10 transitions) p≈0.043, Opus 4.8 (9) p≈0.059. **The evidence is the replication, not
  either window**: jointly p≈0.003, and the two long freezes precede exactly the two major
  launches. Fable 5's own prompt also held across all 9 transitions of its window (a weaker
  per-model test: single-model changes are rarer than fleet changes). Both long freezes are the two
  *major* launches (the Harness-rewrite build and GA); the small launches have windows too short
  to test, so "freezes precede launches" may really be "freezes precede BIG launches".
- **The Fable-5-window break is identified, and it is not behavioral tuning** [V]: 2.1.162 removed
  the `Glob` and `Grep` TOOLS fleet-wide (27 → 25, every model including fable-5), and the legacy
  prompts changed only because they referenced them — "(Read, Edit, Write, ~~Glob, Grep~~)" and
  "use \`find\` or \`grep\` via the Bash tool directly". The Harness prompts never mentioned either
  tool, so they had nothing to edit. Two consequences: the fleet prompt-freeze break was the
  mechanical shadow of a capability change, not a policy edit; and the launching-model "freeze" is
  a **prompt-text freeze only** — fable-5's own toolset changed mid-window. Freeze claims are
  claims about one channel, not about the instruction surface.
- **The Sonnet-5-window break is also identified, and also not about the launching model** [V]:
  (2.1.170, 2.1.172] added fable-5's **model-identity paragraph** (+696B in `Communicating with the
  user`): "the first model in Anthropic's new Claude 5 family and part of a new Mythos-class model
  tier that sits above Claude Opus… Claude Fable 5 and Claude Mythos 5 share the same underlying
  model… includes additional safety measures for dual-use capabilities, while Claude Mythos 5 is
  available without those measures to only approved organizations." Toolset identical across the
  transition — pure prompt content, and the only positioning/marketing copy in any captured prompt.
  Notably it lands ~6 versions AFTER fable's own launch window closed, mid-Sonnet-5-freeze: identity
  copy follows the announcement cycle, not the release cycle. Sonnet-5's own prompt is untouched
  across every captured transition of its window.
- **All seven windows are now closed** — every published version of every freeze window is captured,
  every break identified. Never published (absence from npm, not from our tree): 2.1.151, .155,
  .164, .171, .180, .184, .188, .189, .192, .194.

## Direction signals (tracking forward)

1. **Residual-prompt watch**: whatever survives in the newest model's Harness prompt is what training
   can't yet hold. Currently: environment facts, memory mechanics, output readability, scope/completion
   discipline, correction discipline.
2. **Regrowth watch**: sections added to a Harness prompt after its debut are regression patches —
   the highest-signal events for "what is Anthropic fixing right now".
3. **Migration watch**: when sonnet/haiku/opus-4-x flip to Harness family, compare their variant set
   against opus-5/fable-5 — the deltas are per-model weakness maps.
4. **Channel-move guard**: a section disappearing may have moved to tool descriptions, system-reminders,
   or training. Tool sidecars now cover the full corpus (1.0.0 → 2.1.228, minus 2.1.202/2.1.203), so
   prompt↔tools moves are checkable for the whole history — and the biggest deletion (the Harness
   cliff) is verified NOT to be a move (tools +396B). Background/subagent prompts remain a third,
   still-uncaptured surface.
5. **Ban-line watch**: the opus-5 delegation bans and the removed deletion guard are live markers — a
   future version dropping or restoring them signals training absorbed (or regressed on) the behavior.
6. **Order-move guard**: section reordering is cache engineering, not intent [S]. Only text changes
   carry thematic signal.

## Ongoing tracking workflow

Per CLI release (or cron):
```bash
sandbox/capture-in-docker.sh --latest --keep-tools     # verified, isolated, all default models
bun run report -m claude-opus-5                        # transitions: sections AND tool definitions
```
- New transition line → read the actual text diff (sha transitions locate; only reading classifies),
  then classify: family flip / section add / remove / rewrite / tool change; assign theme; mark
  evidence tier; check the version's CHANGELOG.md entries for corroboration; append to this file.
- Keep docker-vs-host modes unmixed (kernel line differs); the sweep corpus is all-docker.
- Bisect any interesting bracket with `sandbox/capture-in-docker.sh --cli-version <v1>,<v2>,…` —
  ~4s per run after install.
- Re-check the tripwire WARNINGs in sweep output; a hit means isolation has a new hole.

## Standing caveats

- Everything here is the **sdk-cli baseline**: interactive (`cli`) prompts are captured as their own
  tree and compared per version in the entrypoint-comparison sections of the model dossiers; their
  era behavior (which models each CLI era's interactive mode can even reach) is charted in
  [`entrypoint-eras.md`](entrypoint-eras.md). Flag-gated sections (Advisor class) are deliberately
  excluded by isolation. The chart reads Anthropic's *committed* prompt, not any individual user's
  experienced prompt.
- Coverage is **1.0.0 → 2.1.232 verified** at full resolution; no era rests on unverified data.
- A capture run must never execute inside a directory holding capture output: 1.0.x-era prompts embed a
  repository file listing, so the tool would measure its own artifacts. The fixed empty scratch cwd
  exists for this reason.
- Absence in the capture tree is never evidence of absence upstream — check `npm view` before claiming
  a version was never published (this file carried exactly that error for 2.1.202/2.1.203).
- `judge()` verifies model identity, not content truthfulness: a 200 + model echo is necessary and
  sufficient for attribution, nothing more.
- `cc_attestation` is a **capture-environment fingerprint, not a CLI-version signal**: in this corpus
  it flips exactly at capture-session boundaries (every capture in the 2026-08-11 23:43–23:58 session
  reads false; the docker sweep reads true), not at version boundaries. A mixed-mode corpus will show
  spurious attestation "transitions"; never date a change by this field.
- **Prompts before the 2.1.55 restructure embed `Today's date`**, so two captures of the SAME build
  taken on different days have different shas. A backfill that crosses midnight manufactures churn
  (measured: raw 1.0.x churn read 41%; date-normalized it is 22%). Any sha comparison touching
  1.0.0–2.1.54 must normalize the date line alongside the kernel line; `prompt_sha256` in the
  manifest is raw by design (byte-exact file binding) and must not be compared across capture days
  in that range.
