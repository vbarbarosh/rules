# Animations

How a screen moves: sections, rows and lists, and what a click mid-way does.
Each rule has a picture and a live demo.

11 rules · 1 group · 1 source · filterable version: [animations.html](animations.html)

The rules of the code are in [rules.md](rules.md); these were its ANIM
group until 2026-10-12, and keep their codes.

| Tag | Group | Rules | |
|-----|-------|------:|---|
| ANIM | Animations | 11 | How a screen moves. |

| Code | Rule | Canonical form | Source |
|------|------|----------------|--------|
| **ANIM** | **Animations** — How a screen moves. | | |
| ANIM-01 | **Sections slide the way the list goes.** Picking another section in the sidebar slides the content vertically, like switching workspaces: down the list, the old page leaves upward and the new one rises from below; up the list, the reverse. | ![Sections 1 to 2, 2 to 10 and 10 to 9: down the list the page goes up, up the list it goes down](../drafts/animations-sections.gif) [▶ Try it](../drafts/animations.html#slide-workspaces) | [animations.md](../drafts/animations.md) |
| ANIM-02 | **A far jump is one slide.** From section 2 to 10 the content does not pass through 3 to 9: the two pages slide, and only the highlight crosses the items between them. | ![From 2 to 10 only the two pages slide; the highlight crosses the items between](../drafts/animations-sections.gif) [▶ Try it](../drafts/animations.html#slide-workspaces) | [animations.md](../drafts/animations.md) |
| ANIM-03 | **The highlight and the content move together.** The selection in the sidebar slides from the old item to the new one at the same time as the content, with the same duration and easing. | ![The highlight slides from item to item while the pages slide, both ending together](../drafts/animations-sections.gif) [▶ Try it](../drafts/animations.html#slide-workspaces) | [animations.md](../drafts/animations.md) |
| ANIM-04 | **Depth is left and right.** Opening a row moves the list out to the left as its page comes in from the right; Back does the reverse. Sections still slide up and down, from a list or from a row's page. | ![A row opens from the right and Back returns from the left; a section picked from a row's page slides vertically](../drafts/animations-rows.gif) [▶ Try it](../drafts/animations.html#slide-into-row) | [animations.md](../drafts/animations.md) |
| ANIM-05 | **On a row's page, its own section is Back.** Clicking the section the open row belongs to steps back out to its list, the way Back does. | ![On a Calendar row's page, clicking Calendar in the sidebar slides back to the Calendar list](../drafts/animations-rows.gif) [▶ Try it](../drafts/animations.html#slide-into-row) | [animations.md](../drafts/animations.md) |
| ANIM-06 | **A list shows each change as movement.** An added row opens a gap and fades into it; a removed row fades out and the gap closes; a moved row travels to its new place while the others make room. | ![Rows added at the start and in the middle open a gap, a removed row's gap closes, a moved row travels over the others](../drafts/animations-list.gif) [▶ Try it](../drafts/animations.html#list-changes) | [animations.md](../drafts/animations.md) |
| ANIM-07 | **A list change never moves the working row.** Rows added or removed above the selected row leave it where it is on the screen, from the first frame to the last; the scroll position takes up the difference (UIM-01). | ![Rows come in above and the selected row stays on the dashed line; with the rule off it drops below](../drafts/animations-nothing-jumps.gif) [▶ Try it](../drafts/animations.html#list-changes) | [animations.md](../drafts/animations.md) |
| ANIM-08 | **A click mid-way changes course.** A click during an animation neither waits for it nor jumps back: everything moves on from where it stands on the screen at that moment. | ![A slide reversed half way, Back pressed half way into a row, a section picked half way into another](../drafts/animations-mid-way.gif) [▶ Try it](../drafts/animations.html#slide-into-row) | [animations.md](../drafts/animations.md) |
| ANIM-09 | **A header opens its message and folds it back.** Clicking a folded one-line header opens the message in full; clicking the open header folds it back to its line. The card's height goes from the one to the other and the messages below slide with its edge. | ![Three cards: a folded header opens its message and folds it back, the messages below slide](../drafts/animations-expand.gif) [▶ Try it](../drafts/animations.html#expand-collapse) | [animations.md](../drafts/animations.md) |
| ANIM-10 | **The parts morph, nothing pops.** The avatar, the time and the text the two layouts share morph into their places in the other one: the avatar shrinks into the line, the time moves beside it, the text glides up at its smaller size, and back. Only what has no place there, the name, the picture, the rest of the text, fades. | ![The avatar, the time and the text morph between the open message and the one-line header, slowly at 2 s](../drafts/animations-expand.gif) [▶ Try it](../drafts/animations.html#expand-collapse) | [animations.md](../drafts/animations.md) |
| ANIM-11 | **The header clicked never moves.** It stands still from the first frame to the last, opening or folding, mid-way too; only what is below it moves (UIM-01). | ![The clicked header stays on the dashed line while its message morphs open and folded](../drafts/animations-expand.gif) [▶ Try it](../drafts/animations.html#expand-collapse) | [animations.md](../drafts/animations.md) |
