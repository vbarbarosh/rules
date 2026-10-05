const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run: npm i --no-save playwright && npx playwright install chromium
//      node --test drafts/scroll-anchoring.test.js

const url = `file://${path.join(__dirname, 'scroll-anchoring.html')}`;

const cases = [
    {button: 'add', scroll_top: 600, what: 'a message added above the view'},
    {button: 'add', scroll_top: 0, what: 'a message added while the view is at the very top'},
    {button: 'grow', scroll_top: 600, what: 'the summary growing above the view'},
    {button: 'grow', scroll_top: 40, what: 'the summary growing at the top of the view'},
    {button: 'grow', scroll_top: 0, what: 'the summary growing while the view is at the very top'},
    {button: 'rerender', scroll_top: 600, what: 'a re-render that grows the summary'},
];

let browser;
let page;

test.before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage({viewport: {width: 1280, height: 700}});
});

test.after(async function () {
    await browser.close();
});

for (const item of cases) {
    test(`the line being read stays put: ${item.what}`, async function () {
        await page.goto(url);
        const shift = await anchor_shift(page, 'kept', item.button, item.scroll_top);
        assert.equal(shift, 0);
    });
}

// The same check on the pane that relies on the browser alone must fail:
// otherwise the test above could pass without keeping anything in place.
test('the check sees the jump the browser alone lets through', async function () {
    await page.goto(url);
    const shift = await anchor_shift(page, 'plain', 'grow', 40);
    assert.notEqual(shift, 0);
});

// Scrolls the scroller, notes the screen position of the element under its
// middle line, clicks the button, and returns how far that element moved.
async function anchor_shift(page, scroller_id, button_id, scroll_top)
{
    return page.evaluate(async function ([scroller_id, button_id, scroll_top]) {
        const scroller = document.getElementById(scroller_id);
        scroller.scrollTop = scroll_top;
        await frames_wait();
        const rect = scroller.getBoundingClientRect();
        const middle = rect.top + rect.height/2;
        const anchor = [...scroller.querySelectorAll('[data-uid]')].find(v => v.getBoundingClientRect().bottom > middle);
        const uid = anchor.dataset.uid;
        const top0 = anchor.getBoundingClientRect().top;
        document.getElementById(button_id).click();
        await frames_wait();
        return scroller.querySelector(`[data-uid="${uid}"]`).getBoundingClientRect().top - top0;

        function frames_wait() {
            return new Promise(v => requestAnimationFrame(() => requestAnimationFrame(v)));
        }
    }, [scroller_id, button_id, scroll_top]);
}
