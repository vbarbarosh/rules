`format_*` returns a string intended for human display:

```js
format_bytes(1457664)    // "1.4 MB"
format_duration(155000)  // "2m 35s"
format_usd(1299)         // "$12.99"
```

`format_*` returns — it never prints. Output is the caller's job:

```js
console.log(format_tree(tree));
```

Not for machine formats — serialization is conversion, not display:

```js
format_user(user)     // "Vladimir B. (admin)" — for humans
json_from_user(user)  // for machines
```

`format_*` transforms an input it is given; deriving a string from
an object's own state is `render_*`.
