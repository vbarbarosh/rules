Rules for naming files, functions, classes, methods, variables, etc.

<p align="center">
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/vbarbarosh/rules" alt="License"></a>
<a href="https://github.com/vbarbarosh/rules" rel="nofollow"><img src="https://img.shields.io/github/stars/vbarbarosh/rules" alt="stars"></a>
</p>

<p align="center">
<img src="img/logo-by-chat-gpt.png" style="max-height:400px;">
</p>

## Everything should look uniform

The generic advice is as follows: write new code in the same way the existing code is written.

If something isn't explicitly specified, it doesn't mean it's not important.
The naming of files, functions, CSS classes, formatting, and even the order of
attributes are all important and should follow the same systematic approach.
It's just not written down.

## Rules

- [FORMATTING.md](FORMATTING.md) — project JavaScript coding style
- [drafts/var_names.md](drafts/var_names.md) — a variable name states the shape of its data
- [drafts/naming_markers.md](drafts/naming_markers.md) — memo: all name markers, collected
- [drafts/for_of.md](drafts/for_of.md) — prefer `for...of`; loop variable is the singular
- [drafts/for_i_end_ii_jj_kk.md](drafts/for_i_end_ii_jj_kk.md) — cached loop bounds: `end`, `ii`, `jj`, `kk`
- [drafts/return_out.md](drafts/return_out.md) — the constructed return value is named `out`
- [drafts/refresh.md](drafts/refresh.md) — derived state is never edited, only rederived
- [drafts/format_xxx.md](drafts/format_xxx.md) — `format_*` returns a string for human display
- [drafts/render_xxx.md](drafts/render_xxx.md) — `render_*` derives a small value from own state

## Natural Pairs

- construct/destruct
- create/destroy
- open/close
- begin/end
- start/finish
- first/last
- next/previous
- get/put
- src/dest
- source/destination
- res/rej
- resolve/reject
- req/res
- request/response
- setup/teardown
- push/pull
- enabled/disabled
- import/export

## Phrases

- [Happy Path](https://en.wikipedia.org/wiki/Happy_path) – the ideal scenario without errors
- [Smoke Tests](https://en.wikipedia.org/wiki/Smoke_testing_(software)) – a small set of basic
  tests that verify whether the most critical parts of a system work at all.
  They answer one question: Does the application run without immediately
  breaking? If smoke tests fail, deeper testing is usually pointless. (Why "smoke"? From
  hardware: Power it on – if smoke comes out, something is seriously broken.)
- [Edge Case](https://en.wikipedia.org/wiki/Edge_case)
- Transient Error – temporary issues that resolve quickly
- Intermittent Failure – a failure that happens sometimes, unpredictably
- Error Flood – scenario with 75% errors (?)
- Flaky Test – tests that produce inconsistent results, sometimes passing and sometimes failing, without any changes to the code or test being tested
- Showstopper Bug – a defect so severe that it prevents the system from functioning or blocks further
  progress (development, testing, or release). Work cannot reasonably continue until it is fixed.

### Intermittent failures

**Intermittent failures** are failures that happen **sometimes**, but **not always**,
and usually **cannot be reproduced consistently**.

They appear to be random or unpredictable — sometimes the system works perfectly,
and sometimes it fails — even though **you didn't change anything**.

### In other words:

* Run #1 → works ✅
* Run #2 → fails ❌
* Run #3 → works again ✅

This inconsistency is what makes intermittent failures **annoying and hard to debug**.

#### Common Causes

Intermittent failures usually come from:

* **Timing issues / race conditions**
* **Network instability**
* **Concurrency issues** (threads/processes interfering)
* **Uninitialized values**
* **Hardware flakiness** (bad RAM, overheating, etc.)
* **Resource limits** hit sometimes (e.g., connection pool exhausted)

#### Why They Are Painful

Because:

* They don't fail every time
* Logs often don't show a clear cause
* "Works on my machine" happens a lot

#### Example

```js
// Sometimes fetch() returns slow, causing timeout.
// Sometimes it's fast. So the test occasionally fails.
test("API returns data", async function () {
    const data = await fetch("/api/data");
    expect(data.ok).toBe(true);
});
```

If network is slow → test fails
If network is normal → test passes
→ **intermittent failure**

## Common Patterns

### value / label

For lists of selectable options (select, dropdown, radio, tabs, etc.) always use:

```js
{value: <internal>, label: <display>}
```

## Naming Grammar

Functions are verb phrases. Data are noun phrases. Each assignment
reads as a sentence — the verb performs, the noun holds:

```js
const users_by_role = users_group_by_role(users);
const items_sorted_by_time = items_sort_by_time(items);
```

### Data shapes

A variable name states the shape of its data:

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

A bare `<noun>_by_<key>` is always data, never a function.
Lookup is bracket access, not a call.

For invariant plurals (`fish`, `data`, `series`) cardinality cannot be
stated by plurality — fall back to `_grouped_by_` for many-per-key, or
prefer a countable noun. See [drafts/var_names.md](drafts/var_names.md).

### Functions

A function name must contain a verb. The criterion follows the verb:

```js
users_index_by_id(users)     // → user_by_id
users_group_by_role(users)   // → users_by_role
items_sort_by_time(items)    // → items_sorted_by_time
```

Use `_from_` only when something is computed, parsed, or constructed —
result first, source last:

```js
user_from_token(token)
date_from_timestamp(ts)
tree_from_array(rows)
```

Never use `_from_` for lookup:

```js
user_from_id(id)   // wrong — lookup disguised as construction
user_by_id[id]     // right
```

### Summary

| Shape                 | Naming                       |
|-----------------------|------------------------------|
| Array                 | `users`                      |
| One per key           | `user_by_id`                 |
| Many per key          | `users_by_role`              |
| Reordered array       | `users_sorted_by_signup`     |
| Derived value         | `user_from_token(token)`     |

### References

```javascript
const inventory = [
  {name: 'asparagus', type: 'vegetables', quantity: 9},
  {name: 'bananas', type: 'fruit', quantity: 5},
  {name: 'goat', type: 'meat', quantity: 23},
  {name: 'cherries', type: 'fruit', quantity: 12},
  {name: 'fish', type: 'meat', quantity: 22},
];
console.log(Object.groupBy(inventory, v => v.type));
console.log(Map.groupBy(inventory, v => v.type));
```

```js
const items_by_anim = items_group_by_anim(items);
```

## Related

- [Naming is Hard: Let's Do Better - Kate Gregory - NDC TechTown 2024](https://youtu.be/aiy5TrU-Hwc?si=ns7DAQ2sXZcV7mj9&t=1179)
- https://github.com/WhiteHouse/api-standards
- https://spring.io/guides/gs/rest-service
- https://codeguide.co/
