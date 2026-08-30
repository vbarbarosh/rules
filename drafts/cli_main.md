An executable script hands its entry function to `cli`; `cli(main);` takes the
place of the bare `main();` call in the executable skeleton.

```js
const cli = require('@vbarbarosh/node-helpers/src/cli');

cli(main);

async function main()
{
    // ...
}
```

`cli` owns the process contract: it keeps the event loop alive until `main`
settles, reports a failure, and exits non-zero (`ExitCodeError` picks the exit
code; any other error exits 1).

- `main().catch(...)` with a hand-rolled `process.exit(1)` does not exist.
- `cli(main)`, never `cli(main())`: `cli` runs the function through
  `Promise.try`, so a synchronous throw inside `main` is reported the same as a
  rejection; an already-invoked `main()` is a promise, and `Promise.try`
  rejects it with "expecting a function" — the app dies at startup.
