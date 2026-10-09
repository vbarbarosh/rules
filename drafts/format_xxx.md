`format_*` strictly returns a string intended to be shown to a person:

```js
format_bytes(1457664)    // "1.4 MB"
format_duration(155000)  // "2m 35s"
format_usd(1299)         // "$12.99"
```

A display conversion is never hand-rolled at a call site —
`${Math.round(bytes / 1024)}kB` is a missed `format_bytes(bytes)`.

`format_*` returns — it never prints. Output is the caller's job:

```js
console.log(format_tree(tree));
```

Not for machine formats — serialization is conversion, not display:

```js
format_user(user)     // "Alex K. (admin)" — for humans
json_from_user(user)  // for machines
```

The output purpose determines the name, including for a method that reads
its own state. Human-facing text is `format_*`; constructed asset content
is `render_*`. An HTML/CSS/SVG asset may also be a string, so the return type
alone does not distinguish them.

| Family | Output purpose | Example |
|---|---|---|
| `format_*` | String a person reads | `format_bytes(1457664)` → `"1.4 MB"` |
| `render_*` | Constructed asset content | `$theme->render_css()` → CSS content |

See [render_xxx.md](render_xxx.md).
