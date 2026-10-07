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
released output and is committed at release time. This decision does not
specify the command that transfers or builds the release output.

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
is named by what it is. The scope for parameters, loop values and outer values
remains a separate open finding; this entry does not decide it.

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
