# System

How a system is built: first, the history of actions, a command above and
its records under it. Research still: these rules settle here, apart from
the rules of the code, and the approach with commands joins them later.

3 rules · 1 group · 1 source · filterable version: [system.html](system.html)

The rules of the code are in [rules.md](rules.md); these keep their codes
while they settle.

| Tag | Group | Rules | |
|-----|-------|------:|---|
| HIST | The history of actions | 3 | A command above, its records under it. |

| Code | Rule | Canonical form | Source |
|------|------|----------------|--------|
| **HIST** | **The history of actions** — A command above, its records under it. | | |
| HIST-01 | **Every model writes three kinds of record: created, updated, deleted.** One row per change in the database, named after the model, `post_created`; no other kind at this level: publishing a post is a command, `api2_publish_post`, and its record is `post_updated`. | ![Left, post_published crossed out as a fourth kind; right, post_created, post_updated and post_deleted, and api2_publish_post as a command with post_updated under it](../img/rules/hist_three_kinds.svg) | [history.md](../drafts/history.md) |
| HIST-02 | **Every record points up to its command, named by its entry point.** The call that caused the change is written first, `api2_create_project`, `api2_publish_post`; each record it causes carries its id. | ![api2_create_project with project_created and folder_created under it; stored as three rows, the two records pointing up to #1](../img/rules/hist_points_up.svg) | [history.md](../drafts/history.md) |
| HIST-03 | **Two levels, always.** Under a command only records: never a record without one, never a command under a command. | ![A record under an empty place and a command inside a command, crossed out; a command with its two records under it](../img/rules/hist_two_levels.svg) | [history.md](../drafts/history.md) |
