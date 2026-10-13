const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/try-it.test.js
const root_dir = path.join(__dirname, '../..');
const DEMOS = ['../drafts/animations.html#slide-workspaces', '../drafts/animations.html#list-changes'];
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

test('docs/rules.html: Try it slides the demo in from the right, Esc and ✕ slide it out, another slides in beside it', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', v => errors.push(v.message));
    try {
        await rules_open(page);
        const buttons = page.locator('.try-it');
        const first = buttons.nth(0);
        const code = await first.evaluate(v => v.closest('article.rule').id);
        await first.click();
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'open');
        assert.equal(await page.locator('#demo_code').textContent(), code);
        assert.ok((await page.locator('#demo_title').textContent()).length > 0);
        const src = await page.locator('#demo_frame').getAttribute('src');
        const demo = await first.getAttribute('data-demo');
        assert.ok(src.startsWith(`${demo.split('#')[0]}?embed&theme=`), src);
        // a demo may name its section (animations.html#list-changes) or be the whole page
        if (demo.includes('#')) {
            assert.ok(src.endsWith(`#${demo.split('#')[1]}`), src);
        }
        else {
            assert.ok(!src.includes('#'), src);
        }
        assert.equal(await page.evaluate(() => document.activeElement.id), 'demo_close');

        await page.keyboard.press('Escape');
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'closed');
        assert.ok(await first.evaluate(v => v === document.activeElement), 'focus goes back to the button');

        await first.click();
        await page.waitForTimeout(600);
        await page.locator('#demo_close').click();
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'closed');

        // another Try it further down while open: the open demo goes up as the
        // new one comes from below, edge to edge
        await first.click();
        await page.waitForTimeout(600);
        // a button with another demo, so the swap shows
        const second = page.locator(`.try-it:not([data-demo="${demo}"])`).first();
        await frames_watch(page);
        await second.evaluate(v => v.click());
        await slid_wait(page);
        slide_check(await frames_take(page), 1);
        assert.equal(await page.locator('.demo-panel').count(), 1);
        assert.equal(await panel_state_of(page), 'open');
        const second_demo = await second.getAttribute('data-demo');
        const second_src = await page.locator('#demo_frame').getAttribute('src');
        assert.ok(second_src.startsWith(`${second_demo.split('#')[0]}?embed`), second_src);
        if (second_demo.includes('#')) {
            assert.ok(second_src.endsWith(`#${second_demo.split('#')[1]}`), second_src);
        }
        assert.equal(await page.locator('#demo_code').textContent(), await second.evaluate(v => v.closest('article.rule').id));

        // the page's theme switch loads the demo again in the new theme
        const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        const other = (theme === 'dark') ? 'light' : 'dark';
        await page.evaluate(() => document.querySelector('#theme button').click());
        assert.ok((await page.locator('#demo_frame').getAttribute('src')).includes(`?embed&theme=${other}`));
        assert.deepEqual(errors, []);
    }
    finally {
        await context.close();
    }
});

test('docs/animations.html: a click beside the demo panel slides it out and keeps its own effect; a press begun in the panel keeps it', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', v => errors.push(v.message));
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(`file://${path.join(root_dir, 'docs/animations.html')}`);
        await page.locator('#ANIM-01 .try-it').click();
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'open');

        // a press in the panel's title dragged out onto the page
        const title = await page.locator('#demo_title').boundingBox();
        await page.mouse.move(title.x + 5, title.y + title.height/2);
        await page.mouse.down();
        await page.mouse.move(100, 400, {steps: 5});
        await page.mouse.up();
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'open');

        await page.mouse.click(100, 400);
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'closed');

        // the filter clicked beside the panel keeps its focus
        await page.locator('#ANIM-01 .try-it').click();
        await page.waitForTimeout(600);
        const q = await page.locator('#q').boundingBox();
        await page.mouse.click(q.x + 20, q.y + q.height/2);
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'closed');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'q');
        assert.deepEqual(errors, []);
    }
    finally {
        await context.close();
    }
});

test('docs/animations.html: a scroll over the demo panel stays in it, at the demo\'s end and over the head', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(`file://${path.join(root_dir, 'docs/animations.html')}`);
        await page.locator('#ANIM-06 .try-it').click();
        await page.waitForTimeout(800);
        const before = await page.evaluate(() => scrollY);
        const frame = await page.locator('#demo_frame').boundingBox();
        await page.mouse.move(frame.x + frame.width/2, frame.y + frame.height - 40);
        for (let i = 0; i < 12; i += 1) {
            await page.mouse.wheel(0, 400);
            await page.waitForTimeout(50);
        }
        await page.waitForTimeout(400);
        assert.ok(await page.frameLocator('#demo_frame').locator('html').evaluate(() => scrollY) > 0, 'the demo scrolled');
        assert.equal(await page.evaluate(() => scrollY), before);
        const head = await page.locator('.demo-panel-head').boundingBox();
        await page.mouse.move(head.x + 200, head.y + head.height/2);
        await page.mouse.wheel(0, 400);
        await page.waitForTimeout(400);
        assert.equal(await page.evaluate(() => scrollY), before);
    }
    finally {
        await context.close();
    }
});

