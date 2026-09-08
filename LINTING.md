# Linting the rulebook

This repository is also a reusable ESLint plugin. It checks JavaScript, Vue
2/3 single-file components, and CSS/SCSS/indented Sass. It follows the
whole-line import sorting rule in `drafts/imports_sorted.md`, the brace
catalog in `drafts/formatting_blocks.md`, and the class conventions in
`drafts/css_classes.md`.

## Run it

Requires Node 22.13+ and ESLint 9.39 or 10. The checked-in development setup
uses ESLint 10.

```sh
bin/configure
npm run check
```

`bin/configure` is the setup command for a fresh checkout and after `git
pull`.  It installs the locked dependencies, including development tools, and
works from any working directory.

`npm run check` lints the implementation and runs the rule and integration
tests. The old naming demos and documentation examples are not included:
some intentionally demonstrate invalid or superseded conventions.

To check an application using this checkout, run ESLint from the application's
directory. This uses the new configuration without changing its existing setup:

```sh
cd /path/to/project
/app/node_modules/.bin/eslint --config /app/eslint.projects.config.js "src/**/*.{js,vue,css,scss,sass}"
```

Replace `/app` with the path to this checkout when using it elsewhere. Pass
individual files for an incremental rollout. Existing violations are errors;
these commands do not rewrite application files.

## Run it with npx

The package ships one executable, `lint`. It takes files or directories,
builds the configuration from the environment, and exits non-zero when any
error is reported:

```sh
PREFIXES=vb- npx @vbarbarosh/rules resources/
```

`PREFIXES` is a comma- or space-separated list that replaces the default
`app_prefixes`. The first prefix also names the transition mixin, so
`PREFIXES=vb-` expects `@include vb-transition(...)`. Until the package is published, point npx at a tarball made
with `npm pack`:

```sh
PREFIXES=vb- npx --package=/path/to/vbarbarosh-rules-0.1.0.tgz lint resources/
```

## Install in another project

```sh
npm install --save-dev eslint@^10 /path/to/rules
```

Create `eslint.config.cjs`:

```js
const rules_config = require('@vbarbarosh/rules/config');

module.exports = rules_config();
```

The factory returns a flat configuration array. JavaScript defaults to ES
modules; `.cjs` uses CommonJS. Both import forms are supported by the sorting
rule. For CommonJS `.js` files, append a file-specific language override:

```js
const rules_config = require('@vbarbarosh/rules/config');

module.exports = [
    ...rules_config(),
    {files: ['bin/**/*.js'], languageOptions: {sourceType: 'commonjs'}},
];
```

The plugin can also be loaded directly with
`require('@vbarbarosh/rules')` to select individual rules.
Use a separate flat configuration when an older application still relies on
legacy ESLint configuration; that configuration is not automatically merged.

## Checks

| Rule (`rules/` prefix) | What it enforces |
| --- | --- |
| `imports-sorted` | First statements, one statement per line, no internal comments/blank lines, full source lines compared as UTF-8 bytes. Side-effect imports (`import './x'`, bare `require('x')`) form their own block at the top, kept in the order they run, and one blank line may separate it from the sorted named imports. Handles `import`, bare `require`, assigned and destructured `require`, and `require(...).member`. |
| `block-layout` | Module-level function opening brace on the next line; nested functions/callbacks/control flow on the declaration line; bodies and closing braces on their own lines; `else`, `catch`, `finally` on new lines. |
| `tiny-arrows` | Only single-line expression callbacks, passed as call arguments or as object property values; one parameter named `v`, nested `vv`, etc. A `.catch` arrow uses `error`. Named helpers use function declarations. |
| `error-name` | `error` in catches, inline promise rejection handlers, and inline error event handlers; optional catch bindings remain valid. |
| `return-out` | Return expressions directly instead of `const out = ...; return out;` (also checks other const names). Arrays, objects and `new` results accumulated across statements use `out`. Passed-through parameters and outer-scope values are allowed. |
| `operator-spacing` | Tight `*`, `/`, `**`; spaces around other binary/logical/assignment operators. Preserves comments and necessary separation before a regex literal. |
| `vue-class-order` | Layout → spacing → sizing → decoration → typography → app prefixes → local classes. `ph*` before `pv*`; `fs*` and `fw*` before `lh*`. Multiple local classes form the final group. Families come from the smcss 0.10.0 registry; `x*` resets, item-flex classes, and any class outside the registry, the app prefixes and `#-` are left unconstrained. |
| `vue-layout-classes` | `gap*` closes the layout group: the flex/grid/split container, then its `flex-*` modifiers, then gap; no `mg*`/`mi*` on flex/grid containers; correct fluid/grow/shrink family under a known parent. |
| `vue-hashtag-syntax` | Exact source forms supported by the existing hashtag loader; catches unsupported quoting, spaces around `=`, unsupported attributes and JS strings. |
| `vue-local-class-style` | Each statically known `#-*` template class or supported JS selector has a nonempty style selector in the same component. Style syntax/coverage failures are errors once a `#-*` class asks to be verified. |
| `vue-style-conventions` | `@import` first in a component style block; inside a rule, `@include` first, ahead of the property declarations (`$variables` do not count; root-level includes are free); transition properties through the shared mixins; no `all`. Whether a transition belongs on the base rule or on a state is a design call and is not checked. |

