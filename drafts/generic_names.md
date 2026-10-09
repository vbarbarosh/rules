A generic name says nothing about the data; it says what the variable is for.
Each one has exactly one meaning, listed here. Anywhere else it is the wrong
name: the variable is named by what it holds.

| Name | Its one meaning | Rule |
|---|---|---|
| `i`, `j`, `k` | the index of an indexed `for`, by nesting depth | VAR-11, VAR-12 |
| `end` | the cached length in a single indexed loop | VAR-11 |
| `ii`, `jj`, `kk` | the cached length in nested loops, after its index | VAR-12 |
| `v`, `vv`, `vvv` | the lone value or event parameter of a tiny arrow, by arrow depth | VAR-09, VAR-16 |
| `e` | the error parameter of an arrow | VAR-05, VAR-06 |
| `error`, `error2`, `error3` | a catch binding or the error parameter of a regular function; `error2`, `error3` in a nested catch | VAR-05, VAR-17 |
| `event` | the event parameter of a regular DOM handler | VAR-16 |
| `out` | the value the function builds and returns as `return out;`, exactly | VAR-02, VAR-13 |
| `time0` | the start time of a measurement | VAR-14 |

```js
// ✗ out returned on a condition
const out = [...new Set(tags)];
return (out.length === tags.length) ? tags : out;

// ✓ named by what it is
const unique_tags = [...new Set(tags)];
return (unique_tags.length === tags.length) ? tags : unique_tags;
```

```js
// ✗ v outside a tiny arrow
items.forEach(function (v) {
    render(v);
});

// ✓ a regular function names its parameter
items.forEach(function (item) {
    render(item);
});
```

```js
// ✗ i for an item of for...of
for (const i of items) {
}

// ✓ the singular of the collection
for (const item of items) {
}
```
