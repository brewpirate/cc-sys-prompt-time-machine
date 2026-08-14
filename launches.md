# The launch playbook

Seven model launches, side by side. Freeze verdicts are the closed freeze program's findings
(normalized shas; individually the long windows are marginal — **the replication is the
evidence**, joint p≈0.003). Launch-day deltas are computed fresh from the captures.

Generated 2026-08-14 by `bun run launches` — regenerate, don't edit.

| model | launch build | freeze window | freeze verdict | own-prompt patch at launch | blast shape | tool churn |
| --- | --- | --- | --- | --- | --- | --- |
| **opus-4-6** | 2.1.31 (2026-02-04) [V] freeze-window analysis | 2.1.28 → 2.1.31 · 4/4 | frozen (3 transitions, p≈0.39 — weak alone) | no own-prompt change at launch build | narrow (0/10) | 1 tool touched |
| **sonnet-4-6** | 2.1.45 (2026-02-17) [V] single-model launch signature | 2.1.42 → 2.1.44 · 2/2 | frozen (1 transition, chance-level) | +1B 🟠 reworded | narrow (1/10) | 1 tool touched |
| **opus-4-7** | 2.1.111 (2026-04-16) [V] launch clear-out event | 2.1.104 → 2.1.105 · 2/2 | frozen (1 transition, chance-level) | -433B 🟢 +[Text output (does not apply to tool calls)] | fleet-wide (10/10) | 6 tools touched |
| **opus-4-8** | 2.1.154 (2026-05-28) [C] changelog — same build as the Harness rewrite | 2.1.142 → 2.1.152 · 10/10 | frozen, all 9 transitions (p≈0.059) | -20697B 🟢 +[Harness, Memory] 🔴 −[System, Doing tasks, Executing actions with care, Using your tools, Tone and style, Text output (does not apply to tool calls), auto memory] | fleet-wide (10/10) | 11 tools touched |
| **fable-5** | 2.1.166 (2026-06-05) [I] first post-freeze build | 2.1.154 → 2.1.165 · 10/10 | own prompt frozen; FLEET break at 2.1.162 = Glob/Grep tool removal, not policy | no own-prompt change at launch build | narrow (0/10) | 1 tool touched |
| **sonnet-5** | 2.1.191 (2026-06-24) [I] first post-freeze build | 2.1.170 → 2.1.190 · 16/16 | own prompt frozen, all 15 transitions; fleet break = fable identity paragraph at (2.1.170, 2.1.172] | no own-prompt change at launch build | narrow (0/10) | 0 tools touched |
| **opus-5** | 2.1.219 (2026-07-24) [C] changelog — "now the default Opus model" | 2.1.208 → 2.1.218 · 11/11 | frozen, all 10 transitions (p≈0.043) | +3352B 🟢 +[Delivering work, Corrections] | fleet-wide (10/10) | 3 tools touched |

## The playbook, as replicated

1. **Every exactly-pinned launch build carries a launching-model patch** (4/4 of the [V]/[C]
   rows). The three [I]-inferred launch builds show NO own-prompt change at that build — which
   reads as evidence the inference is wrong (fable's launch patch, the identity paragraph,
   lands at (2.1.170, 2.1.172], after its inferred build), not that the pattern broke. Pinning
   those three launch builds from the changelog is an open task; this table will then re-test
   the claim automatically.
2. **Big launches freeze first**: the two major launches (Opus 4.8 + Harness rewrite, Opus 5 GA)
   carried the two long freezes; small launches have windows too short to test. "Freezes precede
   launches" may really be "freezes precede BIG launches".
3. **Freeze means prompt-text freeze only** — fable-5's own toolset changed mid-window (Glob/Grep
   removal at 2.1.162). Instruction-channel freezes have never been observed.
4. **No launching model's prompt has ever changed inside its own freeze window.** Both observed
   fleet-level breaks were cross-model side effects, identified and dated.

## For the next launch

Day-one checklist: capture the build (`sandbox/capture-in-docker.sh --latest --keep-tools`,
both entrypoints), then check each playbook row: was there a freeze? how long? did the launching
model get a patch, and what does it prohibit? was the blast fleet-wide or per-model? Deviations
from rows 1–4 above are findings, not noise. Add the row to LAUNCHES in `src/launches.ts`.

Reproduce any cell: `bun run diff <prev> <launch-build> -m <model>`; freeze details in
[prompt-evolution.md](prompt-evolution.md) (launch-signature section); per-build detail in
[versions/](versions/).

