- Which diagrams does this project have that we lack? (2026-11-02 19:24,
  of archify.si)
- Let us add them then, and be sure to show me what was added and what
  came out. (19:29)

# Breakdown tree: a whole split into its parts

One thing on top, split into its parts, each part into its own, down to
the level the question needs. Every part has one parent, so the reader
sees what belongs where and what is missing an owner.

![The shop, split into its parts: on top the shop, 7 parts and 3 teams; under it Catalog of team Find, Checkout of team Pay and Accounts of team Me; under Catalog Search and Products, under Checkout Cart, Payment and Coupons, under Accounts Sign-in and Orders, each with its team; Coupons is amber, no owner, and a line under the tree says it belongs to Checkout but no team owns it; a Now box says every part has one owner but Coupons](../img/diagrams/breakdown_shop.svg)

## Fits when

- **A whole and its parts:** a product by feature, a system by component,
  a team by people, a goal by its tasks.
- **The question is where each part belongs,** and which part has no
  owner, no test, no plan.
- **One parent each:** every part sits under exactly one other.

## Not when

- **A part has two parents,** or the parts call each other: a
  [module graph](modules.md) or a [container sketch](containers.md).
- **Files in their folders:** a [module graph](modules.md); what one
  change touches, a [change map](changemap.md).
- **How big each part is:** a [treemap](treemap.md), its areas by size.
- **What waits on what:** a [plan graph](plangraph.md).

## How it is drawn

1. **The root:** on top, in the middle, a blue box with the whole's name
   and a count under it (7 parts, 3 teams).
2. **The parts:** a box per part, its name in bold and one fact under it
   (its owner, its size); one row per level, at most three levels.
3. **The lines:** from the middle of a parent's bottom down, across, and
   down into each child; square corners, no arrowheads.
4. **The leaves:** evenly across the bottom row; each parent centred over
   its own.
5. **What stands out:** the part the question is about amber, a line
   under the tree saying why.
6. **Now:** a blue box under the tree says in one sentence what to do.

## References

- [archify](https://github.com/tt-a1i/archify), by tt-a1i, Apache-2.0
  licence: an agent skill that draws this kind from typed JSON into an
  interactive page; the kind came to this page from it, the picture is
  drawn here.
