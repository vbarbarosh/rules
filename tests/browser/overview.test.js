const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/overview.test.js
// The diagrams page opens with every diagram as a small picture on one screen;
// a pointer on one shows it larger beside it, a click goes to its section.
const root_dir = path.join(__dirname, '../..');
const VIEWPORTS = [{width: 1536, height: 790}, {width: 1280, height: 800}];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const viewport of VIEWPORTS) {
    test(`docs/diagrams.html at ${viewport.width}x${viewport.height}: every diagram a tile, all on one screen`, async function () {
        const page = await page_open(viewport, 'dark');
        try {
            const tiles = await page.locator('#overview .tile').evaluateAll(v => v.map(vv => vv.getAttribute('href')));
            const guides = await page.locator('section.guide').evaluateAll(v => v.map(vv => `#${vv.id}`));
            assert.deepEqual(tiles, guides);
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
        test(`docs/diagrams.html at ${viewport.width}x${viewport.height}, ${theme}: the picture on hover stays on screen, beside its tile`, async function () {
            const page = await page_open(viewport, theme);
            try {
                await page.goto(`${page.url()}#overview`);
                await scroll_settle(page);
                const count = await page.locator('#overview .tile').count();
                for (const index of [0, 3, count - 1]) {
                    const tile = page.locator('#overview .tile').nth(index);
                    await tile.hover();
                    const peek = page.locator('.peek');
                    assert.equal(await peek.isVisible(), true);
                    const src = await peek.locator('img').evaluateAll(v => v.filter(vv => vv.getClientRects().length > 0).map(vv => vv.getAttribute('src')));
                    assert.equal(src.length, 1);
                    assert.equal(src[0].endsWith('-dark.svg'), theme === 'dark', src[0]);
                    const a = await tile.boundingBox();
                    const b = await peek.boundingBox();
                    assert.ok((b.x >= 0) && (b.y >= 0) && (b.x + b.width <= viewport.width) && (b.y + b.height <= viewport.height), `tile ${index}: the picture off screen`);
                    assert.ok((b.x >= a.x + a.width) || (b.x + b.width <= a.x), `tile ${index}: the picture covers its tile`);
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

test('docs/diagrams.html: a click on a tile goes to its section; typing hides the overview', async function () {
    const page = await page_open(VIEWPORTS[0], 'light');
    try {
        const tile = page.locator('#overview .tile[href="#sankey"]');
        await tile.hover();
        await tile.click();
        await scroll_settle(page);
        assert.equal(new URL(page.url()).hash, '#sankey');
        assert.equal(await page.locator('.peek').isVisible(), false);
        const top = await page.locator('#sankey h2').evaluate(v => v.getBoundingClientRect().top);
        const bar = await page.locator('.bar').evaluate(v => v.getBoundingClientRect().bottom);
        assert.ok(Math.abs(top - bar) < 30, `the section's heading under the bar: ${top} vs ${bar}`);
        await page.keyboard.type('sankey');
        assert.equal(await page.locator('#overview').isVisible(), false);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#overview').isVisible(), true);
    }
    finally {
        await page.context().close();
    }
});

test('docs/agents.html and docs/apis.html: no overview', async function () {
    for (const page_file of ['docs/agents.html', 'docs/apis.html']) {
        const page = await browser.newPage();
        try {
            await page.route('https://**/*', v => v.abort());
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            assert.equal(await page.locator('#overview, .tile, .peek').count(), 0, page_file);
        }
        finally {
            await page.close();
        }
    }
});

async function page_open(viewport, theme)
{
    const context = await browser.newContext({colorScheme: theme, viewport});
    const page = await context.newPage();
    await page.route('https://**/*', v => v.abort());
    await page.goto(`file://${path.join(root_dir, 'docs/diagrams.html')}`);
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
