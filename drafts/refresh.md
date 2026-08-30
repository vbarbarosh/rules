- use `refresh` and `refresh_` to sync local vars with remote data
- mental model: the browser refresh button
- main use case: vue component


--- ✂️✨🤖✨ ⬇️ AI-Generated Content Below ⬇️ ✨🤖✨✂️ ---


Anything that holds a local copy of remote data has `refresh()` — it pulls the
data and brings the local vars up to date. Idempotent: safe to call at any
moment, any number of times. The main use case is a vue component syncing its
data with the server.

Mental model: the browser refresh button.

## Vue components

```js
refresh: async function () {
    await Promise.all([
        this.refresh_user(),
        this.refresh_banners(),
    ]);
},
refresh_user: async function () {
    this.user = await fetch_user();
},
refresh_banners: async function () {
    this.banners = await fetch_banners();
},
```

Fine-grained variants `refresh_<part>()` sync one part of the state;
`refresh()` composes them.

Init is the first refresh:

```js
mounted: async function () {
    await this.refresh();
    this.ready = true;
},
```
