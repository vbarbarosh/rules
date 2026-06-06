Memo: name markers, collected. Not polished — raw law for later.

Core observation: English verb morphology is the function/data marker.
Imperative verb = function. Past participle = data. Prepositions are
neutral; the verb form decides the side.

```js
const items_sorted_by_time = items_sort_by_time(items);
const users_by_role = users_group_by_role(users);
```

| Marker         | Side     | Meaning                                      | Example                       |
|----------------|----------|----------------------------------------------|-------------------------------|
| bare `_by_`    | data     | keyed lookup; cardinality via plurality      | `user_by_id`, `users_by_role` |
| `_grouped_by_` | data     | many-per-key, invariant plurals only         | `fish_grouped_by_tank`        |
| `_sorted_by_`  | data     | same shape, reordered                        | `items_sorted_by_time`        |
| `_per_`        | data     | ratio / rate                                 | `clicks_per_visit`            |
| `_group_by_`   | function | grouping operation                           | `users_group_by_role(users)`  |
| `_sort_by_`    | function | sorting operation                            | `items_sort_by_time(items)`   |
| `_index_by_`   | function | index construction                           | `users_index_by_id(users)`    |
| `_from_`       | function | construct/derive; result first               | `user_from_token(token)`      |
| `_to_`         | function | convert; source first (method position)      | `tree.to_json()`              |
| `_of_`         | function | possession query                             | `descendants_of(node)`        |
| `is_`          | function | predicate, returns boolean                   | `is_ancestor(a, b)`           |
| `format_`      | function | returns string for human display             | `format_bytes(n)`             |
| `render_`      | function | derives small value from own state           | `$user->render_name_email()`  |
| `export_`      | function | produces downloadable artifact; may be async | `export_zip()`                |

Rulings:

- `_to_` is banned in data names: `id_to_name` is a second spelling
  of `name_by_id`.
- `_indexed_by_` does not exist: bare `_by_` already names that shape;
  participles survive only when they carry what shape cannot
  (`sorted_by` — array stays an array).
- `_grouped_by_` retired from data names except invariant plurals
  (`fish`, `data`, `series`); prefer a countable noun when one exists.
- `_from_` never means lookup: `user_from_id(id)` → `user_by_id[id]`.
- Standalone conversions prefer `_from_` (variable and function share
  their first word: `const json = json_from_tree(tree)`); `_to_` for
  method position, where the source is the receiver.
