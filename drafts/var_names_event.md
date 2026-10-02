```
bad
+addEventListener('keydown', function (e) {

good
+addEventListener('keydown', function (event) {
```

- never a bare variable `e`; it may stand only in an arrow function that fits on one line. An event listener takes `event`, a catch takes `error`, and a try/catch inside another one takes `error2`, then `error3`, so the names never overlap

# event, error2

A variable is never a bare `e`. An event handler's parameter is `event`:

```js
addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        close_settings();
    }
});
```

- `e` stands only as the parameter of an arrow that fits on one line:
  `el.addEventListener('click', e => e.stopPropagation());`.
- A caught error is `error` (VAR-05). A catch inside another one's catch
  takes `error2`, the next level `error3`, so no name hides another:

```js
try {
    await save_scene(scene);
}
catch (error) {
    try {
        await save_backup(scene);
    }
    catch (error2) {
        console.log(`save: ${error.message}; backup: ${error2.message}`);
    }
}
```
