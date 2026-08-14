# claude-opus-5

Generated 2026-08-14 by `bun run models` — regenerate, don't edit. Spine: sdk-cli tree.

| | |
| --- | --- |
| captured versions | 389 (1.0.0 → 2.1.229) |
| launch | 2.1.219 (2026-07-24) — changelog: "now the default Opus model" [C] |
| current prompt | 9485B, 8 sections, family `harness` |
| prompt changes | 94 across 388 captured transitions (24%) |

## Entrypoint comparison — interactive (cli) vs headless (sdk-cli)

267 versions captured in both trees (1.0.3 → 2.1.229), grouped into runs by family pair and section divergence:

| versions | dates | family cli / sdk | cli-only sections | sdk-only sections | Δ bytes (cli−sdk) |
| --- | --- | --- | --- | --- | --- |
| 1.0.3 – 1.0.16 | 2025-05-23 → 2025-06-06 | claude-code / claude-code | — | — | +0 |
| 2.0.0 – 2.0.33 | 2025-09-29 → 2025-11-04 | claude-code / sdk-legacy | — | — | -5 |
| 2.0.34 – 2.0.70 | 2025-11-05 → 2025-12-15 | claude-code / sdk-legacy | `Asking questions as you work` | — | +293 … +417 |
| 2.0.71 – 2.1.15 | 2025-12-16 → 2026-01-21 | claude-code / sdk-legacy | — | — | -5 |
| 2.1.16 – 2.1.52 | 2026-01-22 → 2026-02-24 | claude-code / sdk-legacy | — | `Task Management` | -2457 … -2450 |
| 2.1.53 – 2.1.153 | 2026-02-24 → 2026-05-27 | claude-code / sdk-legacy | — | — | -289 … +260 |
| 2.1.154 – 2.1.229 | 2026-05-28 → 2026-08-12 | harness / harness | — | — | +253 |

**Parity verdict at 2.1.229: no doctrinal divergence.** Section sets identical; Δ +253B is the known surface delta (identity line, `!`-prefix tip, shell fact).

Interactive holes — honest exclusions, not gaps: 1.0.0 (model-remapped → claude-opus-4-20250514), 1.0.17 (model-remapped → claude-sonnet-4-20250514), 1.0.18 (model-remapped → claude-sonnet-4-20250514), 1.0.19 (model-remapped → claude-sonnet-4-20250514), 1.0.20 (model-remapped → claude-sonnet-4-20250514), 1.0.21 (model-remapped → claude-sonnet-4-20250514), 1.0.22 (model-remapped → claude-sonnet-4-20250514), 1.0.23 (model-remapped → claude-sonnet-4-20250514), 1.0.24 (model-remapped → claude-sonnet-4-20250514), 1.0.25 (model-remapped → claude-sonnet-4-20250514), 1.0.26 (model-remapped → claude-sonnet-4-20250514), 1.0.27 (model-remapped → claude-sonnet-4-20250514), 1.0.28 (model-remapped → claude-sonnet-4-20250514), 1.0.29 (model-remapped → claude-sonnet-4-20250514), 1.0.30 (model-remapped → claude-sonnet-4-20250514), 1.0.31 (model-remapped → claude-sonnet-4-20250514), 1.0.32 (model-remapped → claude-sonnet-4-20250514), 1.0.33 (model-remapped → claude-sonnet-4-20250514), 1.0.34 (model-remapped → claude-sonnet-4-20250514), 1.0.35 (model-remapped → claude-sonnet-4-20250514), 1.0.36 (model-remapped → claude-sonnet-4-20250514), 1.0.37 (model-remapped → claude-sonnet-4-20250514), 1.0.38 (model-remapped → claude-sonnet-4-20250514), 1.0.39 (model-remapped → claude-sonnet-4-20250514), 1.0.40 (model-remapped → claude-sonnet-4-20250514), 1.0.41 (model-remapped → claude-sonnet-4-20250514), 1.0.42 (model-remapped → claude-sonnet-4-20250514), 1.0.43 (model-remapped → claude-sonnet-4-20250514), 1.0.44 (model-remapped → claude-sonnet-4-20250514), 2.0.18 (model-remapped → claude-haiku-4-5-20251001), 2.0.19 (model-remapped → claude-haiku-4-5-20251001), 2.0.22 (model-remapped → claude-haiku-4-5-20251001), 2.0.24 (model-remapped → claude-haiku-4-5-20251001), 2.0.25 (model-remapped → claude-haiku-4-5-20251001), 2.0.63 (model-remapped → claude-sonnet-4-5-20250929).

