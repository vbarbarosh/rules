- Which diagrams does this project have that we lack? (2026-11-02 19:24,
  of archify.si)
- Let us add them then, and be sure to show me what was added and what
  came out. (19:29)

# Bar chart: how much of each

One bar per thing counted, as long as its count, all from zero, sorted
longest first. The reader compares at a glance which is biggest, by how
much, and where the one the question is about stands.

![Why checkout failed last week: five bars from zero on an axis to 250, card declined 212, bank timeout 148 in amber with "ours to fix", coupon invalid 96, address rejected 41, other 23; under the axis, errors last week, 520 in all; a Now box says bank timeouts are 148 of 520 and a retry on the bank call cuts the biggest part that is ours](../img/diagrams/barchart_failures.svg)

## Fits when

- **A count per kind:** errors by cause, sign-ups by source, time by
  stage; three to ten kinds.
- **The question is which is biggest,** and by how much it beats the next.
- **One of them matters most:** the one that is ours to fix, the one that
  grew.

## Not when

- **A number over time:** a [line chart](linechart.md).
- **Shares of one whole,** where the question is what part of all: a
  [pie chart](piechart.md); with many kinds a bar chart still reads better.
- **One whole and its gap,** how much is covered: the bar of a
  [dashboard](dashboard.md).
- **Two or three numbers:** say them in a sentence.

## How it is drawn

1. **The bars:** across, one per kind, longest on top, the same thickness,
   blue; the name to the left of each, its count at its end.
2. **The axis:** from zero along the bottom, a few round values and a thin
   line up the panel at each; a bar never starts above zero.
3. **The one that matters:** amber, its name bold, a few words beside its
   count (ours to fix).
4. **The total:** under the axis, what is counted and how many in all.
5. **Now:** a blue box under the chart says in one sentence what it shows.

## References

- [archify](https://github.com/tt-a1i/archify): an agent skill that
  draws this kind from typed JSON into an interactive page; the kind came
  to this page from it.
