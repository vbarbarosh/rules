# A value between two bounds is clamped

In JavaScript, a value held between a low and a high bound is one call,
`clamp(min, max, value)` of `@vbarbarosh/node-helpers`: the bounds first,
the value last. Never `Math.max` and `Math.min` nested by hand: the
nested form is read inside out to find its bounds.

```js
// ✗ Math.max and Math.min nested by hand
const columns = Math.max(2, Math.min(3, items.length));

// ✓ the bounds, then the value
const columns = clamp(2, 3, items.length);
```

The bounds come first because they are most often constants, and the
value is often a long expression. First, the bounds are seen at once;
last, they would stand in the value's shadow, to be looked for:

```js
clamp(2, 3, Math.floor((width - padding*2)/card_width))   // ✓ 2 and 3 at once
clamp(Math.floor((width - padding*2)/card_width), 2, 3)   // ✗ 2 and 3 behind it
```

- Nested the other way round, `Math.min(3, Math.max(2, n))` is the same
  clamp and is written the same way.
- A single bound stays as it is: `Math.max(0, n)`.
- PHP is not covered by this rule.

This governs new code; existing code is not rewritten for it (CORE-01).
