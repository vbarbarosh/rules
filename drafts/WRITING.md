- top is mine; bottom - yours
- top is written around what I already know
- bottom - is a paraphrase of it
    - same thing, different and more decompressed wording
- the top part and applicable entries in ../MANUALLY_APPROVED_RULES.md are the source of truth
- in case bottom part contradicts, follow those sources
- a manually approved entry can explicitly clarify older wording within its scope; if the sources disagree without such a decision, ask before regenerating
- when either source changes, regenerate the bottom part from both (never patch it on its own)
- keep manually approved decisions in ../MANUALLY_APPROVED_RULES.md, outside the bottom half
- that file is maintained, never regenerated; add or change an entry only after explicit author approval, with scope, date and evidence
- no AI is allowed to patch top part (unless explicitly asked)
- most of the time bottom part starts with a # heading
    - that heading is the boundary
    - `---` or a closing fence is just decoration


--- ✨ AI-Generated Content Below ✨ ---


# Two-half documents

The author writes the top half. The AI writes the bottom half, restating the
author's notes and the applicable manually approved rules for a reader who
lacks that context.

## Author sources

The top half and applicable entries in
[MANUALLY_APPROVED_RULES.md](../MANUALLY_APPROVED_RULES.md) govern the explanation.
An approved entry can explicitly clarify older wording within its stated
scope. If the sources disagree without such a decision, establish the answer
with the author before regenerating.

The author writes the top half around what he already knows. Its wording,
and even its typos, carry how he understands the subject. No AI patches it
unless the author explicitly asks.

## Manually approved rules

An approved decision must not live only in an AI explanation: rewriting that
explanation could erase it. Record the decision in
[MANUALLY_APPROVED_RULES.md](../MANUALLY_APPROVED_RULES.md), with its scope,
approval date and evidence. Read the applicable entries before rewriting.

The approval file is maintained, never regenerated. Only an explicit author
decision permits adding or changing an entry. An AI suggestion, an audit
finding or existing AI wording is not approval.

## Bottom half

The AI restates the same content in more explicit language. When either the
author's top half or an applicable approved entry changes, regenerate the
bottom half from both sources. Preserve each approved decision's meaning and
scope; never patch the bottom half independently.

For example, the author notes in `layout.md` describe `build/`. MP-02 records
the approved `dist/` release decision. A rewritten layout explanation must
retain both scratch-build and release-output rules.

## Boundary

Most of the time the bottom half starts with a `#` heading, and that heading
is the split. A `---` line or a closing code fence before it is decoration.
There is no strict marker.

`drafts/logs.md`, `drafts/layout.md`, and `drafts/refresh.md` follow this
convention.

## Documents without an author section

A document may have no author section at all: no notes of the author above
a heading, only explanation, as in `drafts/for_of.md`. Such a document is
an ordinary file, and the AI edits it for the task the author asked for
(MP-30).

When the author's section exists, it stays at the top of the file and is
never overwritten; only the author's explicit request changes it. When it is
unclear where the author's section ends, ask before editing.
