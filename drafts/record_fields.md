- {id, uid, parent_id, some_uid, title, custom, created_at, updated_at}
- 1) ids
- 2) uids
- 3) all the reset
- 4) dates at the end
- 5) exception: id, uid - always first
- one more thing: id, parent_id, the ids are private values and stay on the
  backend only; they must never reach the frontend; for the frontend, uids
  are used

# A record's fields

A record is one thing a system keeps: a row of a table, the object made from
it in code, the same row as an API returns it. Its fields stand in one order
everywhere, and its ids never leave the backend.

## One order

```
{id, uid, parent_id, some_uid, title, custom, created_at, updated_at}
```

1. **Its own `id`, then its own `uid`.** Always first, before any other
   field.
2. **The ids** of other records: `parent_id`, `user_id`.
3. **The uids** of other records: `some_uid`, `team_uid`.
4. **All the rest:** `title`, `custom`.
5. **The dates,** at the end: `created_at`, `updated_at`.

The same order in a table's columns, in an object in code and in a row from
an API. A record that lacks a kind skips it: with no id, its `uid` leads.

Inside one kind the rule names no order: two ids, or two dates, stand as the
code around them has them.

## Ids stay on the backend

An `id` is the database's own key, and so is every `…_id` that points at
another record. They are private values of the backend: no response, URL or
page carries one. The frontend knows a record by its `uid`, and another
record by its `…_uid`.

```
{id, uid, parent_id, title, created_at}    the backend's record
{uid, parent_uid, title, created_at}       what the frontend gets
```

A request names a record by its uid; the backend finds the row and works
with ids inside. A record built for the frontend lists its fields one by one
(FMT-18), so no id rides along in a spread.

The `id` attribute of an element on a page is another thing: VUE-02.
