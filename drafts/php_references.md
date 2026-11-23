```php
$plan_ref = &$plan;
$parent_ref = &$plan[count($plan)-1];
....
unset($parent_ref);
```

- new rules for PHP: every variable that holds a reference ends in `ref`,
  `$plan_ref`
- and it is always unset, at the end: after the last expression where it
  is used

# A reference ends in _ref and is unset after its last use

In PHP, `&` makes a variable a second name of another value:
`$parent_ref = &$plan[2]` and `$plan[2]` are one value, and a write
through either is a write to both. Two rules keep that second name in
plain sight and short-lived.

## Its name ends in `_ref` (VAR-20)

A variable that holds a reference is named for what it points at, with
`_ref` at the end. Every line that writes through it then says that the
write lands in another value.

```php
// ✗ reads as a value of its own
$parent = &$plan[count($plan) - 1];
$parent['steps'][] = $step;

// ✓ the name says that the write goes into $plan
$parent_ref = &$plan[count($plan) - 1];
$parent_ref['steps'][] = $step;
```

A loop variable taken by reference is one too:
`foreach ($items as &$item_ref)`.

## It is unset right after its last use (VAR-21)

`unset($parent_ref)` stands right after the statement that uses the
reference last, at the level where the reference was made: after the
loop, when that statement is inside one.

```php
// ✗ $item_ref still names the last item after the loop
foreach ($items as &$item_ref) {
    $item_ref['total'] = $item_ref['price']*$item_ref['count'];
}

// ✓ unset right after the loop
foreach ($items as &$item_ref) {
    $item_ref['total'] = $item_ref['price']*$item_ref['count'];
}
unset($item_ref);
```

Left bound, the second name keeps changing the value long after its work
is done:

- A plain assignment to it writes into the value. The well-known case is
  `foreach ($items as $item)` after `foreach ($items as &$item)`: each pass
  copies an item into the last one, and the last item is lost.
- A copy of the array shares the element. While `$parent_ref` names
  `$plan[2]`, `$copy = $plan; $copy[2]['title'] = 'x';` changes
  `$plan[2]` too.

`unset()` removes the second name only; the value stays where it was.
After it, a write to the name makes a new variable of its own, and a
read is an undefined variable, a warning at that line: neither reaches
the value.

Not covered: a parameter taken by reference,
`function items_sort(array &$items)`, whose name is part of the function's
signature and whose reference ends when the call returns; and a closure's
`use (&$total)`, whose name is the outer variable's.

This governs new code; existing code is not rewritten for it (CORE-01).
