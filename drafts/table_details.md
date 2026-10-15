- A new rule for making tables, for the UI.
- When a table comes out like the one in the picture, it has to be redone:
  as soon as it stops being a table and turns into some kind of grid.
- At the top level keep only the most important columns: looking at them,
  one understands what it is and what state it is in.
- A click on such a row opens its details below it, and there can be many.
- So when the details are more than the table can show on one screen, they
  all move behind one more click, and the top level keeps only the columns
  that say what it is and what state it is in.


# A table folds only what does not fit

A table shows its rows whole, every column on top, while they fit. Only
when it no longer fits and turns into a grid of broken cells does it fold
columns into each row's details, opened by a click under the row, and
only as many as it must at that width. What a row is and its state never
fold.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="table-details-dark.png">
  <img alt="on a wide screen a table folded down to name and state beside the same table with every column on top; at phone width a table broken mid-word into a grid beside the same rows with name and state, one opened to show what folded" src="table-details.png">
</picture>

The picture is drawn by [table-details.html](table-details.html) and
rendered to `table-details.png` and `table-details-dark.png` (`?dark`).

## Why

A table is read at a glance: the eye goes down a column and across a row,
and sees what is there and what is wrong without touching anything. Each
column folded away costs that glance a click, and a column folded with room
to spare costs it for nothing: the reader has to open row after row to see
what one look used to show (2026-10-15, MP-80).

The other failure is the grid. When every detail is a column at a width
that cannot hold them, the cells wrap over three or four lines, paths and
messages break mid-word, the rows grow to different heights, and nothing
reads at a glance either. Folding is the cure for that, and only for that.

## The rule

1. **A table keeps its columns while they fit.** With room on the screen,
   every column stays on top and no row needs a click. The table folds only
   when it turns into a grid: cells wrap over several lines, words or paths
   break in the middle, columns are cut off. The decision is made at each
   width: the same table shows every column on a wide screen and folds
   some on a phone.
2. **What a row is and its state never fold.** Its name and its status
   always stay on top. The other columns fold one at a time, the least
   needed first, until the rest fit on one line; a column the reader
   compares across rows, such as a size or a time, folds last.
3. **A click opens what folded, below the row.** The folded columns open
   right under the row, as wide as the table: one line each, its label and
   its value, a long value wrapped whole. Only what folded is there, never
   a repeat of what the row already shows; a table with nothing folded has
   no click and no chevron. Another click closes them, and the row clicked
   stays where it was (UIM-01).

Following this rule never makes a table that fits worse: the test is the
glance. If the table read at a glance before the change, it must read at a
glance after it.
