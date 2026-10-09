- Every project page has a header; most of all, the projects on GitHub.
- Top right: a GitHub icon that leads to the repository, and the theme
  switch. Any page at all always has a theme switch.
- Top left: the project with its version; its icon too, when it has one.
- A search is good for documentation.
- The search is aligned with the content.
- The order of the two on the right: the same on every page; to decide.
- The bottom of the page: nothing decided yet.

# Page header

A project's website, whether a documentation site like authwall's or a
single page made from its README, opens with the same header bar. The reader
sees at once which project this is and which version, can switch the theme,
and can get to the code.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="page-header-structure-dark.png">
  <img alt="the parts of a page header, left to right" src="page-header-structure.png">
</picture>

The parts, left to right. The icon, the search and the section links are
optional; the rest are always there.

1. **Icon.** Optional: the project's icon, when it has one.
2. **Name.** The project's name.
3. **Version.** The released version, `v1.16.0`.
4. **Search and section links.** Optional, between the two ends. A search
   pays off on a documentation site. On a page with a sidebar, the search
   starts at the left edge of the content column, so the header continues
   the columns below it: the project over the sidebar, the search over the
   content.
5. **Links.** The GitHub icon, a link to the project's repository; other
   links of the project beside it, Twitter or Facebook, when it has them.
6. **Theme switch.** The light/dark switch of [theme_switch.md](theme_switch.md):
   one sun/crescent button showing the current theme, on every page, always
   the last thing on the right.

The project sits at the left end, the links and the theme switch at the
right end, in this order on every page: decided on 2026-10-09 (MP-44),
replacing the order of MP-41. A project may have several links, GitHub,
Twitter, Facebook, and their number changes from one project to another;
put after them, the theme switch stays in the same place on every page, at
the right edge, where the reader finds it without looking.

The icons on the right look alike: the same size, the same colour, and no
frame on any of them; the theme switch has none of its own (MP-45). A
switch in a frame beside a bare GitHub icon, or one larger than it, reads
as a different kind of control.

What goes at the bottom of the page is not decided yet.

The picture is drawn by [page-header-structure.html](page-header-structure.html)
and rendered to `page-header-structure.png` and `page-header-structure-dark.png`
(`?dark`).
