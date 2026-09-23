- all imports should be sorted similar to vim :sort



--- ✂️✨🤖✨ ⬇️ AI-Generated Content Below ⬇️ ✨🤖✨✂️ ---



The import block is sorted as plain text lines, byte by byte — what vim's
`:sort` over the block produces, or `LC_ALL=C sort`. `require` and `import`
alike:

```js
const $ = require('jquery');
const Vue = require('vue');
const axios = require('axios');
const cli = require('@vbarbarosh/node-helpers/src/cli');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
```

```js
import SvgIconCheck from './svg-icon-check.vue';
import Vue from 'vue';
import axios from 'axios';
import {mapState} from 'vuex';
```

The whole line is the key, `const`/`import` included — not the module path,
not the variable name. Byte order, so:

- `@` and `$` come before letters,
- uppercase comes before lowercase (`Vue` before `axios`),
- `{` comes after `z` — destructured imports land last.

A locale-aware `sort` folds case and ignores punctuation; that is a different
order and not this rule.

- No groups. Builtins, packages and local files are one list, not three.
- No blank lines and no comments inside the block — either one breaks the sort.
- The one exception is a side-effect import — `import './x'`, a bare
  `require('x')`. Those keep the order they run in, in their own block at the
  top; one blank line, then the sorted named imports.

  ```js
  import './sass/main.sass';
  import './main-pre';

  import Vue from 'vue';
  import axios from 'axios';
  ```
- A named import from a library — `import {mapState} from 'vuex'`,
  `const {promisify} = require('util')` — may also stand apart: one blank
  line after the default imports, then those lines, sorted among themselves.
  This holds until the linter sorts the whole block the way it should.

  ```js
  import Vue from 'vue';
  import axios from 'axios';

  import {mapState} from 'vuex';
  import {promisify} from 'util';
  ```
- The block is contiguous: shebang, imports, then constants
  (see [../FORMATTING.md](../FORMATTING.md)).
