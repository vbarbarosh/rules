- Let's add it to the diagrams too, but first make a few sketches.
  (2026-10-14 13:45, of a status dashboard)
- Sketch: A, the full dashboard. (13:49)

# Status dashboard: where each part stands

A RAG status dashboard (red, amber, green): the state of many parts at
once, each a tile coloured by its state. Big numbers on top, the tiles
grouped below, the gaps gathered at the end.

![The sign-in service: 4 of 8 parts in place, 212 unit tests pass, 1 browser test failed; providers and tests as tiles; the gaps, Apple's key, the browser test, the audit log and the docs, gathered at the end](../img/diagrams/dashboard_sign_in.svg)

## Fits when

- **The question is where things stand:** many parts, each in place,
  stale or missing.
- **The reader must find the gaps fast:** a project's checks, a release,
  an audit of what is covered.
- **The same view is read again later,** and the colours show what moved.

## Not when

- **One thing and its states over time:** a [state diagram](state.md).
- **What happened in what order:** a [timeline](timeline.md) or a
  [sequence diagram](sequence.md).
- **A few parts only:** a sentence or a list says it; a dashboard needs
  enough tiles to scan.

## How it is drawn

1. **The key:** green in place and checked, amber stale or unchecked, red
   missing or failed, in one line under the title.
2. **KPI cards:** three or four big numbers on top, each a word of what it
   counts and a line of context, coloured like the worst it stands for.
3. **The status board:** a panel per area, its name and a line of what it
   holds; a tile per part, its name in bold and its state in its colour.
4. **The gaps:** the amber and red tiles again, gathered in a panel at the
   end, so the reader does not hunt for them.
5. **Real states only:** a tile's word says why it has its colour ("1
   failed", "no test"), never just "bad".
