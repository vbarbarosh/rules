- class order: layout, spacing, sizing, decoration, typography, app prefix (vb-, np-), local (#-) last
  - class="flex-row-c #-root"
  - class="fluid p30 xpt app-scrollbars-light #-grid"
  - class="db w80 h80 br4 fit-cover cur-pointer app-background #-preset-img"
  - class="flex-row-cl gap10 app-font-b14 #-title-trigger"
- no empty classes; every .foo should have rules inside
- smcss rules:
  - .gap* for grid/flex containers; .mg*, .mi* for block containers
  - .fluid inside .hsplit/.vsplit; .flex-fluid inside .flex-row/.flex-col
  - .ph* before .pv*; spacing before typography
  - .x* classes usually come before setters
    - class="xm ml5" -- margin: 0; margin-left: 5px;
    - class="m5 xml" -- margin: 5px; margin-left: 0;
  - if gap is is required, it should always follow by any layout classes:
      - flex-row-cl gap5, flex-col-c gap15, grid-foo gap5
- writing modules:
  - @import --- first in block
  - @include --- first in rule
  - @include app-transition(props...) --- to fill `transition:` property
    - list the exact properties, never `all`
    - put it on the base rule so the animation covers both directions



    // https://stackoverflow.com/a/49437769/1478566
    @mixin app-transition($props...)
        $result: ()
        @each $prop in $props
            $result: append($result, $prop $transition-speed-default, comma)
        transition: $result

    @mixin app-transition-fast($props...)
        $result: ()
        @each $prop in $props
            $result: append($result, $prop $transition-speed-fast, comma)
        transition: $result

    @mixin app-transition-debug($props...)
        $result: ()
        @each $prop in $props
            $result: append($result, $prop $transition-speed-debug, comma)
        transition: $result



--- ✂️✨🤖✨ ⬇️ AI-Generated Content Below ⬇️ ✨🤖✨✂️ ---



Classes inside one `class="..."` attribute follow a fixed order, left to right:

    layout  spacing  sizing  decoration  typography  app-prefix  local

```html
<div class="flex-row-c #-root" />
<div class="fluid p30 xpt app-scrollbars-light #-grid" />
<div class="db w80 h80 br4 fit-cover cur-pointer app-background #-preset-img" />
<div class="flex-row-cl gap10 app-font-b14 #-title-trigger" />
```

- layout is the flex/grid/split class, and the display or position utility
  (`db`, `abs`, `fluid`) leads where the element carries one. A `gap*`, where
  one is needed, always comes directly after the layout class:
  `flex-row-c gap5`, `flex-col-c gap15`, `grid-foo gap5`,
- spacing is `p*` / `m*`; `ph*` precedes `pv*`, and spacing comes before
  typography,
- sizing is `w*` / `h*` / `max-w*` / `min-h*`,
- decoration is `br*`, `fit-cover`, `cur-pointer` and the other shape and
  surface utilities,
- typography is `fs*` `fw*` `lh*`, then alignment and `nowrap`.

Plain utilities lead. An app-prefixed class — `vb-*`, `np-*`, one prefix per
app, spelled `app-*` in the examples here — sorts after all of them, never at
the head of the list, and that holds for the element's own base class as much
as for a utility. A file-local class (`#-*`) is always last.

## No empty classes

Every `.foo` on an element has rules inside — a declaration in the file's own
style block, or an established project utility. An element that needs no
styling stays classless. A class put there to label the element rots, and
misleads the next reader into looking for a rule that was never written.

```html
<!-- the wrapper is not styled, so it carries no class -->
<div>
    <div class="#-funnel-bars">...</div>
</div>
```

## smcss

**Spacing children.** `gap*` spaces the children of a grid or flex container.
`mg*` and `mi*` are the block-container forms. The two do not mix.

**Which fluid.** `hsplit` / `vsplit` default their children to `flex: none`,
so the child that fills is marked with the short `fluid`. A plain `flex-row` /
`flex-col` has no child rules, and its growing child is marked `flex-fluid`.
Same CSS — the choice states which container the element is sitting in.

**Reset before setter.** An `x*` class usually comes before the setter it
clears the way for. The broad class leads and the narrow one corrects it,
whichever of the two is the reset:

```html
<div class="xm ml5" />   <!-- margin: 0; margin-left: 5px; -->
<div class="m5 xml" />   <!-- margin: 5px; margin-left: 0;  -->
```

## Tables

Rows and columns are a `<table>` — history logs, results, any list with
several aligned fields per row. A stack of flex rows is not a table: the
columns line up only until one cell is wider. Flex rows stay for content that
is genuinely not tabular — toolbars, button rows, a field beside its label.

## Writing modules

`@import` comes first in a block. `@include` comes first in a rule, ahead of
the property declarations — the mixin brings the base, the block overrides it,
and the reading order says so.

```sass
.#-card
    @include app-transition(box-shadow, border-color)
    box-sizing: border-box
    border: 1px solid #E6E8EB
```

A `transition:` property is not written by hand. `@include app-transition(props...)`
fills it: the mixin expands each property into `<prop> <speed>` and joins them
with commas, so every transition in the codebase runs at the one shared speed.
`app-transition-fast` and `app-transition-debug` are the same mixin against the
fast and debug speeds.

List the exact properties that change; never `all`. The include goes on the
base rule, not on the `:hover` / `.active` variant, so the animation covers
both directions.
