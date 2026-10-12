const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/picture-size.test.js
const root_dir = path.join(__dirname, '../..');
const photoswipe_url = `https://cdn.jsdelivr.net/npm/photoswipe@${JSON.parse(fs.readFileSync(path.join(__dirname, '../../node_modules/photoswipe/package.json'), 'utf8')).version}/dist/`;
const page_files = ['docs/rules.html', 'docs/animations.html', 'docs/agents.html', 'docs/glossaries.html'];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const page_file of page_files) {
    test(`${page_file}: the pictures control sets the three states, keeps the choice, and a click opens PhotoSwipe`, async function () {
        const context = await browser.newContext({viewport: {width: 1280, height: 800}});
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', v => errors.push(v.message));
        try {
            await page.route('https://**/*', route_offline);
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'large');
            const figure = page.locator('a.figure').first();
            const large = await width_of(figure);
            assert.ok(large > 400, `a large picture is wide: ${large}`);
            await page.locator('.pictures button[data-pictures="small"]').first().click();
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'small');
            assert.ok(Math.abs(await width_of(figure) - large/2) <= 1, 'a small picture is half a large one');
            assert.equal(await page.locator('.pictures button[data-pictures="full"]').count(), 0, 'no XL: it looked the same as L');
            // A filter that leaves no picture hides the control; clearing it brings it back.
            await page.locator('#q').fill('zzqqxx');
            assert.equal(await page.locator('.pictures:visible').count(), 0, 'no picture shown, no control');
            await page.locator('#q').fill('');
            assert.equal(await page.locator('.pictures').first().isVisible(), true);
            await page.locator('.pictures button[data-pictures="off"]').first().click();
            assert.equal(await figure.locator('img').first().isVisible(), false);
            assert.ok((await figure.getAttribute('data-caption')).length > 5, 'the mark carries the caption');
            assert.equal(await page.locator('.pictures button[data-pictures="off"]').first().getAttribute('aria-pressed'), 'true');
            await page.reload();
            assert.equal(await page.locator('html').getAttribute('data-pictures'), 'off');
            // A click on the mark, as on a picture, opens PhotoSwipe at that picture; Escape closes it.
            await page.locator('a.figure').first().click();
            const pswp = page.locator('.pswp');
            await pswp.waitFor({state: 'visible'});
            assert.equal(await pswp.getAttribute('aria-modal'), 'true');
            assert.equal(await page.locator('.pswp__caption').textContent(), await page.locator('a.figure').first().getAttribute('data-caption'));
            await page.keyboard.press('Escape');
            await pswp.waitFor({state: 'detached'});
            await page.locator('.pictures button[data-pictures="large"]').first().click();
            const second = page.locator('a.figure').nth(1);
            await second.scrollIntoViewIfNeeded();
            await second.locator('img:visible').click();
            await pswp.waitFor({state: 'visible'});
            const caption = await page.locator('.pswp__caption').textContent();
            assert.equal(caption, await second.getAttribute('data-caption'));
            assert.ok((await page.locator('.pswp__counter').textContent()).startsWith('2 / '), 'opens at the clicked picture of the page');
            // Pressed while it still opens, the arrow acts once it is open.
            await page.keyboard.press('ArrowRight');
            await page.waitForFunction(v => document.querySelector('.pswp__caption').textContent !== v, caption);
            // Typing while it is open stays out of the search field.
            await page.keyboard.press('a');
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.locator('.pswp__button--close').click();
            await pswp.waitFor({state: 'detached'});
            assert.deepEqual(errors, []);
        }
        finally {
            await context.close();
        }
    });
}

test('docs/rules.html: PhotoSwipe shows the dark picture in Dark, and the picture alone when PhotoSwipe is out of reach', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}, colorScheme: 'dark'});
    const page = await context.newPage();
    try {
        await page.route('https://**/*', route_offline);
        await page.goto(`file://${path.join(root_dir, 'docs/rules.html')}`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
        const figure = page.locator('a.figure:has(img.dark)').first();
        await figure.scrollIntoViewIfNeeded();
        await figure.locator('img.dark').click();
        await page.locator('.pswp').waitFor({state: 'visible'});
        assert.equal(await page.locator('.pswp__img').last().getAttribute('src'), await figure.locator('img.dark').evaluate(v => v.src));
        await page.keyboard.press('Escape');
        await page.locator('.pswp').waitFor({state: 'detached'});
        await page.unroute('https://**/*');
        await page.route('https://**/*', v => v.abort());
        await page.evaluate(() => load_photoswipe.promise = null);
        await Promise.all([page.waitForURL(/[.](png|gif|svg)$/), figure.locator('img.dark').click()]);
    }
    finally {
        await context.close();
    }
});

