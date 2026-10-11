const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/picture-size.test.js
const root_dir = path.join(__dirname, '../..');
const page_files = ['docs/rules.html', 'docs/agents.html', 'docs/glossaries.html'];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const page_file of page_files) {
    test(`${page_file}: the pictures control sets the four states, keeps the choice, and a click opens the viewer`, async function () {
        const context = await browser.newContext({viewport: {width: 1280, height: 800}});
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', v => errors.push(v.message));
        try {
            await page.route('https://**/*', v => v.abort());
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'large');
            const figure = page.locator('a.figure').first();
            const large = await width_of(figure);
            assert.ok(large > 400, `a large picture is wide: ${large}`);
            await page.locator('.pictures button[data-pictures="small"]').first().click();
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'small');
            assert.ok(await width_of(figure) <= 420, 'a small picture is at most 420 wide');
            await page.locator('.pictures button[data-pictures="full"]').first().click();
            assert.ok(await width_of(figure) >= large, 'a full picture is at least as wide as a large one');
            await page.locator('.pictures button[data-pictures="off"]').first().click();
            assert.equal(await figure.locator('img').first().isVisible(), false);
            assert.ok((await figure.getAttribute('data-caption')).length > 5, 'the mark carries the caption');
            assert.equal(await page.locator('.pictures button[data-pictures="off"]').first().getAttribute('aria-pressed'), 'true');
            await page.reload();
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'off');
            // A click on the mark, as on a picture, opens the viewer; Escape closes it.
            await page.locator('a.figure').first().click();
            assert.equal(await page.locator('#viewer').isVisible(), true);
            assert.equal(await page.locator('#viewer').getAttribute('aria-modal'), 'true');
            assert.ok((await page.locator('#viewer img').getAttribute('src')).length > 0);
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#viewer').isVisible(), false);
            assert.equal(await page.locator('#viewer').getAttribute('aria-modal'), null);
            await page.locator('.pictures button[data-pictures="large"]').first().click();
            await page.locator('a.figure img:visible').first().click();
            assert.equal(await page.locator('#viewer').isVisible(), true);
            await page.locator('#viewer').click({position: {x: 10, y: 10}});
            assert.equal(await page.locator('#viewer').isVisible(), false);
            assert.deepEqual(errors, []);
        }
        finally {
            await context.close();
        }
    });
}

async function width_of(locator)
{
    return (await locator.boundingBox()).width;
}
