# Manually approved rules

Decisions explicitly approved by the author, kept outside AI-generated text.
When rewriting an AI explanation, read the author's source and the applicable
entries here. The rewritten explanation must retain their meaning and scope.

This file is maintained, never regenerated. Add or change an entry only after
an explicit author decision; record its scope, approval date and evidence.
An AI suggestion, an audit finding or text already present in an AI section
is not approval.

An approved entry may explicitly clarify or supersede older wording within
its stated scope. If the author source and an entry disagree without such a
ruling, report the conflict before rewriting; do not choose silently.

## MP-01 — Keep manual approvals outside regenerated text

**Scope:** [writing conventions](drafts/WRITING.md), rule explanations,
agent guides and glossary explanations.
**Approved:** 2026-10-07, author request `20261007_192855-me`.

Keep explicitly approved decisions in this file. Regenerate explanations from
the author source together with the applicable decisions. Preserve the
approval file and record any later author-approved change to a decision.

## MP-02 — Build output and released output

**Scope:** [project layout](drafts/layout.md),
[packaging](packaging/packaging.md), PROJ-04.
**Approved:** 2026-09-24;
[implementation](https://github.com/vbarbarosh/rules/commit/6521671).

`build/` is reproducible scratch output and is never committed. `dist/` is
released output and is committed at release time. The command that fills
`dist/` is decided in MP-32.

## MP-03 — Classes are allowed

**Scope:** class allowance in [FORMATTING.md](FORMATTING.md), FLOW-09 and lint.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-01.

Classes are allowed. The old class ban and LINT-05 are retired. The separate
rules about prototypes and shared-state mutation retain their own scope.

## MP-04 — Module formats belong to the consuming project

**Scope:** FILE-07, LINT-07, [LINTING.md](LINTING.md).
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-02.

Both module systems are covered. CommonJS-only is this repository's own rule
and the rule for node scripts; it is not imposed on every consuming project.

## MP-05 — Return the output variable unchanged

**Scope:** [return values](drafts/return_out.md), VAR-02/03/13.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-06.

The result variable governed by the `out` rule is returned as `return out;`,
exactly. A value joined, stringified or otherwise transformed on its way out
is named by what it is. A parameter, a loop variable or an outer value
returned unchanged keeps its own name (author's decision 2026-10-07,
C:RULES-60 and R:RULES-06).

## MP-06 — Four fields in a log line

**Scope:** [logging](drafts/logs.md), LOG-02.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-23.

A log line has four fields: time, group UID, sender and details.

## MP-07 — Function markers and lookup data

**Scope:** [naming markers](drafts/naming_markers.md),
[variable shapes](drafts/var_names.md), NAME-02/03/04/17/18.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-07/08/12.

A function name has a verb or a function marker: `_from_`, `_to_`, `_of_`,
`is_`. The listed verb-first families are exceptions to domain-first naming.
A bare `_by_` name is data and is never called; a Map is read with `.get()`.
Unresolved boolean-data and naming-family scope questions remain separate.

## MP-08 — Layout class order

**Scope:** [CSS classes](drafts/css_classes.md), CSS-02/04, LINT-08.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-05/35.

An item class such as `fluid` or `flex-noshrink` leads with `db` or `abs`.
A `gap*` closes the layout group: `flex* gap`, `grid* gap`, `hsplit gap`,
`vsplit gap`. Grid and flex do not share an element.

## MP-09 — Tiny arrows may have several parameters

**Scope:** [formatting blocks](drafts/formatting_blocks.md), LINT-03.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-33.

A tiny expression arrow may take any number of parameters. A block body is
not allowed. A lone parameter is taken whole, never destructured. Parameter
names follow the later callback decision in MP-14.

## MP-10 — Browser entry points call main directly

**Scope:** browser page scripts, [CLI entry points](drafts/cli_main.md).
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-44.

A browser script calls `main();`. `cli(main)` is for CLI applications;
there is no browser counterpart.

## MP-11 — Modal actions return a commit flag

**Scope:** [modal interactions](drafts/interactions-should-return-only-boolean-flag.md), FN-14.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day), RULES-13.

The modal rules are best practices for vue-modal: the interaction performs
the action and returns a boolean commit flag. `emit_end` is retired in favour
of `modal.return`.

## MP-12 — Preserve the author-identity history ruling

