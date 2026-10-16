- Good, add them all. (2026-10-16 21:00)

# Plan graph: what waits on what

A plan's parts as boxes, an arrow from each part to the parts that wait
on it. Parts that can run side by side stand in one column. The longest
chain is bold blue: it sets the day the plan ends.

![A coupon field at checkout in five parts over seven days: P1 the coupon API, 2 days, done in green; then side by side P2 the form, 3 days, under way in blue, and P3 the e-mail, 1 day, not started in grey; both lead to P4 tests, 1 day, not started; then P5 your go, waiting on you in amber; the arrows P1 to P2 to P4 to P5 are bold blue, the longest chain; a Now box says a late form moves the ship day, the e-mail can slip 2 days, and then it waits on your go](../img/diagrams/plangraph_coupon.svg)

## Fits when

- **A plan in parts,** some of which wait on others and some of which
  can run at the same time.
- **The question is what holds the end date:** which parts must not
  slip, and which have time to spare.
- **A part waits on the reader,** and the reader sees how much waits
  behind it.

## Not when

- **One goal's steps in a line,** one after another: a
  [milestone track](milestone.md).
- **The months ahead,** bars against dates: a [roadmap](roadmap.md).
- **Work by stage today,** not by what it waits on: a
  [kanban board](kanban.md).
- **What is decided where,** questions and their answers: a
  [flowchart](flowchart.md).

## How it is drawn

1. **The parts:** one box per part, its name in bold, P1, P2 and so on
   with a few words; under it how long it takes and where it stands.
   Three to eight parts.
2. **The columns:** left to right in the order the parts can start, the
   days on top. Parts that can run side by side are stacked in one
   column.
3. **The arrows:** from a part to each part that waits on it, from box
   edge to box edge, thin grey.
4. **The longest chain:** its arrows bold blue, so the reader sees which
   parts move the end date and which can slip.
5. **Where each stands:** green is done, blue under way, grey with a
   dashed border not started, amber with "waits on you" a part the
   reader must do or approve.
6. **Now:** a blue box under the panel says in one sentence what holds
   the end date, what has time to spare and what waits on the reader.