// The network is cut, but PhotoSwipe is served from node_modules at its CDN address.
test('docs/rules.html: an XL kept from before opens as L', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    try {
        await page.route('https://**/*', route_offline);
        await page.addInitScript(() => localStorage.setItem('rules-pictures', 'full'));
        await page.goto(`file://${path.join(root_dir, 'docs/rules.html')}`);
        assert.equal(await page.locator('html').getAttribute('data-pictures'), 'large');
        assert.equal(await page.locator('.pictures button[data-pictures="large"]').first().getAttribute('aria-pressed'), 'true');
    }
    finally {
        await context.close();
    }
});

for (const page_file of page_files) {
    test(`${page_file}: every picture, alone or in a row, is half the column in S and the whole in L`, async function () {
        const context = await browser.newContext({viewport: {width: 1280, height: 800}});
        const page = await context.newPage();
        try {
            await page.route('https://**/*', route_offline);
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            for (const [state, part] of [['small', 0.5], ['large', 1]]) {
                await page.locator(`.pictures button[data-pictures="${state}"]`).first().click();
                const figures = await page.evaluate(function () {
                    return Array.from(document.querySelectorAll('a.figure')).map(function (figure) {
                        const box = figure.closest('.figures') ?? figure;
                        // the column a picture may take: its box with the max-width lifted
                        const max_width = box.style.maxWidth;
                        box.style.maxWidth = 'none';
                        const column = Math.min(box.getBoundingClientRect().width, 960);
                        box.style.maxWidth = max_width;
                        return {caption: figure.dataset.caption, width: figure.getBoundingClientRect().width, column};
                    });
                });
                for (const v of figures) {
                    // two in a row in S share the 12 px gap between them
                    assert.ok(Math.abs(v.width - v.column*part) <= 7, `${state}: ${v.caption}: ${v.width} of ${v.column}`);
                }
            }
        }
        finally {
            await context.close();
        }
    });

    test(`${page_file}: S and L in the bar keep the picture being looked at in its place`, async function () {
        const context = await browser.newContext({viewport: {width: 1280, height: 800}});
        const page = await context.newPage();
        try {
            await page.route('https://**/*', route_offline);
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            // a picture in the middle of the page, so the page can scroll both ways
            const figure = page.locator('a.figure').nth(Math.floor(await page.locator('a.figure').count()/2));
            await figure.evaluate(v => window.scrollTo({top: v.getBoundingClientRect().top + scrollY - 300, behavior: 'instant'}));
            await page.locator('.pictures-docked').waitFor({state: 'visible'});
            for (const state of ['small', 'large', 'off', 'large']) {
                // the picture nearest the middle of the screen is the one that stays
                const anchor = await page.evaluateHandle(() => figure_in_view());
                assert.equal(await anchor.evaluate(v => v.matches('a.figure')), true);
                const before = await anchor.evaluate(v => v.getBoundingClientRect().top);
                await page.locator(`.pictures-docked button[data-pictures="${state}"]`).click();
                const after = await anchor.evaluate(v => v.getBoundingClientRect().top);
                assert.ok(Math.abs(after - before) <= 1, `${state}: the picture moved from ${before} to ${after}`);
            }
        }
        finally {
            await context.close();
        }
    });
}

for (const page_file of ['docs/rules.html', 'docs/glossaries.html']) {
    test(`${page_file}: the text over pictures with no code beside it is as wide for a row of pictures as for one`, async function () {
        const context = await browser.newContext({viewport: {width: 1280, height: 800}});
        const page = await context.newPage();
        try {
            await page.route('https://**/*', route_offline);
            await page.goto(`file://${path.join(root_dir, page_file)}`);
            const widths = await page.evaluate(function () {
                const rules = Array.from(document.querySelectorAll('article.rule:has(> .figure, > .figures)')).filter(v => !v.querySelector(':scope > .form:not(.figure)'));
                return rules.map(v => `${v.id} ${Math.round(v.querySelector('.text').getBoundingClientRect().width)}`);
            });
            const first = widths[0].split(' ')[1];
            assert.deepEqual(widths.filter(v => !v.endsWith(` ${first}`)), []);
        }
        finally {
            await context.close();
        }
    });
}

async function route_offline(route)
{
    const url = route.request().url();
    if (!url.startsWith(photoswipe_url)) {
        await route.abort();
        return;
    }
    const file = path.join(root_dir, 'node_modules/photoswipe/dist', url.slice(photoswipe_url.length));
    const type = file.endsWith('.css') ? 'text/css' : 'text/javascript';
    await route.fulfill({path: file, contentType: type, headers: {'access-control-allow-origin': '*'}});
}

async function width_of(locator)
{
    return (await locator.boundingBox()).width;
}
