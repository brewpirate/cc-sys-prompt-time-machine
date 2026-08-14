# claude-fable-5

Generated 2026-08-14 by `bun run models` — regenerate, don't edit. Spine: sdk-cli tree.

| | |
| --- | --- |
| captured versions | 389 (1.0.0 → 2.1.229) |
| launch | 2.1.166 (2026-06-05) — first post-freeze build [I] |
| current prompt | 10625B, 7 sections, family `harness` |
| prompt changes | 95 across 388 captured transitions (24%) |

## Entrypoint comparison — interactive (cli) vs headless (sdk-cli)

291 versions captured in both trees (1.0.3 → 2.1.229), grouped into runs by family pair and section divergence:

| versions | dates | family cli / sdk | cli-only sections | sdk-only sections | Δ bytes (cli−sdk) |
| --- | --- | --- | --- | --- | --- |
| 1.0.3 – 1.0.44 | 2025-05-23 → 2025-07-07 | claude-code / claude-code | — | — | +0 |
| 2.0.0 – 2.0.33 | 2025-09-29 → 2025-11-04 | claude-code / sdk-legacy | — | — | -5 |
| 2.0.34 – 2.0.70 | 2025-11-05 → 2025-12-15 | claude-code / sdk-legacy | `Asking questions as you work` | — | +293 … +417 |
| 2.0.71 – 2.1.15 | 2025-12-16 → 2026-01-21 | claude-code / sdk-legacy | — | — | -5 |
| 2.1.16 – 2.1.52 | 2026-01-22 → 2026-02-24 | claude-code / sdk-legacy | — | `Task Management` | -2457 … -2450 |
| 2.1.53 – 2.1.153 | 2026-02-24 → 2026-05-27 | claude-code / sdk-legacy | — | — | -289 … +260 |
| 2.1.154 – 2.1.229 | 2026-05-28 → 2026-08-12 | harness / harness | — | — | +253 |

**Parity verdict at 2.1.229: no doctrinal divergence.** Section sets identical; Δ +253B is the known surface delta (identity line, `!`-prefix tip, shell fact).

Interactive holes — honest exclusions, not gaps: 1.0.0 (model-remapped → claude-opus-4-20250514), 2.0.20 (model-remapped → claude-haiku-4-5-20251001), 2.0.21 (model-remapped → claude-haiku-4-5-20251001), 2.0.23 (model-remapped → claude-haiku-4-5-20251001), 2.0.24 (model-remapped → claude-haiku-4-5-20251001), 2.0.25 (model-remapped → claude-haiku-4-5-20251001), 2.0.26 (model-remapped → claude-haiku-4-5-20251001), 2.0.27 (model-remapped → claude-haiku-4-5-20251001), 2.0.28 (model-remapped → claude-sonnet-4-5-20250929), 2.0.63 (model-remapped → claude-sonnet-4-5-20250929).

## Prompt timeline

Era colors (background): **amber** claude-code · **blue** sdk-legacy · **green** harness. Event glyphs: 🟢 section added · 🔴 section removed · 🟠 rewrite in place · 🔷 family flip · ⚪ first capture.

```mermaid
%%{init: {'theme':'base','themeVariables':{'cScale0':'#b45309','cScaleLabel0':'#ffffff','cScale1':'#1d4ed8','cScaleLabel1':'#ffffff','cScale2':'#047857','cScaleLabel2':'#ffffff'}}}%%
timeline TD
    title claude-fable-5 — family eras and structural events
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
        2.1.170<br>2026-06-09 : 🟢 adds Communicating with the user
```

Full change-point table (the diagram shows structural events only; rewordings appear below):

