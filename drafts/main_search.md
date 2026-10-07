- When a page has one main search or filter, typing while no editable field
  has focus focuses that main input immediately.
- The first typed character goes into the input too; the user does not need
  to click it or press a shortcut first.
- Local inputs keep their own typing when they have focus.

# Typing goes to the main search

A page has a main filter. The user clicks the background and starts typing
`sm`. The first `s` focuses the filter and enters `s`; the next key makes
`sm`. Filtering runs through the same input path as ordinary typing.

The rule applies when the page has one clear primary text input. Local
inputs do not make it ambiguous: typing in an input, textarea or editable
region still belongs to that field. A screen with several equally primary
fields needs an explicit choice of target before using this behavior.

## Keep the first character

Focus alone is insufficient if the key that caused it disappears. Deliver
that character once, at the input's current selection, and notify the normal
input handler. Preserve the existing query and native editing behavior.

## Respect other keyboard behavior

Do not capture typing from another input, textarea, select or editable
region, including an editable region inside a component. Respect a handler
that has already consumed the event. Leave command shortcuts, ongoing IME
composition and non-text keys to their existing handlers. Space on a focused
button keeps its native activation behavior.

The recording also shows a page that focuses search on load. That is a
separate page choice; this rule concerns typing after focus has moved away.

## Check the interaction

- Click the background and type a query: focus moves on the first character,
  and the query contains every character exactly once.
- Return after an existing query: typing edits the current selection.
- Type in a local input, textarea and editable region: their text changes,
  and the main query stays unchanged.
- Use shortcuts, navigation keys and button activation: their behavior stays
  intact.
- Filter to zero results and back again: typing still works.

See [default_list_item.md](default_list_item.md) for a result list whose
items have an action.
