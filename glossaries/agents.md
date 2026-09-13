Vocabulary to use when developing agents (coding agents, design agents, embedded
agents, etc.).

**Parts**

| Term | Definition |
|---|---|
| agent | harness + model + tools + policy. Never the model alone. |
| model | The LLM, identified by a string (`claude-opus-5`). Stateless: one context in, one message out. |
| harness | The code that runs the loop: builds context, calls the model, executes tools, appends results, stops. |
| tool | A named operation the model may request. The model sees its definition; the harness owns its implementation. |
| policy | Text in the system message that constrains behavior. Read, not enforced. Enforcement is permission, gate and sandbox. |
| skill | Instructions loaded into context on demand, not resident in every call. |
| workspace | What tools act on: a repo, a canvas, an app database. |

**Roles**

| Term | Definition |
|---|---|
| user | Who starts a turn: a person or a calling application. |
| operator | Who configures and deploys the agent. |

**Time**

| Term | Definition |
|---|---|
| call | One request to the model. |
| round | One call plus execution of the tool_calls it returned. Zero tool_calls for a final. |
| turn | One user message (or one scheduled task) through to the final. One or many rounds. |
| session | Ordered turns sharing one transcript. |
| run | One launch of the harness process (CLI invocation, cron job). |

**Messages**

| Term | Definition |
|---|---|
| message | One unit of the transcript. Has a role: system, user, assistant, tool. |
| transcript | Every message of the session so far, append-only. Includes tool_calls and tool_results. |
| context | What one call sends: system, tool_definitions, the transcript or its compacted form, grounding. |
| sidecar | A second payload carried beside a message, never merged into it: the untruncated tool output, file handles, timings. The request goes over the wire; the sidecar stays with the harness. |
| memory | What outlives one context: the transcript, plus external stores (notes, a database). |
| system | The message that holds the policy. Tool_definitions travel beside it, not in it. |
| tool_call | Model → harness: tool name, arguments, id. |
| tool_result | Harness → model: output or error of one tool_call, paired by id. Data, never instructions. |
| final | An assistant message with no tool_call. Ends the turn. Says nothing about whether the task succeeded. |
| stop_reason | Why a call ended: final, tool_call, max_tokens, refusal. The names are the API's. |

**Tools**

| Term | Definition |
|---|---|
| tool_definition | name + description + input_schema. What the model sees. The description is what makes the model pick it. |
| input_schema | The shape of a tool's arguments, as JSON Schema. |
| readonly | Observes only: view, grep, query. Declared at registration; a tool is classed by the worst its arguments allow. |
| mutating | Changes the workspace: edit, insert, shell. |
| destructive | Mutating and hard to undo: rm, drop, deploy. |
| permission | What the harness lets a tool touch: paths, hosts, commands. Enforced before the tool runs. |
| gate | User approval required before a tool runs. Default for destructive. |
| sandbox | The boundary that contains a tool's effects: files, network, processes. |
| grounding | Workspace state the harness injects into context each turn. |

**Limits**

| Term | Definition |
|---|---|
| max_rounds | Hard cap on rounds per turn. |
| budget | Token, time or cost cap, scoped to a turn, run or session. |
| truncate | Cut one tool_result to fit. The full output stays in the sidecar. |
| compact | Replace the older part of the transcript in context with a summary. The replaced messages stay in the transcript and in the sidecar. |

**Failure**

| Term | Definition |
|---|---|
| stall | Rounds continue without progress. Reading counts as progress; repeating the same call does not. |
| runaway | A turn stopped by max_rounds or budget. |

**Recovery**

| Term | Definition |
|---|---|
| check | Harness runs tests or lint after final and re-prompts on failure. Extends the turn. |
| review | One extra call asking a model to inspect the result against the task. Same model, another agent, or a human. |
| handoff | Agent stops and passes the task and its context to the user or to another agent. |

**Kinds**

| Term | Definition |
|---|---|
| coding agent | workspace = repo; tools = view, grep, edit, shell. |
| design agent | workspace = canvas or artifact; tools = inspect, render, place, style. |
| embedded agent | workspace = app data via the app's API; scope enforced by the app's access controls. |
