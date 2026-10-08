const assert = require('node:assert/strict');
const child_process = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root_dir = path.join(__dirname, '..');
let fixture_dir;

test.before(function () {
    fixture_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rules-build-'));
    for (const file of ['bin/build', 'package.json', 'docs', 'drafts', 'agents', 'glossaries', 'img', 'formatting.html']) {
        fs.cpSync(path.join(root_dir, file), path.join(fixture_dir, file), {recursive: true});
    }
    fs.symlinkSync(path.join(root_dir, 'node_modules'), path.join(fixture_dir, 'node_modules'), 'dir');
});

test.after(function () {
    fs.rmSync(fixture_dir, {recursive: true, force: true});
});

test('generated rule and guide images all reserve positive dimensions, including dark twins', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    let count = 0;
    for (const file of ['docs/rules.html', 'docs/agents.html']) {
        const html = fs.readFileSync(path.join(fixture_dir, file), 'utf8');
        for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
            assert.match(tag, /width="[1-9]\d*"/);
            assert.match(tag, /height="[1-9]\d*"/);
            ++count;
        }
    }
    assert.ok(count >= 11);
});

test('guide pictures on consecutive lines share one row, each with its dark twin', function () {
    const file = path.join(fixture_dir, 'agents/every_state_before_done.md');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, `${original}\n![one](every-state-alert.png)\n![two](../drafts/optimistic-updates.gif)\n`);
        const result = build();
        assert.equal(result.status, 0, result.stderr);
        const html = fs.readFileSync(path.join(fixture_dir, 'docs/agents.html'), 'utf8');
        assert.match(html, /<div class="figures"><a class="figure" href="..\/agents\/every-state-alert.png">.*?<\/a><a class="figure" href="..\/drafts\/optimistic-updates.gif">/);
        assert.match(html, /<img class="dark" src="..\/drafts\/optimistic-updates-dark.gif"/);
        assert.match(html, /\n<a class="figure" href="..\/agents\/every-state-alert.png">/);
    }
    finally {
        fs.writeFileSync(file, original);
    }
});

test('a picture after a rule form goes under the text and the form', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const html = fs.readFileSync(path.join(fixture_dir, 'docs/rules.html'), 'utf8');
    const rule = html.match(/<article class="rule" id="UI-18">[\s\S]*?<\/article>/)[0];
    assert.match(rule, /<div class="form"><pre>Read → local overlay/);
    assert.match(rule, /<div class="figures"><a class="figure" href="..\/drafts\/optimistic-updates.gif"><img class="light" .*?><img class="dark" src="..\/drafts\/optimistic-updates-dark.gif"/);
});

test('all built theme icons follow the shared SVG assets, including handwritten diagrams', function () {
    const file = path.join(fixture_dir, 'img/theme-sun.svg');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, original.replace('M12,9', 'M12,8.5'));
        const result = build();
        assert.equal(result.status, 0, result.stderr);
        for (const file of ['docs/rules.html', 'docs/agents.html', 'docs/glossaries.html', 'formatting.html', 'drafts/logs-cheatsheet.html', 'drafts/scroll-anchoring.html', 'drafts/page-header-structure.html']) {
            const html = fs.readFileSync(path.join(fixture_dir, file), 'utf8');
            assert.ok(html.includes('d="M12,8.5'), file);
            assert.ok(!html.includes('d="M12,9'), file);
            assert.ok(!html.includes('data-set="light"'), file);
        }
    }
    finally {
        fs.writeFileSync(file, original);
    }
});

for (const item of [
    {file: 'drafts/readme-structure.png', what: 'truncated PNG', data: Buffer.from('89504e470d0a1a0a', 'hex')},
    {file: 'drafts/scroll-anchoring.gif', what: 'truncated GIF', data: Buffer.from('GIF89a')},
    {file: 'drafts/scroll-anchoring.gif', what: 'zero-sized GIF', data: Buffer.from('47494638396100000000', 'hex')},
    {file: 'agents/every-state-alert.png', what: 'unsupported guide image format', data: Buffer.from('<svg width="10" height="10"></svg>')},
]) {
    test(`the build rejects ${item.what} rather than silently losing reserved space`, function () {
        const file = path.join(fixture_dir, item.file);
        const original = fs.readFileSync(file);
        try {
            fs.writeFileSync(file, item.data);
            const result = build();
            assert.notEqual(result.status, 0);
            assert.match(result.stderr, /no valid PNG\/GIF dimensions at/);
            assert.ok(result.stderr.includes(path.basename(file)), result.stderr);
        }
        finally {
            fs.writeFileSync(file, original);
        }
    });
}

function build()
{
    return child_process.spawnSync(process.execPath, [path.join(fixture_dir, 'bin/build')], {cwd: fixture_dir, encoding: 'utf8'});
}
