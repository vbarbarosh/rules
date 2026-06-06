When caching array length in a single `for` loop, use `end`:

```js
for (let i = 0, end = items.length; i < end; ++i) {
    // ...
}
```

In nested loops, use the doubled index name:

```
i  → ii
j  → jj
k  → kk
```

```js
for (let i = 0, ii = foo.length; i < ii; ++i) {
    for (let j = 0, jj = bar.length; j < jj; ++j) {
        for (let k = 0, kk = baz.length; k < kk; ++k) {
            // ...
        }
    }
}
```
