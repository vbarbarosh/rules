```
bad
+addEventListener('keydown', function (e) {

good
+addEventListener('keydown', function (event) {
```

- an event takes `event` in a regular function and `v` in a one-parameter arrow; `e` is reserved for error values in arrows. DOM error events follow event naming too.
- error callback parameters stay `e` in arrows and `error` in regular functions at every depth; no `ee` or `error2` callback parameters. These names may shadow an outer callback parameter.
- value arrows use `v`; `vv` only when `v` is already taken, `vvv` only when `vv` is.
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
promise.catch(e => retry(e).catch(e => report(e)));
promise.catch(function (error) {
    fallback.catch(function (error) {
        report(error);
    });
});
```

An ordinary value arrow takes `v`. It takes `vv` only when `v` is already
taken where it stands, and `vvv` only when `vv` is. An arrow with no
parameter, an error arrow's `e` and a parameter with another name take
nothing:

```js
items.map(v => v.sizes.some(vv => vv.width > 100));
promise.catch(e => report(e, values.map(v => v.uid)));
expect.poll(() => page.evaluate(() => items.filter(v => v.ok)));
```

A parameter the arrow does not use is not declared at all:
`promise.catch(() => values.map(v => v.uid))`, not `e => …`. This holds for arrows only;
a regular function may declare a parameter it does not use.

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
