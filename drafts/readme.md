- README.md of a project on GitHub: a cover image, the project name, a short
  description of what it is, then a link to the documentation page (a link to
  the project's main page, most often its documentation); below it, more
  links to documentation if needed. At the very end, the license, MIT.
- README.md stays compact; it should not turn into one huge page.
- A link to the project's page, its website: rules has one on GitHub Pages.
- Also a quick start, a few lines; badges and more links are optional.
- No website link when the website is the documentation (authwall).

# README

`README.md` is the front page of a repository on GitHub. It says what the
project is, how to start it, and where its website and documentation are; it
does not hold the documentation itself. It stays compact.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="readme-structure-dark.png">
  <img alt="the parts of a README, top to bottom" src="readme-structure.png">
</picture>

The parts, top to bottom. Badges and more pages are optional, and the
website link is left out when the website is the documentation; the rest are
always there.

1. **Badges.** Optional. At the very top, above the cover, a row per kind:
   the package and its numbers on one row, the CI workflows on the next.
   As many as the project has.

   ```html
   <p>
   <a href="https://hub.docker.com/r/vbarbarosh/authwall"><img src="https://img.shields.io/docker/pulls/vbarbarosh/authwall"></a>
   <a href="https://github.com/vbarbarosh/authwall"><img src="https://img.shields.io/github/stars/vbarbarosh/authwall?style=flat"></a>
   <br>
   <a href="https://github.com/vbarbarosh/authwall/actions"><img src="https://github.com/vbarbarosh/authwall/actions/workflows/master.yml/badge.svg"></a>
   <a href="https://github.com/vbarbarosh/authwall/actions"><img src="https://github.com/vbarbarosh/authwall/actions/workflows/trivy.yml/badge.svg"></a>
   </p>
   ```

2. **Cover image.** A file in `img/`, with a dark twin when the colours need
   one.

   ```html
   <picture>
     <source media="(prefers-color-scheme: dark)" srcset="img/cover-dark.png">
     <img alt="rules" src="img/cover.png">
   </picture>
   ```

3. **Name.** The project name, as the one `#` heading, right under the cover.
   It is the name of the repository.

   ```
   # rules
   ```

4. **Short description.** One sentence on its own line: what the project is.
   The same sentence is the repository's About text and the `description` of
   `package.json`.

5. **Website.** A link to the project's own site, with the word `Website` as
   its text. It is the same address as the repository's About → Website and
   the `homepage` of `package.json`. Left out when the website is the
   documentation: the Documentation link below is then that address.

   ```
   **[Website](https://vbarbarosh.github.io/rules/)**
   ```

6. **Quick start.** How to install and run it, in a few lines.

   ```
   npx vbarbarosh/rules src
   ```

7. **Documentation.** A `## Documentation` section. Its first line is the
   link to the full documentation.

   ```
   ## Documentation

   Full documentation: **[docs/rules.html](docs/rules.html)**
   ```

8. **More pages.** Optional, in the same section: further documentation
   pages as a short list, each with what it covers.

   ```
   * [Formatting](FORMATTING.md) — the JavaScript spec
   * [Linting](LINTING.md) — the ESLint preset
   ```

9. **License.** The last section, the license named and linked to `LICENSE`.

   ```
   ## License

   [MIT](LICENSE)
   ```

Everything else lives in the documentation.

The picture is drawn by [readme-structure.html](readme-structure.html) and
rendered to `readme-structure.png` and `readme-structure-dark.png` (`?dark`).
