- Good, add them all. (2026-10-16 21:00)

# Trace waterfall: where one request spends its time

One request traced across services: a row per span, each a bar from its
start to its end on one scale of milliseconds, a called span indented
under its caller. The reader sees the slowest span, what runs in turn,
and the gaps where the request only waits.

![A trace of POST /checkout, 1840 ms: the api's bar spans it all; under it auth checks the token in 40 ms, the cart service loads the cart in 240 ms with a database read of 180 ms indented under it, then an amber band marks 160 ms of waiting, then the payment provider charges the card in 1200 ms in red, the database saves the order in 80 ms and the mail queue takes the receipt in 30 ms; a Now box says the payment provider takes 1200 of the 1840 ms and 160 ms before it is a wait](../img/diagrams/waterfall_checkout.svg)

## Fits when

- **"Why is this request slow?":** one request, measured across the
  services it passes.
- **Calls in turn or at once:** the reader sees what waits for what, and
  what could run side by side.
- **Time lost between spans:** a gap where nothing runs is as plain as
  the work.

## Not when

- **The call stacks of one process,** by function: a
  [flame graph](flame.md).
- **Who talks to whom,** in order, with the messages: a
  [sequence diagram](sequence.md).
- **A number over time,** many requests: a [line chart](linechart.md).

## How it is drawn

1. **Time:** milliseconds left to right in one framed panel, the ticks
   on top, faint dashed lines down from them; zero is the request's
   start.
2. **Rows:** one per span in the order it starts, the service in bold
   and what it did after it; a called span indented under its caller.
3. **Milliseconds:** each span's time in a column right before its bar,
   so the numbers read down one line.
4. **Bars:** one per span from its start to its end, to one scale; a
   few milliseconds still get a thin bar. The slowest span is solid red,
   its name and time in red.
5. **Waits:** a gap where no span runs is an amber band behind the rows,
   its length on an amber pill under them.
6. **Now:** a blue box under the panel says in one sentence where the
   time goes.
