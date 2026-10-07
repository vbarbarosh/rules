- When a list offers items for an action, select its first item by default.
- Enter performs the action on that first item unless the user has selected
  another one.

# The first item is the default action

A search shows SQLite first and LinkedIn second. Without another selection,
Enter opens SQLite. The default follows the displayed order; it does not
guess which result the user meant or silently choose a later item.

## What first means

Use the first visible item on which the offered action can be performed.
Hidden results, headings and disabled items are not action targets. When a
filter supplies a new result list, initialize its default to that first
actionable item. An empty list has no selection, and Enter does nothing.

## An explicit selection wins

The first item is a default, not a forced selection. If the user selects a
different item with the keyboard or pointer, perform the action on that item.
Show which item Enter will act on, and expose that selection accessibly
using the appropriate semantics for the control.

A list of text for reading does not acquire a new action merely because it
has a first row. This rule applies to a chooser, launcher or other list
whose items already have an action.

## Check the interaction

- Several results: the first actionable item is selected and Enter acts on it.
- One result: that result is selected.
- No results: no selection or action.
- A new filter: the default follows the first remaining actionable result.
- A disabled first row: the first actionable row is the default.
- An explicit later selection: Enter acts on the selected item.

See [main_search.md](main_search.md) for typing into a page's main filter.
