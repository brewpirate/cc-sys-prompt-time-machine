# Claude Code tool evolution

What the tool definitions the CLI sends — names, descriptions, input schemas — did across
389 CLI versions (1.0.0 → 2.1.229), tracked separately from the
system prompt because they change independently of it.

Generated 2026-08-13 by `bun run tools` — do not edit by hand; regenerate instead.

- **desc** revisions are description rewrites (prompt engineering); **schema** revisions are
  `input_schema` changes (interface changes). They are counted separately on purpose.
- A **rename** is a removal and an addition in the same transition with an identical schema —
  reported as one event, not as a death and a birth.
- Timeline and lifespans follow `claude-opus-5`; the matrix shows where models diverge.

## Current roster at 2.1.229

| tool | fable-5 | haiku-4-5 | opus-4-5 | opus-4-6 | opus-4-7 | opus-4-8 | opus-5 | sonnet-4-5 | sonnet-4-6 | sonnet-5 | variants |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | ---: |
| Agent | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **3** |
| Bash | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **10** |
| CronCreate | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| CronDelete | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| CronList | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| Edit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **2** |
| EnterWorktree | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| ExitWorktree | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| NotebookEdit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| Read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **2** |
| ReportFindings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| ScheduleWakeup | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| SendMessage | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| Skill | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskCreate | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskGet | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskList | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskOutput | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskStop | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| TaskUpdate | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| WebFetch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **2** |
| WebSearch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **2** |
| Workflow | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| Write | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **2** |

24 tools across 10 models: 24 on every model, 0 model-specific by presence — but 7 diverge by DEFINITION (**variants** = distinct description+schema combinations across models).

## Timeline (claude-opus-5)

Only transitions that changed the toolset are listed. Adjacent versions missing a sidecar are
compared across the gap.

