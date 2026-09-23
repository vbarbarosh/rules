- one default export per file
- never `export {a, b}`; never `import {a, b}` from a local module
- several functions = several files
- research and scratch code is not exempt


# One export per file

A file exports exactly one thing, as its last statement. The rule is the same
for both module systems:

```js
module.exports = items_index_by_uid;
```

```js
export default items_index_by_uid;
```

The file is named after what it exports: `items_index_by_uid.js`.

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

Several functions are several files, each named after its function:

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