test('docs/rules.html: at 400 px the demo panel takes the whole width and the page does not scroll sideways', async function () {
    const context = await browser.newContext({viewport: {width: 400, height: 800}});
    const page = await context.newPage();
    try {
        await rules_open(page);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth) <= 400);
        await page.locator('.try-it').first().evaluate(v => v.click());
        await page.waitForTimeout(600);
        const box = await page.locator('#demo_panel').boundingBox();
        assert.equal(Math.round(box.x), 0);
        assert.equal(Math.round(box.width), 400);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth) <= 400);
    }
    finally {
        await context.close();
    }
});

for (const theme of ['light', 'dark']) {
    test(`drafts/animations.html?embed&theme=${theme}: the named animation alone, in that theme; a new hash swaps it`, async function () {
        const context = await browser.newContext({viewport: {width: 760, height: 700}, colorScheme: (theme === 'dark') ? 'light' : 'dark'});
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', v => errors.push(v.message));
        try {
            await page.goto(`file://${path.join(root_dir, 'drafts/animations.html')}?embed&theme=${theme}#list-changes`);
            assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme);
            assert.equal(await page.locator('header').isVisible(), false);
            assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('section.animation')].filter(vv => !vv.hidden).map(vv => vv.id)), ['list-changes']);
            await page.evaluate(function () {
                location.hash = 'slide-workspaces';
            });
            await page.waitForTimeout(100);
            assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('section.animation')].filter(vv => !vv.hidden).map(vv => vv.id)), ['slide-workspaces']);
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth) <= 760);
            assert.deepEqual(errors, []);
        }
        finally {
            await context.close();
        }
    });
}

test('drafts/scroll-anchoring.html?embed: the demo in the asked theme, its own switch hidden; without ?embed the page is as before', async function () {
    const context = await browser.newContext({viewport: {width: 760, height: 700}, colorScheme: 'light'});
    const page = await context.newPage();
    try {
        await page.goto(`file://${path.join(root_dir, 'drafts/scroll-anchoring.html')}?embed&theme=dark#demo`);
        assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
        assert.equal(await page.locator('.theme').isVisible(), false);
        assert.equal(await page.locator('#grow').isVisible(), true);
        await page.goto(`file://${path.join(root_dir, 'drafts/scroll-anchoring.html')}`);
        assert.equal(await page.evaluate(() => document.documentElement.classList.contains('embed')), false);
        assert.equal(await page.locator('.theme').isVisible(), true);
    }
    finally {
        await context.close();
    }
});

test('docs/animations.html: the ANIM rules on a page of their own, each with its Try it; the rules page points there', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', v => errors.push(v.message));
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(`file://${path.join(root_dir, 'docs/animations.html')}`);
        const codes = await page.evaluate(() => [...document.querySelectorAll('article.rule')].map(vv => vv.id));
        assert.deepEqual(codes, ['ANIM-01', 'ANIM-02', 'ANIM-03', 'ANIM-04', 'ANIM-05', 'ANIM-06', 'ANIM-07', 'ANIM-08', 'ANIM-09', 'ANIM-10', 'ANIM-11', 'ANIM-12', 'ANIM-13', 'ANIM-14', 'ANIM-15']);
        assert.equal(await page.locator('article.rule .try-it').count(), 15);
        assert.equal(await page.locator('#use').count(), 0);
        assert.equal(await page.locator('.pages a[aria-current="page"]').textContent(), 'Animations');
        await page.locator('#q').fill('ANIM-07');
        assert.equal(await page.locator('#count').textContent(), '1 of 15 rules');
        await page.locator('#q').fill('');
        await page.locator('#ANIM-06 .try-it').click();
        await page.waitForTimeout(600);
        assert.equal(await panel_state_of(page), 'open');
        assert.equal(await page.locator('#demo_code').textContent(), 'ANIM-06');
        assert.deepEqual(errors, []);

        await page.goto(`file://${path.join(root_dir, 'docs/rules.html')}`);
        assert.equal(await page.locator('article.rule[id^="ANIM-"]').count(), 0);
        assert.equal(await page.locator('#use a[href="animations.html"]').count(), 1);
    }
    finally {
        await context.close();
    }
});

