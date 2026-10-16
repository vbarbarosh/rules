- Good, add them all. (2026-10-16 21:00)

# Annotated screen: where on the screen

A plain sketch of a screen, grey blocks and a few real labels, with an
amber number on each spot that changes; beside it a numbered list says
what changes at each. The reader sees where the change is before reading
what it is.

![The checkout page sketched twice, while paying and with the card declined, in grey blocks with real labels for Checkout, the total of $84.00, the coupon field and the Pay button; amber number 1 sits by the coupon field under the total, 2 by the Pay button, faded, with a spinner and the word Paying, 3 by a red Card declined message right above the blue Pay button; beside the sketches a list says 1 the coupon field moves from the top of the page to under the total, 2 Pay shows a spinner and stays disabled until the bank answers, 3 the error shows right above the button, not at the top of the page; a Now box sums up the three changes](../img/diagrams/screen_checkout.svg)

## Fits when

- **A change to a screen:** a field moves, a button gets a new state, a
  message shows in a new place.
- **The question is where:** words alone would say "the error moves up"
  and leave the reader to guess from where to where.
- **No screenshots yet:** the change is planned, or the screen is still
  being built.

## Not when

- **Real screenshots exist** before and after: [one case](case.md), the
  screenshots side by side.
- **The parts of a system,** not of a screen: a
  [container diagram](containers.md).
- **A thing's states** and what moves it between them: a
  [state diagram](state.md).

## How it is drawn

1. **The sketch:** the screen as a framed wireframe, its parts as plain
   grey blocks; only the parts that matter get real labels, such as the
   total, a field's placeholder or a button's text.
2. **States:** a frame per state when the change shows in one state
   only, such as while paying or after an error; the state's name in
   bold above its frame. One frame when the state does not matter.
3. **The numbers:** an amber circle with a number beside each spot that
   changes, in the margin of the frame, never over a label; each number
   once only, in the frame where it shows best.
4. **Colour in the sketch:** grey for what stays; the changed parts in
   their real colours, such as a blue button or a red error.
5. **The list:** beside the sketch, the same amber numbers in order,
   each with what changes in bold and a line or two of why under it.
6. **Now:** a blue box under the panel says in one sentence all the
   changes together.
