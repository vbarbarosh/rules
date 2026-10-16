- Good, add them all. (2026-10-16 21:00)

# Change map: what a change touches

The project's folder tree, trimmed to the files one change touches: each
file a row, marked added, changed or removed, its lines added and
removed at the right. The reader sees where the change lands and how big
it is before reading the diff.

![The coupon field commit in the shop: on top 6 files, 3 added, 2 changed, 1 removed, +312 and −148 lines; under src/api, coupons.js added with +64 and old-discounts.js removed and struck through with −92, 4 more files folded; under src/checkout, checkout.vue changed with +18 −27 and coupon-field.vue added with +121; components, pages and store folded; tests/coupon.test.js added with +88; docs/coupons.md changed with +21 −29; bin and public folded; each file has a bar of green for lines added and red for lines removed; a Now box says it is mostly new code and checkout.vue is the file to check](../img/diagrams/changemap_coupon.svg)

## Fits when

- **One commit or one pull request:** which files it adds, changes and
  removes, and where in the project they sit.
- **The question is where to look first:** the big rows, the removed
  file, the one changed file in a folder of new ones.
- **A change spreads over folders:** code, tests and docs, and the
  reader sees that each got its part.

## Not when

- **Which file needs which:** a [module graph](modules.md).
- **How big each part of the code is,** not what one change did: a
  [treemap](treemap.md).
- **A script's data flow,** files in and files out: a
  [pipeline](pipeline.md).

## How it is drawn

1. **The total:** on top of the panel, the number of files, then how
   many added, changed and removed in their colours; the lines added in
   green and removed in red at the right.
2. **The tree:** folders in bold with a slash, each level indented, thin
   grey lines from a folder to what it holds.
3. **The files:** one row each, a mark and its name in colour: green +
   added, blue ~ changed, red − removed and struck through.
4. **The lines:** at the right of each file, the lines added and removed
   as numbers, then a bar of green and red as long as they are.
5. **What it leaves alone:** folders and files the change does not touch
   fold into one grey row, "… 4 more files" or "… bin/, public/".
6. **Now:** a blue box under the panel says in one sentence what the
   change is and which file to check first.
