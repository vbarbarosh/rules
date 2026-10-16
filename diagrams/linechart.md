- Good, add them all. (2026-10-16 21:00)

# Line chart: a number over time

One number over days or hours, a point for each, joined by a line; a
dashed line marks the moment something changed, a deploy or a fix. The
reader sees the number before and after, and whether it stayed.

![The checkout page's p95 load time from 10-01 to 10-14, a point a day, 0 to 3 s up the side: before the deploy the line is red at about 2.4 s, between 2.3 and 2.6; a blue dashed line marks the deploy of 10-08; after it the line is green at about 0.9 s, between 0.8 and 1.0; a grey dashed line marks the goal of 1.5 s; a Now box says the deploy cut p95 from about 2.4 s to 0.9 s, well under the goal](../img/diagrams/linechart_checkout.svg)

## Fits when

- **One number, measured again and again:** a load time, an error rate,
  a queue's length; two numbers at most.
- **The question is before and after:** did the deploy or the fix move
  the number, and did it stay moved.
- **A goal or a limit exists,** and the reader sees which side of it the
  line is on.

## Not when

- **One run's time by function:** a [flame graph](flame.md).
- **When something happens by hour and day of the week:** a
  [heatmap](heatmap.md).
- **Work planned over months:** a [roadmap](roadmap.md).
- **Events from a log,** not a measured number: a
  [timeline](timeline.md).

## How it is drawn

1. **Time:** left to right along the bottom, the dates or hours under
   it, every other one when they crowd; a week to a month of days, or a
   day of hours.
2. **The number:** up the side from zero, a few round values with their
   unit ("1 s", "2 s"), a thin line across the panel at each.
3. **The line:** a dot per measurement, joined. Red before the change,
   green after it when the number improved; one colour when nothing
   changed.
4. **The change:** a blue dashed line down the panel at its moment, its
   name and date on a blue pill at the top.
5. **The goal:** a grey dashed line across, its value at the right end;
   only when there is one.
6. **What it says:** the typical value before and after in the line's
   colour, next to the line, in a few words.
7. **Now:** a blue box under the panel says in one sentence what changed
   and by how much.
