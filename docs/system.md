# System

How a system is built: the history of actions, a command above and its
records under it; and a system as commands, each run like a function, a
system above calling them. Research still: these rules settle here, apart
from the rules of the code.

9 rules · 2 groups · 2 sources · filterable version: [system.html](system.html)

The rules of the code are in [rules.md](rules.md); these keep their codes
while they settle.

| Tag | Group | Rules | |
|-----|-------|------:|---|
| HIST | The history of actions | 3 | A command above, its records under it. |
| CMD | A system as commands | 6 | Small commands, each like a function; a system above calls them. |

| Code | Rule | Canonical form | Source |
|------|------|----------------|--------|
| **HIST** | **The history of actions** — A command above, its records under it. | | |
| HIST-01 | **Every model writes three kinds of record: created, updated, deleted.** One row per change in the database, named after the model, `post_created`; no other kind at this level: publishing a post is a command, `api2_publish_post`, and its record is `post_updated`. | ![Left, post_published crossed out as a fourth kind; right, post_created, post_updated and post_deleted, and api2_publish_post as a command with post_updated under it](../img/rules/hist_three_kinds.svg) | [history.md](../drafts/history.md) |
| HIST-02 | **Every record points up to its command, named by its entry point.** The call that caused the change is written first, `api2_create_project`, `api2_publish_post`; each record it causes carries its id. | ![api2_create_project with project_created and folder_created under it; stored as three rows, the two records pointing up to #1](../img/rules/hist_points_up.svg) | [history.md](../drafts/history.md) |
| HIST-03 | **Two levels, always.** Under a command only records: never a record without one, never a command under a command. | ![A record under an empty place and a command inside a command, crossed out; a command with its two records under it](../img/rules/hist_two_levels.svg) | [history.md](../drafts/history.md) |
| **CMD** | **A system as commands** — Small commands, each like a function; a system above calls them. | | |
| CMD-01 | **A system is its commands first.** Each thing it does is one command: a name, an input, an output; it starts, does its work and ends; run, read and debugged alone. | ![Left, one big app, its parts tangled, to change one thing read all of it; right, six small commands, each with what it takes and returns, under the system above that calls them](../img/rules/cmd_small_blocks.svg) | [commands.md](../drafts/commands.md) |
| CMD-02 | **The app above calls the commands; they never call one another.** It picks a command, packs its arguments, calls it and passes the result on. A command takes its arguments, runs as often as needed, and is read apart from the rest. | ![Two chains: transcribe, voice.txt, summarize, summary.json, aloud, reply.mp3, with transcribe calling summarize crossed out; run-build, the CI, refresh-builds, builds.json, the Builds page; above each command what starts it](../img/rules/cmd_called_from_above.svg) | [commands.md](../drafts/commands.md) |
| CMD-03 | **Every command is drawn.** One picture per command, what goes in and what comes out, and one of how they connect; made with the command, kept beside it. | ![An app as its commands by family, refresh, act, make, check and maintain, a card per command with what it takes and leaves](../img/rules/cmd_catalogue.svg) | [commands.md](../drafts/commands.md) |
| CMD-04 | **Any command runs by hand at any time.** The system is built on it: called whenever, the command reads the state and does what is left; nothing breaks. | ![refresh-builds called at night, mid-work or twice in a row ends each time; nothing done, it does it all, half done the rest, all done nothing](../img/rules/cmd_any_time.svg) | [commands.md](../drafts/commands.md) |
| CMD-05 | **The pages that depend on a command know it runs.** They show its progress from the file it writes, and offer to start it again. | ![refresh-builds writes progress.json; the Builds page reads it and shows the run in progress, 2 of 3, with a Restart](../img/rules/cmd_pages_know.svg) | [commands.md](../drafts/commands.md) |
| CMD-06 | **A command that runs one at a time guards itself.** A second call sees the first and ends with an error that says so; the caller need not think of it. | ![The first call takes its lock and runs; a second call meanwhile ends with already running, the first call holds the lock, exit 1](../img/rules/cmd_guards_itself.svg) | [commands.md](../drafts/commands.md) |
