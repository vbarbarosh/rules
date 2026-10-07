# Consistency audit — 2026-10-06

Repository: `vbarbarosh/rules` (branch `main`, HEAD `a3364ed`, clean tree,
equal to `origin/main`). 126 tracked files, 37,119 lines, 147 commits, first
commit 2025-04-09, last 2026-10-06 13:30 (Europe/Chisinau). 258 rules in 17
groups, from 47 source documents.

This file restores the report first written to `notes/audit-2026-10-06.md` at
18:45. A second agent working in the same note wrote its own report to that
path at 18:48, and the first one was lost. Its ids, RULES-56..133, overlap the
second report's REVIEW ids and must be reconciled before either register
becomes the issue list (DOC-06).

## Scope

The question was the author's: **do the rules contradict each other?**
A second question came during the audit: **is every rule in the section it
belongs to?** Every surface that states a rule was checked against every
other one: the index (`docs/rules.md`), the source documents, the linter, the
examples, the pages, the glossaries, the agent guides and the repository
itself.

Checks run:

- **Every index row against its source.** All 258 rows were read against the
  sentence they cite: CORE, NAME, VAR and FN by one reader; FMT, FLOW, FILE
  and LINT by a second; PROJ, REL, GIT, DOC, LOG and SQL by a third; CSS, VUE
  and UI by a fourth. Each canonical form was compared too.
- **Rule against rule.** Each group was read for rules that cannot both be
  followed, overlaps with no stated winner, and terms used in two meanings,
  within the group and against the other groups.
- **Examples through the linter.** 91 fenced JavaScript blocks from every
  Markdown file, plus the 3 demos, were run through
  `eslint.projects.config.js` in a scratch directory, along with every
  parseable canonical form.
- **Linter probes.** Small probe files test rule edges, such as error
  callbacks, event arrows, returns, class order, typography order, operator
  spacing, plain-CSS transitions, classes and options methods. RULES-56, 60,
  62 and 63 were re-run by hand for this note.
- **An AST scan** of `bin/`, `src/`, `tests/` and the page scripts for
  FMT-14, 26, 27, 28, 29, 30, 31 and FLOW-11.
- `npm run lint`: clean. `npm test`: 215 of 215 pass. `bin/build` reproduces
  all five generated pages byte for byte. `npm audit`: 0 vulnerabilities.
- **Links.** 442 internal links were checked, and all resolve. The 13 that
  looked broken sit inside code examples.
- **Pages in headless Chrome** at 1280×800 and 375 px, in light and dark.
  This covered the theme switch and its docked copy, horizontal overflow,
  and anchor navigation over a local HTTP server. The landing position of
  `#UI-16`, `#UI-10`, `#DOC-01` and `#FN-01` was measured 3 s after
  navigation. The scroll-anchoring demo was re-measured as well.
- **Git.** The last 40 commit titles were checked against GIT-01..04.
  The GitHub About text and homepage were read through the API.
- **Two-half documents.** The boundary of every `drafts/*.md` and
  `agents/*.md` was located, and the commits that changed bottom halves
  without touching the top were found.
- **Placement.** Every rule's group was checked against its subject.
- **Prior findings.** All findings of `notes/audit-2026-09-23.md`,
  RULES-01..55, were rechecked (section 11).

Not exercised:

- Browsers other than Chromium, and screen readers.
- The Vue examples were linted but not mounted. RULES-77 depends on how
  `app-button-*` renders, which this repository does not contain.
- The commit history before the last 40 titles was not read against GIT
  rules.
- PHP and SQL examples were read, not executed. The MySQL claims in RULES-89
  come from the MySQL documentation, not from a server.

## Verdict

The rules mostly agree with each other. The naming grammar is coherent: the
`_by_`, `_group_by_`, `_from_` and `_to_` markers, the participles, and the
format/render split all hold together across `naming_markers.md`,
`var_names.md`, `docs/README.md` and the index. Every index row was read
against its source; the rows that drift are listed in RULES-112..116, and the
rest match.

Where the rules do conflict, it is mostly at four seams:

1. **Rule against linter.** Two lint rules demand different names for the
   same error callback, so a one-line `.on('error', …)` arrow cannot pass
   with any name (RULES-56, high). Arrow parameter names are given three
   ways (`e`, `event`, `v`).
2. **The surroundings against the written rules.** CORE-01 and FILE-25 say
   "write like the code around you", while the code around you breaks
   FMT-27 on 88 lines and FMT-31 on 28. Nothing says which one wins.
3. **The two-half convention against practice.** Rulings are edited into
   bottom halves, which DOC-04 says are regenerated, never edited.
   Regenerating them would erase the `dist/` ruling, among others.
4. **Project-level rules are scattered.** Layout, README, `bin/` scripts,
   release and commits sit in three groups far apart. `bin/` rules are
   spread over two groups, and the LINT group repeats topics from four
   others.

| Area (section) | Health | New findings | Worst |
|---|---|---:|---|
| 1. Rules against rules | grammar coherent; conflicts at the edges | 19 | 7 medium (RULES-57) |
| 2. Linter against the rules | one rule pair is unsatisfiable | 11 | RULES-56 **high** |
| 3. Examples against the rules | mostly naming and SQL residue | 11 | RULES-77 medium |
| 4. The repository against its rules | own code and CSS break FMT/CSS rules | 14 | 4 medium (RULES-93) |
| 5. Two-half documents, audit notes | the convention is not followed | 7 | 4 medium (RULES-100) |
| 6. Glossaries and agent guides | two internal contradictions | 5 | 2 medium (RULES-107) |
| 7. Index fidelity | a few rows drift | 5 | RULES-112 medium |
| 8. Placement of rules in groups | scattered project rules | 6 | RULES-117 medium |
| **Total** | | **78** | 1 high, 24 medium, 53 low |

Prior findings RULES-01..55: 36 fixed, 4 partly fixed, 11 still open,
3 withdrawn, 1 won't-fix.

Several findings are in work from 2026-10-05 and 2026-10-06, the Agents page,
the copy tools and the rule titles: RULES-64, 68, 79, 94, 95, 98, 130 and 133,
parts of RULES-66, and the CSS-06 title (RULES-16). They are marked
"(new in a3364ed)".

## Finding register

