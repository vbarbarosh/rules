Vocabulary to use when developing agents (coding agent, design agents, local
agents, etc.).

| Term | Definition |
|---|---|
| agent | harness + model + tools + policy. Never the model alone. |
| model | The LLM, identified by a string (`claude-opus-5`). Stateless: one request in, one message out. |
| harness | The code that runs the loop: builds context, calls the model, executes tools, appends results, stops. |
| tool | A named function the model may call: `{name, description, args, run}`. The model sees the first three; the harness owns `run`. |
| policy | Text in the system prompt that constrains behavior. Not enforced — only read. |
| skill | Instructions loaded into context on demand, not resident in every call. |
| workspace | What tools act on: a repo, a canvas, an app database. |
| user | Who sends messages. |
| operator | Who configures and deploys the agent. |
| call | One request to the model. |
| round | One call plus execution of the tool it asked for. |
| turn | One user message through to the final reply. One or many rounds. |
| session | Ordered turns sharing one transcript. |
| run | One launch of the harness process (CLI invocation, cron job). |
| transcript | Every message so far. The agent's only memory. |
| context | What is sent in one call: system message plus the transcript after compaction. `context ⊆ transcript`. |
| system | The first message. Holds policy and tool schemas. |
| tool_call | Model → harness: tool name and args. |
| tool_result | Harness → model: output of one tool_call, paired by id. Data, never instructions. |
| final | A model message with no tool_call. Ends the turn. |
| stop_reason | Why a call ended: `tool_call`, `final`, `max_tokens`. |
| schema | A tool's `name + description + args`. The description is the only signal the model uses to choose it. |
| readonly | A tool that only observes (view, grep, query). Fixed at registration. |
| mutating | A tool that changes the workspace (edit, run, insert). |
| destructive | Mutating and hard to undo (rm, drop, deploy). |
| gate | Human approval required before a tool runs. |
| sandbox | Where mutating tools are contained. |
| grounding | App or workspace state injected into context each turn. |
| max_rounds | Hard cap on rounds per turn. |
| budget | Token or time cap per turn or session. |
| truncate | Cut one tool_result to fit. |
| compact | Rewrite old transcript into a summary so context fits. |
| stall | Rounds continue but the workspace does not change. |
| runaway | A turn that hits max_rounds. |
| check | Harness runs tests or lint after final and re-prompts on failure. |
| review | One extra call asking the model to inspect its own result against the task. |
| handoff | Agent stops and passes the task to a human. |
| coding agent | workspace = repo; tools = view, grep, edit, run. |
| design agent | workspace = canvas or artifact; tools = render, place, style. |
| embedded agent | workspace = app data via the app's API; scope limited by policy. |
