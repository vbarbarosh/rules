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
            const tiles = await page.locator('#overview .tile').evaluateAll(v => v.map(vv => vv.getAttribute('href')));
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
                    const rects = Array.from(document.querySelectorAll('#overview .tile'), v => v.getBoundingClientRect());
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
                    const count = await page.locator('#overview .tile').count();
                    for (const index of new Set([0, Math.min(3, count - 1), count - 1])) {
                        const tile = page.locator('#overview .tile').nth(index);
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
            const tile = page.locator('#overview .tile').last();
            const hash = await tile.getAttribute('href');
            await tile.hover();
            await tile.click();
            await scroll_settle(page);
            assert.equal(new URL(page.url()).hash, hash);
            assert.equal(await page.locator('.peek').isVisible(), false);
            const top = await page.locator(hash).evaluate(v => v.getBoundingClientRect().top);
            const bar = await page.locator('.bar').evaluate(v => v.getBoundingClientRect().bottom);
            assert.ok((top >= bar - 30) && (top < bar + 60), `${hash} under the bar: ${top} vs ${bar}`);
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