| Id | Severity | Area | Title |
|---|---|---|---|
| RULES-56 | high | linter | tiny-arrows and error-name demand different names for one error callback |
| RULES-57 | medium | rules | "Write like the surroundings" has no stated rank against the written rules |
| RULES-58 | medium | rules | A short object is one line by FMT-13/18 and four lines by FMT-11 |
| RULES-59 | medium | rules | Options methods: function expression by FMT-12, arrow by FLOW-11/LINT-03 |
| RULES-60 | medium | rules | "A returned variable is `out`" against returning a loop variable or parameter |
| RULES-61 | medium | rules | `is_` is a function marker, yet boolean data is named `is_*` |
| RULES-62 | medium | linter | A one-line event arrow's parameter is `e`, `event` or `v` |
| RULES-63 | medium | linter | error-name forces `error` on a DOM 'error' listener, which receives an Event |
| RULES-64 | medium | linter | `out` is joined or trimmed on its way out, and return-out cannot see it |
| RULES-65 | medium | linter | CSS-09 has no plain-CSS form, yet the linter applies it to `.css` files |
| RULES-66 | medium | repo | The rulebook's own code breaks FMT-27 on 88 lines and FMT-31 on 28 |
| RULES-67 | low | rules | A transformed display duration in VAR-14 against FN-02 |
| RULES-68 | low | rules | "render" in two meanings: `render_*` family and `theme_render()` |
| RULES-69 | low | rules | A self-conversion can be `to_*` or `render_*` |
| RULES-70 | low | rules | VAR-15 bans `start` outright; CORE-04 makes it a pair |
| RULES-71 | low | rules | CORE-04 gives `res` two meanings |
| RULES-72 | low | rules | FMT-25 and FILE-01 speak only of functions, though classes are allowed |
| RULES-73 | low | rules | FLOW-10 forbids order reliance; side-effect imports keep their run order |
| RULES-74 | low | rules | FLOW-09 "no mutation via shared state" against every page script |
| RULES-75 | low | rules | FMT-31 has no carve-out for SQL-01's template literal |
| RULES-76 | low | rules | SQL-02's ✓ form is a one-line statement SQL-03 forbids |
| RULES-77 | medium | examples | The VUE-10 Cancel button can take Enter from Submit (VUE-09) |
| RULES-78 | low | examples | Verb-first names outside the families remain in rule examples |
| RULES-79 | low | examples | Loop variables that are not singular; `out` as an input parameter |
| RULES-80 | low | examples | formatting.html §03 paints data as a function; no `.get()` |
| RULES-81 | medium | rules | Release commit "release v1.2.3" breaks GIT-01 |
| RULES-82 | medium | rules | LOG-01 "one infinite file" against PROJ-05's daily files |
| RULES-83 | low | rules | `npm run build` must write both `build/` and `dist/` |
| RULES-84 | low | rules | "Everything kept lives in data/" against `.env` and `config/` |
| RULES-85 | low | examples | The canonical bin/release skips step 1 of its release order |
| RULES-86 | low | repo | No real script follows templ's `cd $tempdir` |
| RULES-87 | low | examples | A group spawned for one DB query, which LOG-12/13 call noise |
| RULES-88 | low | examples | Worker groups open without group_spawn |
| RULES-89 | low | examples | MySQL-scoped SQL rules with non-MySQL examples; JOIN…ON undefined |
| RULES-90 | low | repo | About text, homepage and README disagree; the Website example points at docs |
| RULES-91 | low | examples | demos/items_by.js reads as current but names against NAME-13/VAR-10 |
| RULES-92 | medium | repo | `bin/build` output is committed, which PROJ-04 forbids |
| RULES-93 | medium | pages | A link to a rule lands up to 2.8k px away from it (UI-09) |
| RULES-94 | medium | pages | The site's CSS breaks CSS-12 and CSS-13 |
| RULES-95 | low | pages | The docked switch shifts Copy and the count by 136 px on scroll |
| RULES-96 | low | pages | Three demo pages have no switch and another dark hook |
| RULES-97 | low | examples | UI-03's form and the demos break CSS-13 |
| RULES-98 | low | pages | `pre.md` is a class with no rule (CSS-03) |
| RULES-99 | low | examples | UI-13's code does not do what UI-13 says |
| RULES-100 | medium | docs | Rulings are patched into bottom halves, which DOC-04 regenerates away |
| RULES-101 | medium | docs | The boundary rule mislabels one-part documents |
| RULES-102 | medium | docs | The model note audit_note.md cites breaks DOC-07/08/09; examples reuse real ids |
| RULES-103 | medium | docs | The newest audit note is out of DOC-07 order; its register is stale |
| RULES-104 | low | docs | GIT-03 "at most 72" against the top half's "70-72 in all" |
| RULES-105 | low | docs | Guide bottom halves add rules; two hand-over texts differ |
| RULES-106 | low | docs | The glossary format leaves no room for the author's half |
| RULES-107 | medium | guides | The guides disagree on when consequences are told |
| RULES-108 | medium | glossary | "final" ends the turn; "check" extends it after the final |
| RULES-109 | low | glossary | stop_reason names are not the APIs'; "review" is not a call |
| RULES-110 | low | glossary | A "gate" is the dialog UI-15 forbids; no scope between them |
| RULES-111 | low | glossary | every_state calls edge cases "states"; TEST-05 vs TEST-07 |
| RULES-112 | medium | index | UI-08 makes a rule of an order the author left "to decide" |
| RULES-113 | low | index | Rows that say more than, less than, or other than their sources |
| RULES-114 | low | index | Retired codes leave unexplained gaps; the header sentence is stale |
| RULES-115 | low | index | UI-01 drops "new" from its source |
| RULES-116 | low | index | UI-07 asks for a "released" version that was never released |
| RULES-117 | medium | placement | Project rules are scattered over PROJ, REL and GIT; `bin/` rules over two groups |
| RULES-118 | low | placement | The README rules are split inside PROJ |
| RULES-119 | low | placement | LINT is a group by origin; its rules belong to FMT, FLOW, FILE, CSS |
| RULES-120 | low | placement | Rules in the wrong group: FN-15, FN-16; VAR order; SQL's place |
| RULES-121 | low | placement | Audit-note rules sit under "Writing the rules" |
| RULES-122 | low | placement | docs/README.md lists 35 sources flat, with no sections |
| RULES-123 | low | linter | LINTING.md claims more coverage than the linter has |
| RULES-124 | low | linter | LINT-01 "except multiplicative ones" names the wrong operators |
| RULES-125 | low | linter | LINTING.md says the prefixes and `#-` are free; the linter constrains them |
| RULES-126 | low | linter | Typography order is neither checked nor listed as unchecked |
| RULES-127 | low | linter | LINT is "only LINTING.md"; FILE-11 and LINT-06 differ on the blank line |
| RULES-128 | low | linter | VAR-17's top half says "inside a try"; the linter says "inside a catch" |
| RULES-129 | low | repo | Functions named as nouns or a participle in `src/` |
| RULES-130 | low | repo | Repo code keeps arguments after `}` and return-only function callbacks |
| RULES-131 | low | repo | `src/config.js` is not named after its export |
| RULES-132 | low | repo | `bin/lint` calls `cli(main, report)`, a form no rule shows |
| RULES-133 | low | repo | A commit title after GIT-02 has a capital letter |

## 1. Rules that contradict each other

### RULES-57 "Write like the surroundings" has no stated rank against the written rules (medium)

- CORE-01 (`docs/rules.md:35`, `docs/README.md:8`): "write new code in the
  same way the existing code is written".
- FILE-25 (`docs/rules.md:160`, `drafts/new_code_placement.md:54-58`): "the
  new edit does not differ from what is around it … as wrong as one that
  breaks a written rule".
- Against them: VAR-06 (`:64`), "`e`, `err` and `ex` do not exist"; FMT-27,
  FMT-31 (RULES-66).
- Two cases. In a file written with `catch (err)` throughout, CORE-01 says
  continue with `err`, while VAR-06 and the linter say the name does not
  exist. A helper added to `bin/build` beside `:361`, `:394` and `:404`
  joins strings with `+` like its neighbours, which breaks FMT-31; written
  to FMT-31, it differs from every neighbour.
- The only precedence the repository states is DOC-02 (`:288`), and that one
  is about document halves.
- **Fix:** one sentence in CORE-01, such as "A written rule beats the
  surroundings; the surroundings decide what no rule covers". CORE-02
  already implies it.

### RULES-58 A short object is one line by FMT-13/18 and four lines by FMT-11 (medium)

- FMT-13 (`:105`, `FORMATTING.md:141`): keep an expression on one line when
  it fits. FMT-15 (`:107`): break only when size or nesting makes it
  necessary.
- FMT-11's canonical form (`:103`, `drafts/formatting_blocks.md:132-136`)
  spreads `const next = {uid: item.uid, parent_uid: item.parent_uid,
  index};`, 66 characters, over four lines. So does `formatting.html:1245-1249`.
- FMT-18 (`:110`, `FORMATTING.md:283`) shows the same object on one line as
  the good form.
- No line width is defined anywhere, and repository lines run past 200
  characters (`bin/build:175`, `:325`).
- **Fix:** state a width, or say when a multi-field literal breaks. Give
  FMT-11 an example that does not fit.

### RULES-59 Options methods: function expression by FMT-12, arrow by FLOW-11/LINT-03 (medium)

- FMT-12 (`:104`, `formatting_blocks.md:140-151`): an object of methods, in
  Vue options style, spells each method as a function expression.
- FLOW-11 (`:135`) says a return-only callback is an arrow. LINT-03 (`:300`,
  `LINTING.md:104`) allows a tiny arrow "as an object property value".
- `vue2/vue-globals.md:12-14` has `px: function (value) { return …; }`: it
  follows FMT-12, while FLOW-11 and LINT-03 point to an arrow.
- The linter accepts shorthand methods, arrows and function expressions
  alike (probe: exit 0).
- **Fix:** FMT-12 wins inside an options object. LINT-03's "property value"
  means factories like `default: () => []`.

### RULES-60 "A returned variable is `out`" against returning a loop variable or parameter (medium)

- VAR-02 (`:60`, `return_out.md:1`, `FORMATTING.md:232`): "If a variable is
  used in a `return` statement, it must be named `out`".
- VAR-10 (`:68`) names the loop variable after the collection, so a find
  loop writes `return user;`. Renaming it requires `const out = user;
  return out;`, which VAR-04 (`:62`) and return-out's "direct" check reject.
