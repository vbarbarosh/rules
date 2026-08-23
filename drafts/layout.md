The basic layout of a project is as follows:

    bin/
    bin/build       alias bb='bin/build'
    bin/configure   the only command to run after git pull for preparing project for development
    bin/release     bin/release major|minor|patch
    bin/run         alias rr='bin/run'
    bin/test        alias tt='bin/test'
    bin/watch       alias ww='bin/watch'
    build/          results of bin/build (never commited)
    config/         project configuration is here; populated once, used as `const config = require('../config');`
    data/           place where app keeps its state (never commited)
    data/logs
    data/logs/2026-08-24.txt
    docs/           official docs
    img/            static images mostly for README.md
    notes/          working notes (hints and findings during development)
    src/
    src/agent/
    src/android/
    src/desktop-deno/
    src/desktop-electron/
    src/helpers/
    src/helpers/array_group.js
    src/helpers/array_group.test.js unit tests is always next to the file tested
    src/http/
    src/parser/
    tests/          a directory for test like playwright
    .env
    .env.example
    .gitignore
    Dockerfile
    LICENSE
    README.md
    package.json

- bin/run usually a thin alias to `npm start`
- bin/test usually a thin alias to `npm test`
- bin/build usually a thin alias to `npm run build`
- bin/watch usually a thin alias to `npm run watch`
- reasons for ^^^:
    - rr, tt, bb, ww much easier to type than `npm ...` alternatives
    - second, bin/run and friends is a universal approach for any project not
      just node.js; You could think of directory as of "program" with bin/ as
      its methods.

---

# Project layout

Every project keeps one shape. A directory is a program, and `bin/` holds its
methods. The names are fixed, so every checkout answers the same questions the
same way: how to set it up, run it, test it, build it.

## bin/

Executable scripts, one per verb. They are the project's interface and work the
same in every language.

    bin/build      bb   produce build/
    bin/configure       make a fresh checkout ready for development; the only command to run after git pull
    bin/release         release a new version: bin/release major|minor|patch
    bin/run        rr   start the program
    bin/test       tt   run the tests
    bin/watch      ww   rebuild on change

In a node.js project, `run`, `test`, `build`, and `watch` are thin wrappers
over `npm start`, `npm test`, `npm run build`, and `npm run watch`. The
wrappers are still worth having:

- `rr`, `tt`, `bb`, `ww` are shorter than any `npm ...` form.
- The names hold for projects that are not node.js. The aliases never change;
  each project decides what its verbs do.

## Committed and not committed

- `build/` holds what `bin/build` produced. Never committed, always
  reproducible.
- `data/` holds runtime state, for example `data/logs/2026-08-24.txt`. Never
  committed.
- `.env` holds local values and is never committed. `.env.example` documents
  the expected keys and is committed.

## config/

Configuration lives in one place and is populated once, when the project is
set up. Code reads it through one path:

    const config = require('../config');

## src/

One subdirectory per part of the program: `src/http/`, `src/parser/`,
`src/agent/`, `src/android/`, `src/desktop-electron/`. Small shared functions
go to `src/helpers/`, one function per file.

A unit test sits next to the file it tests:

    src/helpers/array_group.js
    src/helpers/array_group.test.js

`tests/` holds suites that drive the whole program, such as playwright.

## Documentation

- `README.md` stays short: what the project is and how to start it.
- `docs/` holds the official documentation.
- `notes/` holds working notes: hints and findings made during development.
- `img/` holds static images, mostly for `README.md`.