The preset also enables four-space JS indentation, aligned switch cases,
mandatory braces, function declaration style, no tabs, no `do...while`, no
classes except one that extends another, and no `forEach`. Vue scripts use four spaces with one base indent;
`v-bind` and `v-on` use their full spelling, and `v-if`/`v-for` cannot share
an element.

Only whitespace rules offer autofixes. Import order, names and classes are
reported without automatic rewriting. In particular, reordering `require`
calls may change side effects. Run `eslint --fix` explicitly when desired.

## Vue and the hashtag loader

The two application loaders were compared and directly exercised before this
plugin was written. They replace `#-` with a per-component path hash in:

- double-quoted `class`, `card_class`, and names ending in `-class` / `:class`,
  including `v-bind:class`;
- style occurrences of `.#-`;
- JavaScript occurrences beginning with the exact single-quoted `'.#-` form.

The linter reads the original component. For stylesheet parsing only, it
replaces the hashtag marker with a same-length valid identifier, resolves
selector nesting, and maps names back. It does not execute webpack or depend
on a particular generated hash. Source locations stay in the original file.

CSS uses PostCSS, SCSS uses `postcss-scss`, and indented Sass uses the official
`sass-parser`, pinned because its API is still developing. A same-length
adapter handles its current limitation with percentage keyframe selectors;
keyframes are excluded from class-definition analysis. Comments and declaration strings do not
count as selectors. Empty rules and variable-only rules do not count as
styles. Declarations, includes and extends count. Selector lists, media rules,
multiple style blocks, keyframes, `&:hover`, and `&-suffix` nesting are covered. A class
mentioned only inside `:not(...)` does not count as styled.

## Configuration and limits

```js
const rules_config = require('@vbarbarosh/rules/config');

module.exports = rules_config({
    app_prefixes: ['app-', 'vb-', 'np-'],
    layout_patterns: ['^(flex-(row|col)|[hv]split|grid)($|[-0-9])'],
    check_dynamic: true,
});
```

- **App prefixes** name the classes that sort after the utilities and the
  transition mixin family: `<prefix>transition`, `-fast`, `-debug`. The first
  prefix is the one the message suggests.
- **Dynamic classes:** literal strings, arrays, object keys, `&&` expressions
  and ternary branches are checked. Unresolved values, spreads, computed keys
  and more than 64 combinations are reported as unverifiable. `check_dynamic:
  false` suppresses that diagnostic but cannot guarantee those values.
- **Class order is checked within each class attribute/binding**, including
  class-like component props. Separate `class` and `v-bind:class` attributes
  are not merged into simulated runtime output. Put a layout and its gap in
  the same value. Parent checks only use layout classes visible in this file;
  component fallthrough and layouts from external CSS are not inferred.
- **Utility categories:** every smcss 0.10.0 class is recognized by its
  family. `x*` resets, item-flex classes (`fluid`, `flex-noshrink`, ...) and
  classes outside the registry are left unconstrained, so a component or
  vendor class never triggers an ordering error. App prefixes and compatible
  layout patterns are configurable.
- **Local definitions:** checks declaration coverage, not actual DOM selector
  matching, CSS specificity, computed styling, or whether a mixin emits CSS.
  Global classes such as `app-shadow` require the application's utility
  registry for existence checking and are not checked for existence here.
- **Sass/build features:** selector interpolation, unsupported syntax, and
  external `<style src>` blocks produce an explicit coverage error. Imported
  partials, Sass mixin expansion, `@extend` evaluation, generated selectors and
  webpack execution are not performed. Selectors inside unexpanded mixin or
  function definitions do not count as component styles. CSS/Sass parse errors cannot pass as
  verified styles. Standalone styles use the same style checks through an
  ESLint processor with original line numbers.
- **Return naming:** construction through arbitrary function calls,
  reassignment or complex data flow is not inferred. The rule is deliberately
  limited to locally initialized arrays, objects and constructor calls.
- **Transition policy:** checks declarations and explicit transition includes;
  it does not infer every property that needs animating or prove that every
  interactive state has a transition.
- **Scope:** this is a tested set of mechanical rules, not enforcement of all
  prose in the rulebook. Domain semantics, conceptual phase breaks, API
  contracts, derived-state ownership, full module structure, Vue attribute
  ordering and compound-expression parentheses still need review or further
  rules. Module-format restrictions remain a consuming project's choice.

The implementation uses CommonJS to match this repository's `FORMATTING.md`.
ESLint's required plugin/config objects and visitor functions follow its API;
other helpers use named functions, snake_case, and one exported helper per file.
