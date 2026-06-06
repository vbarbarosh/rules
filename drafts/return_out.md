If a function returns a constructed value, the variable holding it must be named out.

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

`out` never leaves the function — the caller names the result by what it means:

```js
const emails = emails_from_users(users);
const users_by_role = users_group_by_role(users);
```
