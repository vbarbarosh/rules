- use `refresh` and `refresh_` to sync local vars with remote data
- mental model: the browser refresh button
- main use case: vue components


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