test('docs/animations.html: another Try it slides the two demos edge to edge, the way the list goes, and a click mid-way moves on from there', async function () {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', v => errors.push(v.message));
    try {
        await page.route('https://**/*', v => v.abort());
        await page.goto(`file://${path.join(root_dir, 'docs/animations.html')}`);
        await page.locator('#ANIM-01 .try-it').click();
        await page.waitForTimeout(600);
        await frames_watch(page);

        // down the list: the open one goes up, the next comes from below
        await click(page, 'ANIM-06');
        await slid_wait(page);
        slide_check(await frames_take(page), 1);
        // up the list: the reverse
        await click(page, 'ANIM-03');
        await slid_wait(page);
        slide_check(await frames_take(page), -1);

        // mid-way back to the one still on screen: it comes back from where it
        // stands, its demo not loaded again. The slide is held at 150 ms, so
        // a slow machine still clicks mid-way.
        await page.evaluate(function () {
            document.querySelector('#ANIM-09 .try-it').click();
            for (const animation of document.getAnimations().filter(v => !(v instanceof CSSTransition))) {
                animation.currentTime = 150;
                animation.pause();
            }
            document.querySelector('.demo-panel:not(#demo_panel) iframe').dataset.kept = 'yes';
        });
        slide_check(await frames_take(page), 1);
        // the held frames cleared and the click in one task: no frame between
        await page.evaluate(function () {
            window.panel_frames.splice(0);
            document.querySelector('#ANIM-03 .try-it').click();
        });
        await slid_wait(page);
        slide_check(await frames_take(page), -1);
        assert.equal(await page.locator('.demo-panel').count(), 1);
        assert.equal(await page.locator('#demo_code').textContent(), 'ANIM-03');
        assert.equal(await page.locator('#demo_frame').getAttribute('data-kept'), 'yes');
        assert.equal(await panel_state_of(page), 'open');
        assert.deepEqual(errors, []);
    }
    finally {
        await context.close();
    }
});

// The rules page, with two Try it buttons of two demos added to its first
// rules: its own may all open one demo (the animations have a page of their own).
async function rules_open(page)
{
    await page.route('https://**/*', v => v.abort());
    await page.goto(`file://${path.join(root_dir, 'docs/rules.html')}`);
    await page.evaluate(try_it_buttons_add, DEMOS);

    function try_it_buttons_add(demos) {
        const rules = [...document.querySelectorAll('article.rule')];
        for (let i = 0; i < 2; i += 1) {
            const button = document.createElement('button');
            button.className = 'try-it';
            button.type = 'button';
            button.dataset.demo = demos[i];
            button.textContent = '▶ Try it';
            rules[i].append(button);
        }
    }
}

// open: slid in and shown; closed: slid out of sight and hidden.
async function panel_state_of(page)
{
    return page.locator('#demo_panel').evaluate(function (panel) {
        const style = getComputedStyle(panel);
        const box = panel.getBoundingClientRect();
        if ((style.transform === 'none') && (style.visibility === 'visible') && (Math.round(box.right) === innerWidth) && !panel.hasAttribute('aria-hidden')) {
            return 'open';
        }
        if ((style.visibility === 'hidden') && (Math.round(box.left) >= innerWidth) && (panel.getAttribute('aria-hidden') === 'true')) {
            return 'closed';
        }
        return `between: ${style.transform} ${style.visibility} ${box.left}`;
    });
}

function click(page, code)
{
    return page.evaluate(v => document.querySelector(`#${v} .try-it`).click(), code);
}

// until the slide has ended: one panel left
function slid_wait(page)
{
    return page.waitForFunction(() => document.querySelectorAll('.demo-panel').length === 1);
}

// every frame from here on: where each panel stands, the open one by its id
function frames_watch(page)
{
    return page.evaluate(function () {
        window.panel_frames = [];
        requestAnimationFrame(function frame() {
            window.panel_frames.push([...document.querySelectorAll('.demo-panel')].map(v => ({open: v.id === 'demo_panel', left: v.getBoundingClientRect().left, top: v.getBoundingClientRect().top})));
            requestAnimationFrame(frame);
        });
    });
}

function frames_take(page)
{
    return page.evaluate(() => window.panel_frames.splice(0));
}

// A slide, frame by frame: both panels where the panel stands across, one
// height apart, nothing blank; the open one comes from below when direction
// is 1 (down the list), from above when -1.
function slide_check(frames, direction)
{
    const both = frames.filter(v => v.length === 2);
    assert.ok(both.length > 0, 'a frame with both panels');
    for (const panels of frames) {
        const ys = panels.map(v => v.top).sort((a, b) => a - b);
        assert.ok(panels.every(v => Math.round(v.left) === (1280 - 760)), `none moves across: ${JSON.stringify(panels)}`);
        assert.ok((ys[0] <= 0.5) && ((ys[ys.length - 1] + 800) >= 799.5), `nothing blank: ${ys}`);
        for (let i = 1; i < ys.length; i += 1) {
            assert.ok(Math.abs(ys[i] - ys[i - 1] - 800) < 0.5, `one height apart: ${ys}`);
        }
    }
    for (const panels of both) {
        const open = panels.find(v => v.open);
        const other = panels.find(v => !v.open);
        assert.equal(Math.sign(open.top - other.top), direction, JSON.stringify(panels));
    }
}
