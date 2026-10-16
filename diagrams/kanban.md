- It seems our diagrams have no kanban charts. (2026-10-16 09:58)

# Kanban board: where each piece of work is

Many pieces of work at once, each in the column of its stage: to do,
doing, in review, done. The board says what is in flight, where work
piles up, and what waits on whom.

![The checkout's work this week: To do holds saved cards, the receipt e-mail and the coupon field, one more hidden; Doing is full at 3 of 3, Apple Pay, tax by country, and bank payouts blocked for 3 days in red; Review holds the fees text, waiting on you in amber; Done holds the card form and refunds with their dates, three more hidden; a Now box says what is stuck](../img/diagrams/kanban_checkout.svg)

## Fits when

- **Many pieces of work at once,** each in one stage, none of them the
  whole goal.
- **The question is what is in flight:** what is stuck, what piles up
  before a stage, what waits on the reader.
- **A stage has a limit,** and the reader sees it is full before more
  work is started.

## Not when

- **One goal and its steps** in order: a [milestone track](milestone.md).
- **A thing's states** and what moves it between them: a
  [state diagram](state.md).
- **Parts of a system** and their health, not work to do: a
  [status dashboard](dashboard.md).
- **What happened when:** a [timeline](timeline.md).

## How it is drawn

1. **The columns:** one framed column per stage, left to right in the
   order work moves; three to five of them.
2. **The header:** the stage's name in bold, its count at the right. A
   stage with a limit shows "3 of 3" in blue when full; red when over.
3. **The cards:** one per piece of work, its name in bold in two or three
   words, under it who it is by and how long it has been there.
4. **What stands out:** a card that waits on the reader is amber with
   "waits on you"; a blocked card has a red border and says for how long;
   a done card has a green tick and its date.
5. **Long columns:** a few cards are shown, the rest as "+ 3 more" under
   them; Done shows the newest first.
6. **Now:** a blue box under the board says in one sentence what is stuck
   and what waits on whom.
