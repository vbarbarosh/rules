The main goal of this file is to define the general coding style for this
project, so all JavaScript code follows the same conventions.

## **Project JavaScript Coding Style**

* Use **`function name(...)` declarations** for all top-level and nested named functions outside class bodies

    * A top-level function declaration puts its opening brace on the next line:
      ```js
      function main()
      {
          // ...
      }
      ```
    * A function declared inside another function keeps its opening brace on the declaration line:
      ```js
      function main()
      {
          function limit_print(limit) {
              // ...
          }
      }
      ```
    * Function expressions and callbacks also keep the opening brace on the declaration line
    * Do **not** use arrow functions for non-trivial logic
    * Arrow functions allowed **only** for tiny callbacks (`v => v.uid`)
    * A callback whose body is only `return <expression>`, and whose arrow fits on one line, is written as that arrow; `function` stays for a callback that does more, or that needs `this` or `arguments`:
      ```js
      // BAD
      const text_items = items.filter(function (item) {
          return item_text(item) === text;
      });

      // GOOD
      const text_items = items.filter(v => item_text(v) === text);
      ```
    * A lone value or event parameter in an arrow is `v`; an error parameter is `e`
    * Value arrows use `v`, `vv`, `vvv` by arrow nesting depth, including an enclosing error arrow (`promise.catch(e => items.map(vv => vv.uid))`)
    * Error arrows include promise rejection handlers and EventEmitter `error` listeners: `promise.catch(e => report(e))`, `server.on('error', e => report(e))`
    * A DOM event is a value even when its type is `error`: `el.addEventListener('error', v => report(v))`
    * Error callback names stay `e` / `error` at every depth; regular DOM event handlers use `function (event)`. Only nested catch bindings use `error2`, `error3`
    * With several parameters, choose names for their roles; the first parameter of an error handler still follows the error naming rule
    * A lone value parameter and an error handler’s first parameter are taken whole, not destructured; see [error names](drafts/var_names_error.md) and [nested handlers](drafts/var_names_event.md)

* **One public value per library module**

    * Library modules export one public value — a function, class, configuration or data — with `module.exports = <name>;` at file end; declare the value above and name the file after it
    * An executable script uses `main` as its entry function and does not export
    * Hand `main` to `cli` with `cli(main);` immediately after `require` statements and all global initialization
    * Never call `main()` directly; `cli` owns the process contract (see [drafts/cli_main.md](drafts/cli_main.md))
    * `main` is the executable-entry exception to domain-first function naming
    * Do not combine a library export and executable invocation in the same file
    * Executable skeleton:
      ```js
      const cli = require('@vbarbarosh/node-helpers/src/cli');

      const report_limit = 31;
      cli(main);

      function main()
      {
          report_print();
      }

      function report_print()
      {
          // ...
      }
      ```

* Prefer **imperative control flow**

    * Prefer `for (const item of items)` when possible
    * Use indexed loops when the index is needed
    * Do **not** use `do { ... } while (...)`; use `while (...) { ... }` or `for (...) { ... }`
    * `reduce`, deep chaining, and functional pipelines are **allowed only if the entire expression fits on a single line**

* **Early returns for guards**

    * Validate inputs immediately
    * Return `null` / empty values explicitly

* Use **plain data structures**

    * `Set`, `Map`, or plain `{}` for lookups
    * No prototypes, no mutation via shared state

* **Local helpers are allowed**

    * Define helpers after the public entry function and before a library's final export
    * Helpers must be named functions (not inline lambdas)

* **Domain-first naming**

    * Functions and files follow `items_*`, `item_*`, or domain nouns
    * Avoid generic names (`process`, `handle`, `util`)
    * `main` is reserved for the entry function of an executable script
    * The verb-first families are the exceptions to domain-first naming: `main`, `format_*`, `render_*`, `export_*`, `is_*`, `refresh_*`, `click_*`, `emit_*`, and the steps of a script (`build_rules_html()`)

* **Comments explain intent or policy only**

    * No comments for obvious mechanics
    * Multi-line comments used for rules, invariants, or guarantees

* Prefer **explicit temporaries**

    * Use intermediate variables instead of nested expressions
    * Favor clarity over terseness

* **Blank lines mark phase changes**

    * Keep setup adjacent to the loop, condition, or call that immediately uses it
    * Do not separate tightly coupled setup and use merely because the statement type changes
    * Add a blank line only when the following statement begins an independent conceptual step

* **Top-level functions stand one blank line apart**

    * Each function declared at module level is followed by one blank line before the next one
    * Example:

      ```
      // BAD
      function sync_settings()
      {
          sync_view_button();
      }
      function toggle_sound()
      {
          muted = !muted;
      }

      // GOOD
      function sync_settings()
      {
          sync_view_button();
      }

      function toggle_sound()
      {
          muted = !muted;
      }
      ```

* **Line breaks must expose structure**

    * Keep an expression on one line when it fits on one line
    * Do not split an assignment after `=` when its right-hand side is a single function call
    * Break a statement only when its size or nested structure makes the break necessary

