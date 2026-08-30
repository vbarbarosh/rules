## Module level

```js
// function declaration
function items_index_by_uid(items)
{
    // ...
}

// async function declaration
async function notes_refresh()
{
    // ...
}

// class: declaration and methods
class Logger
{
    constructor(parent_group_uid) {
        // ...
    }

    write(format, ...values) {
        // ...
    }
}

// if at module level
if (process.env.DEBUG) {
    // ...
}

// for at module level
for (const size of sizes) {
    // ...
}

// while at module level
while (queue.length > 0) {
    // ...
}
```

## Nested (inside a function)

```js
function demo()
{
    // nested function declaration
    function limit_print(limit) {
        // ...
    }

    // function expression callback
    server.on('error', function (error) {
        // ...
    });

    // async function expression callback
    req.on('end', async function () {
        // ...
    });

    // new Promise executor
    return new Promise(function (resolve, reject) {
        // ...
    });

    // tiny arrow callback: expression body only; param v, nested vv
    const uids = items.map(v => v.uid);
    const found = items.some(v => v.sizes.some(vv => vv.width > 100));
    fresh.catch(ignore);

    // arrow with a block body does not exist — it becomes function (...) {}
    // with optional _this inside

    // if / else if / else
    if (a) {
        // ...
    }
    else if (b) {
        // ...
    }
    else {
        // ...
    }

    // for-of
    for (const item of items) {
        // ...
    }

    // indexed for, cached length
    for (let i = 0, end = items.length; i < end; ++i) {
        // ...
    }

    // nested indexed loops: ii, jj
    for (let i = 0, ii = rows.length; i < ii; ++i) {
        for (let j = 0, jj = cols.length; j < jj; ++j) {
            // ...
        }
    }

    // while
    while (queue.length > 0) {
        // ...
    }

    // do-while does not exist — use while or for

    // try / catch / finally
    try {
        // ...
    }
    catch (error) {
        // ...
    }
    finally {
        // ...
    }

    // catch that ignores the error binds nothing
    try {
        // ...
    }
    catch {
        // ...
    }

    // switch: case aligned with switch
    switch (type) {
    case 'voice':
        // ...
        break;
    case 'text':
        // ...
        break;
    default:
        // ...
    }

    // object literal: data
    const next = {
        uid: item.uid,
        parent_uid: item.parent_uid,
        index,
    };
}
```

## Object with methods (vue options style)

```js
const options = {
    refresh: async function () {
        // ...
    },
    render_name: function () {
        // ...
    },
};
```
