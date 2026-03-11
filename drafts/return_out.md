If a function returns a constructed value, the variable holding it must be named out.

```javascript
function items_by_uid(items)
{
    const out = {};
    for (let i = 0, ii = items.length; i < ii; ++i) {
        const item = items[i];
        out[item.uid] = item;
    }
    return out;
}

function items_preorder_leave()
{
    const out = [];
    const tree = tree_from_array(canvas.items.filter(is_item_gbirpcstvw).map(tree_map_uid));

    tree_walk_preorder_rev({
        roots: tree.roots,
        visit: function (ctx) {
            out.push({level: ctx.stack.length - 1, orig: ctx.node.orig});
        },
    });

    return out;
}
```