* **No dangling arguments**

    * Only the last argument of a call may span several lines; every argument before it fits on one line
    * Nothing follows a multi-line argument: no further argument after `}`, no chained call after `})`
    * A function that would leave arguments dangling gets a name: declare it inside the caller and pass the name, so the call fits on one line
    * A chained call after a multi-line callback becomes a variable, and the next step works on that variable
    * Example:

      ```
      // BAD
      const families = await page.evaluate(function (text) {
          return window.app.app.canvas.items.filter(function (item) {
              return item_text(item) === text;
          }).map(v => v.font_family);
      }, text);

      // GOOD
      const families = await page.evaluate(find_families, text);
      expect(families.length).toBe(1);
      return families[0];
      function find_families(text) {
          const text_items = window.app.app.canvas.items.filter(v => item_text(v) === text);
          return text_items.map(v => v.font_family);
      }
      ```

* **Parentheses expose precedence**

    * In a logical expression (`&&`, `||`, `??`) and in the condition of a ternary, an operand that carries an operator of its own is wrapped in parentheses
    * A simple operand stays bare: an identifier, member access, call, template literal or unary negation — the line VUE-06 draws for directive values
    * A chain of one logical operator is one expression: `a && b && c` stays bare
    * Example:

      ```
      // BAD
      return this.dev.is_ai_chat_dev || i === this.messages.length - 1;
      const pressed = button.dataset.set === theme ? 'true' : 'false';

      // GOOD
      return this.dev.is_ai_chat_dev || (i === this.messages.length - 1);
      const pressed = (button.dataset.set === theme) ? 'true' : 'false';
      ```

* **One variable per declaration**

    * Each variable gets its own `const` or `let` statement; a declaration never lists several variables separated by commas
    * The header of an indexed loop is the exception: `for (let i = 0, end = items.length; i < end; ++i)`
    * Example:

      ```
      // BAD
      const osc = c.createOscillator(),
          gain = c.createGain(),
          nodes = [osc, gain];

      // GOOD
      const osc = c.createOscillator();
      const gain = c.createGain();
      const nodes = [osc, gain];
      ```

* **Template literals build strings**

    * A string built from parts is a template literal; `+` never joins a string to a value
    * Plain quotes stay for a string with nothing to interpolate
    * Example:

      ```
      // BAD
      sprite_draw_box('weapons/turret-' + weapon.id, weapon.color, box);

      // GOOD
      sprite_draw_box(`weapons/turret-${weapon.id}`, weapon.color, box);
      ```

* **No implicit magic**

    * No hidden side effects
    * No reliance on execution order side effects

* **CommonJS in this repository and in node scripts**

    * This repository's own code and node scripts use `const <name> = require('<module>');`, never `import` or `export`
    * Elsewhere the rules cover both module systems (see [drafts/one_export_per_file.md](drafts/one_export_per_file.md))

* **Return variable naming**

    * A variable returned as it is — `return out;`, exactly — **MUST be named `out`**
    * A value joined, stringified or otherwise transformed on its way out is named by what it is: `return lines.join('\n');` (see [drafts/return_out.md](drafts/return_out.md))
    * Returning **literals or expressions** directly is allowed
    * Early guard returns may return literals (`null`, `false`, `[]`, `{}`)
    * `const out = {...}; return out;` should be rewritten as `return {...};`

* **File structure order**

    * An executable script may start with a shebang; nothing may precede it
    * `require` statements must follow, sorted as plain text lines in byte order — vim's `:sort`, or `LC_ALL=C sort` (see [drafts/imports_sorted.md](drafts/imports_sorted.md))
    * File-level constants and variables must follow `require` statements
    * An executable script must call `cli(main);` immediately after all global initialization
    * When the public value is a function, it must be the first function in the file
    * Private helper functions must be defined after the public entry declaration
    * In an executable script, the first function declaration must be `function main()`
    * No executable code other than `cli(main);` may appear before the public entry function — no module-level `if`, `for` or `while`; an executable's setup happens in `main`
    * A library module ends with `module.exports = public_value;`; executable scripts export nothing, and tool-shaped files follow the tool

> Library order = `requires → constants → public entry → helpers → module.exports`
>
> Executable order = `shebang → requires → globals → cli(main); → function main() → helpers`

* **Braces, layout, and indentation**

    * The construction-by-construction catalog: [drafts/formatting_blocks.md](drafts/formatting_blocks.md)
    * A top-level function declaration puts `{` on the next line
    * Nested function declarations, function expressions, callbacks, and control-flow statements keep `{` on the declaration line
    * Always use braces for `if`, `else`, `for`, `while`, etc. (no single-line bodies)
    * `else` **must start on a new line**:
      ```
      if (cond) {
          ...
      }
      else {
          ...
      }
      ```
    * `switch` and `case` must be aligned at the same indentation level
    * Indentation is **exactly 4 spaces** (no tabs)

* **Object construction**

    * Prefer explicitly listing **only the required fields** when constructing objects
    * Avoid spreading full objects when only a subset is needed
    * Example:

      ```
      // BAD
      {...item, index}
  
      // GOOD
      {uid: item.uid, parent_uid: item.parent_uid, index}
      ```
    * A single-line object or array literal has no space inside its braces or brackets — a standalone literal, a nested one, or one row of a list:

      ```
      // BAD
      const RANGE_UNITS = { s: 1, m: 60, h: 3600, d: 86400, w: 604800 };
      text: { type: String, default: '' },
      { value: 'today', label: 'Today' },
      const LABELS_OPEN_BY_DEFAULT = [ 'remote', 'host', 'service' ];

      // GOOD
      const RANGE_UNITS = {s: 1, m: 60, h: 3600, d: 86400, w: 604800};
      text: {type: String, default: ''},
      {value: 'today', label: 'Today'},
      const LABELS_OPEN_BY_DEFAULT = ['remote', 'host', 'service'];
      ```
