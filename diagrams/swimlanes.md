- Good, add them all. (2026-10-16 21:00)

# Swimlanes: who does each step

A process as its steps in order, a lane per actor, each step a box in
the lane of who does it. An arrow leads from each step to the next, and
it crosses lanes where the work changes hands. The reader sees who holds
the work now and which hand-off waits on them.

![A refund in four lanes, Customer, Support, You the shop owner, and Payment service: the customer asks for a refund and support checks the order, both done in green; the amber arrow hands it to you, and Approves the refund is amber, waiting 2 days; then, dashed grey and still to come, the payment service pays it back and support e-mails the customer; a Now box says the refund waits on you to approve](../img/diagrams/swimlanes_refund.svg)

## Fits when

- **Several people or services share one process,** each doing a part
  of it in turn.
- **The question is who does what,** and where the work passes from one
  to another.
- **A hand-off is slow or stuck,** and the reader sees whose lane it
  waits in, often their own.

## Not when

- **Messages between parts of a system,** in time order: a
  [sequence diagram](sequence.md).
- **Decisions** with yes and no branches: a
  [flowchart](flowchart.md).
- **A thing's states** and what moves it between them: a
  [state diagram](state.md).
- **Many pieces of work** by stage, not one process: a
  [kanban board](kanban.md).

## How it is drawn

1. **Lanes:** one row per actor in one framed panel, the name in bold
   at the left, thin lines between the rows; two to five lanes, the
   reader's own named "You".
2. **Steps:** one box per step, left to right in order, each in the
   lane of who does it; a verb in bold and a few words under it.
3. **Arrows:** from each step to the next, down or up out of the box and
   then right into the next one; the arrowheads touch the boxes.
4. **Colours:** green for steps done, grey dashed for steps to come. A
   hand-off that waits on the reader is amber, its arrow too, and says
   for how long.
5. **Now:** a blue box under the panel says in one sentence who holds
   the work and what it waits on.
