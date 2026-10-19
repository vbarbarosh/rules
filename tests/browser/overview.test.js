const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/overview.test.js
// Every page of items opens with all of them on one screen: a tile for each
// item, or for each group when they are many; a pointer on one shows it
// larger beside it, a click goes to it.
const root_dir = path.join(__dirname, '../..');
const VIEWPORTS = [{width: 1536, height: 790}, {width: 1280, height: 800}];
const TOP_TILES = '#overview .tiles:not([id]) > .tile';
// Each page: what a tile stands for, as the selector of its targets.
const PAGES = [
    {file: 'docs/diagrams.html', targets: 'section.guide'},
    {file: 'docs/agents.html', targets: 'section.guide'},
    {file: 'docs/apis.html', targets: 'section.guide'},
    {file: 'docs/animations.html', targets: 'article.rule'},
    {file: 'docs/rules.html', targets: 'section.group:not(.use):not(.overview)'},
    {file: 'docs/glossaries.html', targets: 'section.sub, section.group:not(.overview):not(:has(section.sub))'},
];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const {file, targets} of PAGES) {
    test(`${file}: a tile for each item or group, in order`, async function () {
        const page = await page_open(file, VIEWPORTS[0], 'dark');
        try {
            const tiles = await page.locator(TOP_TILES).evaluateAll(v => v.map(vv => vv.getAttribute('href')));
            const ids = await page.locator(targets).evaluateAll(v => v.map(vv => `#${vv.id}`));
            assert.deepEqual(tiles, ids);
        }
        finally {
            await page.context().close();
        }
    });

    for (const viewport of VIEWPORTS) {
        test(`${file} at ${viewport.width}x${viewport.height}: all the tiles on one screen`, async function () {
            const page = await page_open(file, viewport, 'dark');
            try {
                await page.locator('nav.groups a[href="#overview"]').click();
                await scroll_settle(page);
                const box = await page.evaluate(function () {
                    const rects = Array.from(document.querySelectorAll('#overview .tiles:not([id]) > .tile'), v => v.getBoundingClientRect());
                    return {top: Math.min(...rects.map(v => v.top)), bottom: Math.max(...rects.map(v => v.bottom)), bar: document.querySelector('.bar').getBoundingClientRect().bottom};
                });
                assert.ok(box.top >= box.bar, `the first row under the bar: ${box.top} < ${box.bar}`);
                assert.ok(box.bottom <= viewport.height, `the last row on screen: ${box.bottom} > ${viewport.height}`);
            }
            finally {
                await page.context().close();
            }
        });

        for (const theme of ['light', 'dark']) {
            test(`${file} at ${viewport.width}x${viewport.height}, ${theme}: what a tile holds shows on hover, on screen, beside it`, async function () {
                const page = await page_open(file, viewport, theme);
                try {
                    await page.goto(`${page.url()}#overview`);
                    await scroll_settle(page);
                    const count = await page.locator(TOP_TILES).count();
                    for (const index of new Set([0, Math.min(3, count - 1), count - 1])) {
                        const tile = page.locator(TOP_TILES).nth(index);
                        await tile.hover();
                        const peek = page.locator('.peek');
                        assert.equal(await peek.isVisible(), true);
                        const src = await peek.locator('img').evaluateAll(v => v.filter(vv => vv.getClientRects().length > 0).map(vv => vv.getAttribute('src')));
                        assert.ok(src.length > 0, `tile ${index}: no picture`);
                        assert.ok(src.every(v => v.endsWith('-dark.svg') === (theme === 'dark')) || src.every(v => !v.endsWith('.svg')), `tile ${index}: ${src.join()}`);
                        const a = await tile.boundingBox();
                        const b = await peek.boundingBox();
                        assert.ok((b.x >= 0) && (b.y >= 0) && (b.x + b.width <= viewport.width) && (b.y + b.height <= viewport.height), `tile ${index}: off screen`);
                        assert.ok((b.x >= a.x + a.width) || (b.x + b.width <= a.x), `tile ${index}: it covers its tile`);
                        await page.mouse.move(2, viewport.height - 2);
                        assert.equal(await peek.isVisible(), false);
                    }
                }
                finally {
                    await page.context().close();
                }
            });
        }
    }

    test(`${file}: a click on a tile goes to it; typing hides the overview`, async function () {
        const page = await page_open(file, VIEWPORTS[0], 'light');
        try {
            // a group's tile opens the group: its last item is the one clicked
            const last = page.locator(TOP_TILES).last();
            const open = await last.getAttribute('data-open');
            if (open) {
                await last.click();
            }
            const tile = open ? page.locator(`#${open} .tile`).last() : last;
            const hash = await tile.getAttribute('href');
            await tile.hover();
            await tile.click();
            await scroll_settle(page);
            assert.equal(new URL(page.url()).hash, hash);
            assert.equal(await page.locator('.peek').isVisible(), false);
            const top = await page.locator(hash).evaluate(v => v.getBoundingClientRect().top);
            const bar = await page.locator('.bar').evaluate(v => v.getBoundingClientRect().bottom);
            // the last item of a page may stand lower: the page has ended
            const at_end = await page.evaluate(() => innerHeight + scrollY >= document.documentElement.scrollHeight - 2);
            assert.ok(((top >= bar - 30) && (top < bar + 60)) || (at_end && (top >= bar - 30)), `${hash} under the bar: ${top} vs ${bar}`);
            await page.keyboard.type('a');
            assert.equal(await page.locator('#overview').isVisible(), false);
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#overview').isVisible(), true);
        }
        finally {
            await page.context().close();
        }
    });
}

