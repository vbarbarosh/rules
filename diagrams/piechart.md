- Which diagrams does this project have that we lack? (2026-11-02 19:24,
  of archify.si)
- Let us add them then, and be sure to show me what was added and what
  came out. (19:29)

# Pie chart: shares of one whole

One whole cut into its shares: a ring, each slice as big as its share,
the biggest from the top clockwise, the total in the middle. The reader
sees what part of all each share is, and whether one is most of it.

![Where checkout visitors come from: a ring of 18 400 visits in October, search 46% in blue from the top, direct 27% green, e-mail 15% amber, ads 8% purple and other 4% grey; beside it a legend in the same order, each with its share and its count; a Now box says almost half come from search](../img/diagrams/piechart_visitors.svg)

## Fits when

- **The parts add up to a whole:** visits by source, a budget by item,
  time by kind of work.
- **The question is what part of all:** almost half, a quarter, a sliver.
- **Two to five shares;** the rest merged into one grey "other".

## Not when

- **The shares are close,** or the question is which is bigger by how
  much: a [bar chart](barchart.md); slices that differ a little look the
  same.
- **More than five shares,** or parts that do not add up to one whole: a
  [bar chart](barchart.md).
- **A share over time:** a [line chart](linechart.md).
- **Where it goes, step by step:** a [sankey](sankey.md).

## How it is drawn

1. **The ring:** a pie with a hole, the total in bold in the hole and what
   it counts under it.
2. **The slices:** the biggest from the top, clockwise, then smaller; blue,
   green, amber, purple, and "other" grey and last. A thin gap of the
   background between slices.
3. **The legend:** beside the ring, in the slices' order: a swatch, the
   name, the share in its colour, the count in grey.
4. **Now:** a blue box under the chart says in one sentence what it shows.

## References

- [archify](https://github.com/tt-a1i/archify): an agent skill that
  draws this kind from typed JSON into an interactive page; the kind came
  to this page from it.
