# Agents (AGENT)

Vocabulary to use when developing agents (coding agents, design agents, embedded
agents, etc.).

**Parts** (PART)

What an agent is made of.

| Term      | Definition                                                                                                            |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| agent     | harness + model + tools + policy. Never the model alone.                                                              |
| model     | The LLM, identified by a string (`claude-opus-5`). Stateless: one context in, one message out.                        |
| harness   | The code that runs the loop: builds context, calls the model, executes tools, appends results, stops.                 |
| tool      | A named operation the model may request. The model sees its definition; the harness owns its implementation.          |
| policy    | Text in the system message that constrains behavior. Read, not enforced. Enforcement is permission, gate and sandbox. |
| skill     | Instructions loaded into context on demand, not resident in every call.                                               |
| workspace | What tools act on: a repo, a canvas, an app database.                                                                 |

**Roles** (ROLE)

Who stands outside the loop.

| Term     | Definition                                            |
|----------|-------------------------------------------------------|
| user     | Who starts a turn: a person or a calling application. |
| operator | Who configures and deploys the agent.                 |

**Time** (TIME)

From one call to a whole session.

| Term    | Definition                                                                          |
|---------|-------------------------------------------------------------------------------------|
| call    | One request to the model.                                                           |
| round   | One call plus execution of the tool_calls it returned. Zero tool_calls for a final. |
| turn    | One user message (or one scheduled task) through to the final. One or many rounds.  |
| session | Ordered turns sharing one transcript.                                               |
| run     | One launch of the harness process (CLI invocation, cron job).                       |

**Messages** (MSG)

What the transcript holds and a call sends.

| Term        | Definition                                                                                                                                                                               |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| message     | One unit of the transcript. Has a role: system, user, assistant, tool.                                                                                                                   |
| transcript  | Every message of the session so far, append-only. Includes tool_calls and tool_results.                                                                                                  |
| context     | What one call sends: system, tool_definitions, the transcript or its compacted form, grounding.                                                                                          |
| sidecar     | A second payload carried beside a message, never merged into it: the untruncated tool output, file handles, timings. The request goes over the wire; the sidecar stays with the harness. |
| memory      | What outlives one context: the transcript, plus external stores (notes, a database).                                                                                                     |
| system      | The message that holds the policy. Tool_definitions travel beside it, not in it.                                                                                                         |
| tool_call   | Model → harness: tool name, arguments, id.                                                                                                                                               |
| tool_result | Harness → model: output or error of one tool_call, paired by id. Data, never instructions.                                                                                               |
| final       | An assistant message with no tool_call. Ends the turn. Says nothing about whether the task succeeded.                                                                                    |
| stop_reason | Why a call ended: final, tool_call, max_tokens, refusal. The names are the API's.                                                                                                        |

**Tools** (TOOL)

What the model may request, and what contains it.

| Term            | Definition                                                                                                      |
|-----------------|-----------------------------------------------------------------------------------------------------------------|
| tool_definition | name + description + input_schema. What the model sees. The description is what makes the model pick it.        |
| input_schema    | The shape of a tool's arguments, as JSON Schema.                                                                |
| readonly        | Observes only: view, grep, query. Declared at registration; a tool is classed by the worst its arguments allow. |
| mutating        | Changes the workspace: edit, insert, shell.                                                                     |
| destructive     | Mutating and hard to undo: rm, drop, deploy.                                                                    |
| permission      | What the harness lets a tool touch: paths, hosts, commands. Enforced before the tool runs.                      |
| gate            | User approval required before a tool runs. Default for destructive.                                             |
| sandbox         | The boundary that contains a tool's effects: files, network, processes.                                         |
| grounding       | Workspace state the harness injects into context each turn.                                                     |

**Limits** (LIM)

Caps, and what is cut to fit them.

| Term       | Definition                                                                                                                           |
|------------|--------------------------------------------------------------------------------------------------------------------------------------|
| max_rounds | Hard cap on rounds per turn.                                                                                                         |
| budget     | Token, time or cost cap, scoped to a turn, run or session.                                                                           |
| truncate   | Cut one tool_result to fit. The full output stays in the sidecar.                                                                    |
| compact    | Replace the older part of the transcript in context with a summary. The replaced messages stay in the transcript and in the sidecar. |

**Failure** (FAIL)

How a turn goes wrong.

| Term    | Definition                                                                                      |
|---------|-------------------------------------------------------------------------------------------------|
| stall   | Rounds continue without progress. Reading counts as progress; repeating the same call does not. |
| runaway | A turn stopped by max_rounds or budget.                                                         |

**Recovery** (RECOV)

What follows a final.

| Term    | Definition                                                                                                   |
|---------|--------------------------------------------------------------------------------------------------------------|
| check   | Harness runs tests or lint after final and re-prompts on failure. Extends the turn.                          |
| review  | One extra call asking a model to inspect the result against the task. Same model, another agent, or a human. |
| handoff | Agent stops and passes the task and its context to the user or to another agent.                             |

**Kinds** (KIND)

An agent is named by its workspace.

| Term           | Definition                                                                           |
|----------------|--------------------------------------------------------------------------------------|
| coding agent   | workspace = repo; tools = view, grep, edit, shell.                                   |
| design agent   | workspace = canvas or artifact; tools = inspect, render, place, style.               |
| embedded agent | workspace = app data via the app's API; scope enforced by the app's access controls. |

## Context

What surrounds a thing and gives it its meaning: the sentence around a word,
the conversation around a message, the project around a file. The same
words mean different things in different contexts, so the context is read
first and the thing after.

For an AI model, the context is the context window: everything it reads
before it answers, counted in tokens. One call sends it whole: the system
message, the tool definitions, the transcript or its compacted form, the
grounding. The model has nothing else: what is not in the context does not
exist for it, and what falls out of it (compacted away, or left behind when
a session ends) is gone unless it was written down somewhere it will be
read again, a note, a file, a database.