## Prompt timeline

Era colors (background): **amber** claude-code · **blue** sdk-legacy · **green** harness. Event glyphs: 🟢 section added · 🔴 section removed · 🟠 rewrite in place · 🔷 family flip · ⚪ first capture.

```mermaid
%%{init: {'theme':'base','themeVariables':{'cScale0':'#b45309','cScaleLabel0':'#ffffff','cScale1':'#1d4ed8','cScaleLabel1':'#ffffff','cScale2':'#047857','cScaleLabel2':'#ffffff'}}}%%
timeline TD
    title claude-opus-5 — family eras and structural events
    section claude-code era
        1.0.0<br>2025-05-22 : ⚪ first capture, 12.7KB
        1.0.106<br>2025-09-04 : 🟢 adds Professional objectivity
    section sdk-legacy era
        1.0.128<br>2025-09-27 : 🔷 sdk-legacy family begins
        2.0.0<br>2025-09-29 : 🔴 removes Following conventions, Code style
        2.0.11<br>2025-10-08 : 🔴 removes Proactiveness
        2.0.43<br>2025-11-17 : 🟢 adds Planning without timelines
        2.0.45<br>2025-11-18 : 🟢 adds Looking up your own documentation
        2.0.47<br>2025-11-19 : 🟠 1.2KB rewrite in place
        2.0.71<br>2025-12-16 : 🟢 adds Asking questions as you work
        2.0.77<br>2026-01-06 : 🔴 removes Looking up your own documentation
        2.1.9<br>2026-01-15 : 🟢 adds No time estimates : 🔴 removes Planning without timelines
        2.1.53<br>2026-02-24 : 🟢 adds System, Executing actions with care (+2 more) : 🔴 removes Professional objectivity, No time estimates (+4 more)
        2.1.59<br>2026-02-25 : 🟢 adds auto memory
        2.1.78<br>2026-03-17 : 🟢 adds Output efficiency
        2.1.83<br>2026-03-24 : 🟠 10.3KB rewrite in place
        2.1.89<br>2026-03-31 : 🟢 adds Session-specific guidance
        2.1.100<br>2026-04-10 : 🔴 removes Output efficiency
        2.1.111<br>2026-04-16 : 🟢 adds Text output (does not apply to tool calls)
        2.1.120<br>2026-04-24 : 🟢 adds Context management
    section harness era
        2.1.154<br>2026-05-28 : 🔷 harness family begins : 🟢 adds Harness, Memory : 🔴 removes System, Doing tasks (+5 more)
        2.1.219<br>2026-07-24 : 🟢 adds Delivering work, Corrections
```

Full change-point table (the diagram shows structural events only; rewordings appear below):