- `1.0.0 → 1.0.1` desc: Bash
- `1.0.1 → 1.0.2` desc: Bash
- `1.0.2 → 1.0.3` schema: Edit · desc: Bash
- `1.0.3 → 1.0.4` desc: Bash
- `1.0.4 → 1.0.5` desc: Bash
- `1.0.5 → 1.0.6` desc: Bash
- `1.0.6 → 1.0.7` desc: 4 tools reworded
- `1.0.7 → 1.0.8` schema: Edit, MultiEdit · desc: Bash, Edit, MultiEdit, TodoWrite
- `1.0.8 → 1.0.9` desc: Bash
- `1.0.9 → 1.0.10` desc: Bash
- `1.0.10 → 1.0.11` desc: Bash
- `1.0.11 → 1.0.14` desc: Bash
- `1.0.14 → 1.0.15` desc: Bash
- `1.0.15 → 1.0.16` desc: Task, Bash
- `1.0.16 → 1.0.17` desc: Bash
- `1.0.17 → 1.0.18` desc: Bash
- `1.0.18 → 1.0.19` +exit_plan_mode · desc: Task, Bash, TodoWrite
- `1.0.21 → 1.0.22` schema: NotebookRead, NotebookEdit · desc: Bash
- `1.0.22 → 1.0.23` schema: NotebookEdit · desc: Bash
- `1.0.24 → 1.0.25` desc: Task
- `1.0.31 → 1.0.32` desc: exit_plan_mode
- `1.0.34 → 1.0.35` schema: TodoRead · desc: Bash
- `1.0.35 → 1.0.36` desc: WebSearch
- `1.0.39 → 1.0.40` desc: WebSearch
- `1.0.41 → 1.0.42` desc: WebFetch
- `1.0.43 → 1.0.44` −TodoRead · desc: Task
- `1.0.44 → 1.0.45` schema: Grep · desc: Grep
- `1.0.56 → 1.0.57` exit_plan_mode→ExitPlanMode · desc: Task
- `1.0.57 → 1.0.58` desc: Read
- `1.0.59 → 1.0.60` schema: Task · desc: Task
- `1.0.63 → 1.0.64` desc: Task
- `1.0.67 → 1.0.68` −NotebookRead · desc: Bash, Read
- `1.0.68 → 1.0.69` schema: TodoWrite
- `1.0.70 → 1.0.71` desc: Task
- `1.0.71 → 1.0.72` +BashOutput +KillBash · schema: Bash · desc: Task, Bash
- `1.0.73 → 1.0.74` desc: Task
- `1.0.77 → 1.0.78` desc: Task
- `1.0.80 → 1.0.81` desc: Task, Bash
- `1.0.85 → 1.0.86` schema: TodoWrite · desc: TodoWrite
- `1.0.88 → 1.0.89` schema: TodoWrite · desc: TodoWrite
- `1.0.96 → 1.0.98` −LS · desc: Task, Bash, Read
- `1.0.100 → 1.0.102` schema: Bash
- `1.0.102 → 1.0.103` desc: Bash
- `1.0.107 → 1.0.108` desc: Bash
- `1.0.110 → 1.0.111` desc: Task
- `1.0.112 → 1.0.113` KillBash→KillShell
- `1.0.120 → 1.0.122` +SlashCommand · desc: Bash
- `1.0.123 → 1.0.124` schema: Bash · desc: Bash
- `1.0.124 → 1.0.125` schema: Bash · desc: Bash
- `1.0.127 → 1.0.128` schema: Bash · desc: Bash
- `1.0.128 → 2.0.0` −MultiEdit · desc: Bash
- `2.0.1 → 2.0.2` desc: 4 tools reworded
- `2.0.3 → 2.0.5` desc: 4 tools reworded
- `2.0.5 → 2.0.8` desc: 5 tools reworded
- `2.0.9 → 2.0.10` desc: ExitPlanMode
- `2.0.11 → 2.0.12` desc: SlashCommand
- `2.0.14 → 2.0.15` desc: ExitPlanMode
- `2.0.15 → 2.0.17` desc: Task
- `2.0.17 → 2.0.18` desc: Task
- `2.0.19 → 2.0.20` +Skill
- `2.0.20 → 2.0.21` desc: ExitPlanMode
- `2.0.23 → 2.0.24` schema: Bash
- `2.0.24 → 2.0.25` desc: Bash
- `2.0.25 → 2.0.26` schema: Bash
- `2.0.27 → 2.0.28` schema: Task · desc: Task
- `2.0.28 → 2.0.29` desc: Task
- `2.0.29 → 2.0.30` desc: Task, ExitPlanMode
- `2.0.31 → 2.0.32` schema: Grep
- `2.0.33 → 2.0.34` desc: Task
- `2.0.34 → 2.0.35` schema: Skill
- `2.0.35 → 2.0.36` desc: Skill, SlashCommand
- `2.0.44 → 2.0.45` desc: BashOutput, KillShell
- `2.0.49 → 2.0.50` desc: WebSearch
- `2.0.50 → 2.0.51` +EnterPlanMode · schema: ExitPlanMode · desc: ExitPlanMode
- `2.0.53 → 2.0.54` schema: ExitPlanMode
- `2.0.55 → 2.0.56` desc: Task, Bash, WebSearch
- `2.0.59 → 2.0.60` +AgentOutputTool · schema: Task, ExitPlanMode · desc: Task
- `2.0.61 → 2.0.62` desc: 5 tools reworded
- `2.0.64 → 2.0.65` +TaskOutput · −AgentOutputTool −BashOutput · schema: Task, Bash, Grep · desc: Task
- `2.0.70 → 2.0.71` +AskUserQuestion · desc: Bash
- `2.0.71 → 2.0.72` desc: Task
- `2.0.72 → 2.0.73` −SlashCommand · schema: Skill · desc: Skill
- `2.0.73 → 2.0.74` +LSP · schema: ExitPlanMode · desc: Bash
- `2.0.76 → 2.0.77` schema: Task, TaskOutput, Bash, Glob, Grep, ExitPlanMode, Read, Edit, Write, NotebookEdit, WebFetch, TodoWrite, WebSearch, KillShell, AskUserQuestion, Skill, EnterPlanMode, LSP · desc: Task, Bash, ExitPlanMode, AskUserQuestion, Skill
- `2.0.77 → 2.1.0` −LSP
- `2.1.1 → 2.1.2` schema: Task
- `2.1.2 → 2.1.3` schema: Bash, AskUserQuestion · desc: Bash
- `2.1.3 → 2.1.4` desc: Bash
- `2.1.5 → 2.1.6` schema: ExitPlanMode · desc: ExitPlanMode
- `2.1.6 → 2.1.7` desc: Task
- `2.1.7 → 2.1.8` desc: WebSearch
- `2.1.9 → 2.1.10` schema: ExitPlanMode · desc: Bash
- `2.1.12 → 2.1.14` schema: ExitPlanMode · desc: Bash, ExitPlanMode, WebFetch
- `2.1.14 → 2.1.15` desc: Bash
- `2.1.15 → 2.1.16` schema: Task, ExitPlanMode · desc: Bash, WebFetch
- `2.1.18 → 2.1.19` +TaskStop · −KillShell · schema: Task, ExitPlanMode · desc: Skill
- `2.1.19 → 2.1.20` schema: Task · desc: Bash, Edit
- `2.1.20 → 2.1.21` schema: Grep
- `2.1.22 → 2.1.23` desc: Skill
- `2.1.25 → 2.1.26` desc: Bash
- `2.1.29 → 2.1.30` schema: Read · desc: Task, Read
- `2.1.30 → 2.1.31` desc: Task
- `2.1.31 → 2.1.32` desc: Bash
- `2.1.32 → 2.1.33` schema: Edit · desc: Task
- `2.1.37 → 2.1.38` desc: Task, Bash
- `2.1.38 → 2.1.39` schema: Bash
- `2.1.41 → 2.1.42` desc: WebSearch
- `2.1.44 → 2.1.45` schema: AskUserQuestion
- `2.1.45 → 2.1.47` desc: AskUserQuestion
- `2.1.47 → 2.1.48` desc: Task
- `2.1.49 → 2.1.50` schema: Task, ExitPlanMode · desc: Task
- `2.1.50 → 2.1.51` +EnterWorktree
- `2.1.52 → 2.1.53` desc: Task, Bash, Write
- `2.1.62 → 2.1.63` Task→Agent · desc: Bash, Grep, TodoWrite, EnterPlanMode
- `2.1.63 → 2.1.64` schema: Agent · desc: Agent
- `2.1.64 → 2.1.66` schema: Agent · desc: Agent
- `2.1.68 → 2.1.69` +ToolSearch · −Agent −TaskOutput −Bash −Glob −Grep −ExitPlanMode −Read −Edit −Write −NotebookEdit −WebFetch −TodoWrite −WebSearch −TaskStop −AskUserQuestion −Skill −EnterPlanMode −EnterWorktree
- `2.1.69 → 2.1.70` +Agent +TaskOutput +Bash +Glob +Grep +ExitPlanMode +Read +Edit +Write +NotebookEdit +WebFetch +TodoWrite +WebSearch +TaskStop +AskUserQuestion +Skill +EnterPlanMode +EnterWorktree · −ToolSearch
- `2.1.70 → 2.1.71` desc: Agent
- `2.1.71 → 2.1.72` +ExitWorktree +CronCreate +CronDelete +CronList · schema: Agent · desc: WebFetch, EnterWorktree
- `2.1.74 → 2.1.75` desc: Bash, Read
- `2.1.76 → 2.1.77` schema: Agent · desc: Agent
- `2.1.78 → 2.1.79` schema: CronCreate · desc: CronCreate
- `2.1.80 → 2.1.81` schema: EnterWorktree
- `2.1.81 → 2.1.83` schema: Bash, CronCreate, EnterWorktree · desc: CronCreate, CronDelete, CronList, TaskOutput
- `2.1.83 → 2.1.84` schema: Grep · desc: Bash, Glob, Read, TodoWrite
- `2.1.85 → 2.1.86` desc: Bash, Edit
- `2.1.87 → 2.1.89` schema: Read · desc: Agent
- `2.1.90 → 2.1.91` desc: Edit
- `2.1.92 → 2.1.94` desc: Agent
- `2.1.100 → 2.1.101` +ScheduleWakeup · desc: TaskOutput
- `2.1.104 → 2.1.105` schema: EnterWorktree · desc: Agent, EnterWorktree
- `2.1.107 → 2.1.108` desc: Bash
- `2.1.108 → 2.1.109` +ListMcpResourcesTool +ReadMcpResourceTool
- `2.1.110 → 2.1.111` −ListMcpResourcesTool −ReadMcpResourceTool · schema: Skill · desc: Agent, Bash, Skill
- `2.1.112 → 2.1.113` +ListMcpResourcesTool +ReadMcpResourceTool · desc: Bash
- `2.1.114 → 2.1.116` −ListMcpResourcesTool −ReadMcpResourceTool
- `2.1.117 → 2.1.118` +ListMcpResourcesTool +ReadMcpResourceTool · desc: Read
- `2.1.119 → 2.1.120` desc: Agent
- `2.1.122 → 2.1.123` −ListMcpResourcesTool −ReadMcpResourceTool
- `2.1.123 → 2.1.124` +ListMcpResourcesTool +ReadMcpResourceTool
- `2.1.126 → 2.1.128` −ListMcpResourcesTool −ReadMcpResourceTool · desc: Read
- `2.1.128 → 2.1.129` +ListMcpResourcesTool +ReadMcpResourceTool · desc: EnterPlanMode
- `2.1.131 → 2.1.132` schema: Bash
- `2.1.132 → 2.1.133` desc: EnterWorktree
- `2.1.137 → 2.1.138` −ListMcpResourcesTool −ReadMcpResourceTool
- `2.1.138 → 2.1.139` +ListMcpResourcesTool +ReadMcpResourceTool · desc: Agent
- `2.1.139 → 2.1.140` desc: ScheduleWakeup
- `2.1.140 → 2.1.141` −ListMcpResourcesTool −ReadMcpResourceTool · schema: Grep
- `2.1.141 → 2.1.142` +TaskCreate +TaskGet +TaskList +TaskUpdate · −TodoWrite · desc: Bash
- `2.1.150 → 2.1.152` desc: AskUserQuestion
- `2.1.153 → 2.1.154` +Workflow · desc: Agent, AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebFetch, WebSearch, Write
- `2.1.156 → 2.1.157` desc: EnterWorktree
- `2.1.159 → 2.1.160` desc: Workflow
- `2.1.160 → 2.1.161` desc: TaskOutput
- `2.1.161 → 2.1.162` −Glob −Grep · desc: Bash, EnterPlanMode, NotebookEdit
- `2.1.162 → 2.1.163` desc: Workflow
- `2.1.165 → 2.1.166` desc: Workflow
- `2.1.169 → 2.1.170` schema: Agent · desc: Bash
- `2.1.170 → 2.1.172` desc: Bash
- `2.1.175 → 2.1.176` schema: Agent
- `2.1.177 → 2.1.178` schema: Agent · desc: Agent, Skill, Workflow
- `2.1.185 → 2.1.186` +SendMessage
- `2.1.186 → 2.1.187` −AskUserQuestion −EnterPlanMode −ExitPlanMode
- `2.1.195 → 2.1.196` +ReportFindings
- `2.1.197 → 2.1.198` schema: Agent, TaskStop · desc: Agent, TaskStop, Workflow
- `2.1.198 → 2.1.199` schema: ReportFindings · desc: SendMessage
- `2.1.201 → 2.1.202` schema: ScheduleWakeup · desc: ScheduleWakeup
- `2.1.202 → 2.1.203` schema: EnterWorktree · desc: EnterWorktree, SendMessage
- `2.1.206 → 2.1.207` desc: ScheduleWakeup
- `2.1.210 → 2.1.211` desc: Agent
- `2.1.211 → 2.1.212` schema: ReportFindings
- `2.1.215 → 2.1.216` desc: Skill
- `2.1.216 → 2.1.217` desc: Workflow
- `2.1.217 → 2.1.218` desc: Skill
- `2.1.218 → 2.1.219` desc: Agent, Bash, Workflow
- `2.1.221 → 2.1.222` schema: SendMessage
- `2.1.226 → 2.1.227` schema: Agent, SendMessage · desc: Agent
- `2.1.228 → 2.1.229` desc: Workflow

