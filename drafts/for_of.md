Prefer `for...of` when the index is not needed. Name the loop variable
as the singular of the collection:

```js
for (const user of users) {
    // ...
}

for (const child of node.children) {
    // ...
}
```

When the index is needed, use an indexed loop (see [for_i_end_ii_jj_kk.md](for_i_end_ii_jj_kk.md)).