| version | date | bytes | Δ | what changed |
| --- | --- | ---: | ---: | --- |
| 1.0.0 | 2025-05-22 | 13047 |  | (first capture) |
| 1.0.4 | 2025-05-28 | 13139 | +92 | ~[(intro), Tool usage policy] |
| 1.0.5 | 2025-05-28 | 13140 | +1 | ~[Tool usage policy] |
| 1.0.7 | 2025-05-30 | 13246 | +106 | ~[Tone and style] |
| 1.0.20 | 2025-06-11 | 13016 | -230 | ~[Task Management, Tool usage policy, Code References] |
| 1.0.31 | 2025-06-20 | 12495 | -521 | ~[(intro), Tool usage policy] |
| 1.0.34 | 2025-06-24 | 12497 | +2 | ~[Doing tasks] |
| 1.0.35 | 2025-06-25 | 12216 | -281 | ~[Tone and style, Tool usage policy] |
| 1.0.38 | 2025-06-30 | 12483 | +267 | ~[Task Management] |
| 1.0.42 | 2025-07-03 | 12654 | +171 | ~[Tool usage policy] |
| 1.0.44 | 2025-07-07 | 12641 | -13 | ~[Task Management, Tool usage policy] |
| 1.0.45 | 2025-07-08 | 12642 | +1 | ~[Tool usage policy] |
| 1.0.49 | 2025-07-11 | 12641 | -1 | ~[Tool usage policy] |
| 1.0.53 | 2025-07-15 | 13028 | +387 | ~[Task Management, Tool usage policy] |
| 1.0.59 | 2025-07-23 | 13025 | -3 | ~[Tone and style, Proactiveness] |
| 1.0.60 | 2025-07-24 | 13147 | +122 | ~[Tool usage policy] |
| 1.0.63 | 2025-07-29 | 13013 | -134 | ~[Tone and style, Tool usage policy] |
| 1.0.64 | 2025-07-30 | 12716 | -297 | ~[Tool usage policy] |
| 1.0.70 | 2025-08-06 | 12708 | -8 | ~[Tone and style] |
| 1.0.87 | 2025-08-21 | 12243 | -465 | ~[(intro)] |
| 1.0.98 | 2025-08-29 | 12517 | +274 | ~[(intro), Tool usage policy] |
| 1.0.106 | 2025-09-04 | 13154 | +637 | +[Professional objectivity] ~[Tone and style] |
| 1.0.111 | 2025-09-10 | 13412 | +258 | ~[Tool usage policy] |
| 1.0.119 | 2025-09-18 | 13484 | +72 | ~[Doing tasks] |
| 1.0.120 | 2025-09-19 | 13481 | -3 | ~[(intro)] |
| 1.0.127 | 2025-09-26 | 13483 | +2 | ~[Professional objectivity, Doing tasks] |
| 1.0.128 | 2025-09-27 | 13815 | +332 | family claude-code→sdk-legacy ~[(intro), Tone and style, Tool usage policy, Code References] |
| 2.0.0 | 2025-09-29 | 12272 | -1543 | −[Following conventions, Code style] ~[Professional objectivity, Doing tasks, Tool usage policy] |
| 2.0.2 | 2025-09-30 | 12407 | +135 | ~[Tool usage policy] |
| 2.0.5 | 2025-10-02 | 12272 | -135 | ~[Tool usage policy] |
| 2.0.8 | 2025-10-04 | 12407 | +135 | ~[Tool usage policy] |
| 2.0.11 | 2025-10-08 | 8770 | -3637 | −[Proactiveness] ~[(intro), Tone and style, Task Management] |
| 2.0.12 | 2025-10-09 | 8771 | +1 | ~[(intro), Task Management, Doing tasks] |
| 2.0.14 | 2025-10-10 | 9190 | +419 | ~[Tone and style] |
| 2.0.17 | 2025-10-15 | 9784 | +594 | ~[Tool usage policy] |
| 2.0.24 | 2025-10-20 | 9950 | +166 | ~[(intro), Tool usage policy] |
| 2.0.28 | 2025-10-27 | 10085 | +135 | ~[Professional objectivity] |
| 2.0.30 | 2025-10-30 | 10291 | +206 | ~[Doing tasks] |
| 2.0.31 | 2025-10-31 | 10444 | +153 | ~[Tool usage policy] |
| 2.0.33 | 2025-11-04 | 10443 | -1 | ~[Tool usage policy] |
| 2.0.34 | 2025-11-05 | 10448 | +5 | ~[Task Management, Doing tasks] |
| 2.0.36 | 2025-11-07 | 10445 | -3 | ~[Doing tasks] |
| 2.0.41 | 2025-11-14 | 10433 | -12 | ~[(intro)] |
| 2.0.43 | 2025-11-17 | 10923 | +490 | +[Planning without timelines] ~[Doing tasks] |
| 2.0.45 | 2025-11-18 | 11162 | +239 | +[Looking up your own documentation:] ~[(intro)] |
| 2.0.47 | 2025-11-19 | 12352 | +1190 | ~[Doing tasks] |
| 2.0.56 | 2025-12-01 | 12426 | +74 | ~[Doing tasks] |
| 2.0.58 | 2025-12-03 | 12422 | -4 | ~[Tool usage policy] |
| 2.0.60 | 2025-12-05 | 12422 | +0 | ~[Tool usage policy, Code References] |
| 2.0.62 | 2025-12-09 | 12712 | +290 | ~[Doing tasks] |
| 2.0.68 | 2025-12-12 | 12929 | +217 | ~[Tone and style] |
| 2.0.71 | 2025-12-16 | 13351 | +422 | +[Asking questions as you work] ~[Task Management, Doing tasks] |
| 2.0.73 | 2025-12-18 | 13053 | -298 | ~[Looking up your own documentation:, Doing tasks] |
| 2.0.75 | 2025-12-20 | 12836 | -217 | ~[Tone and style] |
| 2.0.77 | 2026-01-06 | 12335 | -501 | −[Looking up your own documentation:] ~[Tone and style, Tool usage policy] |
| 2.1.9 | 2026-01-15 | 12492 | +157 | +[No time estimates] −[Planning without timelines] |
| 2.1.20 | 2026-01-27 | 12319 | -173 | ~[(intro), Task Management, Asking questions as you work, Doing tasks, Tool usage policy, Code References] |
| 2.1.23 | 2026-01-29 | 12484 | +165 | ~[(intro), Tool usage policy] |
| 2.1.32 | 2026-02-05 | 12475 | -9 | ~[Code References] |
| 2.1.36 | 2026-02-07 | 12664 | +189 | ~[Code References] |
| 2.1.41 | 2026-02-13 | 12682 | +18 | ~[Tool usage policy] |
| 2.1.42 | 2026-02-13 | 12672 | -10 | ~[Code References] |
| 2.1.47 | 2026-02-18 | 12980 | +308 | ~[Tool usage policy] |
| 2.1.51 | 2026-02-23 | 12672 | -308 | ~[Tool usage policy] |
| 2.1.53 | 2026-02-24 | 12400 | -272 | +[System, Executing actions with care, Using your tools, Environment] −[Professional objectivity, No time estimates, Task Management, Asking questions as you work, Tool usage policy, Code References] ~[(intro), Doing tasks, Tone and style] |
| 2.1.59 | 2026-02-25 | 14182 | +1782 | +[auto memory] |
| 2.1.63 | 2026-02-28 | 14493 | +311 | ~[Using your tools] |
| 2.1.69 | 2026-03-04 | 14757 | +264 | ~[auto memory] |
| 2.1.72 | 2026-03-09 | 14919 | +162 | ~[Using your tools, Environment] |
| 2.1.74 | 2026-03-11 | 15041 | +122 | ~[auto memory] |
| 2.1.78 | 2026-03-17 | 15985 | +944 | +[Output efficiency] ~[Executing actions with care] |
| 2.1.83 | 2026-03-24 | 26575 | +10590 | ~[auto memory, Environment] |
| 2.1.84 | 2026-03-25 | 26593 | +18 | ~[Doing tasks, Tone and style] |
| 2.1.86 | 2026-03-27 | 26674 | +81 | ~[Doing tasks] |
| 2.1.89 | 2026-03-31 | 26706 | +32 | +[Session-specific guidance] ~[System, Using your tools] |
| 2.1.94 | 2026-04-07 | 26670 | -36 | ~[auto memory] |
| 2.1.97 | 2026-04-08 | 26674 | +4 | ~[Environment] |
| 2.1.100 | 2026-04-10 | 25940 | -734 | −[Output efficiency] |
| 2.1.101 | 2026-04-10 | 26331 | +391 | ~[Doing tasks] |
| 2.1.111 | 2026-04-16 | 25896 | -435 | +[Text output (does not apply to tool calls)] ~[Doing tasks, Using your tools, Tone and style, Session-specific guidance, Environment] |
| 2.1.116 | 2026-04-20 | 25760 | -136 | ~[Environment] |
| 2.1.120 | 2026-04-24 | 25780 | +20 | +[Context management] ~[Environment] |
| 2.1.139 | 2026-05-11 | 26188 | +408 | ~[auto memory, Context management] |
| 2.1.140 | 2026-05-12 | 26192 | +4 | ~[Environment] |
| 2.1.142 | 2026-05-14 | 26193 | +1 | ~[Using your tools] |
| 2.1.154 | 2026-05-28 | 5411 | -20782 | family sdk-legacy→harness +[Harness, Memory] −[System, Doing tasks, Executing actions with care, Using your tools, Tone and style, Text output (does not apply to tool calls), auto memory] ~[(intro), Session-specific guidance, Environment] |
| 2.1.169 | 2026-06-08 | 5690 | +279 | ~[Context management] |
| 2.1.170 | 2026-06-09 | 9537 | +3847 | +[Communicating with the user] ~[Harness, Environment, Context management] |
| 2.1.172 | 2026-06-10 | 10233 | +696 | ~[Communicating with the user] |
| 2.1.196 | 2026-06-29 | 10229 | -4 | ~[Environment] |
| 2.1.197 | 2026-06-30 | 10236 | +7 | ~[Environment] |
| 2.1.207 | 2026-07-10 | 10294 | +58 | ~[Harness] |
| 2.1.208 | 2026-07-13 | 10657 | +363 | ~[Communicating with the user] |
| 2.1.219 | 2026-07-24 | 10644 | -13 | ~[Environment] |
| 2.1.221 | 2026-08-03 | 10640 | -4 | ~[Environment] |
| 2.1.227 | 2026-08-10 | 10625 | -15 | ~[Communicating with the user, Memory, Context management] |

