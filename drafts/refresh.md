Anything that holds derived state has `refresh()` — it brings that
state up to date and in sync with the source of truth. Idempotent:
safe to call at any moment, any number of times.

Mental model: the browser refresh button.

## Components and modals

```js
async refresh()
{
    await Promise.all([
        this.refresh_user(),
        this.refresh_banners(),
    ]);
},
async refresh_user()
{
    this.user = await fetch_user();
},
async refresh_banners()
{
    this.banners = await fetch_banners();
},
```

Fine-grained variants `refresh_<part>()` sync one part of the state;
`refresh()` composes them.

Init is the first refresh:

```js
async mounted()
{
    await this.refresh();
    this.ready = true;
},
```

## Data structures

Standalone form: `<type>_refresh_<part>(obj)`.

```js
tree_move(tree, node_a, parent_id, i);
tree_move(tree, node_b, parent_id, i + 1);
tree_refresh_geometry(tree);   // once per batch, before reading
```

`tree_refresh_geometry` recomputes derived geometry (`depth`, `index`,
`prev`, `next`, `enter`, `exit`) from the topology — the source of
truth. Mutators never touch derived state; between mutation and
refresh it is stale, never corrupted. Call the narrowest refresh that
covers the change, once per batch — not once per mutation.

Derived state is never edited — only rederived.
