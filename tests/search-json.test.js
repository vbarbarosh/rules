const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

// docs/search.json, written by bin/build-search: pages, their sections and
// the items in them; every id lands on its page, and no id is used twice
// across all the pages.
const root_dir = path.join(__dirname, '..');
const search = JSON.parse(fs.readFileSync(path.join(root_dir, 'docs/search.json'), 'utf8'));

test('every section and item names an id on its page', function () {
    const page_by_id = Object.fromEntries(search.pages.map(v => [v.id, v]));
    const section_by_id = Object.fromEntries(search.sections.map(v => [v.id, v]));
    const html_by_page_id = {};
    for (const record of [...search.sections, ...search.items]) {
        const page_id = record.page_id ?? section_by_id[record.section_id]?.page_id;
        assert.ok(page_by_id[page_id], `${record.id}: no page`);
        html_by_page_id[page_id] ??= fs.readFileSync(path.join(root_dir, page_by_id[page_id].path), 'utf8');
        assert.ok(html_by_page_id[page_id].includes(`id="${record.id}"`), `${page_id}#${record.id}`);
        assert.ok(record.name, `${record.id} has no name`);
    }
    for (const section of search.sections.filter(v => v.parent_id)) {
        assert.equal(section_by_id[section.parent_id]?.page_id, section.page_id, `${section.id}: parent ${section.parent_id}`);
    }
    assert.deepEqual(search.pages.map(v => v.id), ['rules', 'animations', 'glossaries', 'agents', 'diagrams', 'apis', 'formatting', 'logs']);
});

test('no id is used twice across the pages', function () {
    const ids = [...search.sections, ...search.items].map(v => v.id);
    assert.deepEqual(ids.filter((v, i) => ids.indexOf(v) !== i), []);
});

test('each record starts with its id, then the other ids', function () {
    for (const record of [...search.pages, ...search.sections, ...search.items]) {
        const keys = Object.keys(record);
        const ids_end = keys.findLastIndex(v => v.endsWith('_id'));
        assert.equal(keys[0], 'id', JSON.stringify(record));
        assert.ok(keys.slice(1, ids_end + 1).every(v => v.endsWith('_id')), JSON.stringify(record));
    }
});

test('every page with a search box loads the search', function () {
    for (const page of ['agents', 'animations', 'apis', 'diagrams', 'glossaries', 'rules']) {
        const html = fs.readFileSync(path.join(root_dir, 'docs', `${page}.html`), 'utf8');
        assert.ok(html.includes('<script src="search.js"></script>'), page);
        assert.ok(!html.includes('search_index.js'), page);
    }
});