## Durable content (top lineages across change-points)

| survived | rewordings | first | last | current wording (head) |
| ---: | ---: | --- | --- | --- |
| 96/96 | 1 | 1.0.0 | 2.1.227 | Primary working directory: /tmp/system-prompt-capture-workspace |
| 96/96 | 1 | 1.0.0 | 2.1.227 | You are an interactive agent that helps users with software engineering tasks. |
| 94/96 | 2 | 1.0.0 | 2.1.227 | Text you output outside of tool use is displayed to the user as Github-flavored markdown i… |
| 91/96 | 2 | 1.0.0 | 2.1.197 | `<system-reminder>` tags in messages and tool results are injected by the harness, not the… |
| 85/96 | 0 | 1.0.0 | 2.1.142 | If the user asks for help or wants to give feedback inform them of the following: |
| 85/96 | 0 | 1.0.0 | 2.1.142 | IMPORTANT: You must NEVER generate or guess URLs for the user unless you are confident tha… |
| 85/96 | 2 | 1.0.0 | 2.1.142 | Mark each task completed as soon as it's done; don't batch. |
| 85/96 | 1 | 1.0.0 | 2.1.142 | The user will primarily request you to perform software engineering tasks. |
| 85/96 | 1 | 1.0.0 | 2.1.142 | These may include solving bugs, adding new functionality, refactoring code, explaining cod… |
| 85/96 | 0 | 1.0.0 | 2.1.142 | To give feedback, users should report the issue at https://github.com/anthropics/claude-co… |

## Fleet position at 2.1.229

- family: `harness` (3 of 10 models)
- sections ONLY this model has: `Communicating with the user`
- sections EVERY sibling has and this model lacks: none
- tools: 24; model-specific definitions (no sibling matches): `Bash`

