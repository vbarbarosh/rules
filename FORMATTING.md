The main goal of this file is to define the general coding style for this
project, so all JavaScript code follows the same conventions.

## **Project JavaScript Coding Style**

* Use **`function name(...)` declarations** for all top-level and nested named functions

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
    * Prefer `v` as the variable name for lambda callbacks
    * Use `vv` for nested lambda callbacks (`items.map(v => v.some(vv => vv.permissions.includes(...)))`)

* **One public entry function per file**

    * Library modules export one function with `module.exports = <function_name>;` at file end
    * An executable script uses `main` as its entry function and does not export
    * Call `main();` immediately after `require` statements and all global initialization
    * `main` is the executable-entry exception to domain-first function naming
    * Do not combine a library export and executable invocation in the same file
    * Executable skeleton:
      ```js
      const report_limit = 31;
      main();

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

This preserves the original intent while making the exception explicit and mechanically enforceable.

* **Early returns for guards**

    * Validate inputs immediately
    * Return `null` / empty values explicitly

* Use **plain data structures**

    * `Set`, `Map`, or plain `{}` for lookups
    * No classes, no prototypes, no mutation via shared state

* **Local helpers are allowed**

    * Define helpers after the public entry function and before a library's final export
    * Helpers must be named functions (not inline lambdas)

* **Domain-first naming**

    * Functions and files follow `items_*`, `item_*`, or domain nouns
    * Avoid generic names (`process`, `handle`, `util`)
    * `main` is reserved for the entry function of an executable script

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

* **Line breaks must expose structure**

    * Keep an expression on one line when it fits on one line
    * Do not split an assignment after `=` when its right-hand side is a single function call
    * Break a statement only when its size or nested structure makes the break necessary

* **No implicit magic**

    * No hidden side effects
    * No reliance on execution order side effects

* **CommonJS modules only**

    * Use `const <name> = require('<module>');`
    * Do not use `import` or `export`

* **Return variable naming**

    * If a variable is used in a `return` statement, it **MUST be named `out`**
    * Returning **literals or expressions** directly is allowed
    * Early guard returns may return literals (`null`, `false`, `[]`, `{}`)
    * `const out = {...}; return out;` should be rewritten as `return {...};`

* **File structure order**

    * An executable script may start with a shebang; nothing may precede it
    * `require` statements must follow, sorted lexicographically like the shell `sort` command
    * File-level constants and variables must follow `require` statements
    * An executable script must call `main();` immediately after all global initialization
    * The public entry function must be the first function in the file
    * All helper functions must be defined after the public entry function
    * In an executable script, the first function declaration must be `function main()`
    * No executable code other than `main();` may appear before the public entry function
    * A library module ends with `module.exports = public_entry_function;`

> Library order = `requires → constants → public entry → helpers → module.exports`
>
> Executable order = `shebang → requires → globals → main(); → function main() → helpers`

* **Braces, layout, and indentation**

    * A top-level function declaration puts `{` on the next line
    * Nested function declarations, function expressions, callbacks, and control-flow statements keep `{` on the declaration line
    * Always use braces for `if`, `else`, `for`, `while`, `do`, etc. (no single-line bodies)
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
