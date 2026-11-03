- the next thing to discuss: the history of actions
- there is a set of tables, a set of models; for these models there are
  always the so-called low-level records: post created, post updated, post
  deleted; there are no other kinds of these low-level ones
- every model has these low-level commands; they go into the history and
  are kept there; that is the first level
- above it, every such command is wrapped in a high-level command, a
  high-level request, which ideally can be traced without doubt: say we have
  a set of APIs, an API to create a folder, a banner, a post, anything
- what goes into the history is the call to that API, and it becomes the
  parent of everything that happens below it; below it, only low-level
  commands
- say the user creates a project that must hold at least one folder: in the
  history this is the high-level command to create the project, and inside
  it a low-level command adding the project to the database and a low-level
  command adding the folder
- in this example publish is really a high-level command, publish_post, and
  inside it post_updated, most likely, because the post must already exist
- post_created, post_updated, post_deleted with an underscore, publish_post
  with an underscore, folder_created with an underscore: that is more
  correct
- its name is api_publish_post: it was started through an API, some
  endpoint; when an API 2 comes, api2_publish_post
- in the example, name them all api2: api2_publish_post, api2_create_folder,
  to underline the idea
- the history of actions needs a page of its own; the approach with
  commands joins that page later; all of it is still research
- let's make a page System for it

# The history of actions

A system keeps a history of what was done in it, and the history has two
levels. Above, the command: the call that was made, written once. Below, its
records: what the call changed in the database, one row per change. Reading
the history, one sees what was asked for and everything it touched, and from
any change one step leads up to the call behind it.

## Three kinds of record

Every model writes three kinds of record, and only these: `post_created`,
`post_updated`, `post_deleted`. A record is named after its model and the
change, with an underscore, and stands for one row created, updated or
deleted.

Anything else is not a fourth kind of record but a command. Publishing a
post is the command `api2_publish_post`; what it changes in the database is
the post itself, which already exists, so its record is `post_updated`.

## Every record points up to its command

The command is written first: the call to an API that caused the changes,
named by its entry point, then by what it does. `api2_create_project` was
called through the second API; a call through another entry point carries
that one's name. Each record the call causes carries the command's id.

Creating a project that must hold at least one folder writes three rows:

```text
#1  api2_create_project
#2  project_created       parent #1
#3  folder_created        parent #1
```

## Two levels, always

Under a command there are only records; a record is never written without a
command above it, and a command never stands under another command. A call
that needs a folder created writes `folder_created` itself, under its own
command, rather than calling `api2_create_folder` as a step.

These rules stand on the [System](../docs/system.md) page, research still;
the approach with commands joins them there later.
