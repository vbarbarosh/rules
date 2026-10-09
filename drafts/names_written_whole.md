A name in code is written whole: a constant, a function, a method, a class or
a property is never glued together from strings at run time. Gluing hides the
name. A search for `STATUS_PAID` misses it, a rename misses it, and a value
nobody expected makes a name that does not exist, which fails only at run time.

When a value picks one of a few known names, list them with `match` in PHP or
`switch` in JavaScript, each name written out:

```php
// ✗ a constant looked up by a glued name
'status' => isset($attr['status']) ? constant(Invoice::class.'::STATUS_'.strtoupper($attr['status'])) : null,

// ✓ each constant written whole
'status' => match ($attr['status'] ?? null) {
    null => null,
    'paid' => Invoice::STATUS_PAID,
    'void' => Invoice::STATUS_VOID,
},
```

```js
// ✗ a function looked up by a glued name
handlers[`on_${event.type}`](event);

// ✓ each function written whole
switch (event.type) {
case 'open':
    on_open(event);
    break;
case 'close':
    on_close(event);
    break;
}
```

An unknown value then fails where it is read, by name (`UnhandledMatchError`
in PHP, a `default` that throws in JavaScript), instead of somewhere deeper.

The same holds for every way of building a name: `constant()`, `$object->{$name}`,
`$class::{$method}()`, `call_user_func("prefix_$name")` in PHP; `object[name]`
with a glued key and `window[name]` in JavaScript.

Only as a last resort, when the set of names is open and cannot be listed (a
plugin named in a config file, say), is a name built at run time; then it is
checked against what exists before it is used.
