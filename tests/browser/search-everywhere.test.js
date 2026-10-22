const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium: node --test tests/browser/search-everywhere.test.js
// The search box of every page lists what matches on every page, the first
// selected; Enter, a click or the arrows and Enter land on it.
const root_dir = path.join(__dirname, '../..');
const PAGE_NAMES = ['rules', 'animations', 'glossaries', 'agents', 'diagrams', 'apis'];
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

for (const page_name of PAGE_NAMES) {
    test(`${page_name}: a term of the glossaries is found from here, and Enter lands on it`, async function () {
        const page = await open_page(page_name);
        try {
            await page.locator('#q').fill('flaky test');
            assert.equal(await page.locator('#everywhere').isVisible(), true);
            const first = page.locator('#everywhere li').first();
            assert.equal(await first.getAttribute('aria-selected'), 'true');
            assert.match(await first.textContent(), /^TEST-\d\dFlaky Test(Glossaries|here)$/);
            const id = (await first.locator('.code').textContent()).trim();
            await page.keyboard.press('Enter');
            await page.waitForURL(v => v.pathname.endsWith('/docs/glossaries.html') && (v.hash === `#${id}`));
            assert.equal(await page.locator(`#${id}`).isVisible(), true);
        }
        finally {
            await page.close();
        }
    });
}

test('glossaries: a rule is found by its code; a click lands on it on the rules page', async function () {
    const page = await open_page('glossaries');
    try {
        await page.locator('#q').fill('proj-03');
        const item = page.locator('#everywhere li', {hasText: 'PROJ-03'});
        assert.equal(await item.locator('.where').textContent(), 'Rules');
        await item.click();
        await page.waitForURL('**/docs/rules.html#PROJ-03');
        assert.equal(await page.locator('#PROJ-03').isVisible(), true);
    }
    finally {
        await page.close();
    }
});

test('rules: the arrows move the selection, Enter lands on the one selected, Escape closes the list', async function () {
    const page = await open_page('rules');
    try {
        await page.locator('#q').fill('diagram');
        const items = page.locator('#everywhere li[data-index]');
        assert.ok(await items.count() > 2);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        assert.equal(await items.nth(2).getAttribute('aria-selected'), 'true');
        assert.equal(await items.nth(0).getAttribute('aria-selected'), 'false');
        assert.equal(await page.locator('#q').getAttribute('aria-activedescendant'), 'everywhere_2');
        await page.keyboard.press('ArrowUp');
        assert.equal(await items.nth(1).getAttribute('aria-selected'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#everywhere').isVisible(), false);
        await page.locator('#q').fill('flowchart');
        const where = await page.locator('#everywhere li[aria-selected="true"] .where').textContent();
        assert.equal(where, 'Diagrams');
        await page.keyboard.press('Enter');
        await page.waitForURL('**/docs/diagrams.html#flowchart');
    }
    finally {
        await page.close();
    }
});

test('rules: an item of this page hidden by the filter clears the filter and comes into view', async function () {
    const page = await open_page('rules');
    try {
        // the CORE group is named Uniformity, and none of its rules say so
        await page.locator('#q').fill('uniformity');
        assert.equal(await page.locator('#CORE').isVisible(), false);
        const item = page.locator('#everywhere li', {hasText: 'Uniformity'}).first();
        assert.equal(await item.locator('.where').textContent(), 'here');
        await item.click();
        await page.waitForFunction(() => location.hash === '#CORE');
        assert.equal(await page.locator('#q').inputValue(), '');
        assert.equal(await page.locator('#CORE').isVisible(), true);
        assert.equal(await page.locator('#everywhere').isVisible(), false);
    }
    finally {
        await page.close();
    }
});

test('rules: nothing found, no list; an empty box, no list', async function () {
    const page = await open_page('rules');
    try {
        await page.locator('#q').fill('qqqzzzxxx');
        assert.equal(await page.locator('#everywhere').isVisible(), false);
        assert.equal(await page.locator('#q').getAttribute('aria-expanded'), 'false');
        await page.locator('#q').fill('');
        assert.equal(await page.locator('#everywhere').isVisible(), false);
    }
    finally {
        await page.close();
    }
});

async function open_page(name)
{
    const out = await browser.newPage();
    await out.route('**/*', async function (route) {
        if (route.request().url().startsWith(origin)) {
            await route.continue();
        }
        else {
            await route.abort();
        }
    });
    await out.goto(`${origin}/docs/${name}.html`);
    return out;
}
