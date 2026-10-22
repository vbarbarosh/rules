# tests

The unit tests, run by `npm test`; the browser tests are in
[browser/](browser/README.md).

- [lint.test.js](lint.test.js) — `bin/lint` over real files
- [javascript.test.js](javascript.test.js) — the JavaScript rules, case by case
- [vue.test.js](vue.test.js) — the Vue rules, case by case
- [vue-globals.test.js](vue-globals.test.js) — the helpers documented in `vue2/vue-globals.md` do what it says
- [integration.test.js](integration.test.js) — the whole preset over whole files
- [build.test.js](build.test.js) — `bin/build` and the pages it writes
- [own-pages.test.js](own-pages.test.js) — the repository's own pages follow its rules: their styles and scripts