| version | date | bytes | Δ | what changed |
| --- | --- | ---: | ---: | --- |
| 1.0.0 | 2025-05-22 | 13046 |  | (first capture) |
| 1.0.4 | 2025-05-28 | 13138 | +92 | ~[(intro), Tool usage policy] |
| 1.0.5 | 2025-05-28 | 13139 | +1 | ~[Tool usage policy] |
| 1.0.7 | 2025-05-30 | 13245 | +106 | ~[Tone and style] |
| 1.0.20 | 2025-06-11 | 13015 | -230 | ~[Task Management, Tool usage policy, Code References] |
| 1.0.31 | 2025-06-20 | 12494 | -521 | ~[(intro), Tool usage policy] |
| 1.0.34 | 2025-06-24 | 12496 | +2 | ~[Doing tasks] |
| 1.0.35 | 2025-06-25 | 12215 | -281 | ~[Tone and style] |
| 1.0.38 | 2025-06-30 | 12482 | +267 | ~[Task Management, Tool usage policy] |
| 1.0.42 | 2025-07-03 | 12653 | +171 | ~[Tool usage policy] |
| 1.0.44 | 2025-07-07 | 12640 | -13 | ~[Task Management, Tool usage policy] |
| 1.0.45 | 2025-07-08 | 12641 | +1 | ~[Tool usage policy] |
| 1.0.49 | 2025-07-11 | 12640 | -1 | ~[Tool usage policy] |
| 1.0.53 | 2025-07-15 | 13027 | +387 | ~[Task Management, Tool usage policy] |
| 1.0.59 | 2025-07-23 | 13024 | -3 | ~[Tone and style, Proactiveness] |
| 1.0.60 | 2025-07-24 | 13146 | +122 | ~[Tool usage policy] |
| 1.0.63 | 2025-07-29 | 13012 | -134 | ~[Tone and style, Tool usage policy] |
| 1.0.64 | 2025-07-30 | 12715 | -297 | ~[Tool usage policy] |
| 1.0.70 | 2025-08-06 | 12707 | -8 | ~[Tone and style] |
| 1.0.87 | 2025-08-21 | 12242 | -465 | ~[(intro)] |
| 1.0.98 | 2025-08-29 | 12516 | +274 | ~[(intro), Tool usage policy] |
| 1.0.106 | 2025-09-04 | 13153 | +637 | +[Professional objectivity] ~[Tone and style] |
| 1.0.111 | 2025-09-10 | 13411 | +258 | ~[Tool usage policy] |
| 1.0.119 | 2025-09-18 | 13483 | +72 | ~[Doing tasks] |
| 1.0.120 | 2025-09-19 | 13480 | -3 | ~[(intro)] |
| 1.0.127 | 2025-09-26 | 13482 | +2 | ~[Professional objectivity, Doing tasks] |
| 1.0.128 | 2025-09-27 | 13814 | +332 | family claude-code→sdk-legacy ~[(intro), Tone and style, Tool usage policy, Code References] |
| 2.0.0 | 2025-09-29 | 12271 | -1543 | −[Following conventions, Code style] ~[Professional objectivity, Doing tasks, Tool usage policy] |
| 2.0.2 | 2025-09-30 | 12406 | +135 | ~[Tool usage policy] |
| 2.0.5 | 2025-10-02 | 12271 | -135 | ~[Tool usage policy] |
| 2.0.8 | 2025-10-04 | 12406 | +135 | ~[Tool usage policy] |
| 2.0.11 | 2025-10-08 | 8769 | -3637 | −[Proactiveness] ~[(intro), Tone and style, Task Management] |
| 2.0.12 | 2025-10-09 | 8770 | +1 | ~[(intro), Task Management, Doing tasks] |
| 2.0.14 | 2025-10-10 | 9189 | +419 | ~[Tone and style] |
| 2.0.17 | 2025-10-15 | 9783 | +594 | ~[Tool usage policy] |
| 2.0.24 | 2025-10-20 | 9949 | +166 | ~[(intro), Tool usage policy] |
| 2.0.28 | 2025-10-27 | 10084 | +135 | ~[Professional objectivity] |
| 2.0.30 | 2025-10-30 | 10290 | +206 | ~[Doing tasks] |
| 2.0.31 | 2025-10-31 | 10443 | +153 | ~[Tool usage policy] |
| 2.0.33 | 2025-11-04 | 10442 | -1 | ~[Tool usage policy] |
| 2.0.34 | 2025-11-05 | 10447 | +5 | ~[Task Management, Doing tasks] |
| 2.0.36 | 2025-11-07 | 10444 | -3 | ~[Doing tasks] |
| 2.0.41 | 2025-11-14 | 10432 | -12 | ~[(intro)] |
| 2.0.43 | 2025-11-17 | 10922 | +490 | +[Planning without timelines] ~[Doing tasks] |
| 2.0.45 | 2025-11-18 | 11161 | +239 | +[Looking up your own documentation:] ~[(intro)] |
| 2.0.47 | 2025-11-19 | 12351 | +1190 | ~[Doing tasks] |
| 2.0.56 | 2025-12-01 | 12425 | +74 | ~[Doing tasks] |
| 2.0.58 | 2025-12-03 | 12421 | -4 | ~[Tool usage policy] |
| 2.0.60 | 2025-12-05 | 12421 | +0 | ~[Tool usage policy, Code References] |
| 2.0.62 | 2025-12-09 | 12711 | +290 | ~[Doing tasks] |
| 2.0.68 | 2025-12-12 | 12928 | +217 | ~[Tone and style] |
| 2.0.71 | 2025-12-16 | 13350 | +422 | +[Asking questions as you work] ~[Task Management, Doing tasks] |
| 2.0.73 | 2025-12-18 | 13052 | -298 | ~[Looking up your own documentation:, Doing tasks] |
| 2.0.75 | 2025-12-20 | 12835 | -217 | ~[Tone and style] |
| 2.0.77 | 2026-01-06 | 12334 | -501 | −[Looking up your own documentation:] ~[Tone and style, Tool usage policy] |
| 2.1.9 | 2026-01-15 | 12491 | +157 | +[No time estimates] −[Planning without timelines] |
| 2.1.20 | 2026-01-27 | 12318 | -173 | ~[(intro), Task Management, Asking questions as you work, Doing tasks, Tool usage policy, Code References] |
| 2.1.23 | 2026-01-29 | 12483 | +165 | ~[(intro), Tool usage policy] |
| 2.1.32 | 2026-02-05 | 12474 | -9 | ~[Code References] |
| 2.1.36 | 2026-02-07 | 12663 | +189 | ~[Code References] |
| 2.1.41 | 2026-02-13 | 12681 | +18 | ~[Tool usage policy] |
| 2.1.42 | 2026-02-13 | 12671 | -10 | ~[Code References] |
| 2.1.47 | 2026-02-18 | 12979 | +308 | ~[Tool usage policy] |
| 2.1.51 | 2026-02-23 | 12671 | -308 | ~[Tool usage policy] |
| 2.1.53 | 2026-02-24 | 12399 | -272 | +[System, Executing actions with care, Using your tools, Environment] −[Professional objectivity, No time estimates, Task Management, Asking questions as you work, Tool usage policy, Code References] ~[(intro), Doing tasks, Tone and style] |
| 2.1.59 | 2026-02-25 | 14181 | +1782 | +[auto memory] |
| 2.1.63 | 2026-02-28 | 14492 | +311 | ~[Using your tools] |
| 2.1.69 | 2026-03-04 | 14756 | +264 | ~[auto memory] |
| 2.1.72 | 2026-03-09 | 14918 | +162 | ~[Using your tools, Environment] |
| 2.1.74 | 2026-03-11 | 15040 | +122 | ~[auto memory] |
| 2.1.78 | 2026-03-17 | 15984 | +944 | +[Output efficiency] ~[Executing actions with care] |
| 2.1.83 | 2026-03-24 | 26574 | +10590 | ~[auto memory, Environment] |
| 2.1.84 | 2026-03-25 | 26592 | +18 | ~[Doing tasks, Tone and style] |
| 2.1.86 | 2026-03-27 | 26673 | +81 | ~[Doing tasks] |
| 2.1.89 | 2026-03-31 | 26705 | +32 | +[Session-specific guidance] ~[System, Using your tools] |
| 2.1.94 | 2026-04-07 | 26669 | -36 | ~[auto memory] |
| 2.1.97 | 2026-04-08 | 26673 | +4 | ~[Environment] |
| 2.1.100 | 2026-04-10 | 25939 | -734 | −[Output efficiency] |
| 2.1.101 | 2026-04-10 | 26330 | +391 | ~[Doing tasks] |
| 2.1.111 | 2026-04-16 | 25895 | -435 | +[Text output (does not apply to tool calls)] ~[Doing tasks, Using your tools, Tone and style, Session-specific guidance, Environment] |
| 2.1.116 | 2026-04-20 | 25759 | -136 | ~[Environment] |
| 2.1.120 | 2026-04-24 | 25779 | +20 | +[Context management] ~[Environment] |
| 2.1.139 | 2026-05-11 | 26187 | +408 | ~[auto memory, Context management] |
| 2.1.140 | 2026-05-12 | 26191 | +4 | ~[Environment] |
| 2.1.142 | 2026-05-14 | 26192 | +1 | ~[Using your tools] |
| 2.1.154 | 2026-05-28 | 5410 | -20782 | family sdk-legacy→harness +[Harness, Memory] −[System, Doing tasks, Executing actions with care, Using your tools, Tone and style, Text output (does not apply to tool calls), auto memory] ~[(intro), Session-specific guidance, Environment] |
| 2.1.169 | 2026-06-08 | 5689 | +279 | ~[Context management] |
| 2.1.170 | 2026-06-09 | 5734 | +45 | ~[Environment] |
| 2.1.196 | 2026-06-29 | 5730 | -4 | ~[Environment] |
| 2.1.197 | 2026-06-30 | 5737 | +7 | ~[Environment] |
| 2.1.207 | 2026-07-10 | 5795 | +58 | ~[Harness] |
| 2.1.208 | 2026-07-13 | 6158 | +363 | ~[Harness] |
| 2.1.219 | 2026-07-24 | 9510 | +3352 | +[Delivering work, Corrections] ~[Harness, Environment, Context management] |
| 2.1.221 | 2026-08-03 | 9506 | -4 | ~[Environment] |
| 2.1.227 | 2026-08-10 | 9485 | -21 | ~[Memory] |