**Scope:** this repository's RULES-30 author-identity finding.
**Approved:** 2026-09-23;
[recorded author rulings](notes/audit-2026-09-23.md#10-status-at-the-end-of-the-day).

RULES-30 is won't-fix. Do not create a `.mailmap` or rewrite author history to
close that finding without a new author decision.

## MP-13 — Explicit rules take priority for new code

**Scope:** CORE-01, FILE-25, [new code placement](drafts/new_code_placement.md).
**Approved:** 2026-10-07;
[implementation](https://github.com/vbarbarosh/rules/commit/deba86e).

Explicit rules govern new code. Surrounding style fills unspecified details.
Existing code may predate a rule and can be refactored separately when there
is an opportunity.

## MP-14 — Callback and nested error names

**Scope:** VAR-05/09/16/17, LINT-03, callback lint rules and examples.
**Approved:** 2026-10-07;
[implementation](https://github.com/vbarbarosh/rules/commit/2b13985).

A lone value or DOM-event arrow parameter is `v`, nested by total arrow depth
as `vv`, `vvv`, and so on. Error arrows use `e` at every depth. Regular error
callbacks use `error`; regular DOM-event callbacks use `event`. Nested catch
bindings use `error2`, `error3`, and so on when nesting is inside a catch.
DOM error events follow event naming, not Error-callback naming.

## MP-15 — Optimistic updates

**Scope:** UI-18, [optimistic updates](drafts/optimistic_updates.md).
**Approved:** 2026-10-07;
[implementation](https://github.com/vbarbarosh/rules/commit/4d0cb22).

Keep backend snapshots immutable and local pending changes separate. Show an
intended change immediately and send its update. After acknowledgement,
reread the backend, replace the snapshot and clear only changes confirmed by
that result. Preserve later actions, reject stale refreshes and retry the
failed step safely.

## MP-16 — Agent guides are separate from code rules

**Scope:** [agent guides](agents/README.md), the code-rule index.
**Approved:** prior author decision recorded in the
[October 6 independent review](notes/review-2026-10-06-independent.md).

The guides describe how an agent works. They stay separate from the code-rule
index, which describes how the code looks.

## MP-17 — One shared current-theme icon pair

**Scope:** [theme switches](drafts/theme_switch.md), UI-02, all matching UI controls.
**Approved:** 2026-10-07;
[author recording](../notes/messages/20261007_193221-me/README.md).

Use the same SVG sun/crescent pair everywhere. Show the current theme: sun for
Light, crescent for Dark. One click toggles directly between those two states,
with no menu, System or Auto option. Size and border may follow the interface.
The selected pair is retained in `img/theme-sun.svg` and `img/theme-moon.svg`.

## MP-18 — Declare first, export the name last

**Scope:** FILE-20, [one export per file](drafts/one_export_per_file.md),
ES-module examples and controls that explain that rule.
**Approved:** 2026-10-07, author clarification `20261007_200654-me`.

Declare the helper or exported value separately above. Put
`export default name;` at the bottom as the last statement. Never combine
its declaration with the export. This approval settles placement and syntax;
it does not by itself settle the separate question of permitted export types.

## MP-19 — One public export may be a function, class, configuration or data

**Scope:** library/reusable modules, FILE-01/20/21/23 and FN-16.
**Approved:** 2026-10-07, author clarification `20261007_201355-me`.

Both the helper-function and settings/configuration examples are valid.
The rule is one public exported value, declared above and exported by name
last. Executable scripts export nothing; tool-shaped files follow the tool.
Class methods are allowed inside one exported class.

## MP-20 — Format and render are adjacent, distinct output families

**Scope:** [format](drafts/format_xxx.md), [render](drafts/render_xxx.md),
FN-01/05/09, naming examples and their presentation.
**Approved:** 2026-10-07, author clarification `20261007_201355-me`.

Format strictly returns a string to be shown to a person. Render constructs
asset content. Present the two definitions beside each other. Asset content
can also be a string; output purpose distinguishes it from human-facing text.
Do not invent `render_json()` usage to force a decision: the author has not
established that convention. Existing purity/delivery distinctions keep
their scope until separately changed.

## MP-21 — Time0 for elapsed measurements; start belongs to a pair

**Scope:** [timing names](drafts/var_names_time0.md), VAR-14/15, CORE-04.
**Approved:** 2026-10-07, author clarification `20261007_201355-me`.

An elapsed-time measurement uses time0. Outside that role, use start/finish
or begin/end when the corresponding pair is actually used. This is not an
absolute ban on start in other contexts or on externally defined API fields.

## MP-22 — Req/res is reserved for Express

**Scope:** CORE-04, route examples and request/response callbacks.
**Approved:** 2026-10-07, author clarification `20261007_201355-me`.

Req/res names the Express request/response pair only. Elsewhere use
request/response. Promise executor names are a separate pair, addressed by
MP-23 below.

## MP-23 — Keep res/rej for Promise executors

**Scope:** CORE-04, natural pairs, [file-drop Promise examples](drafts/file_drop.md).
**Approved:** 2026-10-07, author choice A in `20261007_203200-me`.

Res/rej is a valid abbreviation for Promise executor resolve/reject
callbacks. Keep that pair in the file-drop examples. The full names
resolve/reject remain valid too. Req/res is the separate Express
request/response pair under MP-22.

## MP-24 — Typing focuses the primary search and keeps the first character

**Scope:** [main search](drafts/main_search.md), UI-19, pages with one primary
search/filter input and their matching keyboard handlers.
**Approved:** 2026-10-07, author recording `20261007_203850-me`.

When no editable field has focus, typing immediately focuses the page's
main search/filter and puts the first typed character into it too. Local
inputs keep their own typing. A click or focus shortcut is not required.
The recording's initial autofocus is an example, not a separate requirement
to focus every search on page load.

## MP-25 — The first actionable list item is selected by default

**Scope:** [default list item](drafts/default_list_item.md), UI-20, lists
whose items are targets for an action.
**Approved:** 2026-10-07, author recording `20261007_203850-me`.

Select the first item in displayed order by default. Enter acts on it unless
the user explicitly selects another item. The recording's SQLite/LinkedIn
example demonstrates that the first result wins, even when a later one
looks like the intended match. An empty list has no action target.

## MP-26 — UI mechanics is a reusable rule category

**Scope:** the rule index and documentation navigation; interaction rules.
**Approved:** 2026-10-07, author clarification `20261007_204300-me`.

Use **UI mechanics** for how interfaces work, distinct from their appearance.
Place primary-search typing and default-item selection there, alongside
scroll anchoring, file drop, undo/confirmation and optimistic updates. Keep
existing rule IDs and deep links when organizing the rules into this category.

## MP-27 — Short objects stay on one line when they fit

**Scope:** FMT-11/13/15/18, [formatting](FORMATTING.md),
[formatting blocks](drafts/formatting_blocks.md) and their visual examples.
**Approved:** 2026-10-07, author choice A in `20261007_205159-me`.

Keep a short object literal on one line when it fits. Multiple fields alone
do not require a multiline layout. When size or nested structure requires
multiple lines, use one field per line and a trailing comma. Align the short
canonical example with this rule. This choice does not establish a numeric
line-width limit.

## MP-28 — Options-style methods are always function expressions

**Scope:** FMT-12, FLOW-11, LINT-03, [formatting](FORMATTING.md),
[formatting blocks](drafts/formatting_blocks.md), options-method examples and lint guidance.
**Approved:** 2026-10-07, author choice A in `20261007_210538-me`.

Options-style methods use function expressions, including methods whose body
only returns an expression and does not use this or arguments. The tiny-arrow
permission applies to callbacks and value factories, not these methods.
Keep the actual px method as a function expression. Native class-method
syntax keeps its existing scope.

## MP-29 — Px returns the string zero

**Scope:** px in [Vue global methods](vue2/vue-globals.md) and its examples.
**Approved:** 2026-10-07, author correction in `20261007_210538-me`.

The px helper returns ``value ? `${value}px` : '0'``. Its empty/zero branch is
the string '0', not numeric zero. Preserve this correction when rewriting
the example.

## MP-30 — A document without an author section is open to requested edits

**Scope:** DOC-03, DOC-05, DOC-12, [writing conventions](drafts/WRITING.md),
one-part documents such as the 15 drafts listed in C:RULES-101.
**Approved:** 2026-10-07, author choice A in `20261007_233143-me`.

A document with no author section, no notes of the author above the
boundary, is an ordinary file: the AI may edit it for the task the author
asked for. Where the author's section exists, it stays at the top of the
file and is never overwritten; only an explicit request of the author
changes it (DOC-03). When it is unclear where the author's section ends,
ask before editing.

## MP-31 — A glossary keeps the author's terms; the AI explains below them

**Scope:** DOC-13, [glossaries](glossaries/), the glossary builder in
`bin/build`, [writing conventions](drafts/WRITING.md).
**Approved:** 2026-10-07, author choice B in `20261007_233717-me`.

Text the author wrote by hand, or text explicitly marked as fixed, is never
rewritten; the AI may only add its own below it. AI text not marked as fixed
may be rewritten or paraphrased.

In a glossary, the title, its note, the group lines and the term list, all
before the first `## ` section, are the author's. Each `## ` section is the
AI's explanation of a term, regenerated from the author's line and the
applicable approved entries. A new term in the author's list needs the
author's request.

## MP-32 — Release runs the one build, then copies it

**Scope:** PROJ-03, PROJ-04, REL-02, [project layout](drafts/layout.md),
[packaging](packaging/packaging.md); completes MP-02.
**Approved:** 2026-10-07, author choice A in `20261007_234134-me`.

A project has one build command, `bin/build` (`npm run build`), and it
writes `build/`. `bin/release` makes the release from it: it runs that same
build, may pass it flags or environment variables, and may clear the output
directory first; then it copies `build/` into `dist/`. There is no second
build command for releases.

## MP-33 — data/ is what the app writes; config/ makes the configuration

**Scope:** PROJ-05, PROJ-06, PROJ-07, PROJ-18, PROJ-19,
[project layout](drafts/layout.md), [data](drafts/data.md).
**Approved:** 2026-10-07, author answer in `20261007_234755-me`.

`data/` is where the application writes its data: whatever it writes and
keeps goes there.

`config/` is the one central place of the application's configuration.
`config/index.js` reads the environment variables, may load files, and gives
the application its configuration ready to use; code reads it as
`require('../config')`. [authwall](https://github.com/vbarbarosh/authwall/tree/main/config)
is the example: `index.js` exports `make_config(process.env)`, and
`make_config.js` checks each value and resolves the paths into `data/`.
This clarifies "populated once" in the layout notes: `config/` is the
project's code, and what differs from one install to another comes from the
environment.

`.env` is not the application's; it belongs to whoever runs it, and these
rules set nothing for it. Usually docker loads it, or the variables are set
in the Dockerfile.
