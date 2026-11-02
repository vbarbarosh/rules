- Which diagrams does this project have that we lack? (2026-11-02 19:24,
  of archify.si)
- Let us add them then, and be sure to show me what was added and what
  came out. (19:29)

# Class diagram: the types of a program and how they link

The types of a program as boxes: each with its name, its main fields and its
methods. The lines between them say how two types link: one is made of the
other, one uses the other, one is a kind of the other.

![How checkout pays: Order, its fields id, lines and total and its method pay, is made of OrderLine, 1 to n, and pays with PaymentMethod, an interface with charge and refund; CardPayment and GiftCardPayment are both a PaymentMethod, joined to it by dashed lines with a hollow triangle; GiftCardPayment is green, new; a Now box says a new way to pay is one more class under PaymentMethod and Order does not change](../img/diagrams/class_checkout.svg)

## Fits when

- **The question is about types:** what an object holds, what it can do,
  which other types it needs.
- **A new kind joins a family:** one more class under an interface, and the
  reader sees that nothing else changes.
- **A newcomer reads the model** of a program before its code.

## Not when

- **Which function calls which:** a [call graph](callgraph.md).
- **Which file needs which:** a [module graph](modules.md).
- **What data is stored and how it links:** an
  [entity-relationship diagram](entities.md); a class diagram is the code's
  model, not the tables.
- **Code with no types of its own,** plain functions and data: there is
  nothing to box.

## How it is drawn

1. **A type:** a box in three parts. Its name in bold on a tinted band; its
   main fields under it, `name: type`; its main methods at the bottom. An
   interface has «interface» over its name, the name in italics, no fields.
2. **Made of:** a plain line with a filled diamond at the whole; **1** and
   **n** in bold at the ends, a verb beside it.
3. **Uses:** a dashed line with an arrowhead to the type used, a verb on it
   (pays with).
4. **A kind of:** a dashed line with a hollow triangle at the interface it
   implements, or a plain one at the class it extends; several kinds share
   one triangle.
5. **What changes:** a new type green, one that goes red and dashed; under
   it a word in its colour.
6. **Now:** a blue box under the types says in one sentence what the
   diagram shows.
