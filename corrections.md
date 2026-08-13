# The correction ledger

Every prohibition lineage on the `claude-opus-5` spine (sdk-cli, both instruction
channels), chained by the same token-overlap rule as `lineage.ts` (similarity 0.6, gap
tolerance 2). "Prohibition" is research.db's mechanical `has_prohibition` flag.

Generated 2026-08-13 by `bun run corrections` — regenerate, don't edit. Spine coverage:
389 versions (1.0.0 → 2.1.229).

Relation to the figures in prompt-evolution.md ("108 prohibitions across 113 versions"): those were
sentence-level units on a 113-version sparse spine, system channel only. This ledger uses the
database's line-level units on the full spine and both channels, so counts differ while every
aggregate SHAPE reproduces: ~80% retired, deaths in bulk at the same clear-out events, tool channel
carrying roughly double the live prompt-channel corrections.

## Aggregates

- **204 prohibition lineages ever** — 78 system-prompt, 126 tool-description
- **40 live at 2.1.229** (13 system, 27 tool) · **164 retired (80%)**
- Corrections are mostly temporary, and they die in bulk at rewrites:

| last seen at | retired | event |
| --- | ---: | --- |
| 2.1.153 (2026-05-27) | 61 | killed by 2.1.154 — the Harness rewrite |
| 1.0.128 (2025-09-27) | 11 | killed by 2.0.0 — the 2.0 boundary purge |
| 2.1.110 (2026-04-15) | 10 | killed by 2.1.111 — the Opus 4.7 launch clear-out |
| 2.1.52 (2026-02-24) | 10 | killed by 2.1.53 — the restructure |
| 1.0.127 (2025-09-26) | 7 | killed by 1.0.128 — the identity transition |
| 2.1.186 (2026-06-22) | 5 | killed by 2.1.187 — plan-mode tool removal (tool channel) |
| 2.1.215 (2026-07-19) | 4 |  |
| 2.0.10 (2025-10-07) | 4 | killed by 2.0.11 — the Proactiveness-era clear-out |
| 1.0.18 (2025-06-09) | 4 |  |

## Live at 2.1.229 (40)

