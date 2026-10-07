- one default export per reusable/library module: a function, class, configuration or data
- executable scripts export nothing; tool-shaped files follow the tool
- declare the exported value above; the last statement is `export default name;`
- never combine the declaration with the export: no `export default function` or `export default class`
- never `export {a, b}`; never `import {a, b}` from a local module
- several independent public functions = several files
- research and scratch code is not exempt


# One export per file

A reusable/library module exports exactly one public value: a function,
class, configuration or data. Declare it separately and export its name as
the last statement. Executable scripts export nothing; a file whose shape
is dictated by a tool follows the tool. The rule is the same
for both module systems:

```js
module.exports = items_index_by_uid;
```

```js
// items_index_by_uid.js
function items_index_by_uid(items)
{
    return Object.fromEntries(items.map(v => [v.uid, v]));
}

export default items_index_by_uid;
```

Declare the exported value separately, above the export. For ES modules the
last statement is `export default name;`: an identifier referring to that
value. Do not combine the declaration and export as `export default function`
or `export default class`, and do not export an inline expression.

```js
// BAD: declaration combined with export
export default function items_index_by_uid(items)
{
    return Object.fromEntries(items.map(v => [v.uid, v]));
}
```

The file is named after what it exports: `items_index_by_uid.js`.

Both of these are valid, in separate files:

```js
// helper.js
function helper()
{
    return null;
}

export default helper;
```

```js
// settings.js
const settings = {port: 8080};

export default settings;
```

The filename follows the exported value: `helper.js`, `Logger.js` or
`settings.js`. Several independent public functions are several modules;
this does not forbid methods inside one exported class.

## No named exports

```js
// BAD
export {engine_run, engine_transport};
module.exports = {engine_run, engine_transport};
```

The consuming side of it is banned as well — several names are never taken
from a local module:

```js
// BAD
import {engine_run, engine_transport} from './engine';
const {engine_run, engine_transport} = require('./engine');
```

Several independent public functions are several files, each named after its function:

```js
// GOOD
import engine_run from './engine_run';
import engine_transport from './engine_transport';
```

## Not exempt

Research, scratch and test-support code inside a repository follows the same
rule.

## Exceptions

- A named import from a library is the library's shape:
  `import {mapState} from 'vuex';`, `const {promisify} = require('util');`.
- A file whose shape is dictated by a tool follows the tool:
  `module.exports.mochaHooks` in a mocha hooks file.
