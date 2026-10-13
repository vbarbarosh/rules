// index, group
// _by_ means indexing by unique key
// _grouped_by_ means partitioning into buckets (invariant plurals only)
// <noun>_by_<prop> is always data, never a function; lookup is bracket access

const cli = require('@vbarbarosh/node-helpers/src/cli');

const INVENTORY = [
    {name: 'asparagus', type: 'vegetables', quantity: 9},
    {name: 'bananas', type: 'fruit', quantity: 5},
    {name: 'goat', type: 'meat', quantity: 23},
    {name: 'cherries', type: 'fruit', quantity: 12},
    {name: 'fish', type: 'meat', quantity: 22},
];

cli(main);

function main()
{
    // indexed collection Record<Key, Item>
    const item_by_name = Object.fromEntries(INVENTORY.map(v => [v.name, v]));
    const items_by_type = Object.groupBy(INVENTORY, v => v.type);
    const item_groups = array_group_list(INVENTORY, v => v.type);
    console.log(item_by_name);
    console.log(items_by_type);
    console.log(item_groups);
}

function array_group_list(array, fn)
{
    const groups = {};
    for (const item of array) {
        const key = fn(item);
        groups[key] ??= {key, items: []};
        groups[key].items.push(item);
    }
    return Object.values(groups);
}
