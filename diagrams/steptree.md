- Look at this picture; I like it very much. It is a diagram of its own
  kind too, for small step-by-step operations. The emoji are a must, and
  the different colours; and the blank lines between some of the blocks
  matter a lot. (2026-11-03 07:33, by voice)
- I like the name, step tree, so let us add it. One thing: you showed the
  picture as a legend, and a legend is too short to show the whole power
  of this approach, all its expressiveness. Keep the legend, but there
  must be an example too, at least the one I sent, and the example must
  be the more expressive one. (07:44)

# Step tree: a process as its stages and their small steps

A process read top to bottom: one trunk down the left, a branch per
stage, and under each stage its small steps as leaves. Every node starts
with an emoji: the stage's says who or what does it, the step's what it
does. Each stage has its colour, and the trunk takes it as it passes. A
blank line between stages, none inside one, so the eye finds the stages
before it reads a word. A cost or a warning stands at the right of the
row it belongs to; the total closes the tree.

![Resize, one banner into many sizes, as a step tree: on top the board, where you tick sizes and drop the source banner, every size its own chat turn, the first size of a kind leading; then the start of a size, purple, where the canvas, the design's kind and the ask are made; Round 1 and Round 2 to the model, blue, with their costs at the right; the layout in code, amber, free, with backgrounds, pinned elements, blocks and texts, a red warning that the shoe stays small; the editor takes a picture of each scene, green; Rounds 3 to 10 look, measure and patch until done; Save, green, a new banner per size; and the total, one size 4 to 6 cents, four sizes 20 cents](../img/diagrams/steptree_resize.svg)

Its parts, numbered where they are:

![The parts of a step tree on a short tree: 1 the title, an emoji then from and to; 2 a stage, who or what does it, in its colour; 3 the trunk, one line in the colour of its stage; 4 the steps, a leaf each with an emoji first; 5 a blank line between stages, none inside one; 6 the tags at the right, a cost, free, a warning; 7 the total, the sum on the last line](../img/diagrams/steptree_parts.svg)

## Fits when

- **A process of a few stages, each of a few small operations:** what a
  feature does from the click to the result, a job round by round, a
  build step by step.
- **Different hands do the stages:** the user, a model, plain code, an
  editor; the emoji of the stage says which.
- **A step has a price or a catch** worth reading beside it: what a
  round costs, where it waits, where it goes wrong.

## Not when

- **One action branches** on what it finds: a [flowchart](flowchart.md).
- **Who holds the work,** and where it changes hands between people:
  [swimlanes](swimlanes.md).
- **A whole and its parts** with no order between them: a
  [breakdown tree](breakdown.md).
- **What happened when,** with its times: a [chronology](chronology.md)
  or a [timeline](timeline.md).
- **Files in and files out** of a script: a [pipeline](pipeline.md).

## How it is drawn

1. **The title:** on top, an emoji, the name of the process and what it
   turns into what ("Resize: one banner → many sizes"); in monospace, as
   the whole tree.
2. **The trunk:** one line down the left, from under the title to the
   last stage; it takes the colour of the stage it has just passed.
3. **Stages:** a branch each off the trunk, in order; an emoji for who or
   what does it (👤 the user, 🤖 a model, ⚙️ code, 📸 the editor, 🔁 a
   loop, 💾 save), then its name in bold, in its colour: blue for the
   user and the model, purple for the start, amber for code, green for
   what comes out.
4. **Steps:** the leaves of a stage, each a line with its own emoji then
   a few words; a step of a step one level deeper, three levels at most;
   a long line wraps under its own words, not under the emoji.
5. **Blank lines:** one between stages, none inside a stage: the gap is
   what tells one stage from the next.
6. **Tags at the right:** aligned on one right edge, on the row they
   belong to: a cost in green with 💵, free in blue with 🆓, a warning
   in red with ⚠️ and its words.
7. **The total:** the last line, 💰 and the sum: one case and many, and
   where the number comes from.
8. **Emoji:** one per node, never two; the same emoji means the same
   thing throughout (📐 a layout, 📸 a picture, ✅ done), and a reader
   who knows none of them still reads the words.