test('every tile says on hover what it is: its code, its name in full and a line more', async function () {
    for (const {file} of PAGES) {
        const page = await page_open(file, VIEWPORTS[0], 'dark');
        try {
            const heads = await page.locator('#overview .tile template').evaluateAll(templates_describe);
            for (const head of heads) {
                assert.ok(head.code && (head.name.length > head.code.length + 2) && (head.list || (head.note.length >= 8)), `${file}: ${JSON.stringify(head)}`);
            }
        }
        finally {
            await page.context().close();
        }
    }

    function templates_describe(templates) {
        return templates.map(function (template) {
            const head = template.content.querySelector('.peek-head');
            return {code: head?.querySelector('b')?.textContent ?? '', name: head?.textContent ?? '', note: template.content.querySelector('.peek-note')?.textContent ?? '', list: template.content.querySelector('.peek-items') !== null};
        });
    }
});

for (const {file, items} of [{file: 'docs/rules.html', items: 'article.rule'}, {file: 'docs/glossaries.html', items: ':scope > article.rule'}]) {
    test(`${file}: a click on a group opens it in place, a tile per item on one screen; back by All groups or Escape`, async function () {
        const page = await page_open(file, VIEWPORTS[0], 'dark');
        try {
            await page.goto(`${page.url()}#overview`);
            await scroll_settle(page);
            const groups = await page.locator(TOP_TILES).evaluateAll(v => v.map(vv => vv.getAttribute('href').slice(1)));
            for (const [index, group] of groups.entries()) {
                await page.locator(`${TOP_TILES}[href="#${group}"]`).click();
                const grid = page.locator(`#overview-${group}`);
                assert.equal(await grid.isVisible(), true, group);
                assert.equal(await page.locator('#overview .crumbs').isVisible(), true, group);
                assert.equal(await page.locator('#overview .tiles:not([id])').isVisible(), false, group);
                const tiles = await grid.locator('.tile').evaluateAll(v => v.map(vv => vv.getAttribute('href').slice(1)));
                const ids = await page.locator(`#${group}`).evaluate((v, selector) => Array.from(v.querySelectorAll(selector), vv => vv.id), items);
                assert.deepEqual(tiles, ids, group);
                const bottom = await grid.evaluate(v => v.getBoundingClientRect().bottom);
                assert.ok(bottom <= VIEWPORTS[0].height, `${group}: the last row at ${bottom}`);
                if (index % 2) {
                    await page.locator('#overview .crumbs-back').click();
                }
                else {
                    await page.keyboard.press('Escape');
                }
                assert.equal(await grid.isVisible(), false, group);
                assert.equal(await page.locator('#overview .tiles:not([id])').isVisible(), true, group);
            }
            // inside a group: a pointer on an item names it, a click goes to it
            await page.locator(`${TOP_TILES}[href="#${groups[0]}"]`).click();
            const tile = page.locator(`#overview-${groups[0]} .tile`).last();
            await tile.hover();
            assert.equal(await page.locator('.peek .peek-head').isVisible(), true);
            const hash = await tile.getAttribute('href');
            await tile.click();
            await scroll_settle(page);
            assert.equal(new URL(page.url()).hash, hash);
        }
        finally {
            await page.context().close();
        }
    });
}

test('docs/rules.html: a group\'s tile lists every rule of the group on hover', async function () {
    const page = await page_open('docs/rules.html', VIEWPORTS[0], 'dark');
    try {
        await page.locator('#overview .tile[href="#FMT"]').hover();
        const listed = await page.locator('.peek .peek-items .code').allTextContents();
        const rules = await page.locator('#FMT article.rule').evaluateAll(v => v.map(vv => vv.id));
        assert.deepEqual(listed, rules);
    }
    finally {
        await page.context().close();
    }
});

async function page_open(file, viewport, theme)
{
    const context = await browser.newContext({colorScheme: theme, viewport});
    const page = await context.newPage();
    await page.route('https://**/*', v => v.abort());
    await page.goto(`file://${path.join(root_dir, file)}`);
    return page;
}

// The page's smooth scroll has ended: the same scrollY for a few frames.
async function scroll_settle(page)
{
    await page.evaluate(function () {
        return new Promise(function (resolve) {
            let last = -1;
            let same = 0;
            frame();
            function frame() {
                same = (window.scrollY === last) ? same + 1 : 0;
                last = window.scrollY;
                if (same >= 10) {
                    resolve();
                    return;
                }
                requestAnimationFrame(frame);
            }
        });
    });
}
