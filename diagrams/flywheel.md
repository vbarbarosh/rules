- do we have "data flywheel" diagram? (2026-10-20 21:45)
- 🚀 add it (21:53)

# Flywheel: what feeds itself

A loop that grows as it turns: each stage feeds the next, and the last
feeds the first, so the next turn starts bigger. A data flywheel is the
common case: use makes data, data makes a better model, a better model
brings more use. Also called a virtuous cycle or a reinforcing loop.

![Search that learns from its users: more users, more searches, clicks logged, clicks as labels, model retrained and a better ranking, evenly on one circle, each with its number; clicks as labels in amber, only 15% usable, the weak link; seed labels by hand come in from outside](../img/diagrams/flywheel_search.svg)

## Fits when

- **Growth feeds itself:** more users bring more data, more data a better
  product, a better product more users.
- **The question is where it is slow:** which stage holds back every turn
  after it.
- **A start from outside:** what was put in by hand to get it turning,
  seed data or a launch.

## Not when

- **A thing goes round its states, nothing grows:** a
  [state diagram](state.md).
- **A step repeats on a clock** (every minute, a retry): the loop on a
  [sequence diagram](sequence.md).
- **How much each stage moves on:** a [sankey](sankey.md), its bands as
  wide as their share.

## How it is drawn

1. **Stages:** four to six boxes evenly on one circle, clockwise, the
   outcome on top; each with its name and its number now (40k a day).
2. **Arrows:** blue and bold, arcs of that same circle, each from one
   stage into the next; the last back into the first. Nothing bends off
   the circle: a wheel that wobbles reads as broken.
3. **The weak link:** the stage that turns slowest in amber, said in a
   line under the ring.
4. **From outside:** what started it or still feeds it, a grey dashed
   box with its arrow into the stage it feeds.
5. **The middle:** how long one turn takes.
