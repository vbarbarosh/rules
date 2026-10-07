# The rulebook

The rules of [vbarbarosh/rules](../README.md), document by document. Every rule
is also in [the rule index](rules.html), one row each.

## Everything should look uniform

Explicit rules take priority when writing new code. Follow the surrounding
code only where no explicit rule applies.

Rules develop as the work makes the intended behavior, formatting and style
clearer, so existing code may predate them. A new rule does not require
rewriting that code; it can be refactored separately when there is an
opportunity.

If something isn't explicitly specified, it doesn't mean it's not important.
The naming of files, functions, CSS classes, formatting, and even the order of
attributes are all important and should follow the same systematic approach.
It's just not written down.

## Rules

- **[Linter setup and coverage](../LINTING.md)** — reusable ESLint rules for JavaScript, Vue classes, and CSS/Sass; run `bin/configure` to prepare the checkout, then `npm run check` to verify the implementation.
- **[docs/rules.html](rules.html) — every rule below, all 259 of them, in one filterable table**
- JavaScript formatting — [specification](../FORMATTING.md) · [visual representation](../formatting.html)
- Bash scripts — all scripts follow [bin/templ](../bin/templ), including strict mode, temporary-directory cleanup, diagnostics, and colored exit messages.
- [drafts/var_names.md](../drafts/var_names.md) — a variable name states the shape of its data
- [drafts/naming_markers.md](../drafts/naming_markers.md) — memo: all name markers, collected
- [drafts/for_of.md](../drafts/for_of.md) — prefer `for...of`; loop variable is the singular
- [drafts/for_i_end_ii_jj_kk.md](../drafts/for_i_end_ii_jj_kk.md) — cached loop bounds: `end`, `ii`, `jj`, `kk`
- [drafts/return_out.md](../drafts/return_out.md) — the constructed return value is named `out`
- [drafts/refresh.md](../drafts/refresh.md) — `refresh` and `refresh_*` sync local vars with remote data
- [drafts/format_xxx.md](../drafts/format_xxx.md) — `format_*` returns a string for human display
- [drafts/render_xxx.md](../drafts/render_xxx.md) — `render_*` derives a small value from own state
- [drafts/var_names_error.md](../drafts/var_names_error.md) — errors use `e` in arrows and `error` in regular handlers
- [drafts/var_names_time0.md](../drafts/var_names_time0.md) — the start time of a measurement is always named `time0`
- [drafts/var_names_event.md](../drafts/var_names_event.md) — events use `v` in arrows and `event` in regular functions; nested handler names
- [drafts/formatting_blocks.md](../drafts/formatting_blocks.md) — brace and layout catalog, construction by construction
- [drafts/imports_sorted.md](../drafts/imports_sorted.md) — the import block is a plain byte-order line sort
- [drafts/new_code_placement.md](../drafts/new_code_placement.md) — new code takes its place from its surroundings; a run of `render_*` stays unbroken
- [drafts/css_classes.md](../drafts/css_classes.md) — class attribute order, smcss utilities, what leads a rule block
- [drafts/cli_main.md](../drafts/cli_main.md) — an executable hands `main` to `cli(main)`
- [drafts/endpoint_comment.md](../drafts/endpoint_comment.md) — every route function carries a `METHOD /path (params)` comment
- [drafts/sql.md](../drafts/sql.md) — a MySQL query is laid out like code: upper-case keywords, top-level clauses on their own lines
- [drafts/interactions-should-return-only-boolean-flag.md](../drafts/interactions-should-return-only-boolean-flag.md) — modals and popovers act, then return a commit flag; the best practices for [vue-modal](https://github.com/vbarbarosh/vue-modal)
- [drafts/layout.md](../drafts/layout.md) — the fixed directory layout of a project; `bin/` holds its verbs
- [drafts/readme.md](../drafts/readme.md) — a README in one order: badges, cover, name, description, website, quick start, docs, license
- [drafts/page_header.md](../drafts/page_header.md) — every project page opens with one header: name and version on the left, theme switch and GitHub on the right
- [drafts/scroll_anchoring.md](../drafts/scroll_anchoring.md) — content the app changes on its own never moves what the reader is looking at; with a test
- [drafts/file_drop.md](../drafts/file_drop.md) — an element that takes files or folders through an input also takes them dropped onto it
- [drafts/no_confirmations.md](../drafts/no_confirmations.md) — trust the user: no "Are you sure?"; the action happens at once and can be undone
- [drafts/optimistic_updates.md](../drafts/optimistic_updates.md) — show local changes immediately over an immutable backend snapshot; confirm, refresh and reconcile, with safe retries
- [drafts/configure.md](../drafts/configure.md) — `bin/configure` asks every question up front, `sudo` included
- [drafts/data.md](../drafts/data.md) — `data/` is the project's permanent data; one mount keeps it in docker
- [drafts/value_label.md](../drafts/value_label.md) — selectable options are `{value, label}`
- [drafts/logs.md](../drafts/logs.md) — `[time][group_uid][sender] details`, one event per line · [cheatsheet](../drafts/logs-cheatsheet.html)
- [drafts/one_export_per_file.md](../drafts/one_export_per_file.md) — a file exports exactly one thing, as its last statement
- [drafts/theme_switch.md](../drafts/theme_switch.md) — every new UI carries a light/dark switch; two states, never System
- [drafts/audit_note.md](../drafts/audit_note.md) — a full audit goes to `notes/audit-<date>.md`; its register is the issue list
- [drafts/commits.md](../drafts/commits.md) — a commit title is `scope: description`, lowercase, 72 characters at most
- [drafts/WRITING.md](../drafts/WRITING.md) — a document has two halves: the author's top, the regenerated bottom
- [packaging/packaging.md](../packaging/packaging.md) — releasing a prebuilt `dist/` with `bin/release`
- [demos/](../demos/) — naming demos; `item_to.js` shows a superseded convention

## Vue 2

- [vue2/vue-formatting.md](../vue2/vue-formatting.md) — `v-on`/`v-bind` spelled out; attribute order
- [vue2/vue-globals.md](../vue2/vue-globals.md) — `px`, `uid`, `emit_input` mixin
- [vue2/vue-input.md](../vue2/vue-input.md) — what every input component must do
- [vue2/vue-form.md](../vue2/vue-form.md) — composing forms
- [vue2/vue-button.md](../vue2/vue-button.md) — one button, one class
- [vue2/vue-slider.md](../vue2/vue-slider.md) — thumb position is `0 .. 100%`
- [vue2/vue-svg-icon.md](../vue2/vue-svg-icon.md) — one `svg-icon-*.vue` per icon, `currentColor`
- [vue2/vue-components.md](../vue2/vue-components.md) — option order; `click_*` handlers named after the UI part

## Natural Pairs

- construct/destruct
- create/destroy
- open/close
- begin/end
- start/finish
- first/last
- next/previous
- get/put
- src/dest
- source/destination
- res/rej
- resolve/reject
- req/res
- request/response
- setup/teardown
- push/pull
- enabled/disabled
- import/export

## Glossaries

- **[docs/glossaries.html](glossaries.html) — every term below, in one filterable page**
- [glossaries/agents.md](../glossaries/agents.md) — vocabulary for developing agents: parts, roles, time, messages, tools
- [glossaries/testing.md](../glossaries/testing.md) — happy path, smoke tests, flaky tests, intermittent failures, showstoppers
- [glossaries/doc.md](../glossaries/doc.md) — vocabulary and glossary: the words about words

## Naming Grammar

Functions are verb phrases. Data are noun phrases. Each assignment
reads as a sentence — the verb performs, the noun holds:

```js
const users_by_role = users_group_by_role(users);
const items_sorted_by_time = items_sort_by_time(items);
```

### Data shapes

A variable name states the shape of its data:

| Name                   | Shape                  |                       |
|------------------------|------------------------|-----------------------|
| `users`                | `User[]`               | collection            |
| `user_by_id`           | `Record<id, User>`     | one per key           |
| `users_by_role`        | `Record<role, User[]>` | many per key          |
| `items_sorted_by_time` | `Item[]`               | same shape, reordered |

Plurality of the first word states lookup cardinality — what one key
returns, not how big the container is:

```js
user_by_id[id]                    // → User
users_by_role[role]               // → User[]
children_by_parent_id[parent_id]  // → Node[]
```

A bare `<noun>_by_<key>` is always data, never a function: it is read with
brackets, or with `.get()` when it is a `Map` — never called.

For invariant plurals (`fish`, `data`, `series`) cardinality cannot be
stated by plurality — fall back to `_grouped_by_` for many-per-key, or
prefer a countable noun. See [drafts/var_names.md](../drafts/var_names.md).

### Functions

A function name contains a verb or a function marker (`_from_`, `_to_`,
`_of_`, `is_`). The criterion follows the verb:

```js
users_index_by_id(users)     // → user_by_id
users_group_by_role(users)   // → users_by_role
items_sort_by_time(items)    // → items_sorted_by_time
```

Use `_from_` only when something is computed, parsed, or constructed —
result first, source last:

```js
user_from_token(token)
date_from_timestamp(ts)
tree_from_array(rows)
```

Never use `_from_` for lookup:

```js
user_from_id(id)   // wrong — lookup disguised as construction
user_by_id[id]     // right
```

### Summary

| Shape                 | Naming                       |
|-----------------------|------------------------------|
| Array                 | `users`                      |
| One per key           | `user_by_id`                 |
| Many per key          | `users_by_role`              |
| Reordered array       | `users_sorted_by_signup`     |
| Derived value         | `user_from_token(token)`     |

## Related

- [Naming is Hard: Let's Do Better - Kate Gregory - NDC TechTown 2024](https://youtu.be/aiy5TrU-Hwc?si=ns7DAQ2sXZcV7mj9&t=1179)
- https://github.com/WhiteHouse/api-standards
- https://spring.io/guides/gs/rest-service
- https://codeguide.co/
- https://github.com/erikthedeveloper/code-review-emoji-guide
