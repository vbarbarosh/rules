- Good, add them all. (2026-10-16 21:00)

# Heatmap: when it happens

A week in one grid: the days as rows, the hours as columns, each cell as
dark as its count. The reader sees at once which hours of which days
pile up, and which stay quiet.

![Checkout errors from 5 to 11 October, a row per day from Monday to Sunday and a column per two hours from 00 to 22; a legend scale runs from grey for none through five ambers to the darkest for 50 and more; most cells are pale, the weekend almost blank; a blue frame holds Monday to Friday at 08 and 10, every cell dark with its count inside, from 38 to 63; under the grid the hot spot is named, Mon to Fri 08:00 to 12:00, 493 of 684 errors; a Now box says 7 in 10 errors hit weekday mornings, while the late nightly import still runs](../img/diagrams/heatmap_checkout.svg)

## Fits when

- **Many events, and the question is when:** which hours of which days
  they come at.
- **A pattern repeats** by the day of the week or the hour of the day,
  and a line of time would hide it.
- **One spot stands out,** and its days and hours point at a cause: a
  job that runs late, a peak of visitors, a weekly report.

## Not when

- **One number over time,** going up or down: a
  [line chart](linechart.md).
- **Events in their order,** each with its moment: a
  [timeline](timeline.md).
- **Parts and their health,** not the hours: a
  [status dashboard](dashboard.md).

## How it is drawn

1. **The grid:** in one framed panel, a row per day from Monday to
   Sunday, its name in bold on the left; a column per hour, or per two
   hours, its start on top.
2. **The cells:** one per day and hour, as dark as its count: grey for
   none, then pale to dark amber; five or six steps in all.
3. **The scale:** on the line under the title, a swatch per step with
   its range, from none to the darkest.
4. **The hot spot:** a blue frame around its cells, their counts inside
   them; under the grid, in blue, its days, its hours and its share of
   the whole.
5. **Now:** a blue box under the panel says in one sentence when most of
   it happens and why.
