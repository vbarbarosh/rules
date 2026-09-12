If a variable is used in a `return` statement, it must be named `out`: `return out;`, exactly.

```js
function emails_from_users(users)
{
    const out = [];
    for (const user of users) {
        if (user.email) {
            out.push(user.email);
        }
    }
    return out;
}

function users_group_by_role(users)
{
    const out = {};
    for (const user of users) {
        out[user.role] ??= [];
        out[user.role].push(user);
    }
    return out;
}
```

Only that variable. A value that is joined, stringified or otherwise transformed
on its way out is not `out`; it is named by what it is:

```js
function csv_from_rows(rows)
{
    const lines = [];
    for (const row of rows) {
        lines.push(row.join(','));
    }
    return lines.join('\n');
}
```

`out` never leaves the function — the caller names the result by what it means:

```js
const emails = emails_from_users(users);
const users_by_role = users_group_by_role(users);
```