| channel | born | days live | rewordings | current wording |
| --- | --- | ---: | ---: | --- |
| tool | 1.0.19 (2025-06-10) | 428 | 1 | - Never mark a task as completed if: |
| tool | 2.1.53 (2026-02-24) | 169 | 2 | - IMPORTANT: Avoid using this tool to run `cat`, `head`, `tail`, `sed`, `awk`, or `echo` commands, unless expl… |
| tool | 2.1.72 (2026-03-09) | 156 | 0 | - The directory you're in if EnterWorktree was never called |
| tool | 2.1.72 (2026-03-09) | 156 | 0 | - Do NOT call this proactively — only when the user asks |
| tool | 2.1.72 (2026-03-09) | 156 | 0 | ## Avoid the :00 and :30 minute marks when the task allows it |
| tool | 2.1.72 (2026-03-09) | 156 | 0 |   "in an hour or so, remind me to..." → pick whatever minute you land on, don't round |
| system | 2.1.74 (2026-03-11) | 154 | 2 | You have a persistent file-based memory at `/tmp/system-prompt-capture-home/.claude/projects/-tmp-system-promp… |
| tool | 2.1.101 (2026-04-10) | 124 | 1 | Pass the same /loop prompt back via `prompt` each turn so the next firing repeats the task. For an autonomous … |
| tool | 2.1.101 (2026-04-10) | 124 | 1 | - For local_agent tasks: use the Agent tool result directly. Do NOT Read the .output file — it is a symlink to… |
| tool | 2.1.105 (2026-04-13) | 121 | 0 | - Never use this tool unless "worktree" is explicitly mentioned by the user or in CLAUDE.md / memory instructi… |
| system | 2.1.111 (2026-04-16) | 118 | 0 |  - When the user types `/<skill-name>`, invoke it via Skill. Only use skills listed in the user-invocable skil… |
| tool | 2.1.128 (2026-05-04) | 100 | 0 | - Do NOT re-read a file you just edited to verify — Edit/Write would have errored if the change failed, and th… |
| system | 2.1.139 (2026-05-11) | 93 | 0 | When the conversation grows long, some or all of the current context is summarized; the summary, along with an… |
| tool | 2.1.140 (2026-05-12) | 92 | 0 | Do NOT schedule a short-interval wakeup to poll for background work you started — when harness-tracked work fi… |
| tool | 2.1.142 (2026-05-14) | 90 | 0 | - Check TaskList first to avoid creating duplicate tasks |
| system | 2.1.154 (2026-05-28) | 76 | 0 |  - Tools run behind a user-selected permission mode; a denied call means the user declined it — adjust, don't … |
| system | 2.1.154 (2026-05-28) | 76 | 0 | After writing the file, add a one-line pointer in `MEMORY.md` (`- [Title](file.md) — hook`). `MEMORY.md` is th… |
| system | 2.1.154 (2026-05-28) | 76 | 1 | Before saving, check for an existing file that already covers it. Update that file rather than creating a dupl… |
| tool | 2.1.154 (2026-05-28) | 76 | 2 | For any other task — even one that would clearly benefit from parallelism — do NOT call this tool. Use the Age… |
| tool | 2.1.154 (2026-05-28) | 76 | 0 | When you do call it, the right move is often **hybrid**: scout inline first (list the files, find the channels… |
| tool | 2.1.154 (2026-05-28) | 76 | 0 | Pass the script inline via `script` — do not Write it to a file first. Every invocation automatically persists… |
| tool | 2.1.154 (2026-05-28) | 76 | 3 | - agent(prompt: string, opts?: {label?: string, phase?: string, schema?: object, model?: string, effort?: stri… |
| tool | 2.1.154 (2026-05-28) | 76 | 0 | - parallel(thunks: Array<() => Promise<any>>): Promise<any[]> — run tasks concurrently. This is a BARRIER: awa… |
| tool | 2.1.154 (2026-05-28) | 76 | 0 |   // dedup vs `seen`, NOT `confirmed` — else judge-rejected findings reappear every round and it never converg… |
| tool | 2.1.157 (2026-05-29) | 75 | 0 | - Must not already be in a worktree session when creating a new worktree (`name`); switching into another exis… |
| system | 2.1.169 (2026-06-08) | 65 | 0 | When you have enough information to act, act. Do not re-derive facts already established in the conversation, … |
| tool | 2.1.186 (2026-06-22) | 51 | 2 | Your plain text output is NOT visible to other agents — to communicate, you MUST call this tool. Messages from… |
| tool | 2.1.196 (2026-06-29) | 44 | 0 | Report code-review findings as a typed list so the host UI can render them. Use this only when the active code… |
| tool | 2.1.198 (2026-07-01) | 42 | 0 | The tool result includes a runId. To resume after a pause, kill, or script edit, relaunch with Workflow({scrip… |
| tool | 2.1.207 (2026-07-10) | 33 | 0 | This session's requests use a 1-hour Anthropic prompt-cache TTL, so effectively every allowed delay (the runti… |
| tool | 2.1.207 (2026-07-10) | 33 | 0 | Don't think in cache windows — think about what you're actually waiting for. |
| system | 2.1.208 (2026-07-13) | 30 | 0 | When you use a pronoun for someone — the user or anyone else you mention — and their pronouns haven't been sta… |
| tool | 2.1.218 (2026-07-22) | 21 | 0 | A skill is a packaged set of instructions the user or project has set up for a particular kind of task (deploy… |
| system | 2.1.219 (2026-07-24) | 19 | 0 | Do ordinary work as asked, acting on the actual request rather than on speculation about what lies behind it. … |
| system | 2.1.219 (2026-07-24) | 19 | 0 | Avoid unnecessary or excessive self-correction. Only correct an earlier statement in your user-facing text whe… |
| system | 2.1.219 (2026-07-24) | 19 | 0 | A follow-up question about your earlier work is not, by itself, a signal that you got something wrong — answer… |
| system | 2.1.219 (2026-07-24) | 19 | 0 | Do not call the AgentTool unless the user requested it |
| system | 2.1.219 (2026-07-24) | 19 | 0 | Do not use workflows or deep-research unless the user requested it |
| tool | 2.1.219 (2026-07-24) | 19 | 0 | For a single-fact lookup where you already know the file, symbol, or value, search directly. Once you've deleg… |
| tool | 2.1.227 (2026-08-10) | 2 | 0 | - Subagents run in the background by default; you'll be notified when one completes. Pass `run_in_background: … |

## Retired (164)

