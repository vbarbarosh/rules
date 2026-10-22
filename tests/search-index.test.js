const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// docs/search_index.js, written by bin/build: every entry lands on an id its
// page has, once per page, with a name to show and text to match.
const root_dir = path.join(__dirname, '..');

test('every entry of the search index names an id on its page', function () {
    const entries = search_index_read();
    const html_by_page = {};
    const ids = new Set();
    for (const entry of entries) {
        html_by_page[entry.page] ??= fs.readFileSync(path.join(root_dir, 'docs', entry.page), 'utf8');
        assert.ok(html_by_page[entry.page].includes(`id="${entry.id}"`), `${entry.page}#${entry.id}`);
        assert.ok(!ids.has(`${entry.page}#${entry.id}`), `${entry.page}#${entry.id} twice`);
        ids.add(`${entry.page}#${entry.id}`);
        assert.ok(entry.name, `${entry.page}#${entry.id} has no name`);
        assert.equal(entry.text, entry.text.toLowerCase(), `${entry.page}#${entry.id}`);
    }
    assert.deepEqual(Object.keys(html_by_page).sort(), ['agents.html', 'animations.html', 'apis.html', 'diagrams.html', 'glossaries.html', 'rules.html']);
});

test('every page with a search box loads the index and the search', function () {
    for (const page of ['agents', 'animations', 'apis', 'diagrams', 'glossaries', 'rules']) {
        const html = fs.readFileSync(path.join(root_dir, 'docs', `${page}.html`), 'utf8');
        assert.ok(html.includes('<script src="search_index.js"></script>\n<script src="search.js"></script>'), page);
    }
});

function search_index_read()
{
    const context = {window: {}};
    vm.runInNewContext(fs.readFileSync(path.join(root_dir, 'docs/search_index.js'), 'utf8'), context);
    return context.window.SEARCH_INDEX;
}
