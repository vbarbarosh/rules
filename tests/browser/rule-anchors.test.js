const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Requires Playwright and its Chromium browser, as does the scroll-anchoring demo.
// Run: node --test tests/browser/rule-anchors.test.js
// Optional screenshots: RULES_SCREENSHOTS=/absolute/output/path

const root_dir = path.join(__dirname, '../..');
const targets = ['UI-16', 'DOC-01', 'FN-01'];
let browser;
let server;
let origin;

test.before(async function () {
    server = http.createServer(function (request, response) {
        const file = path.resolve(root_dir, '.' + new URL(request.url, 'http://localhost').pathname);
        if (!file.startsWith(root_dir + path.sep) || !fs.existsSync(file)) {
            response.writeHead(404).end();
            return;
        }
        const types = {'.html': 'text/html', '.png': 'image/png', '.gif': 'image/gif'};
        response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
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

for (const theme of ['light', 'dark']) {
    for (const width of [1280, 390]) {
        for (const navigation of ['direct', 'link']) {
            test(`${theme}, ${width}px, ${navigation}: delayed images preserve rule targets`, async function () {
                for (const target of targets) {
                    const page = await browser.newPage({viewport: {width, height: 800}, colorScheme: theme});
                    let release;
                    const gate = new Promise(v => release = v);
                    try {
                        await page.route('**/*', async function (route) {
                            if (route.request().resourceType() === 'image') {
                                await gate;
                                await route.continue();
                            }
                            else if (route.request().url().startsWith(origin)) {
                                await route.continue();
                            }
                            else {
                                await route.abort();
                            }
                        });
                        await page.goto(`${origin}/docs/rules.html${navigation === 'direct' ? '#' + target : ''}`, {waitUntil: 'domcontentloaded'});
                        // Include images outside the lazy-loading range in the delayed batch.
                        await page.evaluate(function () {
                            for (const img of document.images) {
                                img.loading = 'eager';
                            }
                        });
                        if (navigation === 'link') {
                            await page.evaluate(v => document.querySelector(`#${v} a.code`).click(), target);
                        }
                        await scroll_settle(page);
                        const before = await target_position(page, target);
                        assert.ok(before.top >= before.margin - 2 && before.top < 400, JSON.stringify({target, before}));
                        release();
                        await page.evaluate(v => Promise.all([...document.images].map(vv => vv.decode())), null);
                        await scroll_settle(page);
                        const after = await target_position(page, target);
                        assert.ok(Math.abs(after.top - before.top) <= 1, JSON.stringify({target, before, after}));
                        assert.equal(after.overflow, false);
                        const sizes = await page.evaluate(function () {
                            return [...document.images].map(function (img) {
                                return {
                                    src: img.getAttribute('src'),
                                    width: Number(img.getAttribute('width')),
                                    height: Number(img.getAttribute('height')),
                                    natural_width: img.naturalWidth,
                                    natural_height: img.naturalHeight,
                                };
                            });
                        });
                        for (const size of sizes) {
                            assert.ok(size.width > 0 && size.height > 0, JSON.stringify(size));
                            assert.equal(size.width, size.natural_width, size.src);
                            assert.equal(size.height, size.natural_height, size.src);
                        }
                        if (process.env.RULES_SCREENSHOTS && navigation === 'direct' && target === 'DOC-01') {
                            fs.mkdirSync(process.env.RULES_SCREENSHOTS, {recursive: true});
                            await page.screenshot({path: path.join(process.env.RULES_SCREENSHOTS, `anchor-${theme}-${width}.png`)});
                            await page.locator('#UI-12').scrollIntoViewIfNeeded();
                            await scroll_settle(page);
                            await page.screenshot({path: path.join(process.env.RULES_SCREENSHOTS, `image-${theme}-${width}.png`)});
                        }
                    }
                    finally {
                        release();
                        await page.close();
                    }
                }
            });
        }
        test(`${theme}, ${width}px: failed images still reserve rule targets`, async function () {
            const page = await browser.newPage({viewport: {width, height: 800}, colorScheme: theme});
            try {
                await page.route('**/*', async function (route) {
                    if (route.request().resourceType() === 'image' || !route.request().url().startsWith(origin)) {
                        await route.abort();
                    }
                    else {
                        await route.continue();
                    }
                });
                await page.goto(`${origin}/docs/rules.html#DOC-01`);
                await scroll_settle(page);
                const position = await target_position(page, 'DOC-01');
                assert.ok(position.top >= position.margin - 2 && position.top < 400, JSON.stringify(position));
                const heights = await page.evaluate(function () {
                    return [...document.querySelectorAll('.figure img')]
                        .filter(v => getComputedStyle(v).display !== 'none')
                        .map(v => v.getBoundingClientRect().height);
                });
                assert.ok(heights.every(v => v > 20), JSON.stringify(heights));
            }
            finally {
                await page.close();
            }
        });
    }
}

test('the Agents page also reserves its guide images, each at its intrinsic size', async function () {
    for (const color_scheme of ['light', 'dark']) {
        await guide_images_check(color_scheme);
    }
});

// The images the theme shows; a dark twin is hidden in the light theme and never loads there.
async function guide_images_check(color_scheme)
{
    const page = await browser.newPage({colorScheme: color_scheme});
    try {
        await page.goto(`${origin}/docs/agents.html`);
        const images = await page.locator('.figure img:visible').all();
        assert.ok(images.length > 0);
        for (const image of images) {
            await image.scrollIntoViewIfNeeded();
            const size = await image.evaluate(async function (img) {
                await img.decode();
                return {src: img.getAttribute('src'), width: Number(img.getAttribute('width')), height: Number(img.getAttribute('height')), natural_width: img.naturalWidth, natural_height: img.naturalHeight};
            });
            assert.equal(size.width, size.natural_width, size.src);
            assert.equal(size.height, size.natural_height, size.src);
            assert.ok((size.width > 0) && (size.height > 0), size.src);
        }
    }
    finally {
        await page.close();
    }
}

async function target_position(page, target)
{
    return page.evaluate(function (id) {
        const el = document.getElementById(id);
        return {top: el.getBoundingClientRect().top, margin: parseFloat(getComputedStyle(el).scrollMarginTop), overflow: document.documentElement.scrollWidth > innerWidth};
    }, target);
}

async function scroll_settle(page)
{
    await page.evaluate(function () {
        return new Promise(function (resolve, reject) {
            let last = scrollY;
            let stable = 0;
            const time0 = performance.now();
            requestAnimationFrame(tick);
            function tick() {
                stable = scrollY === last ? stable + 1 : 0;
                last = scrollY;
                if (stable >= 12) {
                    resolve();
                }
                else if (performance.now() - time0 > 5000) {
                    reject(new Error('scroll did not settle'));
                }
                else {
                    requestAnimationFrame(tick);
                }
            }
        });
    });
}
