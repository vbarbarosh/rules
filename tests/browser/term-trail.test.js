const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/term-trail.test.js
const page_url = `file://${path.join(__dirname, '../../docs/glossaries.html')}`;
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const width of [1280, 390]) {
    test(`${width}px: a term whose name has scrolled under the group row is named in it, inside the row`, async function () {
        const context = await browser.newContext({viewport: {width, height: 800}});
        const page = await context.newPage();
        try {
            await page.route('https://**/*', v => v.abort());
            await page.goto(page_url);
            const names = await page.locator('article.rule dfn').allTextContents();
            const longest = names.reduce((a, b) => (b.length > a.length) ? b : a);
            for (const name of ['context', 'knowledge graph', longest]) {
                const rule = page.locator('article.rule', {has: page.locator('dfn', {hasText: new RegExp(`^${name}$`)})});
                // the name just under the row: no trail yet
                await rule.evaluate(v => window.scrollTo({top: v.getBoundingClientRect().top + scrollY - 400, behavior: 'instant'}));
                await page.waitForTimeout(100);
                assert.ok(!(await trails_of(page)).some(v => v.endsWith(`›${name}`)), `${name}: its name is on screen, the row does not name it`);
                // the name scrolled under the row, the entry still running
                await rule.evaluate(function (rule_el) {
                    // the header row sticks at its top; its bottom is the line the name passes under
                    const h2 = rule_el.closest('.group').querySelector('h2');
                    const header_bottom = parseFloat(getComputedStyle(h2).top) + h2.getBoundingClientRect().height;
                    window.scrollTo({top: rule_el.querySelector('dfn').getBoundingClientRect().bottom + scrollY - header_bottom + 30, behavior: 'instant'});
                });
                await page.waitForTimeout(100);
                const shown = await page.evaluate(function () {
                    return Array.from(document.querySelectorAll('.group > h2')).filter(v => v.querySelector('.trail').textContent).map(function (h2) {
                        const row = h2.getBoundingClientRect();
                        const trail = h2.querySelector('.trail').getBoundingClientRect();
                        const label = h2.querySelector('.name').getBoundingClientRect();
                        return {term: h2.querySelector('.trail b').textContent, inside: (trail.right <= row.right + 1) && (trail.top >= row.top) && (trail.bottom <= row.bottom + 1), clear: trail.left >= label.right, note: h2.querySelector('.note').getClientRects().length};
                    });
                });
                assert.deepEqual(shown, [{term: name, inside: true, clear: true, note: 0}], name);
            }
        }
        finally {
            await context.close();
        }
    });
}

for (const width of [1280, 390]) {
    test(`${width}px: scrolled through a group, the row names a term from its first name on, never dropping back between two`, async function () {
        const context = await browser.newContext({viewport: {width, height: 800}});
        const page = await context.newPage();
        try {
            await page.route('https://**/*', v => v.abort());
            await page.goto(page_url);
            const steps = await page.evaluate(async function () {
                const group_el = document.querySelector('.group');
                const h2 = group_el.querySelector('h2');
                const header_bottom = parseFloat(getComputedStyle(h2).top) + h2.getBoundingClientRect().height;
                const first = group_el.querySelector('article.rule dfn');
                const from = first.getBoundingClientRect().bottom + scrollY - header_bottom + 2;
                const to = group_el.getBoundingClientRect().bottom + scrollY - header_bottom - 60;
                const out = [];
                for (let top = from; top < to; top += 40) {
                    window.scrollTo({top, behavior: 'instant'});
                    await new Promise(v => requestAnimationFrame(() => requestAnimationFrame(v)));
                    out.push({top: Math.round(top), term: h2.querySelector('.trail b')?.textContent ?? ''});
                }
                return out;
            });
            assert.ok(steps.length > 50, `${steps.length} steps`);
            assert.deepEqual(steps.filter(v => !v.term), []);
            const names = steps.map(v => v.term).filter((term, index, terms) => term !== terms[index - 1]);
            assert.equal(new Set(names).size, names.length, `each term named once, in order: ${names.join(', ')}`);
        }
        finally {
            await context.close();
        }
    });
}

test('a filter that hides the term under the row leaves no trail of it', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(page_url);
        await page.locator('#q').fill('sidecar');
        await page.evaluate(() => window.scrollTo({top: 0, behavior: 'instant'}));
        await page.waitForTimeout(100);
        assert.deepEqual(await trails_of(page), []);
    }
    finally {
        await context.close();
    }
});

async function trails_of(page)
{
    return page.evaluate(() => Array.from(document.querySelectorAll('.group > h2 .trail')).map(v => v.textContent).filter(v => v));
}
