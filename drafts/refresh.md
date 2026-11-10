- use `refresh` and `refresh_` to sync local vars with remote data
- mental model: the browser refresh button
- main use case: vue components
- idempotent: safe to call at any moment, any number of times
- init: `created` awaits `refresh()`, then `ready = true`; `mounted` only
  when the DOM is needed


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
        this.refresh_photos(),
    ]);
},
refresh_user: async function () {
    this.user = await fetch_user();
},
refresh_photos: async function () {
    this.photos = await fetch_photos();
},
```

Fine-grained variants `refresh_<part>()` sync one part of the state;
`refresh()` composes them.

Init is the first refresh. With no other condition it stands in `created`:
the component awaits `refresh()`, everything that loads from the backend,
and only then sets `ready`:

```js
created: async function () {
    await this.refresh();
    this.ready = true;
},
```

`mounted` is for an extra condition. A component whose first refresh needs
its DOM, `this.$refs`, waits for it there; no other first refresh stands in
`mounted`.

## A part of the page

`refresh_<what>()` also names a function that brings a part of the DOM up to
date from state, the same button pressed on one part of the page:

```js
function refresh_theme_labels()
{
    const theme = root_el.getAttribute('data-theme');
    for (const button of document.querySelectorAll('.theme button')) {
        button.title = `${(theme === 'dark') ? 'Dark' : 'Light'} theme`;
    }
}
```

It returns nothing. A function that constructs content and returns it is
`render_*` (see [render_xxx.md](render_xxx.md)); `render` never updates the
DOM, and `refresh` never returns content.
