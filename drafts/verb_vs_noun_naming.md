Two small rules can remove a surprising amount of ambiguity in large codebases.
They complement what you already defined.

---

# 1. Operation vs Result Grammar

Distinguish **functions that perform work** from **variables that store results**.

| Form        | Meaning                           |
| ----------- | --------------------------------- |
| verb phrase | operation (function)              |
| noun phrase | value (variable / data structure) |

### Rule

Functions should use **verb phrases**.
Variables should use **noun phrases**.

### Examples

```js
items_grouped_by_type = items_group_by_type(items)
```

| Kind     | Name                    |
| -------- | ----------------------- |
| function | `items_group_by_type`   |
| result   | `items_grouped_by_type` |

Another example:

```js
items_sorted_by_time = items_sort_by_time(items)
```

### Why This Matters

This rule makes code readable as a sentence:

```
items_sorted_by_time = items_sort_by_time(items)
```

Meaning:

> items sorted by time = sorting items by time

Benefits:

* clear distinction between **action** and **result**
* easier code scanning
* predictable naming

---

# 2. Transformation vs Lookup Grammar

Distinguish **conversion** from **lookup**.

| Pattern  | Meaning                  |
| -------- | ------------------------ |
| `_from_` | construct / derive value |
| `_by_`   | lookup by property       |

### Rule

Use:

```
<singular>_from_<input>
```

for **derived values**.

Use:

```
<singular>_by_<property>
```

for **lookup**.

### Examples

#### Derived values

```js
user_from_token(token)
date_from_timestamp(ts)
item_from_json(data)
```

These **construct new values**.

---

#### Lookup

```js
user_by_id(id)
banner_by_uid(uid)
item_type_by_name(name)
```

These **retrieve existing values**.

---

### Why This Matters

This eliminates a very common ambiguity:

Bad:

```js
user_from_id(id)   // unclear: lookup or construction?
```

Correct:

```js
user_by_id(id)     // lookup
user_from_json()   // construction
```

---

# Why These Two Rules Are Powerful

Together with your existing rules they define **three orthogonal concepts**:

| Concept        | Grammar        |
| -------------- | -------------- |
| lookup         | `_by_`         |
| grouping       | `_grouped_by_` |
| transformation | `_from_`       |

Example ecosystem:

```js
users
users_by_id
users_grouped_by_role

user_by_id(id)
user_from_token(token)

users_group_by_role(users)
users_grouped_by_role
```

This kind of **mechanical grammar** dramatically reduces naming debates because the structure of the name directly reflects the **data shape or operation type**.