Sorted by death, most recent first. "died" is the last build that carried the line.

| channel | born | died | days | rewordings | final wording |
| --- | --- | --- | ---: | ---: | --- |
| tool | 2.1.211 | 2.1.226 (2026-08-08) | 24 | 0 | - Subagents run in the background by default; you'll be notified when one completes. Pass `run_in_background: … |
| tool | 2.1.154 | 2.1.218 (2026-07-22) | 55 | 0 | Reach for this when the task matches an available agent type, when you have independent work to run in paralle… |
| tool | 2.0.20 | 2.1.215 (2026-07-19) | 276 | 0 | - Do not invoke a skill that is already running |
| tool | 2.0.20 | 2.1.215 (2026-07-19) | 276 | 0 | - Do not use this tool for built-in CLI commands (like /help, /clear, etc.) |
| tool | 2.0.62 | 2.1.215 (2026-07-19) | 222 | 1 | - NEVER mention a skill without actually calling this tool |
| tool | 2.1.111 | 2.1.215 (2026-07-19) | 94 | 0 | - Only invoke a skill that appears in that list, or one the user explicitly typed as `/<name>` in their messag… |
| tool | 2.1.101 | 2.1.206 (2026-07-09) | 90 | 0 | **Don't pick 300s.** It's the worst-of-both: you pay the cache miss without amortizing it. If you're tempted t… |
| tool | 2.1.101 | 2.1.206 (2026-07-09) | 90 | 0 | For idle ticks with no specific signal to watch, default to **1200s–1800s** (20–30 min). The loop checks back,… |
| tool | 2.1.101 | 2.1.206 (2026-07-09) | 90 | 0 | The runtime clamps to [60, 3600], so you don't need to clamp yourself. |
| tool | 1.0.32 | 2.1.186 (2026-06-22) | 364 | 0 | IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires… |
| tool | 1.0.32 | 2.1.186 (2026-06-22) | 364 | 0 | 1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the e… |
| tool | 2.0.51 | 2.1.186 (2026-06-22) | 210 | 1 | ### BAD - Don't use EnterPlanMode: |
| tool | 2.0.77 | 2.1.186 (2026-06-22) | 167 | 0 | **Important:** Do NOT use AskUserQuestion to ask "Is this plan okay?" or "Should I proceed?" - that's exactly … |
| tool | 2.1.47 | 2.1.186 (2026-06-22) | 124 | 1 | Plan mode note: To switch into plan mode, use EnterPlanMode (not this tool). Once in plan mode, use this tool … |
| tool | 2.1.51 | 2.1.156 (2026-05-28) | 94 | 0 | - Must not already be in a worktree |
| system | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 0 | IMPORTANT: You must NEVER generate or guess URLs for the user unless you are confident that the URLs are for h… |
| system | 1.0.7 | 2.1.153 (2026-05-27) | 362 | 2 |  - Only use emojis if the user explicitly requests it. Avoid using emojis in all communication unless asked. |
| system | 2.0.2 | 2.1.153 (2026-05-27) | 239 | 1 |  - You can call multiple tools in a single response. If you intend to call multiple tools and there are no dep… |
| system | 2.0.43 | 2.1.153 (2026-05-27) | 191 | 1 |  - Avoid backwards-compatibility hacks like renaming unused _vars, re-exporting types, adding // removed comme… |
| system | 2.0.47 | 2.1.153 (2026-05-27) | 189 | 1 |  - Don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and… |
| system | 2.0.68 | 2.1.153 (2026-05-27) | 166 | 1 |  - Do not use a colon before tool calls. Your tool calls may not be shown directly in the output, so text like… |
| system | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 1 |  - Tools are executed in a user-selected permission mode. When you attempt to call a tool that is not automati… |
| system | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 |  - The user will primarily request you to perform software engineering tasks. These may include solving bugs, … |
| system | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 | When you encounter an obstacle, do not use destructive actions as a shortcut to simply make it go away. For in… |
| system | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 1 |  - Use the Agent tool with specialized agents when the task at hand matches the agent's description. Subagents… |
| system | 2.1.59 | 2.1.153 (2026-05-27) | 91 | 0 | - Do not write duplicate memories. First check if there is an existing memory you can update before writing a … |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 | You should build up this memory system over time so that future conversations can have a complete picture of w… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 |     <description>Contain information about the user's role, goals, responsibilities, and knowledge. Great user… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 |     <description>Guidance the user has given you about how to approach work — both what to avoid and what to k… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 |     <when_to_save>Any time the user corrects your approach ("no not that", "don't", "stop doing X") OR confirm… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 |     user: don't mock the database in these tests — we got burned last quarter when mocked tests passed but the… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 | **Step 2** — add a pointer to that file in `MEMORY.md`. `MEMORY.md` is an index, not a memory — each entry sho… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 1 | - If the user says to *ignore* or *not use* memory: Do not apply remembered facts, cite, compare against, or m… |
| system | 2.1.83 | 2.1.153 (2026-05-27) | 64 | 0 | A memory that names a specific function, file, or flag is a claim that it existed *when the memory was written… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 |  - For exploratory questions ("what could we do about X?", "how should we approach this?", "what do you think?… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 |  - Don't add features, refactor, or introduce abstractions beyond what the task requires. A bug fix doesn't ne… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 |  - Default to writing no comments. Only add one when the WHY is non-obvious: a hidden constraint, a subtle inv… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 |  - Don't explain WHAT the code does, since well-named identifiers already do that. Don't reference the current… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 1 |  - Use TaskCreate to plan and track work. Mark each task completed as soon as it's done; don't batch. |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 | Don't narrate your internal deliberation. User-facing text should be relevant communication to the user, not a… |
| system | 2.1.111 | 2.1.153 (2026-05-27) | 41 | 0 | In code: default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks —… |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 0 | - NEVER update the git config |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 0 | - IMPORTANT: Never use git commands with the -i flag (like git rebase -i or git add -i) since they require int… |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 0 | - If there are no changes to commit (i.e., no untracked files and no modifications), do not create an empty co… |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 1 | - When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appea… |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 0 | - ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required. |
| tool | 1.0.0 | 2.1.153 (2026-05-27) | 370 | 1 | - NEVER create documentation files (*.md) or README files unless explicitly requested by the User. |
| tool | 1.0.7 | 2.1.153 (2026-05-27) | 362 | 0 | - Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked. |
| tool | 1.0.7 | 2.1.153 (2026-05-27) | 362 | 0 | - Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked. |
| tool | 1.0.19 | 2.1.153 (2026-05-27) | 351 | 3 | - NEVER use the TaskCreate or Agent tools |
| tool | 1.0.19 | 2.1.153 (2026-05-27) | 351 | 0 | - DO NOT push to the remote repository unless the user explicitly asks you to do so |
| tool | 1.0.22 | 2.1.153 (2026-05-27) | 349 | 0 | - NEVER run additional commands to read or explore code, besides git bash commands |
| tool | 1.0.45 | 2.1.153 (2026-05-27) | 323 | 0 |   - ALWAYS use Grep for search tasks. NEVER invoke `grep` or `rg` as a Bash command. The Grep tool has been op… |
| tool | 1.0.128 | 2.1.153 (2026-05-27) | 242 | 0 | - NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it |
| tool | 1.0.128 | 2.1.153 (2026-05-27) | 242 | 0 | - NEVER run force push to main/master, warn the user if they request it |
| tool | 1.0.128 | 2.1.153 (2026-05-27) | 242 | 0 |   - Do not commit files that likely contain secrets (.env, credentials.json, etc). Warn the user if they speci… |
| tool | 2.0.0 | 2.1.153 (2026-05-27) | 240 | 1 |   - Use ';' only when you need to run commands sequentially but don't care if earlier commands fail. |
| tool | 2.0.0 | 2.1.153 (2026-05-27) | 240 | 1 |   - DO NOT use newlines to separate commands (newlines are ok in quoted strings). |
| tool | 2.0.0 | 2.1.153 (2026-05-27) | 240 | 1 | - NEVER commit changes unless the user explicitly asks you to. It is VERY IMPORTANT to only commit when explic… |
| tool | 2.0.50 | 2.1.153 (2026-05-27) | 187 | 0 |   - This is MANDATORY - never skip including sources in your response |
| tool | 2.0.77 | 2.1.153 (2026-05-27) | 141 | 2 |  - You can use the `run_in_background` parameter to run the command in the background. Only use this if you do… |
| tool | 2.1.3 | 2.1.153 (2026-05-27) | 138 | 0 |   - Run a git status command to see all untracked files. IMPORTANT: Never use the -uall flag as it can cause m… |
| tool | 2.1.3 | 2.1.153 (2026-05-27) | 138 | 0 |    - Run a git status command to see all untracked files (never use -uall flag) |
| tool | 2.1.15 | 2.1.153 (2026-05-27) | 126 | 0 | - NEVER run destructive git commands (push --force, reset --hard, checkout ., restore ., clean -f, branch -D) … |
| tool | 2.1.16 | 2.1.153 (2026-05-27) | 125 | 0 | - IMPORTANT: Do not use --no-edit with git rebase commands, as the --no-edit flag is not a valid option for gi… |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 | - You can optionally run agents in the background using the run_in_background parameter. When an agent runs in… |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 |   - Never skip hooks (--no-verify) or bypass signing (--no-gpg-sign, -c commit.gpgsign=false) unless the user … |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 |  - Avoid unnecessary `sleep` commands: |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 |   - Do not sleep between commands that can run immediately — just run them. |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 1 |   - Do not retry failing commands in a sleep loop — diagnose the root cause. |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 0 |   - If waiting for a background task you started with `run_in_background`, you will be notified when it comple… |
| tool | 2.1.53 | 2.1.153 (2026-05-27) | 92 | 1 |   - If you must sleep, keep the duration short to avoid blocking the user. |
| tool | 2.1.89 | 2.1.153 (2026-05-27) | 57 | 0 | **Never delegate understanding.** Don't write "based on your findings, fix the bug" or "based on the research,… |
| tool | 2.1.113 | 2.1.153 (2026-05-27) | 40 | 0 |  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding … |
| tool | 2.1.120 | 2.1.153 (2026-05-27) | 33 | 0 | - Explore: Fast read-only search agent for locating code. Use it to find files by pattern (eg. "src/components… |
| tool | 2.1.142 | 2.1.153 (2026-05-27) | 13 | 0 | - DO NOT use the TaskCreate or Agent tools |
| tool | 1.0.0 | 2.1.141 (2026-05-13) | 356 | 0 |    - Mark tasks complete IMMEDIATELY after finishing (don't batch completions) |
| tool | 2.1.63 | 2.1.141 (2026-05-13) | 74 | 0 | - DO NOT use the TodoWrite or Agent tools |
| system | 2.0.47 | 2.1.110 (2026-04-15) | 147 | 1 |  - In general, do not propose changes to code you haven't read. If a user asks about or wants you to modify a … |
| system | 2.0.47 | 2.1.110 (2026-04-15) | 147 | 1 |  - Don't add features, refactor code, or make "improvements" beyond what was asked. A bug fix doesn't need sur… |
| system | 2.0.47 | 2.1.110 (2026-04-15) | 147 | 2 |  - Don't create helpers, utilities, or abstractions for one-time operations. Don't design for hypothetical fut… |
| system | 2.1.53 | 2.1.110 (2026-04-15) | 50 | 0 |  - Do not create files unless they're absolutely necessary for achieving your goal. Generally prefer editing a… |
| system | 2.1.53 | 2.1.110 (2026-04-15) | 50 | 0 |  - Avoid giving time estimates or predictions for how long tasks will take, whether for your own work or for u… |
| system | 2.1.53 | 2.1.110 (2026-04-15) | 50 | 0 |  - Do NOT use the Bash to run commands when a relevant dedicated tool is provided. Using dedicated tools allow… |
| system | 2.1.53 | 2.1.110 (2026-04-15) | 50 | 0 |  - Break down and manage your work with the TodoWrite tool. These tools are helpful for planning your work and… |
| system | 2.1.63 | 2.1.110 (2026-04-15) | 46 | 0 |  - /<skill-name> (e.g., /commit) is shorthand for users to invoke a user-invocable skill. When executed, the s… |
| system | 2.1.86 | 2.1.110 (2026-04-15) | 19 | 0 |  - If an approach fails, diagnose why before switching tactics—read the error, check your assumptions, try a f… |
| system | 2.1.89 | 2.1.110 (2026-04-15) | 15 | 0 |  - If you do not understand why the user has denied a tool call, use the AskUserQuestion to ask them. |
| tool | 2.1.51 | 2.1.104 (2026-04-12) | 48 | 0 | - Never use this tool unless the user explicitly mentions "worktree" |
| system | 2.1.78 | 2.1.98 (2026-04-09) | 23 | 0 | IMPORTANT: Go straight to the point. Try the simplest approach first without going in circles. Do not overdo i… |
| system | 2.1.78 | 2.1.98 (2026-04-09) | 23 | 0 | Keep your text output brief and direct. Lead with the answer or action, not the reasoning. Skip filler words, … |
| system | 2.1.78 | 2.1.98 (2026-04-09) | 23 | 0 | If you can say it in one sentence, don't use three. Prefer short, direct sentences over long explanations. Thi… |
| system | 2.1.53 | 2.1.85 (2026-03-26) | 30 | 0 |  - If your approach is blocked, do not attempt to brute force your way to the outcome. For example, if an API … |
| system | 2.0.47 | 2.1.83 (2026-03-24) | 125 | 1 |  - Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions … |
| system | 2.1.59 | 2.1.81 (2026-03-20) | 23 | 0 | - When the user asks you to remember something across sessions (e.g., "always use bun", "never auto-commit"), … |
| tool | 2.1.69 | 2.1.69 (2026-03-04) | 0 | 0 | **IMPORTANT:** Both modes load tools equally. Do NOT follow up a keyword search with `select:` calls for tools… |
| tool | 2.1.69 | 2.1.69 (2026-03-04) | 0 | 0 | **INCORRECT Usage Patterns - NEVER DO THESE:** |
| tool | 1.0.22 | 2.1.62 (2026-02-27) | 260 | 0 | - DO NOT use the TodoWrite or Task tools |
| system | 1.0.0 | 2.1.52 (2026-02-24) | 278 | 0 | These tools are also EXTREMELY helpful for planning tasks, and for breaking down larger complex tasks into sma… |
| system | 1.0.0 | 2.1.52 (2026-02-24) | 278 | 0 | It is critical that you mark todos as completed as soon as you are done with a task. Do not batch up multiple … |
| system | 2.0.0 | 2.1.52 (2026-02-24) | 148 | 0 | - Use specialized tools instead of bash commands when possible, as this provides a better user experience. For… |
| system | 2.0.14 | 2.1.52 (2026-02-24) | 137 | 0 | - Output text to communicate with the user; all text you output outside of tool use is displayed to the user. … |
| system | 2.0.14 | 2.1.52 (2026-02-24) | 137 | 0 | - NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an exi… |
| system | 2.0.28 | 2.1.52 (2026-02-24) | 120 | 0 | Prioritize technical accuracy and truthfulness over validating the user's beliefs. Focus on facts and problem-… |
| system | 2.0.71 | 2.1.52 (2026-02-24) | 70 | 0 | You have access to the AskUserQuestion tool to ask the user questions when you need clarification, want to val… |
| system | 2.1.9 | 2.1.52 (2026-02-24) | 40 | 0 | Never give time estimates or predictions for how long tasks will take, whether for your own work or for users … |
| tool | 2.0.0 | 2.1.52 (2026-02-24) | 148 | 0 | IMPORTANT: This tool is for terminal operations like git, npm, docker, etc. DO NOT use it for file operations … |
| tool | 2.0.0 | 2.1.52 (2026-02-24) | 148 | 0 |   - Avoid using Bash with the `find`, `grep`, `cat`, `head`, `tail`, `sed`, `awk`, or `echo` commands, unless … |
| system | 2.1.47 | 2.1.50 (2026-02-20) | 2 | 0 | - /<skill-name> (e.g., /commit) is shorthand for users to invoke a user-invocable skill. When executed, the sk… |
| tool | 2.0.77 | 2.1.45 (2026-02-17) | 42 | 0 | Plan mode note: In plan mode, use this tool to clarify requirements or choose between approaches BEFORE finali… |
| tool | 2.1.31 | 2.1.32 (2026-02-05) | 1 | 0 | Note: The "Agent Teams" feature (TeammateTool, SendMessage, spawnTeam) is not available on this plan. Only men… |
| system | 2.1.20 | 2.1.22 (2026-01-28) | 1 | 0 | IMPORTANT: Assist with defensive security tasks only. Refuse to create, modify, or improve code that may be us… |
| system | 2.1.20 | 2.1.22 (2026-01-28) | 1 | 0 | IMPORTANT: Assist with defensive security tasks only. Refuse to create, modify, or improve code that may be us… |
| tool | 2.0.77 | 2.1.22 (2026-01-28) | 22 | 0 | - If you see a <command-name> tag in the current conversation turn (e.g., <command-name>/commit</command-name>… |
| tool | 1.0.128 | 2.1.14 (2026-01-20) | 115 | 1 | - NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explici… |
| tool | 2.1.10 | 2.1.14 (2026-01-20) | 3 | 0 | - CRITICAL: ALWAYS create NEW commits. NEVER use git commit --amend, unless the user explicitly requests it |
| tool | 2.1.6 | 2.1.12 (2026-01-17) | 4 | 0 |   - **Never combine multiple actions into one permission** - split them into separate, specific permissions (e… |
| tool | 2.1.6 | 2.1.12 (2026-01-17) | 4 | 0 |   - Never request broad tool access like "run k8s commands" - always scope to specific actions and namespaces,… |
| tool | 2.0.71 | 2.1.9 (2026-01-15) | 30 | 0 | - Avoid git commit --amend. ONLY use --amend when ALL conditions are met: |
| tool | 2.0.71 | 2.1.9 (2026-01-15) | 30 | 0 | - CRITICAL: If commit FAILED or was REJECTED by hook, NEVER amend - fix the issue and create a NEW commit |
| tool | 2.0.71 | 2.1.9 (2026-01-15) | 30 | 0 | - CRITICAL: If you already pushed to remote, NEVER amend unless user explicitly requests it (requires force pu… |
| system | 2.0.43 | 2.1.8 (2026-01-15) | 59 | 0 | When planning tasks, provide concrete implementation steps without time estimates. Never suggest timelines lik… |
| tool | 1.0.72 | 2.0.76 (2025-12-22) | 136 | 1 |   - You can use the `run_in_background` parameter to run the command in the background, which allows you to co… |
| tool | 2.0.71 | 2.0.73 (2025-12-18) | 2 | 0 |    - If hook REJECTED the commit (non-zero exit): Fix the issue, then create a NEW commit (NEVER amend) |
| system | 2.0.62 | 2.0.72 (2025-12-17) | 8 | 0 | IMPORTANT: Complete tasks fully. Do not stop mid-task or leave work incomplete. Do not claim a task is too lar… |
| tool | 2.0.2 | 2.0.72 (2025-12-17) | 78 | 0 | IMPORTANT: Only use this tool for custom slash commands that appear in the Available Commands list below. Do N… |
| tool | 2.0.2 | 2.0.72 (2025-12-17) | 78 | 0 | - Do not invoke a command that is already running. For example, if you see <command-message>foo is running…</c… |
| tool | 1.0.128 | 2.0.70 (2025-12-15) | 79 | 0 | - Avoid git commit --amend.  ONLY use --amend when either (1) user explicitly requested amend OR (2) adding ed… |
| tool | 1.0.128 | 2.0.70 (2025-12-15) | 79 | 0 |    - If both true: amend your commit. Otherwise: create NEW commit (never amend other developers' commits) |
| tool | 2.0.60 | 2.0.64 (2025-12-10) | 5 | 0 | - If you run out of things to do and the agent is still running - call AgentOutputTool with block=true to idle… |
| tool | 2.0.51 | 2.0.61 (2025-12-07) | 13 | 0 | ### BAD - Don't use EnterPlanMode: |
| tool | 1.0.40 | 2.0.55 (2025-11-26) | 148 | 0 |   - Account for "Today's date" in <env>. For example, if <env> says "Today's date: 2025-07-01", and the user w… |
| system | 1.0.98 | 2.0.23 (2025-10-20) | 52 | 0 | IMPORTANT: Assist with defensive security tasks only. Refuse to create, modify, or improve code that may be us… |
| system | 1.0.0 | 2.0.10 (2025-10-07) | 138 | 0 | Output text to communicate with the user; all text you output outside of tool use is displayed to the user. On… |
| system | 1.0.0 | 2.0.10 (2025-10-07) | 138 | 0 | If you cannot or will not help the user with something, please do not say why or what it could lead to, since … |
| system | 1.0.0 | 2.0.10 (2025-10-07) | 138 | 3 | Answer the user's question directly, avoiding any elaboration, explanation, introduction, conclusion, or exces… |
| system | 1.0.0 | 2.0.10 (2025-10-07) | 138 | 2 | Do not add additional code explanation summary unless requested by the user. After working on a file, briefly … |
| tool | 1.0.122 | 2.0.5 (2025-10-02) | 9 | 0 | - Do not use this tool if you are already processing a slash command with the same name as indicated by <comma… |
| system | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - NEVER assume that a given library is available, even if it is well known. Whenever you write code that uses … |
| system | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - Always follow security best practices. Never introduce code that exposes or logs secrets and keys. Never com… |
| system | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - IMPORTANT: DO NOT ADD ***ANY*** COMMENTS unless asked |
| system | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - Verify the solution if possible with tests. NEVER assume specific test framework or test script. Check the R… |
| system | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | NEVER commit changes unless the user explicitly asks you to. It is VERY IMPORTANT to only commit when explicit… |
| tool | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 1 |   - VERY IMPORTANT: You MUST avoid using search commands like `find` and `grep`. Instead use Grep, Glob, or Ta… |
| tool | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 |   - When issuing multiple commands, use the ';' or '&&' operator to separate them. DO NOT use newlines (newlin… |
| tool | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | 3. Plan your edits carefully to avoid conflicts between sequential operations |
| tool | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are tr… |
| tool | 1.0.0 | 1.0.128 (2025-09-27) | 128 | 0 | - Do not leave the code in a broken state |
| tool | 1.0.128 | 1.0.128 (2025-09-27) | 0 | 0 |   - NEVER amend commits created by other developers |
| tool | 1.0.0 | 1.0.127 (2025-09-26) | 127 | 1 |   - Check for any sensitive information that shouldn't be committed |
| tool | 1.0.124 | 1.0.127 (2025-09-26) | 1 | 0 |     - Report violations to the user but DO NOT suggest adding sensitive paths like ~/.bashrc, ~/.zshrc, ~/.ssh… |
| tool | 1.0.124 | 1.0.127 (2025-09-26) | 1 | 0 |     - Do NOT use `/tmp` directly - use `/tmp/claude/` or rely on TMPDIR instead |
| tool | 1.0.125 | 1.0.127 (2025-09-26) | 1 | 0 |   - CRITICAL: Commands run in sandbox mode by default - do NOT set `dangerouslyOverrideSandbox` |
| tool | 1.0.125 | 1.0.127 (2025-09-26) | 1 | 0 |     - Even if you have recently run commands with `dangerouslyOverrideSandbox: true`, you MUST NOT continue th… |
| tool | 1.0.125 | 1.0.127 (2025-09-26) | 1 | 0 |     - VERY IMPORTANT: Do NOT learn from or repeat the pattern of overriding sandbox - each command should run … |
| tool | 1.0.125 | 1.0.127 (2025-09-26) | 1 | 0 |     - Only set `dangerouslyOverrideSandbox: true` if the user *explicitly* asks to bypass sandbox, or if you'r… |
| tool | 1.0.124 | 1.0.124 (2025-09-25) | 0 | 0 |     - VERY IMPORTANT: Do NOT learn from or repeat the pattern of running unsandboxed commands - each command s… |
| tool | 1.0.0 | 1.0.44 (2025-07-07) | 46 | 0 | - If you need to identify/count the number of matches within files, use the Bash tool with `rg` (ripgrep) dire… |
| tool | 1.0.0 | 1.0.43 (2025-07-03) | 42 | 0 | - This tool takes in no parameters. So leave the input blank or empty. DO NOT include a dummy object, placehol… |
| tool | 1.0.0 | 1.0.21 (2025-06-11) | 20 | 0 | - DO NOT run additional commands to read or explore code, beyond what is available in the git context |
| tool | 1.0.0 | 1.0.18 (2025-06-09) | 18 | 0 | - Ensure the message is not generic (avoid words like "Update" or "Fix" without context) |
| tool | 1.0.0 | 1.0.18 (2025-06-09) | 18 | 0 | - DO NOT push to the remote repository |
| tool | 1.0.0 | 1.0.18 (2025-06-09) | 18 | 0 | - Do not use tools to explore code, beyond what is available in the git context |
| tool | 1.0.0 | 1.0.18 (2025-06-09) | 18 | 0 | - Ensure the summary is not generic (avoid words like "Update" or "Fix" without context) |

Reproduce any row: `bun run corpus/query.ts versions "<wording fragment>" <channel>`.

