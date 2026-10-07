An error parameter is `e` in an arrow and `error` in a regular function,
at every nesting depth. A `try/catch` binding uses `error`; only nested
catch bindings use `error2`, `error3`, as described in
[var_names_event.md](var_names_event.md).

```js
promise.catch(e => report(e));
promise.then(v => accept(v), e => report(e));
server.on('error', e => report(e));

try {
    await process_note(name);
}
catch (error) {
    console.log(`worker: ${name}: ${error.message}`);
}

server.on('error', function (error) {
    if (error.code === 'EADDRINUSE') {
        // ...
    }
    throw error;
});
```

- `e` is reserved for error arrows; `err` and `ex` are not error names.
- The parameter is taken whole: `e => report(e.message)`, not
  `({message}) => report(message)`.
- An error callback with several parameters still names its first parameter
  by this rule; the others are named by their roles.
- A `catch` that ignores the error binds nothing: `catch {`. A callback
  that ignores it may omit the parameter: `promise.catch(() => recover())`.
- Promise rejection handlers include the first argument of `.catch(...)`
  and the second argument of `.then(...)`.
- EventEmitter error listeners receive an error value: `.on('error', ...)`,
  `.once`, `.addListener`, `.prependListener`, and `.prependOnceListener`.
- A DOM `addEventListener('error', ...)` receives an event object. It follows
  event naming: `v` in a one-parameter arrow, `event` in a regular function.
- Accumulated stderr text is not an error variable — name it by what
  it is (`stderr`), never `err`.
