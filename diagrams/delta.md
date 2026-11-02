- Which diagrams does this project have that we lack? (2026-11-02 19:24,
  of archify.si)
- Let us add them then, and be sure to show me what was added and what
  came out. (19:29)

# Before and after: what a change does to a system

One map of a system as it is after a change, each part marked by what the
change did to it: added, changed, removed or the same. The counts on top
say how big the change is before the reader looks at the map.

![Checkout gets a price cache: on top pills say 1 added, 1 changed, 1 removed and 2 stay the same; the Browser sends HTTPS to the Checkout API, blue with a tilde, it reads the cache; the API reads Redis first, green with a plus, prices for 5 minutes, and MySQL by SQL, the same; the Price cron is red, dashed and struck through with a minus, gone because prices are live, its every-night line to MySQL dashed red; a Now box says prices come from Redis, filled as they change, and the nightly cron is gone](../img/diagrams/delta_price_cache.svg)

## Fits when

- **A change to how a system is built:** a cache, a queue, a service added
  or taken out.
- **The question is what moved:** which parts are new, which are gone,
  which work differently, and what stays as it was.
- **A review of a plan:** the map after it is done, before it is started.

## Not when

- **Which files a commit touches:** a [change map](changemap.md).
- **The order of the calls changes:** a [sequence diagram](sequence.md),
  today beside proposed.
- **A change the author sees on screen:** screenshots before and after.
- **Nothing is added or removed,** only settings: say it in a sentence.

## How it is drawn

1. **The counts:** on top, a pill per kind of change with its count
   (+ 1 added, ~ 1 changed, − 1 removed), then how many stay the same in
   grey.
2. **The parts:** a box per part as in a
   [container sketch](containers.md), its name in bold and what it does
   under it, left to right in the order a request meets them.
3. **The marks:** added green with a **+** on its corner; changed blue
   with a **~**; removed red, dashed, its name struck through, with a
   **−**; the same in grey. Under the name of a marked part, what the
   change did to it, in its colour.
4. **The lines:** as the parts they join: a new line green, a removed one
   red and dashed, the rest dark; a few words on each.
5. **Now:** a blue box under the map says in one sentence what the system
   does differently.

## References

- [archify](https://github.com/tt-a1i/archify): an agent skill that
  draws this kind from typed JSON into an interactive page; the kind came
  to this page from it.