- The linter accepts `return user;` (probe: exit 0), following a carve-out
  that exists only in `LINTING.md:106` ("passed-through parameters and
  outer-scope values are allowed") and `docs/README.md:25`. `bin/build:391`
  relies on it with `return line;`.
- **Fix:** VAR-02 reads "a variable the function constructs and returns as
  it is, is `out`; a parameter, a loop variable or an outer value keeps its
  name".

### RULES-61 `is_` is a function marker, yet boolean data is named `is_*` (medium)

- NAME-02 (`:41`, `naming_markers.md:4-5`): `is_` makes a function. NAME-15
  (`:54`) and NAME-18 (`:57`) say the same.
- Data named `is_*` in rules and examples:
  - FMT-27's form (`:119`): `is_dev`;
  - `FORMATTING.md:180`, `:184`: `this.dev.is_ai_chat_dev`;
  - VUE-06 (`:242`, `vue2/vue-formatting.md:32`, `:36`): `is_ready`,
    `is_loading_fonts`;
  - `drafts/scroll-anchoring.html:153`, `:167`, `:218`: `is_new` as a
    field.
- With `is_ready`, the reader cannot tell whether to call it or read it.
  That is exactly the ambiguity NAME-03 forbids for `_by_`.
- **Fix:** either `is_*` is also the prefix for boolean data and leaves the
  marker list, or the data is renamed and `is_` stays for predicates.

### RULES-67 A transformed display duration in VAR-14 against FN-02 (low)

- VAR-14's form (`:72`, `var_names_time0.md:17`, `:23`):
  `` console.log(`import: ${Date.now() - time0}ms`); ``
- FN-02 (`:78`, `format_xxx.md:9-10`): a display conversion is never
  hand-rolled at a call site. `format_duration` is on FN-01's own list
  (`format_xxx.md:5`).
- **Fix:** `format_duration(Date.now() - time0)` in VAR-14, or say that a
  raw number with its unit is not a display conversion.

### RULES-68 "render" in two meanings: `render_*` family and `theme_render()` (low)

- FN-05 and FN-08 (`render_xxx.md:1-3`, `:36-38`): `render_*` derives a
  value from self, and is never async and never has side effects.
- Every page has `theme_render()`, which sets `aria-pressed` and returns
  nothing: `formatting.html:1322`, `docs/rules.template.html:1060`,
  `glossaries.template.html:1068`, `agents.template.html:962` (new in
  a3364ed) and `drafts/logs-cheatsheet.html:1178`. Also
  `drafts/scroll-anchoring.html:201`, `render(scroller)`, mutates the DOM.
- NAME-17's domain-first order makes `theme_render` the natural spelling. No
  rule separates `<domain>_render` from the `render_*` family.
- **Fix:** rule that the family is prefix-only and name DOM updaters
  differently (for example `theme_sync`), or document the second meaning.

### RULES-69 A self-conversion can be `to_*` or `render_*` (low)

- NAME-10 (`:49`, `naming_markers.md:40-41`): `_to_` is for method position,
  as in `tree.to_json()`.
- FN-05 (`render_xxx.md:1-3`, `:19-25`) and FILE-26 (`:161`,
  `new_code_placement.md`) use `render_css()` and
  `render_branding_config()`, which are machine formats. FN-04 calls that
  conversion (`format_xxx.md:18`).
- So `$x->to_json()` and `$x->render_json()` are both allowed.
- **Fix:** state the split, for example "`to_*` changes the representation;
  `render_*` derives a value".

### RULES-70 VAR-15 bans `start` outright; CORE-04 makes it a pair (low)

- VAR-15 (`:73`, `var_names_time0.md:26`): "`begin`, `start` and `t0` do
  not exist". The ban has no scope.
- CORE-04 (`:38`) lists `begin/end` and `start/finish`. The repository's
  own code uses `start` for positions: `bin/build:393` and
  `src/rules/vue_style_conventions.js:21`.
- **Fix:** scope VAR-15 to the start time of a measurement.

### RULES-71 CORE-04 gives `res` two meanings (low)

- `docs/README.md:81-84` and `:38` pair `res/rej` (resolve/reject) and
  `req/res` (request/response). `drafts/file_drop.md:60`, `:64` use
  `(res, rej)`. Inside an Express handler that would shadow `res`.
- **Fix:** drop the `res/rej` abbreviation, or say which abbreviations are
  allowed.

### RULES-72 FMT-25 and FILE-01 speak only of functions, though classes are allowed (low)

- FMT-25 (`:117`, `FORMATTING.md:6`): every named function is a `function
  name()` declaration. FMT-05 (`:98`) shows `class Logger`, whose methods
  are named but are not declarations.
- FILE-01 (`:137`, `FORMATTING.md:42`): "A library module exports one
  function". FILE-20 (`:156`) says one thing. A `Logger.js` that exports
  its class breaks FILE-01 only.
- **Fix:** FMT-25 "outside a class body"; FILE-01 "one function or class".

### RULES-73 FLOW-10 forbids order reliance; side-effect imports keep their run order (low)

- FLOW-10 (`:134`, `FORMATTING.md:220-223`): "no reliance on execution
  order side effects".
- FILE-11 (`:147`), LINT-06 (`:302`) and `imports_sorted.md:42-48` keep
  side-effect imports "in the order they run". The example is
  `import './sass/main.sass'; import './main-pre';`.
- **Fix:** name side-effect imports as FLOW-10's one visible exception.

### RULES-74 FLOW-09 "no mutation via shared state" against every page script (low)

- FLOW-09 (`:133`, `FORMATTING.md:81`). "Shared state" is never defined.
- Every page keeps module-level `let` state that functions write:
  `formatting.html:1303`, `:1362-1373`; `docs/rules.template.html:1013-1015`;
  `glossaries.template.html:1027-1029`; `agents.template.html:932`;
  `drafts/logs-cheatsheet.html:1159`.
- **Fix:** define shared state as state shared across modules or
  components, or allow a script's own module state.

### RULES-75 FMT-31 has no carve-out for SQL-01's template literal (low)

- FMT-31 (`:123`, `FORMATTING.md:209`): plain quotes for a string with
  nothing to interpolate.
- SQL-01 (`:230`, `sql.md:73-83`): a multi-line query is a template literal
  with nothing interpolated. The linter accepts it.
- **Fix:** FMT-31 "…nothing to interpolate and on one line".

### RULES-76 SQL-02's ✓ form is a one-line statement SQL-03 forbids (low)

- SQL-02's form (`:231`): `SELECT MIN(id) AS id FROM user_identities ✓
  yes`.
- SQL-03 (`:232`) puts each top-level clause on its own line. `sql.md` has
  no such ✓ line (`:87-91` shows the case rule in prose), so the index
  invented this form.
- **Fix:** show the case contrast in a multi-line form, or mark it a
  fragment.

### RULES-81 Release commit "release v1.2.3" breaks GIT-01 (medium)

- GIT-01 (`:282`, `commits.md:29`): a title is `scope: description`.
- REL-02's form (`:276`) and `packaging/packaging.md:36`, `:79`:
  `git commit -m "release v$(…)"`. That has no colon and no scope.
- Every project that copies `bin/release` makes a non-conforming commit on
  each release.
- **Fix:** `release: v$(…)` in both places and in REL-02.

### RULES-82 LOG-01 "one infinite file" against PROJ-05's daily files (medium)

- LOG-01 (`:192`): "A log is one infinite file." The source, `logs.md:2`
  (top half), says "could be thought of as one infinite file". The bottom
  half never says it.
- PROJ-05's form (`:167`) and `layout.md:13-14`, `:84`:
  `data/logs/2026-08-24.txt`, one file per day.
- A developer following LOG-01 writes one file forever. One following
  PROJ-05 rotates daily.
- **Fix:** LOG-01 "A log reads as one infinite stream; files may be split by
  day".

### RULES-83 `npm run build` must write both `build/` and `dist/` (low)

- PROJ-03 and PROJ-04 (`:165-166`, `layout.md:62`, `:69-70`, `:79-81`):
  `bin/build` wraps `npm run build` and produces `build/`, which is never
  committed.
- REL-02 (`:276`, `packaging.md:33-35`, `:76-78`): `rm -rf dist; npm run
  build; git add … dist`.
- RULES-10's ruling covers what is committed, not which command fills
  `dist/`.
- **Fix:** `bin/release` copies `build/` to `dist/`, or calls
  `npm run dist`.

### RULES-84 "Everything kept lives in data/" against `.env` and `config/` (low)

- PROJ-18 (`:180`, `data.md:12-13`): everything the program writes and
  keeps lives under `data/`, and nowhere else. PROJ-19 (`data.md:27`):
  moving the project is moving its `data/`.
- PROJ-06 (`layout.md:86-87`) keeps `.env` local. PROJ-07
  (`layout.md:91-92`) has `config/` "populated once". Both are local state
  outside `data/`, and a deploy that mounts only `data/` loses them.
- **Fix:** `data.md` says where `.env` and a populated `config/` live under
  docker.

## 2. The linter against the rules

### RULES-56 tiny-arrows and error-name demand different names for one error callback (high)

- tiny-arrows (`src/rules/tiny_arrows.js:14-16`) requires a lone arrow
  parameter to be `v`, or `error` in `.catch`. It does not look at depth,
  and it reads only `property.name`.
- error-name (`src/rules/error_name.js:5-6`, `:21-24`) requires `error` in
  `.catch` and in `on`, `once`, `addListener` and `addEventListener`
  ('error'), and `error2` inside a catch.
- Re-run for this note (`/tmp/claude-1000/verify/a01.js`):

  ```
  server.on('error', error => …)        3:24 Name this arrow parameter "v"      tiny-arrows
  server.on('error', v => …)            4:24 Name the caught error "error"      error-name
  catch: promise.catch(error2 => …)     9:23 Name this arrow parameter "error"  tiny-arrows
  catch: promise.catch(error => …)     10:23 Name the caught error "error2"     error-name
  ```

- `tests/javascript.test.js:96` counts the third line as valid, but it tests
  error-name alone. The full preset rejects it.
- Both sides are written rules: VAR-05 (`:63`) and VAR-17 (`:75`) against
  LINT-03 (`:300`).
- A one-line error-event arrow, or a one-line `.catch` arrow inside a catch,
  cannot pass `npm run lint` under any name. The only way out is a
  `function`.
- **Fix:** tiny-arrows defers to error-name on every error callback and
  shares its depth logic. LINT-03 then reads "error / error2, as VAR-05 and
  VAR-17".

### RULES-62 A one-line event arrow's parameter is `e`, `event` or `v` (medium)

- VAR-16 (`:74`, `var_names_event.md:9`, `:23-24`): `e` is allowed as the
  parameter of a one-line arrow. Its form is
  `el.addEventListener('click', e => e.stopPropagation());`.
- VAR-09 (`:67`), LINT-03 (`:300`) and `tiny_arrows.js:16` say `v`. VAR-06
  (`:64`) says `e` does not exist, with no scope.
- UI-14's form (`:270`, `drafts/file_drop.md:30-31`) uses
  `event => event.preventDefault()`.
- Re-run: VAR-16's form gives `3:34 Name this arrow parameter "v"`, and the
  file-drop block gives the same error twice.
- **Fix:** one name, which the linter says is `v`. Update VAR-16 and its
  form, and `file_drop.md:30-31` with UI-14.

### RULES-63 error-name forces `error` on a DOM 'error' listener, which receives an Event (medium)

- `error_name.js:21` includes `addEventListener`. Re-run:
  `el.addEventListener('error', function (event) {…})` gives "Name the caught
  error "error"".
- VAR-16 (`:74`) says an event handler's parameter is `event`, and VAR-01
  (`:59`) says a name states the shape of its data. A DOM error listener
  gets an `Event`, not an `Error`.
- VAR-05 (`var_names_error.md:2`, `:12`) was written for a Node emitter.
- **Fix:** scope VAR-05 to emitters that pass an `Error`, and drop
  `addEventListener` from error-name.

### RULES-64 `out` is joined or trimmed on its way out, and return-out cannot see it (medium)

- VAR-13 (`:71`, `return_out.md:26-27`, `FORMATTING.md:233`): a value that
  is joined or stringified on its way out is not `out`.
- In the repository's own code:
  - `bin/build:469-473`, `format_guides_handover`, ends with
    `return out.join('\n');` (new in a3364ed);
  - `bin/build:340` returns `out + '.'`, and `:304` returns
    `out + '</section>\n'`;
  - `docs/rules.template.html:1341` returns `out.join('\n')`, and `:1381`
    returns `out.trim()` (new in a3364ed).
- `src/rules/return_out.js:5` returns early when the argument is not an
  Identifier, so none of these is inspected.
- **Fix:** rename the five variables (`lines`, `html`, `text`). return-out
  then reports any `out` read in a return other than `return out;`.

### RULES-65 CSS-09 has no plain-CSS form, yet the linter applies it to `.css` files (medium)

- CSS-09 (`:224`, `css_classes.md:138`): a transition is never hand-written;
  use `@include app-transition(...)`.
- `src/config.js:52-56` runs vue-style-conventions on `**/*.{css,scss,sass}`.
  Plain CSS has no `@include`, so a `.css` file cannot have a transition at
  all. The rules page's `<style>`, saved as `.css` and linted, gives 28
  errors.
- The site's pages write transitions by hand (`docs/rules.template.html:463`
  and others).
- **Fix:** scope CSS-09 and the check to Sass and SCSS, or give a plain-CSS
  form.

### RULES-123 LINTING.md claims more coverage than the linter has (low)

- `LINTING.md:5-6` claims "the brace catalog in drafts/formatting_blocks.md",
  but class braces (FMT-05) are not checked: `block_layout.js:38-39` visits
  no `ClassBody`, and the probe `class Logger {` exits 0.
- `LINTING.md:196-200` lists what is not checked. Probes show these are
  unchecked too: FMT-11, FMT-12, FMT-14, FMT-26, FMT-28, FMT-29, FMT-30,
  FMT-31, FLOW-08, FLOW-11 and FILE-20/21.
- `LINTING.md:26-29` says `bin/build` renders two pages. It renders three and
  stamps two more (`bin/build:22-23`).
- **Fix:** extend the unchecked list, and name `agents.html`.

### RULES-124 LINT-01 "except multiplicative ones" names the wrong operators (low)

- `:298`: `%` is multiplicative but takes spaces, and `**` is not
  multiplicative but stays tight (`operator_spacing.js:5`, `LINTING.md:107`).
  The form also declares `const x` twice.
- **Fix:** "Spaces around operators, except `*`, `/` and `**`".

### RULES-125 LINTING.md says the prefixes and `#-` are free; the linter constrains them (low)

- `LINTING.md:108`: "the app prefixes and `#-` are left unconstrained". The
  same cell and `:161` sort them last, and the linter rejects
  `class="app-foo p10"` and `class="#-x app-foo"`.
- **Fix:** drop that clause.

### RULES-126 Typography order is neither checked nor listed as unchecked (low)

- CSS-10 (`:225`, `css_classes.md:75`): `fs*`, `fw*`, `lh*`, then alignment
  and `nowrap`. The linter passes `"c fs14"`, `"nowrap fs14 lh20"` and
  `"fs14 c lh20"`. It checks only fs and fw before lh
  (`vue_class_order.js:31`).
- **Fix:** enforce it, or list it among the unchecked rules.

### RULES-127 LINT is "only LINTING.md"; FILE-11 and LINT-06 differ on the blank line (low)

- `docs/rules.md:30` says LINT holds "rules that only LINTING.md and the
  preset spell out". But LINT-06 (`:302`) is FILE-11 (`:147`), LINT-08 is
  CSS-02, and LINT-09 is `css_classes.md:75`.
- FILE-11 and `imports_sorted.md:44` say "one blank line" between the
  blocks. LINT-06 says one "may" separate them, and the linter accepts none
  (probe: exit 0).
- The wording residue of RULES-04 is in the same draft. `:42` says "the one
  exception" and `:53` adds a second, while FILE-11 says two. `:44` says
  "named imports" where the example (`:46-50`) is a default import. `:56`
  calls the rule a stopgap.
- **Fix:** make the blank line required or optional in both places. Fix the
  wording. Drop "only" from the LINT note (see also RULES-119).

### RULES-128 VAR-17's top half says "inside a try"; the linter says "inside a catch" (low)

- `var_names_event.md:9` (top half): "a try/catch inside another one takes
  `error2`".
- `:25-26`, VAR-17 (`:75`), `error_name.js:5` and
  `tests/javascript.test.js:93` say: inside another one's catch.
- By DOC-02 the top half wins, and the linter would then be wrong.
- **Fix:** the author confirms "inside a catch" in the top half.

## 3. Examples against the rules

### RULES-77 The VUE-10 Cancel button can take Enter from Submit (VUE-09) (medium)

- `vue2/vue-form.md:6-25`: inside `<form v-on:submit.prevent="submit">`, the
  Cancel button is `<app-button-orange v-on:click="modal.return(false)">`
  with no type. Submit has `type="submit"`.
- Suppose `app-button-*` renders a native `<button>` and passes `type`
  through, as Submit's explicit type suggests. Then Cancel defaults to
  `submit`. A click on it submits, and Enter in a field clicks the first
  submit button in tree order, which is Cancel.
- That breaks VUE-09 (`:245`): Submit and Enter both reach `submit`. The
  component is not in this repository (see Not exercised).
- **Fix:** `type="button"` on Cancel, in `vue-form.md` and in the VUE-10
  form.

### RULES-78 Verb-first names outside the families remain in rule examples (low)

- NAME-17 and NAME-18 (`FORMATTING.md:88-93`): names are domain-first,
  except for the listed families and "the steps of a script", which is not
  defined.
- Examples that break it:
  - FN-12's form (`:88`, `refresh.md:26`, `:29`): `fetch_user()`;
  - `var_names_error.md:6`: `process_note`;
  - `var_names_time0.md:16`, `:22`: `run_import`;
  - `var_names_event.md:18`, `:30`, `:34`;
  - `FORMATTING.md:118-135`: `sync_settings`, `toggle_sound`;
  - `FORMATTING.md:162`, `:165`, the FMT-30 good example: `find_families`;
  - `bin/lint:39`: `report`.
- These are what remains of RULES-08.
- **Fix:** rename them domain-first, or define "step".

### RULES-79 Loop variables that are not singular; `out` as an input parameter (low)

- VAR-10 (`:68`) is broken by:
  - `drafts/file_drop.md:68`: `child of entries`;
  - `docs/rules.template.html:1135`: `rule_el of rules`; `:1172` and
    `:1180`: `group_el of section_els` (new in a3364ed);
  - `src/helpers/class_values.js:63-64`;
  - `src/rules/vue_class_order.js:22`;
  - `drafts/scroll-anchoring.test.js:32`.
- `drafts/file_drop.md:56`: `entry_files_read(entry, out)` takes `out` as an
  accumulator passed in. VAR-03 says `out` never leaves its function.
- **Fix:** rename them.

### RULES-80 formatting.html §03 paints data as a function; no `.get()` (low)

- `formatting.html:1160` puts the `.fn` highlight on `users_by_role`, which
  is data. `:1163` leaves out NAME-03's "or `.get()` on a Map".
- **Fix:** move `.fn` to `users_group_by_role`, and add `.get()`.

### RULES-85 The canonical bin/release skips step 1 of its release order (low)

- REL-02 (`:276`, `packaging.md:23`) starts with "Ensure that there are no
  changes". The script at `packaging.md:44-83` never checks. It builds
  `dist/` from a dirty tree and tags it.
- **Fix:** `git diff --quiet HEAD || { echo uncommitted changes >&2; exit 1; }`
  before `npm version`.

### RULES-87 A group spawned for one DB query, which LOG-12/13 call noise (low)

- LOG-12 (`:203`) and LOG-13 (`:204`) say not to spawn a group for one short
  call.
- `logs.md:232-234`, the cheatsheet (`:893-895`) and LOG-02's form (`:193`)
  spawn `cd8e5vqp` for one `select_users` query, with nothing between its
  begin and its end.
- **Fix:** log the query on the request group, or say that a timed-out DB
  call earns a group.

### RULES-88 Worker groups open without group_spawn (low)

- LOG-06 (`:197`, `logs.md:109`, cheatsheet `:944`): a group's first event
  is `group_spawn`.
- LOG-10's form (`:201`, `logs.md:129-133`) and the cheatsheet (`:898-902`)
  open with `[mp4gif_worker_begin]`.
- **Fix:** add the spawn lines, or label the snippet as a fragment.

### RULES-89 MySQL-scoped SQL rules with non-MySQL examples; JOIN…ON undefined (low)

- `sql.md:1` and `:68` scope the rules to MySQL. The index rows
  (`:230-235`) drop that scope.
- `CREATE UNIQUE INDEX … WHERE …` (`sql.md:34-39`, `:113-118`, SQL-03's
  form) is a partial index, which MySQL does not have. `DROP INDEX name`
  without `ON table` (`sql.md:60-63`, `:120-121`) is not MySQL either.
- SQL-03 lists `ON` as a clause, so it is unclear whether a JOIN's ON gets
  its own line. `sql.md:22` keeps `GROUP BY` on the WHERE line, against
  `:151`.
- **Fix:** state the dialect in the index, or make the examples neutral.
  Add a JOIN example.

### RULES-91 demos/items_by.js reads as current but names against NAME-13/VAR-10 (low)

- `docs/README.md:56` marks only `item_to.js` as superseded.
- `demos/items_by.js:17-18`: `inventory_grouped_by_type`. NAME-13 (`:52`)
  prefers a countable noun.
- `:24`: `array_group_list` has no `_by_`. `:27`: `item of array`.
- **Fix:** rename these, or mark the demo as superseded too.

### RULES-97 UI-03's form and the demos break CSS-13 (low)

- `drafts/theme_switch.md:24-31`, and UI-03's form (`:259`) copied from it,
  have no blank line between `}` and `:root[data-theme="dark"] {`.
- The demo pages are the same (`scroll-anchoring.html:18-19`,
  `file-drop.html:16-17`, `no-confirmations.html:18-19`,
  `page-header-structure.html:17-18`), and put `html, body {` on one line
  (CSS-12).
- **Fix:** add the blank line, regenerate the row, and reflow the demos.

### RULES-99 UI-13's code does not do what UI-13 says (low)

- UI-13 (`file_drop.md:19-22`): the drop takes the input's `accept`, honours
  `multiple`, and takes folders only when the input does.
- The code at `:33-54` passes every entry to `take(files)` unchecked, and
  `:75-76` calls `take` "the same function the input's change handler
  calls". A single-file picker never returns three files, but a drop can.
- **Fix:** filter in `file_drop_bind`, or say that `take` must.

## 4. The repository against its own rules

### RULES-66 The rulebook's own code breaks FMT-27 on 88 lines and FMT-31 on 28 (medium)

- FMT-27 (`:119`, `FORMATTING.md:173`) breaks:
  - `bin/lint:19`, `:34`, `:55`;
  - `src/rules/imports_sorted.js:19`, `:31`, `:34`, `:39`, `:43`, `:61`,
    `:86`;
  - `docs/rules.template.html:913`, the page that publishes FMT-27;
  - `drafts/theme_switch.md:45`;
  - 57 lines in `src/`, 7 in `bin/`, 22 in pages and 2 in tests.
- FMT-31 (`:123`, `FORMATTING.md:208`) breaks:
  - `bin/lint:69`;
  - `bin/build:312`, `:340`, `:361`, `:394`, `:404`, and the `+` chains at
    `:172-177`, `:323-327`, `:486-494` (partly new in a3364ed);
  - `src/style_processor.js:6`;
  - `src/rules/block_layout.js:15`;
  - `vue_style_conventions.js:13-16`;
  - `src/helpers/vue_styles.js:58`, `:66`, `:109`;
  - `docs/rules.template.html:1317`, `:1348`, `:1372` (new in a3364ed).
- `npm run lint` passes all of them. `LINTING.md:199` admits that
  parentheses are not checked; template literals are not mentioned.
- Combined with RULES-57, new code next to these lines has no correct form.
- **Fix:** a mechanical rewrite of these lines, or rules that apply to new
  code only. Prefer the rewrite, and enable `prefer-template`.

### RULES-92 `bin/build` output is committed, which PROJ-04 forbids (medium)

- PROJ-04 (`:166`, `layout.md:79-80`): "`build/` holds what `bin/build`
  produced. Never committed".
- `bin/build` writes committed files outside `build/`:
  - `:32` writes `docs/rules.html`;
  - `:42` writes `docs/glossaries.html`;
  - it writes `docs/agents.html` as well;
  - `:57-63` rewrites `formatting.html` and the cheatsheet in place.
- `npm run check` fails unless that output is committed.
- PROJ-03 (`:165`) calls `bin/build` a thin wrapper over `npm run build`. It
  is a 584-line program, and `package.json` has no build script.
- **Fix:** say in PROJ-04 that generated pages are committed sources, or name
  the verb `bin/pages`.

### RULES-93 A link to a rule lands up to 2.8k px away from it (UI-09) (medium)

- UI-09 (`:265`): what the reader looks at stays where it is.
- `bin/build:375-377` renders figures as `<img loading="lazy">` with no
  width or height, as `width:100%; height:auto`
  (`docs/rules.template.html:603-607`), under `scroll-behavior: smooth`
  (`:66`). The smooth scroll aims before the pictures above the target have
  a height.
- Measured for this note at 1280×800 over a local HTTP server, 3 s after
  navigation:

  | Hash | Top of the target |
  |---|---|
  | `#UI-16` | 2507 px |
  | `#DOC-01` | 2810 px |
  | `#FN-01` (control, no picture above it) | 108 px |

  Every link to a rule below UI-06 lands off screen.
- **Fix:** write each picture's width and height, or an `aspect-ratio`, in
  `bin/build`.

### RULES-94 The site's CSS breaks CSS-12 and CSS-13 (medium)

- CSS-12 (`:227`): one selector per line. There are one-line lists in
  `docs/rules.template.html:85` (`code, pre {`), `:398` and 15 more; 11 in
  glossaries, 9 in agents, 7 in formatting.html and 10 in the cheatsheet.
- CSS-13 (`:228`): one blank line between rules, never two, never none:
  - 21 rules with no blank line between them in the cheatsheet (`:389-395`,
    `:673-680`);
  - 3 blank lines at `agents.template.html:444-447` (new in a3364ed);
  - 2 blank lines at `formatting.html:303-305`.
- The page that marks `.docs th, .docs td` as ✗ is built from CSS that does
  the same. No linter checks CSS-12 or CSS-13.
- **Fix:** reflow the page CSS, or scope the two rules.

### RULES-95 The docked switch shifts Copy and the count by 136 px on scroll (low)

- UI-05 (`:261`, `theme_switch.md:69-72`) docks a collapsed copy of the
  switch that expands when the header scrolls away.
- On `docs/rules.html` at 1280 px, `#count` moves from x=1135 to x=999, and
  the Copy button from x=1219 to x=1083 (new in a3364ed). At 375 px both
  move 114 px. UI-09 says only the reader's clicks may move things.
- **Fix:** reserve the docked width.

### RULES-96 Three demo pages have no switch and another dark hook (low)

- `drafts/page-header-structure.html`, `file-drop.html` and
  `no-confirmations.html` use `html.dark` set from `?dark`, and have no
  switch.
- This goes against UI-01 (`:257`) and UI-03 (`:259`). The page that draws
  the header with a switch has none itself. `scroll-anchoring.html`
  complies.
- **Fix:** add data-theme and a switch, or exempt render sources in UI-01,
  as `img/cover.html` already is.

### RULES-98 `pre.md` is a class with no rule (CSS-03) (low)

- `docs/agents.html` (`bin/build:493`) has `<pre class="md" hidden>`, which
  is only a JavaScript hook. It is the only such class in all templates and
  demos (new in a3364ed).
- **Fix:** use a `data-` attribute.

### RULES-86 No real script follows templ's `cd $tempdir` (low)

- PROJ-15's form (`:177`) and `bin/templ:20`: `cd $tempdir`. `bin/configure:19`
  and the canonical `bin/release` (`packaging.md:62`) use
  `cd $scriptdir/..`. They create a temp directory and never use it. They
  echo none of templ's diagnostics either (`:22-25`).
- `docs/README.md:20` says "all scripts follow bin/templ".
- What is left of RULES-11.
- **Fix:** templ or PROJ-15 says a project script cds to `$scriptdir/..`.

### RULES-90 About text, homepage and README disagree; the Website example points at docs (low)

- PROJ-24 (`:186`): one sentence in the README, the About text and
  `package.json`. The About text on GitHub reads "Rules for naming files,
  functions, classes, methods, variables, etc.". The README (`:13`) and
  `package.json` read "Rules for naming, formatting, project layout and UI,
  so all code reads the same way". The picture `readme-structure.html`,
  which PROJ-20 shows, draws the old sentence.
- PROJ-25 (`:187`): About's Website equals `homepage`. About has
  `…github.io/rules/`, and `package.json` has `…/rules/docs/rules.html`.
- PROJ-25's example link is this site, which redirects to the docs
  (`index.html:6`), and `readme.md:60-66` says to leave such a link out.
  `readme.md:6` (top half) still says "rules has one".
- `docs/README.md:93` describes the agents glossary as 5 of its 9 groups.
- **Fix:** update the About text and homepage, use a project with its own
  site as the example, and regenerate the picture.

### RULES-129 Functions named as nouns or a participle in `src/` (low)

- NAME-01 and NAME-02 (`:40-41`) are broken by:
  - every `src/rules/*.js` create function (`return_out`, `error_name`,
    `tiny_arrows`, …);
  - `imports_sorted` (`imports_sorted.js:1`), a participle;
  - the helpers `class_values`, `class_category` and `vue_styles`;
  - `rules_config`;
  - `px()` and `uid()` (`vue-globals.md:12`, `:22`).
- `imports_sorted.js:53` and `:81` put `_is_` in mid-name.
- **Fix:** rule that an ESLint create function is named after its rule id,
  and rename the rest.

### RULES-130 Repo code keeps arguments after `}` and return-only function callbacks (low)

- FMT-30 (`:122`, `FORMATTING.md:155-159`, the bad example is
  `page.evaluate(function …, text)`) is broken by:
  - `drafts/scroll-anchoring.test.js:52-69`, which has exactly that shape;
  - `setTimeout(function () {…}, 1400)` in all three templates;
  - `defineTemplateBodyVisitor({…}, {…})`;
  - `bin/build:560-562`, `.replace(…, function …).split('**')` (new in
    a3364ed).
- FLOW-11 (`:135`) is broken by `.catch(function (error) { return …; })` in
  three templates and `sass_keyframes_normalize.js:26-28`.
- The linter accepts both patterns.
- **Fix:** rewrite them, the test file first.

### RULES-131 `src/config.js` is not named after its export (low)

- FILE-20 (`:156`): a file is named after its export. `src/config.js:61`
  exports `rules_config`, and `package.json` publishes it as `./config`.
- **Fix:** rename the file and keep `./config` in the exports map, or list it
  as a FILE-24 exception.

### RULES-132 `bin/lint` calls `cli(main, report)`, a form no rule shows (low)

- FILE-13 and FILE-19 (`:149`, `:155`) show `cli(main);`. `bin/lint:14`
  passes a reporter, which `cli` supports. `cli_main.md` never mentions it,
  and `:1-2` still mentions a "bare main(); call" that no longer exists.
- **Fix:** one line in `cli_main.md`.

### RULES-133 A commit title after GIT-02 has a capital letter (low)

- GIT-02 (`:283`), adopted in 80efc08 on 2026-10-04: titles are all
  lowercase.
- a3364ed reads "rules: a title on every rule; an Agents page; …". The title
  was my suggestion. The other 8 titles since 80efc08 comply, and all 40
  are within 72 characters and in `scope:` form.
- **Fix:** none; commits are not rewritten.

## 5. Two-half documents and audit notes

### RULES-100 Rulings are patched into bottom halves, which DOC-04 regenerates away (medium)

- DOC-01 and DOC-04 (`:287`, `:290`): the bottom half restates the top. It
  is regenerated, never edited.
- Commit 6521671 added the `dist/` ruling only to the bottom half of
  `layout.md` (`:64`, `:81-83`). The top half (`:1-45`) has no `dist/` at
  all, so PROJ-04's `dist/` clause exists only in the AI half.
- 06541ca rewrote `css_classes.md:106-108` below the separator.
- `audit_note.md`'s bottom half (`:42-46`, `:57-60`) has no basis in its top
  half (`:1-5`), and DOC-10 rests on it.
- The same holds for the agent guides (RULES-105).
- Regenerating any of these, as DOC-04 says, erases the ruling.
- **Fix:** the author carries each ruling into the top half, or WRITING.md
  says a ruling may live in the bottom half and must survive regeneration.

### RULES-101 The boundary rule mislabels one-part documents (medium)

- DOC-05 (`:291`, `WRITING.md:9-10`): the bottom half starts at the first
  `#` heading.
- 15 drafts have no `#` heading, so by the rule they are all top half, and
  DOC-03 forbids an AI to touch them. Yet they are written as bottom-half
  prose. The 15 are `cli_main`, `endpoint_comment`, `for_of`,
  `for_i_end_ii_jj_kk`, `format_xxx`, `formatting_blocks`, `naming_markers`,
  `render_xxx`, `return_out`, `value_label`, `var_names`, `var_names_error`,
  `css_classes`, `imports_sorted` and `refresh`.
- `interactions-should-return-only-boolean-flag.md:1` opens with `#`, and
  `:3-4` holds an author bullet.
- **Fix:** WRITING.md says who owns a one-part document, or names an
  explicit marker.

### RULES-102 The model note audit_note.md cites breaks DOC-07/08/09; examples reuse real ids (medium)

- `audit_note.md:5` (top half) cites `notes/audit-2026-09-02.md` as the
  model. That note has no `## Scope` and no "not exercised" list (`:8-11`),
  no register, and ids like `### 1.1` (`:39`).
- The register example in `audit_note.md:37-38`, and DOC-09's form (`:295`),
  use `RULES-01` and `RULES-02` for invented findings. The real ones are
  different (`audit-2026-09-20.md:100`, `:126`), and DOC-09 says ids are
  never reused.
- **Fix:** cite `audit-2026-09-20.md`, and use `DEMO-01` in the examples.

### RULES-103 The newest audit note is out of DOC-07 order; its register is stale (medium)

- `notes/audit-2026-09-23.md` runs §7 Status of prior findings, §8 What is
  good, §9 Order of work, the appendix, then §10 "Status at the end of the
  day" (`:626`) after the inventory. DOC-07 (`:293`) puts "what is good"
  first.
- The register (`:104-170`) still lists RULES-01..55 as open. Only §10 closes
  27 of them, and DOC-06 makes the register the issue list.
- `audit-2026-09-20.md:25` cites "section 9" for prior findings, which are
  in §7.
- DOC-10 says notes stay untracked. All three are tracked.
- **Fix:** `audit_note.md` says how a same-day status is recorded (in the
  register's status column), and whether notes are tracked. This note is
  left untracked, as DOC-10 says.

### RULES-104 GIT-03 "at most 72" against the top half's "70-72 in all" (low)

- `commits.md:25` (top half): "70-72 characters in all". GIT-03 (`:284`) and
  the bottom half (`:29`, `:39`) say "at most 72". The examples are 38-63
  characters.
- **Fix:** the author rewords the top half, if "at most" is meant.

### RULES-105 Guide bottom halves add rules; two hand-over texts differ (low)

- `every_state_before_done.md:55-57` (rule 4: the crowded case goes into the
  e2e test) has no source in the top half. `consequences_first.md:21-31`
  rests on a three-line top half.
- "Copy for an agent" (`bin/build:493`) copies the bottom half only. The
  CLAUDE.md block (`bin/build:467-471`) links the raw files with both
  halves.
- **Fix:** the author adds the points to the top halves, and picks one
  hand-over text.

### RULES-106 The glossary format leaves no room for the author's half (low)

- `bin/build:188-190` requires line 1 to be `# Name (TAG)`, so by DOC-05 a
  glossary is all bottom half.
- The entries are the author's words (`testing.md:18`, `doc.md:5-6`).
  RULES-25 was filed as the author's text.
- **Fix:** one line in WRITING.md or in the glossary header saying whose
  words a glossary is.

## 6. Glossaries and agent guides

### RULES-107 The guides disagree on when consequences are told (medium)

- `agents/one_example_all_cases.md:65-67` (rule 5) and `agents/README.md:8`
  say to name the consequences before making the change.
- `agents/consequences_first.md:28-31` and
  `every_state_before_done.md:58-62` say that only a consequence that makes
  the change a poor one is told first. What was decided is told
  afterwards, for information.
- An agent following the first stops before every sweep. One following the
  second reports afterwards.
- **Fix:** one statement: told first only when the consequence makes the
  change poor, or is ambiguous; everything else afterwards. Align
  one_example rule 5 and the README line with it.

### RULES-108 "final" ends the turn; "check" extends it after the final (medium)

- `glossaries/agents.md:37` defines a turn as running through to the final.
  `:55` says the final ends the turn. `:100` says a check re-prompts after
  the final and extends the turn.
- So it is unclear whether `max_rounds` (`:80`) and `budget` (`:81`) still
  apply after a failed check.
- **Fix:** the turn ends at the last final after the checks, or a check
  starts a new turn.

### RULES-109 stop_reason names are not the APIs'; "review" is not a call (low)

- `:56` says the stop_reason names "are the API's". `final` and `tool_call`
  are not: Anthropic uses `end_turn` and `tool_use`, and OpenAI uses `stop`
  and `tool_calls`.
- `:101` says a review is "one extra call … or a human". `:35` defines a call
  as a request to the model.
- **Fix:** say the names are the glossary's own and give the mapping. Call a
  review "one extra pass".

### RULES-110 A "gate" is the dialog UI-15 forbids; no scope between them (low)

- `glossaries/agents.md:68-70`: a gate is user approval before a destructive
  tool runs, and it is on by default. An embedded agent works in an app.
- UI-15..17 (`:271-273`) forbid the confirmation box in an app.
- **Fix:** one sentence. Approving an agent's action is not the user's own
  action, so UI-15 does not cover it, or it does and a gate becomes an undo.

### RULES-111 every_state calls edge cases "states"; TEST-05 vs TEST-07 (low)

- `testing.md:13-15` names input extremes Edge Cases.
  `every_state_before_done.md:40-45` calls them "states", then uses "states"
  at `:46` for loading, error and disabled. "e2e" (`:55`) is not defined.
- The example of TEST-05, Intermittent Failure (`testing.md:39-45`), is a
  TEST-07 Flaky Test, and nothing separates the two.
- **Fix:** "edge cases" for inputs and "states" for the element. Define e2e.
  Separate a failing system from a failing test.

## 7. Index fidelity

Every row was read against its source. The ones that drift are below;
RULES-76, RULES-82 and RULES-124 are index rows too, filed where their
conflict is.

### RULES-112 UI-08 makes a rule of an order the author left "to decide" (medium)

- `page_header.md:7` (top half): "The order of the two on the right: the
  same on every page; to decide."
- The bottom half (`:38-41`) and UI-08 (`:264`) decide it: the theme switch,
  then GitHub. By DOC-02 the top half wins.
- **Fix:** the author decides and writes it in the top half, or UI-08 says
  the order is open.

### RULES-113 Rows that say more than, less than, or other than their sources (low)

| Row | Index | Source |
|---|---|---|
| CORE-01 `:35` | adds "Uniformity outranks personal preference" | `docs/README.md:8`: not there |
| CORE-02 `:36` | adds "silence is not permission"; drops "functions" | `docs/README.md:11` |
| CORE-04 `:38` | adds "not from invention" | `docs/README.md:69-87`: a bare list |
| NAME-03 `:42` | cites naming_markers.md | the sentence is in `docs/README.md:127-128` |
| NAME-07, NAME-08 `:46-47` | cite naming_markers.md | the sentences are in `docs/README.md:137`, `:145-146` |
| NAME-10 `:49` | "only" | `naming_markers.md:39-41`: "prefer" |
| VAR-09 `:67` | "is named `v`" | `FORMATTING.md:37`: "Prefer `v`"; the linter makes it an error |
| CSS-06 `:221` | title "The x class comes before its setter" | its own second example `m5 xml` is the other way; source heading "Broad before narrow" (RULES-16) |
| FMT-16 `:108` | "— nothing else" | not in the source |
| REL-01 `:275` | "Ship a prebuilt dist/" | `packaging.md:20-21`: "can do the same" |
| LOG-21 `:212` | "Keep one log line under 2k" | `logs.md:201`: "Try to keep" |
| PROJ-20 `:182` | website link "may be absent" | `readme.md:21-23`: only when the website is the docs |
| SQL-05 `:234` | "stays on one line" | `sql.md:30`: "can stay" |
| DOC-06..10 | no report-only clause | `audit_note.md:55`: a finding in the author's text is reported only |

**Fix:** align each row, cite `docs/README.md` for NAME-03, NAME-07 and
NAME-08, and add the report-only clause to DOC-09.

### RULES-114 Retired codes leave unexplained gaps; the header sentence is stale (low)

- FMT-06, FILE-22 and LINT-05 are missing. They were retired in bc2c553,
  f1f9b95 and eb3d533.
- `docs/rules.md:8-9` reads "a rule that page does not carry is appended". It
  describes a time before `rules.html` was generated. Nothing says a code is
  never reused.
- **Fix:** "Retired codes are never reused: FMT-06, FILE-22, LINT-05."

### RULES-115 UI-01 drops "new" from its source (low)

- `theme_switch.md:1` and `:8` say "every new UI". UI-01 (`:257`) says
  "every screen". The wider scope comes from `page_header.md:3`, which UI-01
  does not cite.
- **Fix:** cite `page_header.md` too.

### RULES-116 UI-07 asks for a "released" version that was never released (low)

- UI-07 (`:263`, `page_header.md:26`): "its released version". Every header
  shows v0.1.0, and `git tag` is empty. By REL-02, a release ends in a tag.
- **Fix:** tag v0.1.0, or say "current version".

## 8. Placement: is every rule where it belongs

The author's question: the project rules (`bin/`, `bin/build`, `bin/run`,
`bin/configure`) and the README rules are project-layout matters, so are
they in the project section?

### RULES-117 Project rules are scattered over PROJ, REL and GIT; `bin/` rules over two groups (medium)

- The groups run CORE, NAME, VAR, FN, FMT, FLOW, FILE, **PROJ**, LOG, CSS,
  SQL, VUE, UI, **REL**, **GIT**, DOC, LINT (`docs/rules.md:12-30`). How a
  project is laid out, released and committed sits in three groups that are
  far apart.
- The `bin/` rules:
  - PROJ-01 (the verbs), PROJ-02 (configure after pull) and PROJ-03 (run,
    test, build and watch wrap npm);
  - PROJ-15 (follow templ), PROJ-16 and PROJ-17 (configure asks up front,
    sudo once);
  - REL-04 (one command releases), REL-05 (bash strict mode, which repeats
    PROJ-15) and REL-06 (usage to stderr, exit 1).
- **Proposal:** one project block, in this order:
  - **PROJ**, the layout (PROJ-01, 04-11, 13, 14, 18, 19);
  - **BIN**, the scripts (PROJ-02, 03, 15-17, REL-04-06);
  - **README** (RULES-118);
  - **REL** (REL-01-03);
  - **GIT**.

  Then LOG, then CSS, VUE and UI together. SQL moves up beside FMT.

### RULES-118 The README rules are split inside PROJ (low)

- PROJ-12 ("Keep the README short", from `layout.md`) sits apart from
  PROJ-20..28 (from `readme.md`), with PROJ-13..19 between them.
- **Proposal:** a README group of PROJ-12 and PROJ-20..28. UI-06..08 (the
  page header) are its counterpart for the site.

### RULES-119 LINT is a group by origin; its rules belong to FMT, FLOW, FILE, CSS (low)

- Every other group is a subject. LINT is "stated by the linter".
- Its rules belong elsewhere:
  - LINT-01 and LINT-02 are FMT;
  - LINT-03 and LINT-04 are FLOW, and repeat FLOW-06 and FLOW-02;
  - LINT-06 and LINT-07 are FILE, and repeat FILE-08..11 and FILE-17;
  - LINT-08..11 are CSS;
  - LINT-12 is VUE.
- The same subject is stated twice in two groups, and the two copies drift
  (RULES-127).
- **Proposal:** move each LINT rule to its subject group, and mark enforced
  rules with a badge instead.

### RULES-120 Rules in the wrong group: FN-15, FN-16; VAR order; SQL's place (low)

- FN-15 ("Guards return early") is control flow, so FLOW.
- FN-16 ("One public entry function per file") is FILE, and repeats FILE-01
  and FILE-21.
- VAR-17 (`error2`) sits away from VAR-05 and VAR-06 (error names). VAR-13
  ("A transformed result is not out") sits away from VAR-02 and VAR-03.
- SQL, which is code layout, sits between CSS and VUE.
- **Proposal:** move FN-15 to FLOW and FN-16 into FILE. Order VAR by topic.
  Move SQL beside FMT.

### RULES-121 Audit-note rules sit under "Writing the rules" (low)

- DOC-06..10 are about `notes/` in any project. DOC's note says "how a
  document in this repo is built".
- **Proposal:** an AUDIT group, or the project block under `notes/`
  (PROJ-13).

### RULES-122 docs/README.md lists 35 sources flat, with no sections (low)

- `docs/README.md:21-56` is one list. The project documents (`layout`,
  `readme`, `configure`, `data`, `commits`, `packaging`) are at `:40`, `:41`,
  `:46`, `:47`, `:53` and `:55`. Naming, UI and logs documents are mixed in
  between.
- **Proposal:** the same sections as the index groups.

## 9. What is good

- **The naming grammar holds together.** Bare `_by_` is data, and
  `_group_by_` and `_sort_by_` are functions. The participle exceptions
  agree across four documents. `_from_` is result first and never a lookup.
  `_to_` is banned in data. format and render are split by input against
  self.
- **The index is accurate where it matters.** Apart from the rows in
  section 7, every row matches its source. The counts (258, 17, 47) are
  exact. Every source and picture exists, and all 442 internal links
  resolve.
- **The build is reproducible.** All five pages rebuild byte for byte, and
  `npm run check` guards that. 215 tests pass, lint is clean, and
  `npm audit` reports 0.
- **The linter matches its documentation** on 26 class-order edge cases,
  and on brace placement, operator spacing, imports and return-out. Its
  preset matches `LINTING.md:114-119`.
- **Prior work landed.** 36 of the 55 prior findings are fixed and 4 more
  partly, including every high one.
- **The UI rules are followed on the site.** Every page has the header, a
  docked switch, data-theme and no horizontal overflow at 375 px. There is no
  `confirm()`. The scroll-anchoring demo measures exactly as its table says.
- **The agent guides agree with the rules** where it counts. Their "ask
  once" covers scope and ambiguity, not the user's own action, so it does
  not clash with UI-15. "Change them all" agrees with CORE-01, CORE-02 and
  FILE-25.

## 10. Recommended order of work

1. **RULES-56**: make tiny-arrows defer to error-name. A one-line error
   arrow cannot pass today. Then settle the `e`/`event`/`v` question
   (RULES-62) and RULES-63 in the same change.
2. **RULES-57**: one sentence of precedence in CORE-01. It decides how
   RULES-66 and RULES-130 are fixed.
3. **RULES-93**: write picture sizes in `bin/build`. Links to rules land
   off screen.
4. **RULES-100 and RULES-101**: decide how rulings live in two-half
   documents and who owns one-part documents, before the next
   regeneration erases a ruling.
5. **RULES-117..122**: regroup the index. The author asked for this, and
   it is mechanical once the groups are agreed.
6. **RULES-60, 61, 58, 59**: settle the wording of the naming and layout
   rules that disagree.
7. **RULES-66, 64, 130, 94**: bring the repository's own code and CSS in
   line. This is mechanical, and adding `prefer-template` helps.
8. **RULES-81, 82, 92, 83, 84**: the project, release and logs edges.
9. **RULES-107, 108**: align the agent guides and the agents glossary.
10. The low findings in the index (RULES-113..116) and the examples, in any
    order.

## 11. Status of prior findings

| Id | Status | Evidence today |
|---|---|---|
| RULES-01 | fixed | `src/config.js:23-26` bans no classes; FLOW-09 keeps "no prototypes" |
| RULES-02 | fixed | `FORMATTING.md:225`; FILE-17 scoped to this repository |
| RULES-03 | fixed | FILE-22 dropped in f1f9b95 |
| RULES-04 | fixed | three blocks agree; wording residue in RULES-127 |
| RULES-05 | fixed | `css_classes.md:66-67` = LINT-08; `flex-row flex-wrap gap5` passes |
| RULES-06 | fixed | `FORMATTING.md:232` "`return out;`, exactly" |
| RULES-07 | fixed | `naming_markers.md:4-5` |
| RULES-08 | fixed | NAME-18; example residue in RULES-78 |
| RULES-09 | partly fixed | module-level `if`/`for`/`while` banned (`FORMATTING.md:247`); but `:44`, `:243` "after all global initialization" vs `:247` "no executable code other than cli(main)"; `bin/lint:9-12` |
| RULES-10 | fixed | `layout.md:79-81`; residue in RULES-83 |
| RULES-11 | fixed | strict mode, mktemp, trap; residue in RULES-86 |
| RULES-12 | fixed | `docs/README.md:127-128` `.get()` |
| RULES-13 | withdrawn | vue-modal practice (author, 2026-09-23) |
| RULES-14 | partly fixed | the index is consistent; `theme_switch.md:15-16` "does not inherit" vs `:35-37` reads the OS once |
| RULES-15 | still open | `LINTING.md:112` "a design call" vs `css_classes.md:144-146` "on the base rule" |
| RULES-16 | partly fixed | source heading fixed; the new CSS-06 title (a3364ed) restates the old claim against its own `m5 xml` |
| RULES-17 | still open | FMT-19 `:111` "intent or policy only" vs FMT-21 `:113`, `endpoint_comment.md:8` |
| RULES-18 | fixed | `vue-form.md:6-7` |
| RULES-19 | fixed | `demos/items_by.js:26-32`; other names in RULES-91 |
| RULES-20 | fixed | `demos/item_to.js:4-6` Superseded |
| RULES-21 | fixed | FN-13 `:89` |
| RULES-22 | fixed | `docs/README.md:18` = 258 |
| RULES-23 | fixed | `logs.md:9` four fields |
| RULES-24 | fixed | no References fragment |
| RULES-25 | still open | `testing.md:18` "Error Flood … (?)", published as TEST-06 |
| RULES-26 | still open, report only | `logs.md:8`, `:46`, `:58`, `:59` |
| RULES-27 | fixed | every draft linked from `docs/README.md` |
| RULES-28 | still open, and drifting | `docs/README.md:107-132` vs `var_names.md:1-31`; README offers `_grouped_by_` "or" a countable noun, NAME-13 says "prefer" |
| RULES-29 | still open | `img/logo-by-chat-gpt.png`, 1,379,545 bytes, unreferenced |
| RULES-30 | won't-fix | the author, 2026-09-23 |
| RULES-31 | fixed | `packaging.md` placeholders gone |
| RULES-32 | partly fixed | `vue-globals.md:21` warns; `:23` still uses `this._uid` |
| RULES-33 | withdrawn | ruled: `LINTING.md:104` "any number of parameters" |
| RULES-34 | fixed | LINT-02 cites LINTING.md |
| RULES-35 | fixed | `class="p30 fluid"` fails |
| RULES-36 | fixed | `bin/lint:27-29`, `:33-35` |
| RULES-37 | fixed | one `npx vbarbarosh/rules` form everywhere |
| RULES-38 | fixed | `bin/lint:19-21`, `:68-69` |
| RULES-39 | fixed | `npm audit` 0 |
| RULES-40 | fixed | five pages: header, docked switch, data-theme, no overflow at 375 px (driven) |
| RULES-41 | fixed | `bin/build` generates every page; `check` diffs them |
| RULES-42 | fixed | WORD-01 vs DOC-01 |
| RULES-43 | fixed | five pages link each other; README links glossaries |
| RULES-44 | withdrawn | browser `main();` (author); the page scripts lint clean |
| RULES-45 | fixed | `img/cover.html:146-156`, `formatting.html:1186-1196` |
| RULES-46 | fixed | no `const out = {` in formatting.html |
| RULES-47 | fixed | cheatsheet `:940` four fields |
| RULES-48 | fixed | `vue-form.md:6` `<form …>` |
| RULES-49 | fixed | `testing.md:43` `response` |
| RULES-50 | fixed | `vue-globals.md:7`, `:26` `value` |
| RULES-51 | still open, report only | `vue-components.md:12-13` mounted before created |
| RULES-52 | still open, wider | `render_xxx.md:5-10` and now `new_code_placement.md:64-76`: PHP with its own brace style, no language scope |
| RULES-53 | still open | `bin/` has no test, run, watch or release; unit tests in `tests/`; `formatting.html` at the root; pictures in `drafts/` and `agents/`; no `.env.example` or Dockerfile |
| RULES-54 | still open | `WRITING.md:44-45` names 3 of 24 two-half documents; three separator styles; DOC-05's form shows ✨ |
| RULES-55 | still open, grown | snake_case `.md` beside kebab-case `.html` and `.png`: `file_drop`/`file-drop`, `no_confirmations`/`no-confirmations`, `every_state_before_done`/`every-state-alert` |

Tally: 36 fixed, 4 partly fixed (09, 14, 16, 32), 11 still open (15, 17, 25,
26, 28, 29, 51, 52, 53, 54, 55; 26 and 51 are report only), 3 withdrawn
(13, 33, 44), 1 won't-fix (30).

## Appendix: file inventory

| Path | Files | What |
|---|---:|---|
| `drafts/` | 53 | 34 rule documents, the pictures and demo pages, the logs cheatsheet, a test |
| `src/` | 19 | the ESLint plugin: 11 rules, 5 helpers, the preset, the style processor, the index |
| `vue2/` | 8 | Vue 2 component rules |
| `docs/` | 8 | the index, three templates, three generated pages, the rulebook README |
| `agents/` | 5 | three guides, their README, one picture |
| `tests/` | 4 | 215 tests |
| `bin/` | 4 | build, configure, lint, templ |
| `img/` | 4 | cover, its dark twin, its HTML source, an unreferenced logo |
| `notes/` | 3 | audits 2026-09-02, 09-20, 09-23 (this note is not tracked) |
| `glossaries/` | 3 | agents, testing, doc |
| `demos/` | 3 | naming demos |
| root | 12 | README, FORMATTING, LINTING, LICENSE, formatting.html, index.html, two ESLint configs, package files, .gitignore |
| `packaging/` | 1 | packaging.md |
