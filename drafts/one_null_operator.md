```
BAD
  $copied_at = ($item['copied_at'] ?? null)?->toDateTime() ?? (new \DateTime())->setTimestamp(0);

GOOD
    if (isset($item['copied_at'])) {
        $copied_at = $item['copied_at']->toDateTime();
    }
    else {
        $copied_at = (new \DateTime())->setTimestamp(0);
    }
```

- an antipattern: question marks, question marks, question marks; no way
  to make out what is going on
- rewrite it as an ordinary if

# One null operator to an expression

An expression holds one null operator at most: `??`, `??=`, `?->` in PHP,
`?.` in JavaScript. Two or three of them split one question between them:
is the value there? The first turns a missing key into a null, the next
lets that null skip a call, the last turns it into a default; the reader
puts the question back together from three places. An `if` asks it once,
and each branch says what the value is.

```php
// ✗ three null operators, one question
$copied_at = ($item['copied_at'] ?? null)?->toDateTime() ?? (new \DateTime())->setTimestamp(0);

// ✓ asked once
if (isset($item['copied_at'])) {
    $copied_at = $item['copied_at']->toDateTime();
}
else {
    $copied_at = (new \DateTime())->setTimestamp(0);
}
```

In JavaScript the same:

```js
// ✗ two null operators
const selected = rows[0]?.id ?? null;

// ✓ asked once
let selected;
if (rows.length > 0) {
    selected = rows[0].id;
}
else {
    selected = null;
}
```

- One operator alone stays: `$name = $user['name'] ?? '';`,
  `out[user.role] ??= [];`.
- Two of one kind count as two: `a?.b?.c` and `$a ?? $b ?? 'none'` are
  written as an `if` too.
- The `if` tests what the operators tested: `isset()` for a key that may
  be missing, `!== null` for a value that may be null. Inside its branch
  the value is there, so `->` and `.` are plain.

This governs new code; existing code is not rewritten for it (CORE-01).
