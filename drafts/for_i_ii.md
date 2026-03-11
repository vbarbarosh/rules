When caching array length in `for` loops, use the doubled index name:

```
i  → ii
j  → jj
k  → kk
```

Example:

```javascript
for (let i = 0, ii = foo.length; i < ii; ++i) {
    for (let j = 0, jj = bar.length; j < jj; ++j) {
        for (let k = 0, kk = baz.length; k < kk; ++k) {
            // ...
        }
    }
}
```
