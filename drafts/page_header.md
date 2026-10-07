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
5. **Theme switch.** The light/dark switch of [theme_switch.md](theme_switch.md):
   one sun/crescent button showing the current theme, on every page.
6. **GitHub.** The GitHub icon, in the far right corner, a link to the
   project's repository.

The project sits at the left end and the two controls at the right end, in
this order on every page. The GitHub link takes the reader off the site, so
it gets the edge; the theme switch belongs to the page and stays inside it.
authwall, Vite and Vue order them this way.

What goes at the bottom of the page is not decided yet.

The picture is drawn by [page-header-structure.html](page-header-structure.html)
and rendered to `page-header-structure.png` and `page-header-structure-dark.png`
(`?dark`).
