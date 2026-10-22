# tests/browser

The browser tests: Playwright opens the built pages and acts as a reader
does. Run with Chromium installed: `node --test tests/browser/*.test.js`.

- [main-search.test.js](main-search.test.js) — typing anywhere goes to the search
- [search-results.test.js](search-results.test.js) — the best match first, the words found marked
- [overview.test.js](overview.test.js) — every page opens with all its items on one screen
- [picture-size.test.js](picture-size.test.js) — the pictures control: off, small, large
- [pictures.test.js](pictures.test.js) — every picture in `img/`: text inside its boxes, arrows attached, light and dark alike
- [rule-anchors.test.js](rule-anchors.test.js) — a link to a rule lands on it
- [term-trail.test.js](term-trail.test.js) — the term stays in view as its entry scrolls
- [theme-switch.test.js](theme-switch.test.js) — the light and dark switch on every page
- [try-it.test.js](try-it.test.js) — a rule's Try it opens its live demo
