Every route function carries a route comment directly above it:
`METHOD /path (params)`.

- Parentheses appear only when the endpoint takes input: body, headers,
  query — comma-separated, in that order.
- A header is prefixed with `header:` — `header:x-filename`.
- A path parameter is spelled in the path itself: `/file/<name>`.
- An intent comment continues the same block on the next line.

The examples below are Express route handlers: `req` and `res` are reserved
for that context. Other request/response contexts use the full names.

```js
// POST /upload (body, header:x-filename)
function upload_post(req, res)
{
    // ...
}

// GET /file/<name>
async function file_get(req, res)
{
    // ...
}
```
