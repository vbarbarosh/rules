```
bad
+addEventListener('keydown', function (e) {

good
+addEventListener('keydown', function (event) {
```

- an event takes `event` in a regular function and `v` in a one-parameter arrow; `e` is reserved for error values in arrows. DOM error events follow event naming too.
- error callback parameters stay `e` in arrows and `error` in regular functions at every depth; no `ee` or `error2` callback parameters. These names may shadow an outer callback parameter.
- value arrows retain `v`, `vv`, `vvv` by arrow nesting depth, including an enclosing error arrow.
- a catch binding takes `error`; a catch inside another catch takes `error2`, then `error3`. This rule is for catch bindings, not function parameters.

# Event parameters and nested errors

A regular event handler's parameter is `event`:

```js
addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        close_settings();
    }
});
```

A one-parameter event arrow uses `v`. A DOM error event is still an event,
so its name follows the same rule:

```js
el.addEventListener('click', v => v.stopPropagation());
el.addEventListener('error', v => report(v));
```

An error value uses `e` in an arrow and `error` in a regular function.
Callback nesting does not change either name. These names can shadow an
outer callback parameter; they do not promise access to both errors by
separate parameter names.

```js
promise.catch(e => fallback.catch(e => report(e)));
promise.catch(function (error) {
    fallback.catch(function (error) {
        report(error);
    });
});
```

Ordinary value arrows retain their existing nesting convention: `v` at the
outer level, `vv` inside an arrow, then `vvv`. An enclosing error arrow
counts toward that depth too:

```js
items.map(v => v.sizes.some(vv => vv.width > 100));
promise.catch(e => values.map(vv => vv.uid));
```

A catch binding is separate from a function parameter. It starts with
`error`; a catch inside another catch uses `error2`, the next level
`error3`. A callback parameter inside that catch still uses `e` or `error`.

```js
try {
    await save_scene(scene);
}
catch (error) {
    promise.catch(e => report(e));
    promise.catch(function (error) {
        report(error);
    });
    try {
        await save_backup(scene);
    }
    catch (error2) {
        console.log(`save: ${error.message}; backup: ${error2.message}`);
    }
}
```
