# Manually approved rules

Decisions explicitly approved by the author, kept outside AI-generated text.
When rewriting an AI explanation, read the author's source and the applicable
entries here. The rewritten explanation must retain their meaning and scope.

This file is maintained, never regenerated. Add or change an entry only after
an explicit author decision; record its scope and approval date, never
the message it came in or what was said in it (MP-96).
An AI suggestion, an audit finding or text already present in an AI section
is not approval.

An approved entry may explicitly clarify or supersede older wording within
its stated scope. If the author source and an entry disagree without such a
ruling, report the conflict before rewriting; do not choose silently.

## MP-01 — Keep manual approvals outside regenerated text

**Scope:** [writing conventions](drafts/WRITING.md), rule explanations,
agent guides and glossary explanations.
**Approved:** 2026-10-07.

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
**Approved:** 2026-10-07, value names amended 2026-10-18;
[implementation](https://github.com/vbarbarosh/rules/commit/2b13985).

A lone value or DOM-event arrow parameter is `v`; `vv` only when `v` is already
taken where the arrow stands, `vvv` only when `vv` is, and so on. An arrow with
no parameter, an error arrow's `e` and a parameter with another name take
nothing (2026-10-18, superseding "by total arrow depth"). An arrow does not
declare a parameter it does not use: `promise.catch(() => items.map(v =>
v.uid))`, not `e => …`; arrows only, a regular function may declare a parameter
it does not use (2026-10-18). Error
arrows use `e` at every depth. Regular error callbacks use `error`; regular
DOM-event callbacks use `event`. Nested catch bindings use `error2`, `error3`,
and so on when nesting is inside a catch. DOM error events follow event naming,
not Error-callback naming.

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
**Approved:** 2026-10-07.

Use the same SVG sun/crescent pair everywhere. Show the current theme: sun for
Light, crescent for Dark. One click toggles directly between those two states,
with no menu, System or Auto option. Size and border may follow the interface.
The selected pair is retained in `img/theme-sun.svg` and `img/theme-moon.svg`.

## MP-18 — Declare first, export the name last

**Scope:** FILE-20, [one export per file](drafts/one_export_per_file.md),
ES-module examples and controls that explain that rule.
**Approved:** 2026-10-07.

Declare the helper or exported value separately above. Put
`export default name;` at the bottom as the last statement. Never combine
its declaration with the export. This approval settles placement and syntax;
it does not by itself settle the separate question of permitted export types.

## MP-19 — One public export may be a function, class, configuration or data

**Scope:** library/reusable modules, FILE-01/20/21/23 and FN-16.
**Approved:** 2026-10-07.

Both the helper-function and settings/configuration examples are valid.
The rule is one public exported value, declared above and exported by name
last. Executable scripts export nothing; tool-shaped files follow the tool.
Class methods are allowed inside one exported class.

## MP-20 — Format and render are adjacent, distinct output families

**Scope:** [format](drafts/format_xxx.md), [render](drafts/render_xxx.md),
FN-01/05/09, naming examples and their presentation.
**Approved:** 2026-10-07.

Format strictly returns a string to be shown to a person. Render constructs
asset content. Present the two definitions beside each other. Asset content
can also be a string; output purpose distinguishes it from human-facing text.
Do not invent `render_json()` usage to force a decision: the author has not
established that convention. Existing purity/delivery distinctions keep
their scope until separately changed.

## MP-21 — Time0 for elapsed measurements; start belongs to a pair

**Scope:** [timing names](drafts/var_names_time0.md), VAR-14/15, CORE-04.
**Approved:** 2026-10-07.

An elapsed-time measurement uses time0. Outside that role, use start/finish
or begin/end when the corresponding pair is actually used. This is not an
absolute ban on start in other contexts or on externally defined API fields.

## MP-22 — Req/res is reserved for Express

**Scope:** CORE-04, route examples and request/response callbacks.
**Approved:** 2026-10-07.

Req/res names the Express request/response pair only. Elsewhere use
request/response. Promise executor names are a separate pair, addressed by
MP-23 below.

## MP-23 — Keep res/rej for Promise executors

**Scope:** CORE-04, natural pairs, [file-drop Promise examples](drafts/file_drop.md).
**Approved:** 2026-10-07.

Res/rej is a valid abbreviation for Promise executor resolve/reject
callbacks. Keep that pair in the file-drop examples. The full names
resolve/reject remain valid too. Req/res is the separate Express
request/response pair under MP-22.

## MP-24 — Typing focuses the primary search and keeps the first character

**Scope:** [main search](drafts/main_search.md), UIM-11, pages with one primary
search/filter input and their matching keyboard handlers.
**Approved:** 2026-10-07.

When no editable field has focus, typing immediately focuses the page's
main search/filter and puts the first typed character into it too. Local
inputs keep their own typing. A click or focus shortcut is not required.
The recording's initial autofocus is an example, not a separate requirement
to focus every search on page load.

## MP-25 — The first actionable list item is selected by default

**Scope:** [default list item](drafts/default_list_item.md), UIM-12, lists
whose items are targets for an action.
**Approved:** 2026-10-07.

Select the first item in displayed order by default. Enter acts on it unless
the user explicitly selects another item. The recording's SQLite/LinkedIn
example demonstrates that the first result wins, even when a later one
looks like the intended match. An empty list has no action target.

## MP-26 — UI mechanics is a reusable rule category

**Scope:** the rule index and documentation navigation; interaction rules.
**Approved:** 2026-10-07.

Use **UI mechanics** for how interfaces work, distinct from their appearance.
Place primary-search typing and default-item selection there, alongside
scroll anchoring, file drop, undo/confirmation and optimistic updates. Keep
existing rule IDs and deep links when organizing the rules into this category.

## MP-27 — Short objects stay on one line when they fit

**Scope:** FMT-11/13/15/18, [formatting](FORMATTING.md),
[formatting blocks](drafts/formatting_blocks.md) and their visual examples.
**Approved:** 2026-10-07.

Keep a short object literal on one line when it fits. Multiple fields alone
do not require a multiline layout. When size or nested structure requires
multiple lines, use one field per line and a trailing comma. Align the short
canonical example with this rule. This choice does not establish a numeric
line-width limit.

## MP-28 — Options-style methods are always function expressions

**Scope:** FMT-12, FLOW-11, LINT-03, [formatting](FORMATTING.md),
[formatting blocks](drafts/formatting_blocks.md), options-method examples and lint guidance.
**Approved:** 2026-10-07.

Options-style methods use function expressions, including methods whose body
only returns an expression and does not use this or arguments. The tiny-arrow
permission applies to callbacks and value factories, not these methods.
Keep the actual px method as a function expression. Native class-method
syntax keeps its existing scope.

## MP-29 — Px returns the string zero

**Scope:** px in [Vue global methods](vue2/vue-globals.md) and its examples.
**Approved:** 2026-10-07.

The px helper returns ``value ? `${value}px` : '0'``. Its empty/zero branch is
the string '0', not numeric zero. Preserve this correction when rewriting
the example.

## MP-30 — A document without an author section is open to requested edits

**Scope:** DOC-03, DOC-05, DOC-12, [writing conventions](drafts/WRITING.md),
one-part documents such as the 15 drafts listed in C:RULES-101.
**Approved:** 2026-10-07.

A document with no author section, no notes of the author above the
boundary, is an ordinary file: the AI may edit it for the task the author
asked for. Where the author's section exists, it stays at the top of the
file and is never overwritten; only an explicit request of the author
changes it (DOC-03). When it is unclear where the author's section ends,
ask before editing.

## MP-31 — A glossary keeps the author's terms; the AI explains below them

**Scope:** DOC-13, [glossaries](glossaries/), the glossary builder in
`bin/build`, [writing conventions](drafts/WRITING.md).
**Approved:** 2026-10-07.

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
**Approved:** 2026-10-07.

A project has one build command, `bin/build` (`npm run build`), and it
writes `build/`. `bin/release` makes the release from it: it runs that same
build, may pass it flags or environment variables, and may clear the output
directory first; then it copies `build/` into `dist/`. There is no second
build command for releases.

The release steps, confirmed on 2026-10-07: `rm -rf build`,
`npm run build`, `rm -rf dist`, `cp -r build dist`.

## MP-33 — data/ is what the app writes; config/ makes the configuration

**Scope:** PROJ-05, PROJ-06, PROJ-07, PROJ-18, PROJ-19,
[project layout](drafts/layout.md), [data](drafts/data.md).
**Approved:** 2026-10-07.

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
**Approved:** 2026-10-08.

A release commit is titled `release: v<version>`, for example
`release: v5.57.6`: `release` is the scope, so the title follows GIT-01 with
no exception. Vue and Vite title their releases the same way.

## MP-35 — An elapsed time shown to a person goes through format_duration

**Scope:** VAR-14, FN-02, [time0](drafts/var_names_time0.md),
[format](drafts/format_xxx.md).
**Approved:** 2026-10-08.

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
**Approved:** 2026-10-08.

`render_*` always returns its result, as a computed value does. A function
that brings a part of the page up to date returns nothing and is not a
render: it is `refresh_<what>` (`refresh_dom`, `refresh_theme_labels`), the
refresh button turned on one part of the page. The author weighed a `sync_`
prefix (`sync_dom`, `sync_time`, `sync_backend`) and settled on `refresh`,
the family that already exists.

## MP-37 — Side-effect imports sit at the very top, in run order

**Scope:** FLOW-10, FILE-11, LINT-06, [imports](drafts/imports_sorted.md).
**Approved:** 2026-10-08.

Side-effect imports, the bare `import './x'` blocks, sit at the very top of
the file, in the order they run. That is FLOW-10's one visible exception to
"no reliance on execution-order side effects": the reliance is declared in
the first lines, where it is seen, and nowhere else.

## MP-38 — A module may own its state

**Scope:** FLOW-09, [FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-08.

A module may keep its own state and act as a singleton over its data,
written only by its own functions; the editor and the dashboard are full of
such modules. "Shared state" in FLOW-09 means state shared across modules:
one module reaching into another's is what is forbidden.

## MP-39 — Commit titles aim for 70, 72 as the rule, 75 rarely

**Scope:** GIT-03, [commits](drafts/commits.md).
**Approved:** 2026-10-08.

A title aims for 70 characters and stays within 72; in a rare, special case
a little more is allowed, up to 75. It is not a hard rule: titles are short,
and the numbers are guidance, not a floor. The author's "70-72 in all" is a
target, not a minimum.

**Superseded:** 2026-10-11 by MP-50, the title 72 at most, the body too.

## MP-40 — is_ names a boolean, predicate or data; check_ reads as a call

**Scope:** NAME-02, NAME-15, [naming markers](drafts/naming_markers.md).
**Approved:** 2026-10-08.

`is_` is not a function's privilege. It names a boolean: a predicate that
returns one, `is_ancestor(a, b)`, or data that holds one, `is_open`; a
plain `open` or `ready` is as good where it is clearer. When a check must
read as a call, the verb `check_` says so: `check_status()`,
`check_rating()`. This closes the audit's Boolean names question with B, and
replaces the earlier reading that `is_` meant "call me".

## MP-41 — Right of the header: the theme switch, then GitHub

**Scope:** UI-08, [page header](drafts/page_header.md).
**Approved:** 2026-10-08.

The two controls at the right end of the header are, left to right, the
theme switch and then the GitHub icon in the corner, the same on every page.
The author's note "to decide" in the top half of page_header.md is answered
by this entry; the note itself is the author's to change.

**Superseded:** 2026-10-09 by MP-44, the theme switch last.

## MP-42 — The SQL rules are MySQL's

**Scope:** the SQL group, SQL-03, [sql](drafts/sql.md).
**Approved:** 2026-10-08.

The SQL group is MySQL: the group says so, and every canonical form is valid
MySQL. A `CREATE INDEX` takes no `WHERE` (no partial indexes; a generated
column with a unique index does the same), and `DROP INDEX` names its table
with `ON`. The two examples in the author's half of sql.md that say
otherwise are the author's to amend.

## MP-43 — The UI mechanics rules are coded UIM

**Scope:** the UIM group, the rule index header.
**Approved:** 2026-10-08.

The rules of the UI mechanics group carry the group's own code: UI-09 to
UI-20 are UIM-01 to UIM-12. A link to an old code still opens the rule: the
page redirects it. A code still never changes when a rule moves between
existing groups; a group of its own is the one case that gets new codes.

## MP-44 — Right of the header: the links, then the theme switch last

**Scope:** UI-06, UI-08, [page header](drafts/page_header.md); supersedes
MP-41.
**Approved:** 2026-10-09.

The right end of the header holds, left to right, the project's links and
then the theme switch, always last, at the right edge, the same on every
page. The links are the GitHub icon and, when the project has them, others
such as Twitter or Facebook. Why: there may be several links and their
number differs between projects; after all of them, the theme switch keeps
one place on every page.

## MP-45 — The header icons look alike

**Scope:** UI-08, [page header](drafts/page_header.md),
[theme switch](drafts/theme_switch.md) in a page header.
**Approved:** 2026-10-09.

The icons at the right end of the header, the links and the theme switch,
share one look: the same size, the same colour, no frame on any of them.
The switch's freedom of size and border (MP-17) yields to this in a header.

## MP-46 — An empty function stays on one line

**Scope:** FMT-32, FMT-04, LINT-03, [formatting](FORMATTING.md),
`block-layout`, `tiny-arrows`.
**Approved:** 2026-10-10.

An empty function expression, `function () {}`, and an empty arrow,
`() => {}`, are a no-op, as `ignore` is, and stay on one line. Splitting the
braces over two lines is wrong. The arrow is allowed, not required.

## MP-47 — out only for `return out;`; generic names have one meaning

**Scope:** VAR-02, VAR-13, VAR-18, [return values](drafts/return_out.md),
[generic names](drafts/generic_names.md), `return-out`; clarifies MP-05.
**Approved:** 2026-10-10.

`out` is the variable returned as `return out;` and nothing else. A value
returned on a condition or transformed on its way out gets a name of its own.
Each generic name has one meaning, listed on one page.

**Clarified:** 2026-10-13 by MP-77, `res` has two meanings, one in each of
its pairs, `req/res` and `res/rej`.

## MP-48 — A piece shown in two places is one component

**Scope:** VUE-20 to VUE-24, [Vue components](vue2/vue-components.md).
**Approved:** 2026-10-10.

Each badge is a Vue component of its own, named `badge-<what it says>`, never
a `<span>` with the same classes copied into every place. What changes goes
in as a parameter, a variant is a suffix, one Sass mixin gives all of them
one look and each sets only its own colours. The badge is the example of the
wider rule: an app is split into components, one per piece it shows in more
than one place.

## MP-50 — A commit title is 72 characters at most, its body too

**Scope:** GIT-03, GIT-05, [commits](drafts/commits.md).
**Approved:** 2026-10-11.

A title stays within 72 characters, scope included: the 70 to aim for and
the 75 of a rare case in MP-39 are gone. Every line of the body is held to
72 as well, broken between words. MP-49 was held for a proposal the author
set aside on 2026-10-11; the number stays unused.

**Clarified:** 2026-10-13: the body aims at 72 too. The author's half of
`drafts/commits.md` still reads "is held to 72 characters too"; it changes
only on the author's word (DOC-03). The rule does not change.

## MP-51 — A doc GIF shows its time and its progress, at 30 fps

**Scope:** DOC-14, [GIFs in the docs](drafts/gifs.md).
**Approved:** 2026-10-11.

Every GIF in the docs is recorded at 30 frames a second. It shows its time
from 0 at its first frame in a corner, and a thin bar along its top edge
that fills as it plays; both start again when it loops.

## MP-52 — A script starts from bin/templ; its header always stays

**Scope:** PROJ-15, [templ](bin/templ).
**Approved:** 2026-10-12.

A bash script begins as a copy of `bin/templ`. Its header and the
`script`, `scriptdir` and `scriptname` lines are kept in every script;
everything after them (the colors, the exit message, the temporary
directory and its trap, the `echo` lines) stays only where the script
uses it.

## MP-53 — A file and its export carry one name; the preset is made by make_rules_config

**Scope:** FILE-20, FILE-24, [src/make_rules_config.js](src/make_rules_config.js).
**Approved:** 2026-10-12.

A file is named after the one value it exports, with no exception for a
file shaped by a tool: `src/config.js` exporting `rules_config` became
`src/make_rules_config.js` exporting `make_rules_config`. A function
that builds a value is named for making it. The package path
`@vbarbarosh/rules/config` stays, pointing at the new file, so projects
that load it keep working.

**Clarified:** 2026-10-13: a file whose shape a tool sets has no exception
either. `src/index.js`, which exports `plugin`, becomes `src/plugin.js`, and
`package.json` points at it. The rule files in `src/rules/` keep their
shape: MP-57 names a rule's function after its rule id, and nothing there is
renamed. FILE-20's "tool-shaped files follow the tool" is about the export's
shape, or a file whose name the tool fixes, as `eslint.config.js`.

## MP-54 — build/ is never committed; nothing more

**Scope:** PROJ-04, [project layout](drafts/layout.md).
**Approved:** 2026-10-12.

PROJ-04 says two things: `bin/build` puts what it builds into `build/`;
`build/` is temporary, and it and everything in it are never committed.
Taking something out of `build/` into the repository is a decision of its
own, as `bin/release` does with `dist/`; the committed `docs/*.html` are
such a decision, not an exception.

## MP-55 — Nothing jumps: the working item of a list stays put

**Scope:** UIM-01, ANIM-07, [scroll anchoring](drafts/scroll_anchoring.md).
**Approved:** 2026-10-12.

UIM-01 holds for the item the reader works with in a list or a grid: the
one selected or being looked at stays where it is while the app adds,
removes or grows items around it, as far as the list's ends allow. A
control that docks, hides or shows as the page scrolls is outside it; the
docked switches pushing the count are not a breach.

## MP-56 — A configuration value at the top is UPPER_CASE

**Scope:** VAR-19.
**Approved:** 2026-10-12.

A constant a module keeps as configuration, a global name for a value set
in the code, is written in upper case at the module's top level. A `const`
inside a function or a block is lower case. Imports are not covered.

## MP-57 — A linter rule's function is named after its rule id

**Scope:** NAME-02, [naming markers](drafts/naming_markers.md), `src/rules/`.
**Approved:** 2026-10-12.

The function of a linter rule is named after its rule id, as ESLint does:
`block_layout(context)` for the rule `block-layout`. It needs no verb and
no function marker; NAME-02 names the exception. Nothing in `src/rules/`
is renamed.

## MP-58 — A step of a script is what main() calls once, in order

**Scope:** NAME-17, NAME-18, [formatting](FORMATTING.md).
**Approved:** 2026-10-12.

A step is a function `main()` calls once, in order, to do one part of the
work; it may start with its verb, as `build_glossaries_html()` does in
`bin/build`. A verb-first name that is not a step is renamed to the domain
first when it is next touched; the examples in the documents stay.

**Clarified:** 2026-10-13: a step is a function `main()` calls once per part
of the work, in order. `build_index_html()`, called once for each page
`bin/build` writes, is a step; `bin/build` stays as it is.

## MP-59 — A page made only to be photographed keeps no theme switch

**Scope:** UI-01, [theme switch](drafts/theme_switch.md), the render sources
`drafts/file-drop.html`, `drafts/no-confirmations.html`,
`drafts/optimistic-updates.html`, `drafts/readme-structure.html`,
`drafts/dead-controls.html`, `drafts/return-out.html`.
**Approved:** 2026-10-12.

A page made only to be photographed for a rule's picture, opened once as
is and once with `?dark` and saved as two PNGs, keeps no switch. Its dark
mode is the same `data-theme` the other pages use, no longer an
`html.dark` class of its own. A page that becomes a demo people open gets
the switch.

## MP-60 — A failed check extends the turn; final and tool_call are our names

**Scope:** [agents glossary](glossaries/agents.md): turn, final,
stop_reason, check.
**Approved:** 2026-10-12.

The turn ends at the last final, once the checks after it pass; a failed
check sends the failure back and the fixing stays in the same turn, so
`max_rounds` and the budget cover it. `final`, `tool_call`, `max_tokens`
and `refusal` are our own names: Anthropic says `end_turn`, `tool_use`,
`max_tokens`, `refusal`; OpenAI says `stop`, `tool_calls`, `length`,
`content_filter`.

## MP-61 — The unused logo is deleted

**Scope:** `img/logo-by-chat-gpt.png`.
**Approved:** 2026-10-12.

The 1.4 MB logo nothing linked is deleted; git history keeps it.

## MP-62 — Error Flood stays provisional

**Scope:** TEST-06, [testing glossary](glossaries/testing.md).
**Approved:** 2026-10-12.

Error Flood keeps the author's working note; the Glossaries page shows it
as provisional, not defined yet, until the author defines it.

## MP-63 — The SQL examples in the author's half are MySQL

**Scope:** [SQL](drafts/sql.md), SQL-03, MP-42.
**Approved:** 2026-10-12.

The partial-index example, a `CREATE UNIQUE INDEX` with a `WHERE`, is
dropped: the next example reaches the same end the MySQL way, with a
generated column. `DROP INDEX` names its table with `ON user_identities`.

## MP-64 — A narrowing box covers its extra words; no fade

**Scope:** ANIM-10, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

When a pill or another box with words is shorter in the other layout, it
narrows and its edge covers the words that go; they are not faded.

## MP-65 — What one state only has fades over the whole move; at a list's end the view settles in the same frames

**Scope:** ANIM-07, ANIM-10, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

A part that only one layout has fades from the first frame of the movement
to the last, both ways, instead of early on folding and late on opening.
Where a list's end keeps the place from holding, the view comes down during
the move, frame by frame, and is still when the move ends.

## MP-66 — A moving part lands exactly

**Scope:** ANIM-12, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

Each moving part is measured where it will be before it moves, so its last
frame is the still state.

## MP-67 — New things arrive whole

**Scope:** ANIM-13, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

A new row or message arrives as it will stay, its tags and badges on it,
at its final height; nothing fills in or grows after it lands.

## MP-68 — Growing goes through the heights between

**Scope:** ANIM-14, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

A section that opens grows through every height between closed and full,
its content clipped inside; closing is the same, backwards.

## MP-69 — The chosen highlight glides in its final colours

**Scope:** ANIM-15, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

The selection highlight keeps the colours it ends in from the first frame
of its movement to the last.

## MP-70 — The speed stays; reduced motion and frame tests stay out

**Scope:** ANIM, [animations](drafts/animations.md).
**Approved:** 2026-10-12.

The animations keep one duration, 400 ms, and the easing
`cubic-bezier(.2, .8, .2, 1)`. No rule asks for reduced motion or for a
frame-by-frame test of each morph: both were proposed and not taken.

## MP-71 — req and res stay

**Scope:** VAR-18, [generic names](drafts/generic_names.md).
**Approved:** 2026-10-13.

`req` and `res`, the request and response of an Express route handler,
are generic names: kept as they are, never spelled out as `request` and
`response`.

## MP-72 — A ternary given whole stays bare

**Scope:** FMT-27, [FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-13.

A ternary given whole as a value, an argument or a return is written
without parentheses around it. They go around a ternary only where it is
an operand of another operator and precedence needs them.

**Clarified:** 2026-10-13: a Vue directive keeps its parentheses around a
ternary, by VUE-06; this rule is for JavaScript.

## MP-73 — Three slips in the author's half of logs.md are corrected

**Scope:** LOG-06, the author's half of [logs](drafts/logs.md).
**Approved:** 2026-10-13.

In the author's half of `drafts/logs.md`, the example's `[spawn]` reads
`[group_spawn]`, the event LOG-06 and the rest of that half name; "each
each" reads "each", and "pring" reads "print". No other word of that half
changes.

## MP-74 — refresh() is idempotent

**Scope:** FN-11, the author's half of [refresh](drafts/refresh.md).
**Approved:** 2026-10-13.

`refresh()` is safe to call at any moment, any number of times. The
author's half of `drafts/refresh.md` says so in a line of its own; FN-11
and its picture stay as they are.

## MP-75 — CSS class names are written whole, picked by a switch

**Scope:** FLOW-12, the pages and scripts that build a class name at run
time.
**Approved:** 2026-10-13.

FLOW-12's "names are written whole" covers CSS class names too, so a
search for a class finds the line that sets it. A class picked from a few
known ones is listed whole in a `switch`: `tone_class_of(tone)` returns
`tone-accent`, `tone-ok`, `tone-warn` or `tone-danger`, and a pair carries
the whole class, `'theme-light'` and `'theme-dark'`. A method name picked
at run time, as with PhotoSwipe's keys, gets a switch as well.

## MP-76 — Demos follow the code rules

**Scope:** the demos in `demos/`, PROJ-29, the code rules.
**Approved:** 2026-10-13.

A demo follows the code rules as any other code of the repository does:
`demos/items_by.js` gets `cli(main)` and a `main()`, and names as NAME-13
has them. A demo that shows an old form on purpose says "Superseded" in its
header, as `demos/item_to.js` does.

## MP-77 — res has two meanings, one in each of its pairs

**Scope:** VAR-18, CORE-04, [generic names](drafts/generic_names.md).
**Approved:** 2026-10-07.

`res` is a generic name in two pairs: beside `req`, the response of an
Express route handler (MP-71); beside `rej`, the resolve of a Promise
executor (MP-23). The generic-names page lists both pairs, and VAR-18 gives
`res` the meaning of its pair. CORE-04 keeps `res/rej`.

## MP-78 — bin/configure predicts the install; later sudo calls are sudo -n

**Scope:** PROJ-17, [configure](drafts/configure.md).
**Approved:** 2026-09-27; applied by 3003447 on 2026-10-08.

The check at the start predicts the state after the install. A sandbox
that is missing, not `root:4755`, or about to be replaced by a new
Electron needs `sudo`, so `sudo -v` is taken up front. The later calls
are `sudo -n`: should the ticket be gone, they fail at once instead of
stopping at a prompt.

## MP-79 — VUE-06's parentheses stay in the template

**Scope:** VUE-06 and FMT-27, [vue-formatting.md](vue2/vue-formatting.md),
[FORMATTING.md](FORMATTING.md).
**Approved:** 2026-10-15.

VUE-06 wraps a compound directive value in parentheses only in a
template, where inside an attribute's quotes it is easy to miss. A
condition moved out of a `v-if` into a computed or a method loses them
and follows FMT-27: `return !is_ready && !is_gone;`.

## MP-80 — A table folds only what does not fit

**Scope:** UI-21 to UI-23, [table_details.md](drafts/table_details.md).
**Approved:** 2026-10-15.

Columns fold into a row's details only when the table no longer fits and
turns into a grid, and only as many as it must at that width. With room,
every column stays on top. What a row is and its state never fold.


## MP-81 — Nothing appears or disappears suddenly

**Scope:** ANIM-16, [animations](drafts/animations.md).
**Approved:** 2026-10-17; morphing added 2026-10-18.

Every element on the screen, not only rows and the parts of a card, comes
and goes smoothly; none is whole on one frame and gone on the next. Where it
comes from something on the screen or goes into it, it morphs, its shape,
size and place changing through every frame between; only what has nothing
to come from or go into fades, at the shared speed.

## MP-82 — since/until is an established pair

**Scope:** CORE-04, natural pairs.
**Approved:** 2026-10-19.

`since/until` joins the established pairs. It is `begin/end` said of time:
the bounds of a span, a query or a filter.

## MP-83 — let and const never share a run of declarations

**Scope:** FMT-33, FMT-16, [formatting](FORMATTING.md).
**Approved:** 2026-10-23.

A run of declarations holds only `let` or only `const`; when both are
needed, a blank line separates the two runs, and the `let` run comes first.
That blank line is allowed besides a phase change (FMT-16). Existing code is
not rewritten for it (CORE-01).

## MP-84 — plural() takes the whole sentence

**Scope:** FMT-34, FMT-31, [formatting](FORMATTING.md).
**Approved:** 2026-11-03.

Each form given to `plural()` is a whole phrase, usually a sentence, `#`
where the number goes; the call's result is returned or assigned as it is,
never a part of a longer string, so `plural(` never stands inside `${…}` or
quotes. In JavaScript and in PHP. It stands with the string rules, after
FMT-31. Existing code is not rewritten for it (CORE-01).

## MP-85 — The history of actions in two levels

**Scope:** HIST-01 to HIST-03, [the history of actions](drafts/history.md),
[System](docs/system.md).
**Approved:** 2026-11-03.

A model writes three kinds of record, `<model>_created`, `<model>_updated`
and `<model>_deleted`; anything else is a command, named by its entry point
(`api2_publish_post`), written first as the parent of the records it causes.
Two levels: under a command only records. The rules stand on the System
page, apart from the rule index, while the research goes on.

## MP-86 — A system as commands

**Scope:** CMD-01 to CMD-06, [a system as commands](drafts/commands.md),
[System](docs/system.md).
**Approved:** 2026-11-03.

A system is its commands first; the app above calls them, and they never
call one another; every command is drawn; any command runs by hand at any
time; the pages that depend on a command know it runs; a command that runs
one at a time guards itself. The words as worded in the plan, the tag `CMD`
in place of `ARCH`, which the architecture glossary already holds as a
section id across the pages. The examples are an app's commands made
generic: no name, service, repository or file of its own. The rules stand
on the System page, apart from the rule index, while the research goes on.

## MP-87 — A record's fields: one order, ids on the backend

**Scope:** FMT-35, FMT-36, [a record's fields](drafts/record_fields.md).
**Approved:** 2026-11-10.

The fields of a record stand in one order: its own `id` and `uid` always
first, then the ids of other records, then their uids, then all the rest,
the dates at the end. An `id` and every `…_id` are private values of the
backend and never reach the frontend, which knows a record by its `uid`.
The order inside one kind is not ruled. Both stand with the formatting
rules, beside the two about objects. Existing code is not rewritten for
them (CORE-01).

## MP-88 — In a PHP class, assert methods follow the constructor

**Scope:** FILE-27, FILE-26, [assert methods](drafts/php_assert_methods.md).
**Approved:** 2026-11-10.

In a PHP class the methods named `assert_*` stand right after the
constructor, before every other method. It stands with the rules of a
file's order, after FILE-26. Existing code is not rewritten for it
(CORE-01).

## MP-89 — The first refresh stands in created

**Scope:** FN-13, [refresh](drafts/refresh.md).
**Approved:** 2026-11-10.

With no other condition a component's first refresh stands in `created`.
FN-13's form and its page showed `mounted` before; that was never ruled
on. `mounted` is for a first refresh that needs the DOM. The author's half
of `drafts/refresh.md` says so in a line of its own. Existing code is not
rewritten for it (CORE-01).

## MP-90 — Component methods keep one order

**Scope:** VUE-25, FILE-26, [Vue components](vue2/vue-components.md).
**Approved:** 2026-11-10.

In a component's `methods` the names of functions written in other
modules stand on the very top, then `refresh`, then the component's own
methods. The names on top are no family's run, so FILE-26 does not pull a
`format_*` written in the component up to them. An order among the
component's own methods after `refresh` is not ruled. Existing code is not
rewritten for it (CORE-01).

## MP-91 — A URL ends its sentence bare

**Scope:** DOC-15, [a URL ends its sentence bare](drafts/url_ends_bare.md).
**Approved:** 2026-11-11.

A sentence in a Markdown file that ends with a bare URL ends there, with
nothing after the URL. The next sentence starts with a capital letter;
better, it starts a paragraph. A link written `[name](url)` is not a bare
URL and keeps its full stop. It stands with the rules of writing, after
DOC-14. Existing files are not rewritten for it (CORE-01).

## MP-92 — A text is written for a person

**Scope:** DOC-16, [a text is written for a person](drafts/text_for_a_person.md).
**Approved:** 2026-11-11.

A text is written for the person who reads it: short, compact, to the
point, with no filler. It is the first rule of writing and stands first
in the DOC group, before DOC-01, its code the next free one. Existing
texts are not rewritten for it (CORE-01).

## MP-93 — Vue 2 lifecycle hooks keep one order

**Scope:** VUE-15, [Vue components](vue2/vue-components.md).
**Approved:** 2026-11-13.

A component's lifecycle hooks follow its other options, two by two:
`beforeCreate` and `created`, `beforeDestroy` and `destroyed`,
`beforeMount` and `mounted`, `beforeUpdate` and `updated`, `activated` and
`deactivated`, then `errorCaptured`. It replaces VUE-15's `mounted`,
`created`, `beforeDestroy`. Existing code is not rewritten for it
(CORE-01).

## MP-94 — A value between two bounds is clamped

**Scope:** FLOW-13, [a value between two bounds is clamped](drafts/clamp_two_bounds.md).
**Approved:** 2026-11-13.

In JavaScript, a value held between a low and a high bound is one call,
`clamp(min, max, value)` of `@vbarbarosh/node-helpers`, never `Math.max`
and `Math.min` nested by hand. The bounds, most often constants, stand
first, where they are seen at once; the value, often a long expression,
comes after them. A single bound stays `Math.max` or `Math.min`. PHP is
not covered. It stands in the FLOW group, after FLOW-12. Existing code is
not rewritten for it (CORE-01).

## MP-95 — A long && chain in a return breaks before each &&

**Scope:** FMT-37, FMT-13, FMT-27, [formatting](FORMATTING.md).
**Approved:** 2026-11-12; a return only, 2026-11-15.

A `return` of `&&` too long for one line puts each operand on a line of
its own: the first after `return`, each next one opening its line with
`&&`, one level deeper. It covers a return only, not an assignment or a
condition. `||` and `??` follow it too, the chain of one logical operator
FMT-27 names. One that fits stays on one line (FMT-13). Existing code is
not rewritten for it (CORE-01).

## MP-96 — An approval names no message

**Scope:** DOC-11, every entry of this file, the "evidence" of
[writing](drafts/WRITING.md).
**Approved:** 2026-11-13.

An entry records its scope and the date of the decision, and a public
commit or a page of this repository where one shows it. It never names the
message the decision came in, nor retells what was said there: the
repository is public. The entries above are cut to their dates, and the
"evidence" DOC-11 and the writing notes ask for means this.
