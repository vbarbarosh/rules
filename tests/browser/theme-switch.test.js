const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/theme-switch.test.js
const root_dir = path.join(__dirname, '../..');
const page_files = ['docs/rules.html', 'docs/agents.html', 'docs/glossaries.html', 'formatting.html', 'drafts/logs-cheatsheet.html', 'drafts/scroll-anchoring.html'];
const paths = ['sun', 'moon'].map(v => fs.readFileSync(path.join(root_dir, 'img', `theme-${v}.svg`), 'utf8').match(/ d="([^"]+)"/)[1]);
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const page_file of page_files) {
    for (const initial of ['light', 'dark']) {
        test(`${page_file}: ${initial} current icon, direct toggle, keyboard, persistence and blocked storage`, async function () {
            for (const blocked of [false, true]) {
                const context = await browser.newContext({colorScheme: initial, viewport: {width: 1280, height: 800}});
                const page = await context.newPage();
                const errors = [];
                page.on('pageerror', v => errors.push(v.message));
                try {
                    await page.route('https://**/*', v => v.abort());
                    if (blocked) {
                        await page.addInitScript(function () {
                            Object.defineProperty(window, 'localStorage', {get: storage_throw});
                            function storage_throw() {
                                throw new Error('Storage blocked for this test');
                            }
                        });
                    }
                    await page.goto(`file://${path.join(root_dir, page_file)}`);
                    await state_assert(page, initial);
                    const button = page.locator('.theme button').first();
                    assert.equal(await button.getAttribute('type'), 'button');
                    assert.equal(await button.getAttribute('aria-haspopup'), null);
                    assert.equal(await button.locator('svg').count(), 2);
                    assert.deepEqual(await button.locator('path').evaluateAll(v => v.map(vv => vv.getAttribute('d'))), paths);
                    const other = (initial === 'dark') ? 'light' : 'dark';
                    // A path click must reach the enclosing button and toggle exactly once.
                    await button.locator(`.theme-${initial} path`).click();
                    await state_assert(page, other);
                    await page.reload();
                    await state_assert(page, blocked ? initial : other);
                    await button.focus();
                    await page.keyboard.press('Enter');
                    await state_assert(page, blocked ? other : initial);
                    await page.keyboard.press('Space');
                    await state_assert(page, blocked ? initial : other);
                    if (page_file !== 'drafts/scroll-anchoring.html') {
                        await page.evaluate(function () {
                            window.scrollTo(0, document.documentElement.scrollHeight);
                        });
                        await page.locator('.theme-docked button').waitFor({state: 'visible'});
                        await page.locator('.theme-docked button').click();
                        await state_assert(page, blocked ? other : initial);
                    }
                    assert.deepEqual(errors, []);
                }
                finally {
                    await context.close();
                }
            }
        });
    }
}

// The links come first and the switch last, at the right edge (MP-44).
for (const page_file of page_files.filter(v => v !== 'drafts/scroll-anchoring.html')) {
    for (const [width, theme_initial] of [[1280, 'light'], [1280, 'dark'], [375, 'dark']]) {
        test(`${page_file}: ${width}px ${theme_initial} header ends with GitHub, then the theme switch, alike`, async function () {
            const context = await browser.newContext({colorScheme: theme_initial, viewport: {width, height: 800}});
            const page = await context.newPage();
            try {
                await page.route('https://**/*', v => v.abort());
                await page.goto(`file://${path.join(root_dir, page_file)}`);
                const last = await page.locator('.mast-top').evaluate(v => v.lastElementChild.id);
                assert.equal(last, 'theme');
                const github = await page.locator('.mast-top .github').boundingBox();
                const theme = await page.locator('#theme').boundingBox();
                assert.ok(github.x + github.width <= theme.x, `GitHub ends at ${github.x + github.width}, the switch starts at ${theme.x}`);
                assert.ok(Math.abs((github.y + github.height/2) - (theme.y + theme.height/2)) < 4, 'GitHub and the switch share one line');
                assert.ok(theme.x + theme.width <= width, 'the switch stays on screen');
                // The two look alike: one size, no frame (MP-45).
                const button = await page.locator('#theme button').boundingBox();
                assert.deepEqual([button.width, button.height], [github.width, github.height]);
                // What is drawn, not the icon's box: the crescent fills less of its box than the sun.
                const drawn = await page.locator('.mast-top .github path, #theme .theme-icon:visible path').evaluateAll(v => v.map(vv => vv.getBoundingClientRect().width));
                assert.ok(Math.abs(drawn[0] - drawn[1]) <= 1, `GitHub is drawn ${drawn[0]}px, the switch ${drawn[1]}px`);
                const frames = await page.locator('#theme, #theme button, .mast-top .github').evaluateAll(v => v.map(vv => getComputedStyle(vv).borderTopWidth));
                assert.deepEqual(frames, ['0px', '0px', '0px']);
            }
            finally {
                await context.close();
            }
        });
    }
}

async function state_assert(page, theme)
{
    assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
    const states = await page.locator('.theme button').evaluateAll(function (buttons) {
        return buttons.map(function (button) {
            return {
                label: button.getAttribute('aria-label'),
                light: getComputedStyle(button.querySelector('.theme-light')).display,
                dark: getComputedStyle(button.querySelector('.theme-dark')).display,
            };
        });
    });
    assert.ok(states.length > 0);
    for (const state of states) {
        assert.equal(state.label, `${(theme === 'dark') ? 'Dark' : 'Light'} theme. Switch to ${(theme === 'dark') ? 'light' : 'dark'} theme.`);
        assert.equal(state.light, (theme === 'light') ? 'block' : 'none');
        assert.equal(state.dark, (theme === 'dark') ? 'block' : 'none');
    }
}
