const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium: node --test tests/browser/main-search.test.js
const root_dir = path.join(__dirname, '../..');
const pages = ['rules', 'agents', 'glossaries'];
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
        response.setHeader('Content-Type', path.extname(file) === '.html' ? 'text/html' : 'application/octet-stream');
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

for (const name of pages) {
    test(`${name}: background typing keeps the first character, selection and input events`, async function () {
        const page = await open_page(name);
        try {
            await page.evaluate(function () {
                window.input_events = 0;
                document.getElementById('q').addEventListener('input', v => window.input_events += 1);
            });
            await page.keyboard.type('filter');
            assert.equal(await page.locator('#q').inputValue(), 'filter');
            assert.equal(await page.locator('#q').evaluate(v => v === document.activeElement), true);
            assert.equal(await page.evaluate(v => window.input_events), 6);
            assert.equal(new URL(page.url()).searchParams.get('q'), 'filter');
            await page.evaluate(function () {
                const input = document.getElementById('q');
                input.value = 'hello world';
                input.setSelectionRange(6, 11);
                input.blur();
            });
            await page.keyboard.type('you');
            assert.equal(await page.locator('#q').inputValue(), 'hello you');
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.evaluate(v => document.activeElement.blur());
            await page.keyboard.type('no-match-query-123456789');
            assert.equal(await page.locator('#nothing').isVisible(), true);
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#nothing').isVisible(), false);
            await page.evaluate(v => document.activeElement.blur());
            await page.keyboard.type('/');
            assert.equal(await page.locator('#q').inputValue(), '/');
            await page.keyboard.press('Escape');
            await page.evaluate(v => document.activeElement.blur());
            await page.keyboard.press('Shift+A');
            assert.equal(await page.locator('#q').inputValue(), 'A');
            await page.evaluate(function () {
                document.getElementById('q').value = '';
                document.activeElement.blur();
                document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'я', bubbles: true}));
            });
            assert.equal(await page.locator('#q').inputValue(), 'я');
        }
        finally {
            await page.close();
        }
    });

    test(`${name}: local editable fields retain typing, including an input inside a shadow root`, async function () {
        const page = await open_page(name);
        try {
            await page.evaluate(function () {
                const fixture = document.createElement('div');
                fixture.innerHTML = '<input id="local"><textarea id="text"></textarea><div id="editable" contenteditable="true"></div><select id="select"><option>alpha</option><option>beta</option></select><div id="host"></div>';
                document.body.append(fixture);
                document.getElementById('host').attachShadow({mode: 'open'}).innerHTML = '<input id="shadow">';
            });
            for (const selector of ['#local', '#text', '#editable', '#shadow']) {
                await page.locator(selector).focus();
                await page.keyboard.type('local');
                const text = await page.locator(selector).evaluate(v => 'value' in v ? v.value : v.textContent);
                assert.equal(text, 'local');
                assert.equal(await page.locator('#q').inputValue(), '');
            }
            await page.locator('#select').focus();
            await page.keyboard.press('b');
            assert.equal(await page.locator('#select').inputValue(), 'beta');
            assert.equal(await page.locator('#q').inputValue(), '');
        }
        finally {
            await page.close();
        }
    });

    test(`${name}: commands, buttons, dialogs, composition and unavailable search are preserved`, async function () {
        const page = await open_page(name);
        try {
            for (const key of ['Control+a', 'Meta+a', 'Alt+x', 'Enter', 'ArrowDown', 'Escape']) {
                await page.keyboard.press(key);
                assert.equal(await page.locator('#q').inputValue(), '', key);
                assert.equal(await page.locator('#q').evaluate(v => v === document.activeElement), false, key);
            }
            const theme = page.locator('#theme button');
            await theme.focus();
            const before = await page.locator('html').getAttribute('data-theme');
            await page.keyboard.press('Space');
            assert.notEqual(await page.locator('html').getAttribute('data-theme'), before);
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.evaluate(function () {
                document.activeElement.blur();
                const event = new KeyboardEvent('keydown', {key: 'x', bubbles: true, cancelable: true});
                event.preventDefault();
                document.body.dispatchEvent(event);
                document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'x', bubbles: true, isComposing: true}));
            });
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.evaluate(function () {
                const dialog = document.createElement('dialog');
                dialog.innerHTML = '<button>Local action</button>';
                document.body.append(dialog);
                dialog.showModal();
            });
            await page.keyboard.type('x');
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.evaluate(function () {
                document.querySelector('dialog').remove();
                document.activeElement.blur();
                document.getElementById('q').disabled = true;
            });
            await page.keyboard.type('x');
            assert.equal(await page.locator('#q').inputValue(), '');
            await page.evaluate(function () {
                document.getElementById('q').disabled = false;
                document.getElementById('q').readOnly = true;
            });
            await page.keyboard.type('x');
            assert.equal(await page.locator('#q').inputValue(), '');
        }
        finally {
            await page.close();
        }
    });
}

async function open_page(name)
{
    const out = await browser.newPage();
    await out.route('**/*', async function (route) {
        if (route.request().url().startsWith(origin)) {
            await route.continue();
        }
        else {
            await route.abort();
        }
    });
    await out.goto(`${origin}/docs/${name}.html`);
    return out;
}
