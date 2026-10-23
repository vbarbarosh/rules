const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/guide-words.test.js
const root_dir = path.join(__dirname, '../..');
const GUIDE_FILES = ['docs/agents.html', 'docs/diagrams.html', 'docs/apis.html'];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

// A tile with no picture shows its names in a 5:3 box, .tile .words; the
// guide's closed "In the author's words" is one line of text, not that box.
for (const page_file of GUIDE_FILES) {
    test(`${page_file}: a guide's "In the author's words" is one line, not a tile's empty box`, async function () {
        const page = await browser.newPage({viewport: {width: 1280, height: 800}});
        try {
            await page.route('https://**/*', v => v.abort());
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            const boxes = await page.locator('details.words').evaluateAll(words_describe);
            assert.ok(boxes.length > 0);
            for (const box of boxes) {
                assert.ok(box.height < 40, `closed, one line high: ${box.height}`);
                assert.equal(box.border, '0px');
                assert.equal(box.display, 'block');
            }
        }
        finally {
            await page.close();
        }
    });
}

test('docs/glossaries.html: a tile with no picture still shows its names in the 5:3 box', async function () {
    const page = await browser.newPage({viewport: {width: 1280, height: 800}});
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(`file://${path.join(root_dir, 'docs/glossaries.html')}#overview`);
        const boxes = await page.locator('.tile .words').evaluateAll(tile_words_describe);
        assert.ok(boxes.length > 0);
        for (const box of boxes) {
            assert.ok(Math.abs(box.ratio - 5/3) < 0.05, `5:3: ${box.ratio}`);
            assert.equal(box.display, 'flex');
        }
    }
    finally {
        await page.close();
    }
});

function words_describe(els)
{
    return els.map(function (el) {
        const style = getComputedStyle(el);
        return {height: el.getBoundingClientRect().height, border: style.borderTopWidth, display: style.display};
    });
}

function tile_words_describe(els)
{
    return els.filter(v => v.offsetParent).map(function (el) {
        const rect = el.getBoundingClientRect();
        return {ratio: rect.width/rect.height, display: getComputedStyle(el).display};
    });
}
