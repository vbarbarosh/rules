# Agents in this repository

This repository is the rulebook, and its own work follows it: the code,
the pages and the commits.

## How to work

Work the way the guides in [agents/](agents/README.md) say. Before a
change, read the rules that touch it in [the index](docs/rules.md).

## Commits

GIT-01 to GIT-05 in [the index](docs/rules.md), from
[drafts/commits.md](drafts/commits.md):

- The title is `scope: description`, all lowercase, 72 characters at
  most, scope included.
- A body only when it is really needed, after one blank line, short, in
  ordinary sentences. Every line of it wraps at 72 characters; a path, a
  URL or a command longer than that keeps a line of its own, whole.
- Before committing, count: no line of the message is over 72.

```
docs: the agents page has a picture for each guide

Consequences first: the task, its four what-if questions and what each
shapes. One example, all cases: only the shown dropdown fixed against
every case found.
```

## Build and checks

- `bin/build` writes `docs/rules.html`, `docs/animations.html`,
  `docs/glossaries.html`, `docs/agents.html`, `docs/diagrams.html` and
  `docs/apis.html` from their Markdown; run it after changing them.
- `npm run check`: lint, the unit tests, and the built pages unchanged.
- The browser tests: `node --test tests/browser/*.test.js`.
