The variable holding a caught error is always named `error`:
`try/catch`, `.catch(...)`, and error event handlers alike.

```js
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

- `e`, `err`, `ex` do not exist.
- A `catch` that ignores the error binds nothing: `catch {`.
- Accumulated stderr text is not an error variable — name it by what
  it is (`stderr`), never `err`.