## Durable content (top lineages across change-points)

| survived | rewordings | first | last | current wording (head) |
| ---: | ---: | --- | --- | --- |
| 95/95 | 1 | 1.0.0 | 2.1.227 | Primary working directory: /tmp/system-prompt-capture-workspace |
| 95/95 | 1 | 1.0.0 | 2.1.227 | You are an interactive agent that helps users with software engineering tasks. |
| 93/95 | 2 | 1.0.0 | 2.1.227 | Text you output outside of tool use is displayed to the user as Github-flavored markdown i… |
| 90/95 | 2 | 1.0.0 | 2.1.197 | `<system-reminder>` tags in messages and tool results are injected by the harness, not the… |
| 85/95 | 0 | 1.0.0 | 2.1.142 | If the user asks for help or wants to give feedback inform them of the following: |
| 85/95 | 0 | 1.0.0 | 2.1.142 | IMPORTANT: You must NEVER generate or guess URLs for the user unless you are confident tha… |
| 85/95 | 2 | 1.0.0 | 2.1.142 | Mark each task completed as soon as it's done; don't batch. |
| 85/95 | 1 | 1.0.0 | 2.1.142 | The user will primarily request you to perform software engineering tasks. |
| 85/95 | 1 | 1.0.0 | 2.1.142 | These may include solving bugs, adding new functionality, refactoring code, explaining cod… |
| 85/95 | 0 | 1.0.0 | 2.1.142 | To give feedback, users should report the issue at https://github.com/anthropics/claude-co… |

## Fleet position at 2.1.229

- family: `harness` (3 of 10 models)
- sections ONLY this model has: `Delivering work`, `Corrections`
- sections EVERY sibling has and this model lacks: none
- tools: 24; model-specific definitions (no sibling matches): `Agent`, `Bash`

