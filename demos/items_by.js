// index, group
// _by_ means indexing by unique key
// _grouped_by_ means partitioning into buckets (invariant plurals only)
// <noun>_by_<prop> is always data, never a function; lookup is bracket access

const inventory = [
    {name: 'asparagus', type: 'vegetables', quantity: 9},
    {name: 'bananas', type: 'fruit', quantity: 5},
    {name: 'goat', type: 'meat', quantity: 23},
    {name: 'cherries', type: 'fruit', quantity: 12},
    {name: 'fish', type: 'meat', quantity: 22},
];

// indexed collection Record<Key, Item>
const inventory_by_name = Object.fromEntries(inventory.map(v => [v.name, v]));

const inventory_grouped_by_type = Object.groupBy(inventory, v => v.type);
const inventory_grouped_by_type_list = array_group_list(inventory, v => v.type);

console.log(inventory_by_name);
console.log(inventory_grouped_by_type);
console.log(inventory_grouped_by_type_list);

function array_group_list(array, fn)
{
    const out = {};
    for (const item of array) {
        const key = fn(item);
        out[key] ??= {key, items: []};
        out[key].items.push(item);
    }
    return Object.values(out);
}
