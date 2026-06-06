A variable name states the shape of its data.

| Name                   | Shape                  |                       |
|------------------------|------------------------|-----------------------|
| `users`                | `User[]`               | collection            |
| `user_by_id`           | `Record<id, User>`     | one per key           |
| `users_by_role`        | `Record<role, User[]>` | many per key          |
| `items_sorted_by_time` | `Item[]`               | same shape, reordered |

Plurality of the first word states lookup cardinality — what one key
returns, not how big the container is:

```js
user_by_id[id]                    // → User
users_by_role[role]               // → User[]
children_by_parent_id[parent_id]  // → Node[]
```

## Invariant plurals

Nouns whose singular and plural coincide (`fish`, `data`, `series`)
cannot state cardinality by plurality. For many-per-key, fall back
to `_grouped_by_`:

```js
fish_by_tank           // Record<tank, Fish>   — one by elimination
fish_grouped_by_tank   // Record<tank, Fish[]> — many, stated explicitly
```

Prefer a countable noun when one exists (`rows_by_source` over
`data_by_source`).
