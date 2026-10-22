# bin

The project's verbs: each file a command, run from anywhere in the checkout.

- [configure](configure) — sets up a fresh checkout, and again after `git pull`: installs the locked dependencies, the development tools included
- [build](build) — writes the pages in `docs/` from their Markdown and templates: the rules, animations, glossaries, agents, diagrams and APIs pages
- [lint](lint) — runs the rulebook's ESLint preset over the paths it is given
- [test](test) — runs the unit tests (`npm test`)
- [self-check](self-check) — the dashboard: one lamp per thing the project needs (node, Chromium for the browser tests, the pages the build writes); changes nothing
- [templ](templ) — the template a new command in `bin/` starts from
