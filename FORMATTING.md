The main goal of this file is to define the general coding style for this
project, so all JavaScript code follows the same conventions.

## **Project JavaScript Coding Style**

* Use **`function name(...) {}` declarations** for all top-level and local functions

    * Do **not** use arrow functions for non-trivial logic
    * Arrow functions allowed **only** for tiny callbacks (`v => v.uid`)
    * Prefer `v` as the variable name for lambda callbacks
    * Use `vv` for nested lambda callbacks (`items.map(v => v.some(vv => vv.permissions.includes(...)))`)

* **One exported function per file**

    * Use `export default <function_name>;` at file end

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

    * Define helper functions above export
    * Helpers must be named functions (not inline lambdas)

* **Domain-first naming**

    * Functions and files follow `items_*`, `item_*`, or domain nouns
    * Avoid generic names (`process`, `handle`, `util`)

* **Comments explain intent or policy only**

    * No comments for obvious mechanics
    * Multi-line comments used for rules, invariants, or guarantees

* Prefer **explicit temporaries**

    * Use intermediate variables instead of nested expressions
    * Favor clarity over terseness

* **No implicit magic**

    * No hidden side effects
    * No reliance on execution order side effects

* **ES modules only**

    * Use `import … from …`
    * No `require`, no CommonJS patterns

* **Return variable naming**

    * If a variable is used in a `return` statement, it **MUST be named `out`**
    * Returning **literals or expressions** directly is allowed
    * Early guard returns may return literals (`null`, `false`, `[]`, `{}`)
    * `const out = {...}; return out;` should be rewritten as `return {...};`

* **File structure order**

    * `import` statements **must be first in the file**, sorted lexicographically like the shell `sort` command
    * File-level constants **must follow imports**
    * The **exported function must be the first function in the file**
    * All helper functions **must be defined after the exported function**
    * No helpers, constants, or executable code may appear before the exported function (except imports/constants)
    * `export default exported_function` should be very last statement in a file.

> File order = `imports → constants → exported function → helpers → export default exported_function`

* **Braces, layout, and indentation**

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
