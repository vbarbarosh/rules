lets add one new page for bin scripts;

bin/build | bb
bin/run | rr
bin/configure | -
bin/test | tt
bin/watch | ww


# bin/ scripts

`bin/` holds the project's verbs: one executable per thing you do with it.
Every project has the same ones, under the same names, so any checkout is
set up, run, tested and built the same way, whatever its language
(PROJ-01).

| Script          | Alias | What it does                                      |
|-----------------|-------|---------------------------------------------------|
| `bin/build`     | `bb`  | builds the project into `build/`                  |
| `bin/run`       | `rr`  | starts the program                                |
| `bin/configure` |       | makes a fresh checkout ready to work in           |
| `bin/test`      | `tt`  | runs the tests                                    |
| `bin/watch`     | `ww`  | rebuilds on every change                          |

The aliases are two letters, the script's first letter twice. They live in
the shell, once for every project:

```bash
alias bb='bin/build'
alias rr='bin/run'
alias tt='bin/test'
alias ww='bin/watch'
```

`bin/configure` has none.

## bin/build · bb

Builds the project into `build/`, which is never committed (PROJ-04). Its
last step is `bin/self-check`: a build that fails it ships nothing
(PROJ-30). In a node.js project it wraps `npm run build`.

## bin/run · rr

Starts the program. In a node.js project it wraps `npm start`.

## bin/configure

Makes a fresh checkout ready for development: the only command to run after
`git pull` (PROJ-02). Every question it may ask, the `sudo` password
included, comes at the very start, before any work
([configure.md](configure.md)).

## bin/test · tt

Runs the tests. In a node.js project it wraps `npm test`.

## bin/watch · ww

Rebuilds on every change. In a node.js project it wraps `npm run watch`.

## Why wrappers

In a node.js project `bin/run`, `bin/test`, `bin/build` and `bin/watch` are
thin wrappers over npm, and still worth having (PROJ-03):

- `rr`, `tt`, `bb`, `ww` are shorter than any `npm ...` form.
- The names hold for projects that are not node.js: the aliases never
  change, each project decides what its verbs do.

A bash script starts as a copy of [bin/templ](../bin/templ) (PROJ-15).
The other verbs of `bin/`, `bin/release` and `bin/self-check`, are in
[layout.md](layout.md).