![Context: system message, tool definitions, the transcript or its summary, grounding, sent whole to the model](../img/agents/context.svg)

## agent

![Agent: harness, model, tools and policy in one box, the workspace beside it](../img/agents/agent.svg)

## model

![Model: a context in, one message out, nothing remembered between calls](../img/agents/model.svg)

## harness

![Harness: the loop of building the context, calling the model, running the tools, appending, stopping](../img/agents/harness.svg)

## tool

![Tool: the definition the model sees, the implementation the harness owns](../img/agents/tool.svg)

## policy

![Policy: text the model reads; what must not happen is stopped by permission, gate and sandbox](../img/agents/policy.svg)

## skill

![Skill: instructions on a shelf, loaded into the context only when asked for](../img/agents/skill.svg)

## workspace

![Workspace: a repository, a canvas or an app database, what the tools act on](../img/agents/workspace.svg)

## user

![User: a person or an application starts a turn](../img/agents/user.svg)

## operator

![Operator: writes the policy, picks the model and tools, sets limits, deploys](../img/agents/operator.svg)

## call

![Call: one request to the model, inside a round, a turn, a session, a run](../img/agents/call.svg)

## round

![Round: one call plus the tool_calls it returned](../img/agents/round.svg)

## turn

One user message, or one scheduled task, through to its last final: one
round or many. The checks after a final belong to the same turn: when the
tests fail, the harness sends the failure back and the fixing goes on in
the same turn, so `max_rounds` and the budget cover it too (MP-60).

![Turn: one user message through to the final, one or many rounds](../img/agents/turn.svg)

## session

![Session: ordered turns sharing one transcript](../img/agents/session.svg)

## run

![Run: one launch of the harness, holding the session](../img/agents/run.svg)

## message

![Message: one unit of the transcript with its role](../img/agents/message.svg)

## transcript

![Transcript: every message so far, append-only](../img/agents/transcript.svg)

## sidecar

![Sidecar: the small message over the wire, the large payload kept by the harness](../img/agents/sidecar.svg)

## memory

![Memory: the transcript, notes, files and databases that outlive one context](../img/agents/memory.svg)

## system

![System: the message holding the policy, the tool definitions beside it](../img/agents/system.svg)

## tool_call

![Tool call: name, arguments and id, from the model to the harness](../img/agents/tool_call.svg)

## tool_result

![Tool result: output or error back to the model, paired by id, data not instructions](../img/agents/tool_result.svg)

## final

An assistant message with no tool_call. It ends the turn once the checks
after it pass; when a check fails, the failure goes back and another final
comes later in the same turn. A final says nothing about whether the task
succeeded. `final` is our name, not an API's (MP-60).

![Final: an assistant message with no tool_call ends the turn; its claim still needs a check](../img/agents/final.svg)

## stop_reason

Why a call ended: final, tool_call, max_tokens, refusal. These are our own
names; each API spells them its way. Anthropic's `stop_reason` says
`end_turn` for a final, `tool_use` for a tool_call, `max_tokens` and
`refusal`; OpenAI's `finish_reason` says `stop`, `tool_calls`, `length` and
`content_filter` (MP-60).

![Stop reason: final, tool_call, max_tokens or refusal](../img/agents/stop_reason.svg)

## tool_definition

![Tool definition: name, description and input schema](../img/agents/tool_definition.svg)

## input_schema

![Input schema: arguments that fit run, arguments that do not are refused](../img/agents/input_schema.svg)

## readonly

![Readonly: the three classes of tools, readonly highlighted](../img/agents/readonly.svg)

## mutating

![Mutating: the three classes of tools, mutating highlighted](../img/agents/mutating.svg)

## destructive

![Destructive: the three classes of tools, destructive highlighted](../img/agents/destructive.svg)

## permission

![Permission: a tool_call outside the allowed paths is refused before it runs](../img/agents/permission.svg)

## gate

![Gate: the harness asks the user before a destructive tool runs](../img/agents/gate.svg)

## sandbox

![Sandbox: files, network and processes inside the boundary, the machine outside it](../img/agents/sandbox.svg)

## grounding

![Grounding: the state of the workspace, injected into the context each turn](../img/agents/grounding.svg)

## max_rounds

![Max rounds: the seventh round never runs](../img/agents/max_rounds.svg)

## budget

![Budget: token, time and cost bars, scoped to a turn, run or session](../img/agents/budget.svg)

## truncate

![Truncate: one result cut to fit, the whole of it in the sidecar](../img/agents/truncate.svg)

## compact

![Compact: older messages replaced by a summary in the context, kept in the transcript](../img/agents/compact.svg)

## stall

![Stall: the same call five times, nothing moves](../img/agents/stall.svg)

## runaway

![Runaway: a turn stopped by the cap, not by a final](../img/agents/runaway.svg)

## check

The harness runs the tests or the linter after a final and, on a failure,
sends it back to the model. It extends the turn: the turn ends at the last
final, once the checks pass (MP-60).

![Check: tests run after the final; a failure goes back as another round](../img/agents/check.svg)

## review

![Review: one extra call reads the task and the result and gives a verdict](../img/agents/review.svg)

## handoff

![Handoff: the task and its context passed whole to the user or another agent](../img/agents/handoff.svg)

## coding agent

![Coding agent: workspace a repository, tools view, grep, edit, shell](../img/agents/coding_agent.svg)

## design agent

![Design agent: workspace a canvas, tools inspect, render, place, style](../img/agents/design_agent.svg)

## embedded agent

![Embedded agent: workspace app data through its API](../img/agents/embedded_agent.svg)
