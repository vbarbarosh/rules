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

For presentational artifacts other than strings (DOM, canvas, files)
use `render_*`.
