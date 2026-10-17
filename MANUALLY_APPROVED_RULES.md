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

**Scope:** FILE-17, LINT-07, [LINTING.md](LINTING.md).
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

**Clarified:** 2026-10-08 by MP-40, `is_` is not a function marker; `check_` is.

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

**Scope:** UIM-10, [optimistic updates](drafts/optimistic_updates.md).
**Approved:** 2026-10-07;
[implementation](https://github.com/vbarbarosh/rules/commit/4d0cb22).

Keep backend snapshots immutable and local pending changes separate. Show an
intended change immediately and send its update. After acknowledgement,
reread the backend, replace the snapshot and clear only changes confirmed by
that result. Preserve later actions, reject stale refreshes and retry the
failed step safely.

## MP-16 — Agent guides are separate from code rules

**Scope:** [agent guides](agents/README.md), the code-rule index.
**Approved:** before 2026-10-06, a prior author decision recorded in the
[October 6 independent review](notes/review-2026-10-06-independent.md).

The guides describe how an agent works. They stay separate from the code-rule
index, which describes how the code looks.

## MP-17 — One shared current-theme icon pair

**Scope:** [theme switches](drafts/theme_switch.md), UI-02, all matching UI controls.
**Approved:** 2026-10-07, author recording `20261007_193221-me`.

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

**Scope:** [main search](drafts/main_search.md), UIM-11, pages with one primary
search/filter input and their matching keyboard handlers.
**Approved:** 2026-10-07, author recording `20261007_203850-me`.

When no editable field has focus, typing immediately focuses the page's
main search/filter and puts the first typed character into it too. Local
inputs keep their own typing. A click or focus shortcut is not required.
The recording's initial autofocus is an example, not a separate requirement
to focus every search on page load.

## MP-25 — The first actionable list item is selected by default

**Scope:** [default list item](drafts/default_list_item.md), UIM-12, lists
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

The release steps, confirmed in `20261007_235933-me`: `rm -rf build`,
`npm run build`, `rm -rf dist`, `cp -r build dist`.

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

## MP-34 — A release commit is titled release: v1.2.3

**Scope:** REL-02, GIT-01, [packaging](packaging/packaging.md).
**Approved:** 2026-10-08, author answer in `20261008_000619-me`.

A release commit is titled `release: v<version>`, for example
`release: v5.57.6`: `release` is the scope, so the title follows GIT-01 with
no exception. Vue and Vite title their releases the same way.

## MP-35 — An elapsed time shown to a person goes through format_duration

**Scope:** VAR-14, FN-02, [time0](drafts/var_names_time0.md),
[format](drafts/format_xxx.md).
**Approved:** 2026-10-08, author decision A in `20261008_225915-me`.

The current time minus `time0` is a measurement, a number. Whatever is
presented to a person is formatted for its context by a `format_*` helper,
here `format_duration`; a raw number with a unit at the call site is a
missed call. The author's reason: a display that reads "5 minutes" reads
"240 minutes" once the job grows, where hours were wanted; the helper picks
the shape, `1h 23m 33s` or a clock's `00:02:15`, with hours only when there
are hours, and every call site shares it.

## MP-36 — render always returns; a DOM update is refresh_<what>

**Scope:** FN-05, FN-08, FN-10, [render](drafts/render_xxx.md),
[refresh](drafts/refresh.md).
**Approved:** 2026-10-08, author voice comment in `20261008_230106-me`.

`render_*` always returns its result, as a computed value does. A function
that brings a part of the page up to date returns nothing and is not a
render: it is `refresh_<what>` (`refresh_dom`, `refresh_theme_labels`), the
refresh button turned on one part of the page. The author weighed a `sync_`
prefix (`sync_dom`, `sync_time`, `sync_backend`) and settled on `refresh`,
the family that already exists.

## MP-37 — Side-effect imports sit at the very top, in run order

**Scope:** FLOW-10, FILE-11, LINT-06, [imports](drafts/imports_sorted.md).
**Approved:** 2026-10-08, author voice comment in `20261008_230323-me`.

Side-effect imports, the bare `import './x'` blocks, sit at the very top of
the file, in the order they run. That is FLOW-10's one visible exception to
"no reliance on execution-order side effects": the reliance is declared in
the first lines, where it is seen, and nowhere else.

## MP-38 — A module may own its state

**Scope:** FLOW-09, [FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-08, author voice comment in `20261008_230442-me`.

A module may keep its own state and act as a singleton over its data,
written only by its own functions; the editor and the dashboard are full of
such modules. "Shared state" in FLOW-09 means state shared across modules:
one module reaching into another's is what is forbidden.

## MP-39 — Commit titles aim for 70, 72 as the rule, 75 rarely

**Scope:** GIT-03, [commits](drafts/commits.md).
**Approved:** 2026-10-08, author voice comment in `20261008_230600-me`.

A title aims for 70 characters and stays within 72; in a rare, special case
a little more is allowed, up to 75. It is not a hard rule: titles are short,
and the numbers are guidance, not a floor. The author's "70-72 in all" is a
target, not a minimum.

**Superseded:** 2026-10-11 by MP-50, the title 72 at most, the body too.

## MP-40 — is_ names a boolean, predicate or data; check_ reads as a call

**Scope:** NAME-02, NAME-15, [naming markers](drafts/naming_markers.md).
**Approved:** 2026-10-08, author voice comment in `20261008_231532-me`.

`is_` is not a function's privilege. It names a boolean: a predicate that
returns one, `is_ancestor(a, b)`, or data that holds one, `is_open`; a
plain `open` or `ready` is as good where it is clearer. When a check must
read as a call, the verb `check_` says so: `check_status()`,
`check_rating()`. This closes the audit's Boolean names question with B, and
replaces the earlier reading that `is_` meant "call me".

## MP-41 — Right of the header: the theme switch, then GitHub

**Scope:** UI-08, [page header](drafts/page_header.md).
**Approved:** 2026-10-08, author decision A in `20261008_233947-me` ("let it
stay like this for now").

The two controls at the right end of the header are, left to right, the
theme switch and then the GitHub icon in the corner, the same on every page.
The author's note "to decide" in the top half of page_header.md is answered
by this entry; the note itself is the author's to change.

**Superseded:** 2026-10-09 by MP-44, the theme switch last.

## MP-42 — The SQL rules are MySQL's

**Scope:** the SQL group, SQL-03, [sql](drafts/sql.md).
**Approved:** 2026-10-08, author decision A in `20261008_234451-me` ("I work
with MySQL; this is specifically for MySQL").

The SQL group is MySQL: the group says so, and every canonical form is valid
MySQL. A `CREATE INDEX` takes no `WHERE` (no partial indexes; a generated
column with a unique index does the same), and `DROP INDEX` names its table
with `ON`. The two examples in the author's half of sql.md that say
otherwise are the author's to amend.

## MP-43 — The UI mechanics rules are coded UIM

**Scope:** the UIM group, the rule index header.
**Approved:** 2026-10-08, author comment in `20261008_234958-me` ("why UIM
there and UI here; they should all be UIM").

The rules of the UI mechanics group carry the group's own code: UI-09 to
UI-20 are UIM-01 to UIM-12. A link to an old code still opens the rule: the
page redirects it. A code still never changes when a rule moves between
existing groups; a group of its own is the one case that gets new codes.

## MP-44 — Right of the header: the links, then the theme switch last

**Scope:** UI-06, UI-08, [page header](drafts/page_header.md); supersedes
MP-41.
**Approved:** 2026-10-09, author request `20261009_231222-me` ("the theme
switch must be at the very end, and GitHub goes before it"), with the reason
to be kept in the explanation (`20261009_231249-me`).

The right end of the header holds, left to right, the project's links and
then the theme switch, always last, at the right edge, the same on every
page. The links are the GitHub icon and, when the project has them, others
such as Twitter or Facebook. Why: there may be several links and their
number differs between projects; after all of them, the theme switch keeps
one place on every page.

## MP-45 — The header icons look alike

**Scope:** UI-08, [page header](drafts/page_header.md),
[theme switch](drafts/theme_switch.md) in a page header.
**Approved:** 2026-10-09, author comment in `20261009_232540-me` ("all the
icons should be in one style, in the same sizes").

The icons at the right end of the header, the links and the theme switch,
share one look: the same size, the same colour, no frame on any of them.
The switch's freedom of size and border (MP-17) yields to this in a header.

## MP-46 — An empty function stays on one line

**Scope:** FMT-32, FMT-04, LINT-03, [formatting](FORMATTING.md),
`block-layout`, `tiny-arrows`.
**Approved:** 2026-10-10, author voice comment in `20261010_005629-me`
("function () {} is, in effect, ignore; such a construct is acceptable; the
second variant is bad at all") and `20261010_005904-me` (the same for an
empty arrow, "sometimes I write it so, to be shorter").

An empty function expression, `function () {}`, and an empty arrow,
`() => {}`, are a no-op, as `ignore` is, and stay on one line. Splitting the
braces over two lines is wrong. The arrow is allowed, not required.

## MP-47 — out only for `return out;`; generic names have one meaning

**Scope:** VAR-02, VAR-13, VAR-18, [return values](drafts/return_out.md),
[generic names](drafts/generic_names.md), `return-out`; clarifies MP-05.
**Approved:** 2026-10-10, author voice comments in `20261010_015447-me`
("return out, if it is just return out; if a condition or the ?: operator
follows, out is not needed there; then give them normal names") and
`20261010_015542-me` (a small page of generic names, each with one meaning:
`i`, `j`, `k` in a `for`, `v` in small arrows, `out` only for `return out;`,
"if it is really returned").

`out` is the variable returned as `return out;` and nothing else. A value
returned on a condition or transformed on its way out gets a name of its own.
Each generic name has one meaning, listed on one page.

**Clarified:** 2026-10-13 by MP-77, `res` has two meanings, one in each of
its pairs, `req/res` and `res/rej`.

## MP-48 — A piece shown in two places is one component

**Scope:** VUE-20 to VUE-24, [Vue components](vue2/vue-components.md).
**Approved:** 2026-10-10, author message `20261010_230651-me` (a rule from
the notes app: "Badges: one component each, named badge-*") and voice
comment `20261010_230718-me` ("this note is about components: how to split
an app into components, how to represent it as components").

Each badge is a Vue component of its own, named `badge-<what it says>`, never
a `<span>` with the same classes copied into every place. What changes goes
in as a parameter, a variant is a suffix, one Sass mixin gives all of them
one look and each sets only its own colours. The badge is the example of the
wider rule: an app is split into components, one per piece it shows in more
than one place.

## MP-50 — A commit title is 72 characters at most, its body too

**Scope:** GIT-03, GIT-05, [commits](drafts/commits.md).
**Approved:** 2026-10-11, author message and voice comment
`20261011_143005-me` ("about 72 characters in all; the description below
should aim for 72 too"), over a title and a body of that width, and voice
comment `20261011_143613-me` ("set it to 72; the subject 72 in all, and the
body aims for 72 too").

A title stays within 72 characters, scope included: the 70 to aim for and
the 75 of a rare case in MP-39 are gone. Every line of the body is held to
72 as well, broken between words. MP-49 was held for a proposal the author
set aside on 2026-10-11; the number stays unused.

**Clarified:** 2026-10-13, voice comment `20261011_143613-me` ("the body
too, we aim at 72"), the audit's question 19 settled by it as answer B:
the quotes above are the author's words. The author's half of
`drafts/commits.md` still reads "is held to 72 characters too"; it changes
only on the author's word (DOC-03). The rule does not change.

## MP-51 — A doc GIF shows its time and its progress, at 30 fps

**Scope:** DOC-14, [GIFs in the docs](drafts/gifs.md).
**Approved:** 2026-10-11, voice comment `20261011_214702-me` ("in a GIF
there must be the time, as it goes, 0, 1, … 30 frames a second; and at the
top a small bar that shows the progress; these two are a must"), and
author message `20261011_220943-me` ("This is it, require 30 fps,
re-record scroll-anchoring") over the four GIFs stamped with both.

Every GIF in the docs is recorded at 30 frames a second. It shows its time
from 0 at its first frame in a corner, and a thin bar along its top edge
that fills as it plays; both start again when it loops.

## MP-52 — A script starts from bin/templ; its header always stays

**Scope:** PROJ-15, [templ](bin/templ).
**Approved:** 2026-10-12, voice comment `20261012_201923-me` ("this
template is a template: you start from it and throw away everything you
don't need; one exception: the header always stays, just the header and
the variables script, scriptdir, scriptname at the very start, where they
are assigned; everything else is thrown away"), after an agent fitting a
project to the rules copied the template's four `echo` lines into every
script.

A bash script begins as a copy of `bin/templ`. Its header and the
`script`, `scriptdir` and `scriptname` lines are kept in every script;
everything after them (the colors, the exit message, the temporary
directory and its trap, the `echo` lines) stays only where the script
uses it.

## MP-53 — A file and its export carry one name; the preset is made by make_rules_config

**Scope:** FILE-20, FILE-24, [src/make_rules_config.js](src/make_rules_config.js).
**Approved:** 2026-10-12, voice comment `20261012_202926-me` ("whatever
the file is called, the export must have the same name; a file called
config.js exporting rules_config is wrong; 100%") and voice comment
`20261012_203025-me` ("rules_config is a very bad name; make_rules_config
or make_config is better; rename the file accordingly").

A file is named after the one value it exports, with no exception for a
file shaped by a tool: `src/config.js` exporting `rules_config` became
`src/make_rules_config.js` exporting `make_rules_config`. A function
that builds a value is named for making it. The package path
`@vbarbarosh/rules/config` stays, pointing at the new file, so projects
that load it keep working.

**Clarified:** 2026-10-13, voice comment `20261012_202926-me` ("whatever
the file is called, the export must have the same name"), the audit's
question 21 settled by it as answer A: a file whose shape a tool sets has
no exception either. `src/index.js`, which exports `plugin`, becomes
`src/plugin.js`, and `package.json` points at it. The rule files in
`src/rules/` keep their shape: MP-57 names a rule's function after its rule
id, and nothing there is renamed. FILE-20's "tool-shaped files follow the tool" is about the
export's shape, or a file whose name the tool fixes, as `eslint.config.js`.

## MP-54 — build/ is never committed; nothing more

**Scope:** PROJ-04, [project layout](drafts/layout.md).
**Approved:** 2026-10-12, voice comment `20261012_203743-me` ("there is no
exception here: build/ and everything inside is never committed; build/ is
a temporary directory for the build, it does not go into the repository;
so there is no contradiction, the rule was badly written"), answering the
audit's question whether the committed `docs/*.html` are an exception, and
voice comment `20261012_204118-me` ("what bin/build builds it puts into
build/; build/ is temporary, it does not go into git; nothing more; and if
we then take something from build/ into git, fine, we decided so").

PROJ-04 says two things: `bin/build` puts what it builds into `build/`;
`build/` is temporary, and it and everything in it are never committed.
Taking something out of `build/` into the repository is a decision of its
own, as `bin/release` does with `dist/`; the committed `docs/*.html` are
such a decision, not an exception.

## MP-55 — Nothing jumps: the working item of a list stays put

**Scope:** UIM-01, ANIM-07, [scroll anchoring](drafts/scroll_anchoring.md).
**Approved:** 2026-10-12, voice comment `20261012_204324-me` ("don't
overdo it; I meant containers first of all, a list or a grid; you work
with an item, and the system adds items above, below, left or right of
it; the item the user works with must not jump; something hiding in one
place and showing in another as I scroll is outside this rule; within
limits, of course"), answering the audit's question whether the docked
switches that push the rule count break UIM-01.

UIM-01 holds for the item the reader works with in a list or a grid: the
one selected or being looked at stays where it is while the app adds,
removes or grows items around it, as far as the list's ends allow. A
control that docks, hides or shows as the page scrolls is outside it; the
docked switches pushing the count are not a breach.

## MP-56 — A configuration value at the top is UPPER_CASE

**Scope:** VAR-19.
**Approved:** 2026-10-12, voice comment `20261012_205326-me` ("UPPER_CASE
consts are at the top level, the module's; a lowercase const at the level
of a function, of a block; such simple rules") and voice comment
`20261012_205635-me` ("imports are a separate case; the UPPER_CASE const is
when you need a variable for configuration, some global name; the imports
don't fall under this rule at all"), answering the audit's question how
constants are spelled.

A constant a module keeps as configuration, a global name for a value set
in the code, is written in upper case at the module's top level. A `const`
inside a function or a block is lower case. Imports are not covered.

## MP-57 — A linter rule's function is named after its rule id

**Scope:** NAME-02, [naming markers](drafts/naming_markers.md), `src/rules/`.
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 1, answer B ("Keep the names;
write the exception down").

The function of a linter rule is named after its rule id, as ESLint does:
`block_layout(context)` for the rule `block-layout`. It needs no verb and
no function marker; NAME-02 names the exception. Nothing in `src/rules/`
is renamed.

## MP-58 — A step of a script is what main() calls once, in order

**Scope:** NAME-17, NAME-18, [formatting](FORMATTING.md).
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 3, answer A ("Define a step; the
examples stay").

A step is a function `main()` calls once, in order, to do one part of the
work; it may start with its verb, as `build_glossaries_html()` does in
`bin/build`. A verb-first name that is not a step is renamed to the domain
first when it is next touched; the examples in the documents stay.

**Clarified:** 2026-10-13, author message `20261013_113227-me` (the audit's
answers), answer 22A ("Yes, still a step: MP-58 says \"once per part of the
work\""): a step is a function `main()` calls once per part of the work, in
order. `build_index_html()`, called once for each page `bin/build` writes,
is a step; `bin/build` stays as it is.

## MP-59 — A page made only to be photographed keeps no theme switch

**Scope:** UI-01, [theme switch](drafts/theme_switch.md), the render sources
`drafts/file-drop.html`, `drafts/no-confirmations.html`,
`drafts/optimistic-updates.html`, `drafts/readme-structure.html`,
`drafts/dead-controls.html`, `drafts/return-out.html`.
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 7, answer A ("Exempt them").

A page made only to be photographed for a rule's picture, opened once as
is and once with `?dark` and saved as two PNGs, keeps no switch. Its dark
mode is the same `data-theme` the other pages use, no longer an
`html.dark` class of its own. A page that becomes a demo people open gets
the switch.

## MP-60 — A failed check extends the turn; final and tool_call are our names

**Scope:** [agents glossary](glossaries/agents.md): turn, final,
stop_reason, check.
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 8, answer A ("A failed check
extends the turn; our own names").

The turn ends at the last final, once the checks after it pass; a failed
check sends the failure back and the fixing stays in the same turn, so
`max_rounds` and the budget cover it. `final`, `tool_call`, `max_tokens`
and `refusal` are our own names: Anthropic says `end_turn`, `tool_use`,
`max_tokens`, `refusal`; OpenAI says `stop`, `tool_calls`, `length`,
`content_filter`.

## MP-61 — The unused logo is deleted

**Scope:** `img/logo-by-chat-gpt.png`.
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 10, answer A ("Delete it").

The 1.4 MB logo nothing linked is deleted; git history keeps it.

## MP-62 — Error Flood stays provisional

**Scope:** TEST-06, [testing glossary](glossaries/testing.md).
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 11, answer B ("Mark it
provisional").

Error Flood keeps the author's working note; the Glossaries page shows it
as provisional, not defined yet, until the author defines it.

## MP-63 — The SQL examples in the author's half are MySQL

**Scope:** [SQL](drafts/sql.md), SQL-03, MP-42.
**Approved:** 2026-10-12, author message `20261012_210404-me` (the quiz answers), question 14, answer A ("Correct them").

The partial-index example, a `CREATE UNIQUE INDEX` with a `WHERE`, is
dropped: the next example reaches the same end the MySQL way, with a
generated column. `DROP INDEX` names its table with `ON user_identities`.

## MP-64 — A narrowing box covers its extra words; no fade

**Scope:** ANIM-10, [animations](drafts/animations.md).
**Approved:** 2026-10-12, voice comment `20261012_213743-me` ("ours is
right, narrows and fades at once; one thing: the fade is not needed here,
it is extra, because when the element shrinks it covers the letter, the
text that disappears; the fade is extra, for this case"), answering the
morphing quiz's question 4 against the Visual Agency rule 4.

When a pill or another box with words is shorter in the other layout, it
narrows and its edge covers the words that go; they are not faded.

## MP-65 — What one state only has fades over the whole move; at a list's end the view settles in the same frames

**Scope:** ANIM-07, ANIM-10, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answers 3A ("what exists in one state only fades, over
the whole movement; never whole on one frame and gone the next") and 8A
("near an edge, the view settles in the same frames, never after").

A part that only one layout has fades from the first frame of the movement
to the last, both ways, instead of early on folding and late on opening.
Where a list's end keeps the place from holding, the view comes down during
the move, frame by frame, and is still when the move ends.

## MP-66 — A moving part lands exactly

**Scope:** ANIM-12, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answer 6A ("measure the destination as it will really
be, lay it out unseen first, so the arrival is exact to the sub-pixel; no
hop at the end").

Each moving part is measured where it will be before it moves, so its last
frame is the still state.

## MP-67 — New things arrive whole

**Scope:** ANIM-13, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answer 9A ("content comes in its first frame with every
tag and badge it will have, at its final height; nothing fills in
afterwards").

A new row or message arrives as it will stay, its tags and badges on it,
at its final height; nothing fills in or grows after it lands.

## MP-68 — Growing goes through the heights between

**Scope:** ANIM-14, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answer 10A ("a container is shut before its content goes
in: never drawn whole for a frame, then grown from nothing").

A section that opens grows through every height between closed and full,
its content clipped inside; closing is the same, backwards.

## MP-69 — The chosen highlight glides in its final colours

**Scope:** ANIM-15, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answer 13A ("the chosen highlight glides in its final
colours; no in-between grey on arrival").

The selection highlight keeps the colours it ends in from the first frame
of its movement to the last.

## MP-70 — The speed stays; reduced motion and frame tests stay out

**Scope:** ANIM, [animations](drafts/animations.md).
**Approved:** 2026-10-12, author message `20261012_214214-me` (the morphing
quiz's answers) on the rules forwarded from Visual Agency in
`20261012_210127-me`: answers 11B (the speed stays 400 ms, eased out, over
160–320 ms by distance eased at both ends), 14B (less motion when asked:
left out) and 15B (checked by frames, not by eye: left out).

The animations keep one duration, 400 ms, and the easing
`cubic-bezier(.2, .8, .2, 1)`. No rule asks for reduced motion or for a
frame-by-frame test of each morph; the forwarded rules 11, 14 and 15 are
not taken.

## MP-71 — req and res stay

**Scope:** VAR-18, [generic names](drafts/generic_names.md).
**Approved:** 2026-10-13, voice comment `20261013_000325-me` ("req, res are
good established two variables that are always used together, and from
which it is always clear what is what; they should stay"), and
`20261013_001620-me` ("✅ accepted") on the proposal to add them to the
list.

`req` and `res`, the request and response of an Express route handler,
are generic names: kept as they are, never spelled out as `request` and
`response`.

## MP-72 — A ternary given whole stays bare

**Scope:** FMT-27, [FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-13, voice comment `20261013_104716-me` on an object
property given `(cond ? a : b)` and `cond ? a : b`: "in such cases the
parentheses are redundant; better without them, the second one".

A ternary given whole as a value, an argument or a return is written
without parentheses around it. They go around a ternary only where it is
an operand of another operator and precedence needs them.

**Clarified:** 2026-10-13, author message `20261013_110437-me` ("B: a
directive keeps them"): a Vue directive keeps its parentheses around a
ternary, by VUE-06; this rule is for JavaScript.

## MP-73 — Three slips in the author's half of logs.md are corrected

**Scope:** LOG-06, the author's half of [logs](drafts/logs.md).
**Approved:** 2026-10-13, author message `20261013_113227-me` (the audit's
answers), answer 12A ("Correct the three lines").

In the author's half of `drafts/logs.md`, the example's `[spawn]` reads
`[group_spawn]`, the event LOG-06 and the rest of that half name; "each
each" reads "each", and "pring" reads "print". No other word of that half
changes.

## MP-74 — refresh() is idempotent

**Scope:** FN-11, the author's half of [refresh](drafts/refresh.md).
**Approved:** 2026-10-13, author message `20261013_113227-me` (the audit's
answers), answer 27A ("Yes: refresh() is idempotent, and your half says
so").

`refresh()` is safe to call at any moment, any number of times. The
author's half of `drafts/refresh.md` says so in a line of its own; FN-11
and its picture stay as they are.

## MP-75 — CSS class names are written whole, picked by a switch

**Scope:** FLOW-12, the pages and scripts that build a class name at run
time.
**Approved:** 2026-10-13, author message `20261013_113227-me` (the audit's
answers), answer 23A ("Yes: CSS class names are written whole, picked by a
switch").

FLOW-12's "names are written whole" covers CSS class names too, so a
search for a class finds the line that sets it. A class picked from a few
known ones is listed whole in a `switch`: `tone_class_of(tone)` returns
`tone-accent`, `tone-ok`, `tone-warn` or `tone-danger`, and a pair carries
the whole class, `'theme-light'` and `'theme-dark'`. A method name picked
at run time, as with PhotoSwipe's keys, gets a switch as well.

## MP-76 — Demos follow the code rules

**Scope:** the demos in `demos/`, PROJ-29, the code rules.
**Approved:** 2026-10-13, author message `20261013_113227-me` (the audit's
answers), answer 24A ("Demos follow the code rules").

A demo follows the code rules as any other code of the repository does:
`demos/items_by.js` gets `cli(main)` and a `main()`, and names as NAME-13
has them. A demo that shows an old form on purpose says "Superseded" in its
header, as `demos/item_to.js` does.

## MP-77 — res has two meanings, one in each of its pairs

**Scope:** VAR-18, CORE-04, [generic names](drafts/generic_names.md).
**Approved:** 2026-10-07, author choice A in `20261007_203200-me` ("Keep
res/rej for Promise executors"); the audit's question 15 settled by it as
answer B on 2026-10-13.

`res` is a generic name in two pairs: beside `req`, the response of an
Express route handler (MP-71); beside `rej`, the resolve of a Promise
executor (MP-23). The generic-names page lists both pairs, and VAR-18 gives
`res` the meaning of its pair. CORE-04 keeps `res/rej`.

## MP-78 — bin/configure predicts the install; later sudo calls are sudo -n

**Scope:** PROJ-17, [configure](drafts/configure.md).
**Approved:** 2026-09-27, voice comment `20260927_154207-me` (every
question the run may raise, sudo too, is asked at the very start; once the
run has begun there are no more questions); applied by 3003447 on
2026-10-08, recorded on 2026-10-13, the audit's question 20 settled by it
as answer A.

The check at the start predicts the state after the install. A sandbox
that is missing, not `root:4755`, or about to be replaced by a new
Electron needs `sudo`, so `sudo -v` is taken up front. The later calls
are `sudo -n`: should the ticket be gone, they fail at once instead of
stopping at a prompt.

## MP-79 — VUE-06's parentheses stay in the template

**Scope:** VUE-06 and FMT-27, [vue-formatting.md](vue2/vue-formatting.md),
[FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-15, voice comment `20261015_125917-me`: the rule is
"only for the template, for v-if, because otherwise it is harder to
notice".

VUE-06 wraps a compound directive value in parentheses only in a
template, where inside an attribute's quotes it is easy to miss. A
condition moved out of a `v-if` into a computed or a method loses them
and follows FMT-27: `return !is_ready && !is_gone;`.

## MP-80 — A table folds only what does not fit

**Scope:** UI-21 to UI-23, [table_details.md](drafts/table_details.md).
**Approved:** 2026-10-15, voice comment `20261015_144000-me`, on a
serviceman table folded down to its label with room to spare: "even when
there is room, it left only the label and put everything else inside, out
of sight; before I saw everything at a glance, now I have to keep clicking
to open the details".

Columns fold into a row's details only when the table no longer fits and
turns into a grid, and only as many as it must at that width. With room,
every column stays on top. What a row is and its state never fold.


## MP-81 — Nothing appears or disappears suddenly

**Scope:** ANIM-16, [animations](drafts/animations.md).
**Approved:** 2026-10-17, author message `20261017_234822-me`, written as
the rule itself, to be kept as it is: "ни один элемент не появляется и не
исчезает внезапно / любой элемент должен появляться и исчезать плавно"
("no element appears or disappears suddenly; every element must appear and
disappear smoothly"), and in its voice comment: "a new rule for the UI".

Every element on the screen, not only rows and the parts of a card, fades
in as it comes and out as it goes, at the shared speed; none is whole on
one frame and gone on the next.
