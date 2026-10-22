# src

The ESLint preset: the plugin with the rulebook's own rules, and the
configuration a project lints with ([LINTING.md](../LINTING.md)).

- [plugin.js](plugin.js) — the ESLint plugin: every rule in [rules/](rules/README.md) under one name
- [make_rules_config.js](make_rules_config.js) — makes the configuration: which rules are on, for which files
- [style_processor.js](style_processor.js) — lets the rules read the `<style>` blocks of Vue components and stylesheets
- [rules/](rules/README.md) — one file per lint rule
- [helpers/](helpers/README.md) — what the rules share
