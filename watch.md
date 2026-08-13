# The tripwire board

🟢 the expected state holds · 🔴 the tripwire FIRED (a finding, not an error) · ⚪ not yet measurable.

Generated 2026-08-13 by `bun run watch` against sdk 2.1.229 / cli archive. Run after
every release capture; any 🔴 deserves a version doc read and an entry in prompt-evolution.md.

| tripwire | expected | status | observed | fires when |
| --- | --- | :---: | --- | --- |
| opus-5 deletion-guard hole | opus-5 lacks the clause; some siblings carry it | 🟢 | opus-5: absent; 9 sibling(s) carry it | the hole closes (training regressed / patch restored) or siblings lose it too |
| opus-5 delegation bans | ban lines present at prompt end | 🟢 | present | the bans disappear (absorption) or spread to other models (policy) |
| cc_workload field | null in every capture | 🟢 | null everywhere | Anthropic starts classifying workloads — pricing/routing infrastructure going live |
| legacy-fleet migration | 7 models on the legacy family | 🟢 | 7 legacy, 3 harness | a legacy model flips to Harness — its variant set is the per-model weakness map |
| cli↔sdk doctrinal parity | identical section sets (opus-5, newest common build) | 🟢 | identical at 2.1.229 | the entrypoints fork doctrinally — the nerf-theory tripwire |
| opus-5 Bash destructive-git guard | absent from the lean-tier Bash description | 🟢 | absent | the guard returns to a Harness model — trained-not-told failed a clean test |
| mid-session rule injection | (third capture surface required) | ⚪ | not yet measurable — corpus captures the startup prompt, not system turns | a system-turn capture surface exists and observes a rule modification mid-session |