179 of 388 transitions changed the toolset.

## Lifespans (claude-opus-5)

| tool | first | last | versions | desc revisions | schema revisions | |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Bash | 1.0.0 | 2.1.229 | 388 | 63 | 13 | active |
| Edit | 1.0.0 | 2.1.229 | 388 | 6 | 4 | active |
| Glob | 1.0.0 | 2.1.161 | 328 | 5 | 1 | **removed** |
| Grep | 1.0.0 | 2.1.161 | 328 | 3 | 7 | **removed** |
| LS | 1.0.0 | 1.0.96 | 94 | 0 | 0 | **removed** |
| MultiEdit | 1.0.0 | 1.0.128 | 121 | 2 | 1 | **removed** |
| NotebookEdit | 1.0.0 | 2.1.229 | 388 | 1 | 3 | active |
| NotebookRead | 1.0.0 | 1.0.67 | 66 | 0 | 1 | **removed** |
| Read | 1.0.0 | 2.1.229 | 388 | 12 | 3 | active |
| Task | 1.0.0 | 2.1.62 | 247 | 35 | 10 | **removed** |
| TodoRead | 1.0.0 | 1.0.43 | 42 | 0 | 1 | **removed** |
| TodoWrite | 1.0.0 | 2.1.141 | 310 | 6 | 4 | **removed** |
| WebFetch | 1.0.0 | 2.1.229 | 388 | 7 | 1 | active |
| WebSearch | 1.0.0 | 2.1.229 | 388 | 7 | 1 | active |
| Write | 1.0.0 | 2.1.229 | 388 | 3 | 1 | active |
| exit_plan_mode | 1.0.19 | 1.0.56 | 38 | 1 | 0 | **removed** |
| ExitPlanMode | 1.0.57 | 2.1.186 | 294 | 8 | 11 | **removed** |
| BashOutput | 1.0.72 | 2.0.64 | 108 | 2 | 0 | **removed** |
| KillBash | 1.0.72 | 1.0.112 | 36 | 0 | 0 | **removed** |
| KillShell | 1.0.113 | 2.1.18 | 103 | 1 | 1 | **removed** |
| SlashCommand | 1.0.122 | 2.0.72 | 72 | 5 | 0 | **removed** |
| Skill | 2.0.20 | 2.1.229 | 251 | 10 | 4 | active |
| EnterPlanMode | 2.0.51 | 2.1.186 | 185 | 4 | 1 | **removed** |
| AgentOutputTool | 2.0.60 | 2.0.64 | 5 | 0 | 0 | **removed** |
| TaskOutput | 2.0.65 | 2.1.229 | 210 | 3 | 1 | active |
| AskUserQuestion | 2.0.71 | 2.1.186 | 165 | 4 | 4 | **removed** |
| LSP | 2.0.74 | 2.0.77 | 4 | 0 | 1 | **removed** |
| TaskStop | 2.1.19 | 2.1.229 | 179 | 1 | 1 | active |
| EnterWorktree | 2.1.51 | 2.1.229 | 151 | 5 | 4 | active |
| Agent | 2.1.63 | 2.1.229 | 141 | 17 | 10 | active |
| ToolSearch | 2.1.69 | 2.1.69 | 1 | 0 | 0 | **removed** |
| CronCreate | 2.1.72 | 2.1.229 | 134 | 2 | 2 | active |
| CronDelete | 2.1.72 | 2.1.229 | 134 | 1 | 0 | active |
| CronList | 2.1.72 | 2.1.229 | 134 | 1 | 0 | active |
| ExitWorktree | 2.1.72 | 2.1.229 | 134 | 0 | 0 | active |
| ScheduleWakeup | 2.1.101 | 2.1.229 | 110 | 3 | 1 | active |
| ListMcpResourcesTool | 2.1.109 | 2.1.140 | 19 | 0 | 0 | **removed** |
| ReadMcpResourceTool | 2.1.109 | 2.1.140 | 19 | 0 | 0 | **removed** |
| TaskCreate | 2.1.142 | 2.1.229 | 78 | 0 | 0 | active |
| TaskGet | 2.1.142 | 2.1.229 | 78 | 0 | 0 | active |
| TaskList | 2.1.142 | 2.1.229 | 78 | 0 | 0 | active |
| TaskUpdate | 2.1.142 | 2.1.229 | 78 | 0 | 0 | active |
| Workflow | 2.1.154 | 2.1.229 | 67 | 8 | 0 | active |
| SendMessage | 2.1.186 | 2.1.229 | 40 | 2 | 2 | active |
| ReportFindings | 2.1.196 | 2.1.229 | 34 | 0 | 2 | active |

