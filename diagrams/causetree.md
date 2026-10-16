- Good, add them all. (2026-10-16 21:00)

# Cause tree: why it happened

The failure on top, its causes below it as a tree: each row down says
why the row above happened. The root cause is amber, the fix green
beside it, and the causes that were checked and ruled out stay in grey
with the reason. The reader sees why it broke, what one change ends it,
and what was already looked at.

![Why customers were charged twice: a red box on top says customers were charged twice, 38 orders on 10-14; below it, the pay button sent twice, two requests 0.4 s apart, beside two grey dashed boxes ruled out, the provider retried (one call each) and a reload resent it (no reloads); below that, the button stays enabled for the 1.8 s it waits, beside a grey box ruled out, the mobile app retried (all 38 on web); at the bottom the root cause in amber, the spinner shows only after the reply, joined by a green line to the fix, disable the button on the first click and show the spinner at once; a Now box says a second click gets through while the button waits](../img/diagrams/causetree_charged_twice.svg)

## Fits when

- **Something broke and the question is why,** down to the one cause a
  change would end.
- **Several causes were suspected,** and the reader sees which were
  checked and why they are out.
- **The fix follows from the cause,** and the reader sees it is aimed at
  the root, not at the failure on top.

## Not when

- **The order of events** in one request: a
  [sequence diagram](sequence.md); what happened when, from a log: a
  [timeline](timeline.md).
- **The cause is not found yet:** what is known and what is still open,
  a [questions diagram](questions.md).
- **One real request today beside the same with the fix:** a
  [case](case.md).

## How it is drawn

1. **The failure:** a red box on top, what broke in a few words and,
   under it, how much or since when.
2. **The causes:** one box per row down, each the "because" of the box
   above it, its name in bold in two or three words and under it what
   shows it; dark lines join the chain from the failure to the root.
3. **Ruled out:** a grey box with a dashed border beside the cause it
   was checked against, its name in grey and "ruled out:" with the
   reason; grey dashed lines join it.
4. **The root cause:** the last box of the chain, amber with an amber
   border, its name in bold and "the root cause" under it.
5. **The fix:** a green box beside the root cause, joined to it by a
   green line, the change in bold.
6. **Now:** a blue box under the tree says in one sentence why it broke
   and what fixes it.
