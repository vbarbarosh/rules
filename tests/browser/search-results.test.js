const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium: node --test tests/browser/search-results.test.js
// What a search shows: the best match first, the words found marked.
const root_dir = path.join(__dirname, '../..');
const QUERY_BY_PAGE = {rules: 'commit', animations: 'card', glossaries: 'legend', agents: 'picture', diagrams: 'kanban', apis: 'status'};
let browser;
let server;
let origin;

test.before(async function () {
    server = http.createServer(function (request, response) {
        const file = path.resolve(root_dir, `.${new URL(request.url, 'http://localhost').pathname}`);
        if (!file.startsWith(`${root_dir}${path.sep}`) || !fs.existsSync(file)) {
            response.writeHead(404).end();
            return;
        }
        response.setHeader('Content-Type', (path.extname(file) === '.html') ? 'text/html' : 'application/octet-stream');
        fs.createReadStream(file).pipe(response);
    });
    await new Promise(v => server.listen(0, '127.0.0.1', v));
    origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
    if (server) {
        await new Promise(v => server.close(v));
    }
});

test('diagrams: the guide named by the query comes first, in the page and the sidebar; clearing it restores the order', async function () {
    const page = await open_page('diagrams', 'kanban');
    try {
        assert.deepEqual(await shown_guides(page), ['kanban', 'swimlanes', 'plangraph', 'roadmap', 'quadrant']);
        const nav_shown = await page.evaluate(() => Array.from(document.querySelectorAll('nav.groups a')).map(vv => vv.dataset.group).slice(1, 6));
        assert.deepEqual(nav_shown, ['kanban', 'swimlanes', 'plangraph', 'roadmap', 'quadrant']);
        await page.fill('#q', '');
        const ids = await page.evaluate(() => Array.from(document.querySelectorAll('section.guide')).map(vv => vv.id));
        const nav = await page.evaluate(() => Array.from(document.querySelectorAll('nav.groups a')).map(vv => vv.dataset.group));
        assert.equal(ids[0], 'sequence');
        assert.equal(ids[ids.indexOf('kanban') - 1], 'roadmap');
        assert.deepEqual(nav, ['use', ...ids]);
    }
    finally {
        await page.close();
    }
});

test('glossaries: a term whose name holds the query comes first in its group', async function () {
    const page = await open_page('glossaries', 'graph');
    try {
        // Tree, the first term, mentions a graph; the two named for it come before it
        const shown = await page.evaluate(() => Array.from(document.querySelectorAll('#MAP article.rule')).filter(vv => !vv.hidden).map(vv => vv.querySelector('dfn').textContent));
        assert.deepEqual(shown.slice(0, 3), ['graph', 'knowledge graph', 'tree']);
        await page.fill('#q', '');
        const all = await page.evaluate(() => Array.from(document.querySelectorAll('#MAP article.rule')).map(vv => vv.id));
        assert.deepEqual(all, all.slice().sort());
    }
    finally {
        await page.close();
    }
});

test('diagrams: navplace\'s spec, ^ at the start, $ at the end, ! leaves a name out', async function () {
    const page = await open_page('diagrams', '^kan');
    try {
        assert.deepEqual(await shown_guides(page), ['kanban']);
        await page.fill('#q', 'whom$');
        assert.equal((await shown_guides(page))[0], 'sequence');
        await page.fill('#q', 'kanban !swim');
        const shown = await shown_guides(page);
        assert.equal(shown[0], 'kanban');
        assert.ok(!shown.includes('swimlanes'), shown.join());
        const marked = await page.evaluate(() => Array.from(CSS.highlights.get('q')).map(vv => vv.toString().toLowerCase()));
        assert.ok(marked.length > 0 && marked.every(v => v === 'kanban'), marked.join());
    }
    finally {
        await page.close();
    }
});

test('rules: a rule whose code or lead sentence passes the query comes first in its group; clearing it restores the order', async function () {
    const page = await open_page('rules', '');
    try {
        const before = await page.evaluate(() => Array.from(document.querySelectorAll('article.rule')).map(vv => vv.id));
        await page.fill('#q', '^git');
        const shown = await page.evaluate(() => Array.from(document.querySelectorAll('article.rule')).filter(vv => !vv.hidden).map(vv => vv.id));
        assert.ok(shown.length > 0 && shown.every(v => v.startsWith('GIT-')), shown.join());
        // NAME-04 mentions a lookup in its text; NAME-09 says it in its lead sentence
        await page.fill('#q', 'lookup');
        const named = await page.evaluate(() => Array.from(document.querySelectorAll('#NAME article.rule')).filter(vv => !vv.hidden).map(vv => vv.id));
        assert.deepEqual(named.slice(0, 2), ['NAME-09', 'NAME-04']);
        await page.fill('#q', '');
        assert.deepEqual(await page.evaluate(() => Array.from(document.querySelectorAll('article.rule')).map(vv => vv.id)), before);
    }
    finally {
        await page.close();
    }
});

test('diagrams: in a short window the sidebar scrolls its current item back into view', async function () {
    const page = await browser.newPage({viewport: {width: 1400, height: 600}});
    try {
        await page.goto(`${origin}/docs/diagrams.html`);
        await page.evaluate(() => document.getElementById('treemap').scrollIntoView({behavior: 'instant'}));
        await page.waitForTimeout(900);
        const in_view = await page.evaluate(function () {
            const nav = document.querySelector('nav.groups');
            const a = nav.querySelector('a.current');
            const nav_rect = nav.getBoundingClientRect();
            const a_rect = a.getBoundingClientRect();
            return {id: a.dataset.group, ok: (a_rect.top >= nav_rect.top - 1) && (a_rect.bottom <= nav_rect.bottom + 1)};
        });
        assert.deepEqual(in_view, {id: 'treemap', ok: true});
    }
    finally {
        await page.close();
    }
});

for (const [page_name, query] of Object.entries(QUERY_BY_PAGE)) {
    test(`${page_name}: the words found are marked, and only while the query is there`, async function () {
        const page = await open_page(page_name, query);
        try {
            const marked = await page.evaluate(() => Array.from(CSS.highlights.get('q')).map(vv => vv.toString().toLowerCase()));
            assert.ok(marked.length > 0, 'nothing marked');
            assert.ok(marked.every(v => v === marked[0]), marked.join());
            assert.equal(marked[0], query);
            const background = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--mark').trim());
            assert.match(background, /^#[0-9a-f]{6}$/);
            await page.fill('#q', '');
            assert.equal(await page.evaluate(() => CSS.highlights.get('q').size), 0);
        }
        finally {
            await page.close();
        }
    });
}

async function open_page(page_name, query)
{
    const page = await browser.newPage({viewport: {width: 1400, height: 900}});
    await page.goto(`${origin}/docs/${page_name}.html?q=${encodeURIComponent(query)}`);
    return page;
}

function shown_guides(page)
{
    return page.evaluate(() => Array.from(document.querySelectorAll('section.guide')).filter(vv => !vv.hidden).map(vv => vv.id));
}
