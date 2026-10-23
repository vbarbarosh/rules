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
    for (const file of ['bin/build', 'bin/build-search', 'bin/self-check', 'package.json', 'docs', 'drafts', 'agents', 'diagrams', 'apis', 'glossaries', 'img', 'formatting.html']) {
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
    for (const file of ['docs/rules.html', 'docs/animations.html', 'docs/agents.html', 'docs/diagrams.html', 'docs/apis.html', 'docs/glossaries.html']) {
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

test('diagrams/ builds its own page from the agents template, and the agents hand it over', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const diagrams = fs.readFileSync(path.join(fixture_dir, 'docs/diagrams.html'), 'utf8');
    assert.match(diagrams, /<h1>Diagrams<\/h1>/);
    assert.match(diagrams, /<a href="diagrams.html" aria-current="page">Diagrams<\/a>/);
    assert.match(diagrams, /<section class="group guide" id="sequence">/);
    assert.match(diagrams, /<p class="stats"><b>38<\/b> diagrams<\/p>/);
    for (const id of ['sequence', 'case', 'screen', 'state', 'flywheel', 'flowchart', 'swimlanes', 'questions', 'causetree', 'timeline', 'chronology', 'eventplot', 'milestone', 'plangraph', 'roadmap', 'kanban', 'quadrant', 'containers', 'entities', 'dashboard', 'linechart', 'heatmap', 'versions', 'cloud', 'network', 'tiers', 'isometric', 'servicemap', 'sankey', 'waterfall', 'dataflow', 'matrix', 'callgraph', 'pipeline', 'modules', 'changemap', 'flame', 'treemap']) {
        assert.match(diagrams, new RegExp(`<section class="group guide" id="${id}">`));
    }
    assert.match(diagrams, /<img class="dark" src="..\/img\/diagrams\/sequence_parts-dark.svg"/);
    assert.equal(diagrams.match(/<a class="tile" href="#\w+">/g).length, 38, 'a tile for each diagram in the overview');
    assert.match(diagrams, /tree\/main\/diagrams">diagrams\/<\/a>/);
    assert.ok(!diagrams.includes('{{'), 'no placeholder left');
    const agents = fs.readFileSync(path.join(fixture_dir, 'docs/agents.html'), 'utf8');
    assert.match(agents, /<a href="agents.html" aria-current="page">Agents<\/a>\n\s*<a href="diagrams.html">Diagrams<\/a>/);
    assert.match(agents, /Draw the pictures in your replies the way these diagrams say:\n- Sequence diagram: who talks to whom: https:\/\/raw.githubusercontent.com\/vbarbarosh\/rules\/main\/diagrams\/sequence.md\n/);
    assert.match(agents, /diagrams\/treemap.md\nDraw an API the way these forms say:/);
    assert.match(agents, /<p class="stats"><b>5<\/b> guides<\/p>/);
});

test('apis/ builds its own page from the agents template, and the agents hand it over', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const apis = fs.readFileSync(path.join(fixture_dir, 'docs/apis.html'), 'utf8');
    assert.match(apis, /<h1>APIs<\/h1>/);
    assert.match(apis, /<a href="diagrams.html">Diagrams<\/a>\n\s*<a href="apis.html" aria-current="page">APIs<\/a>/);
    assert.match(apis, /<p class="stats"><b>2<\/b> forms<\/p>/);
    for (const id of ['compact', 'expanded']) {
        assert.match(apis, new RegExp(`<section class="group guide" id="${id}">`));
    }
    assert.match(apis, /<img class="dark" src="..\/img\/apis\/compact_articles-dark.svg"/);
    assert.match(apis, /<img class="dark" src="..\/img\/apis\/expanded_post_422-dark.svg"/);
    assert.match(apis, /tree\/main\/apis">apis\/<\/a>/);
    assert.match(apis, /<main data-page="apis">/);
    assert.ok(!apis.includes('{{'), 'no placeholder left');
    const agents = fs.readFileSync(path.join(fixture_dir, 'docs/agents.html'), 'utf8');
    assert.match(agents, /<a href="diagrams.html">Diagrams<\/a>\n\s*<a href="apis.html">APIs<\/a>/);
    assert.match(agents, /Draw an API the way these forms say:\n- Compact: one resource, every request a row: https:\/\/raw.githubusercontent.com\/vbarbarosh\/rules\/main\/apis\/compact.md\n/);
    assert.match(agents, /apis\/expanded.md<\/pre>/);
    for (const file of ['docs/rules.html', 'docs/animations.html', 'docs/diagrams.html', 'docs/glossaries.html']) {
        assert.match(fs.readFileSync(path.join(fixture_dir, file), 'utf8'), /<a href="apis.html">APIs<\/a>/, file);
    }
});

test('the standard names show on the glossaries page with their two groups', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const html = fs.readFileSync(path.join(fixture_dir, 'docs/glossaries.html'), 'utf8');
    assert.match(html, /<section class="group" id="NAMES"/);
    for (const tag of ['MACH', 'PLACE']) {
        assert.match(html, new RegExp(`id="${tag}"`));
    }
    assert.ok(html.includes('vps1, vps2'));
    assert.ok(html.includes('192.0.2.x'));
});

test('a picture after a rule form goes under the text and the form', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const html = fs.readFileSync(path.join(fixture_dir, 'docs/rules.html'), 'utf8');
    const rule = html.match(/<article class="rule" id="UIM-10">[\s\S]*?<\/article>/)[0];
    assert.match(rule, /<div class="form"><pre>Read → local overlay/);
    assert.match(rule, /<div class="figures"><a class="figure" href="..\/drafts\/optimistic-updates.gif"><img class="light" .*?><img class="dark" src="..\/drafts\/optimistic-updates-dark.gif"/);
});

test('a picture line in a glossary section goes under the term, sized from the SVG viewBox, with its dark twin', function () {
    const result = build();
    assert.equal(result.status, 0, result.stderr);
    const html = fs.readFileSync(path.join(fixture_dir, 'docs/glossaries.html'), 'utf8');
    const tree = html.match(/<article class="rule" id="MAP-01">[\s\S]*?<\/article>/)[0];
    assert.match(tree, /<\/div>\n<a class="form figure" href="..\/img\/maps\/tree.svg"><img class="light" src="..\/img\/maps\/tree.svg" alt="Tree: the folders of a note" width="1200" height="730" loading="lazy"><img class="dark" src="..\/img\/maps\/tree-dark.svg"/);
    assert.ok(!tree.includes('![Tree'), 'the picture line is not shown as text');
    const ontology = html.match(/<article class="rule" id="MAP-05">[\s\S]*?<\/article>/)[0];
    assert.match(ontology, /<div class="figures"><a class="figure" href="..\/img\/maps\/ontology.svg">.*?<\/a><a class="figure" href="..\/img\/maps\/terms-map.svg">/);
});

test('an id used twice across the pages fails the build, naming both', function () {
    const file = path.join(fixture_dir, 'glossaries/names.md');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, original.replace('# Standard names (NAMES)', '# Standard names (NAME)'));
        const result = build();
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /ids used twice across the pages: NAME \(section of rules, section of glossaries\)/);
    }
    finally {
        fs.writeFileSync(file, original);
    }
});

test('a "## Term" section finds its term under a group too', function () {
    const file = path.join(fixture_dir, 'glossaries/agents.md');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, `${original}\n## Compact\n\nThe older part of the transcript, summarized.\n`);
        const result = build();
        assert.equal(result.status, 0, result.stderr);
        const html = fs.readFileSync(path.join(fixture_dir, 'docs/glossaries.html'), 'utf8');
        const compact = html.match(/<article class="rule(?: bare)?" id="LIM-04">[\s\S]*?<\/article>/)[0];
        assert.match(compact, /<dfn>compact<\/dfn><\/p><p>The older part of the transcript, summarized.<\/p>/);
    }
    finally {
        fs.writeFileSync(file, original);
    }
});

test('all built theme icons follow the shared SVG assets, including handwritten diagrams', function () {
    const file = path.join(fixture_dir, 'img/theme-sun.svg');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, original.replace('M12,9', 'M12,8.5'));
        const result = build();
        assert.equal(result.status, 0, result.stderr);
        for (const file of ['docs/rules.html', 'docs/animations.html', 'docs/agents.html', 'docs/diagrams.html', 'docs/apis.html', 'docs/glossaries.html', 'formatting.html', 'drafts/logs-cheatsheet.html', 'drafts/scroll-anchoring.html', 'drafts/page-header-structure.html']) {
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

test('a Try it link after a rule form and its pictures becomes a button under them', function () {
    const file = path.join(fixture_dir, 'docs/rules.md');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, try_it_add(original, 'UIM-10', '../drafts/scroll-anchoring.html#demo'));
        const result = build();
        assert.equal(result.status, 0, result.stderr);
        const html = fs.readFileSync(path.join(fixture_dir, 'docs/rules.html'), 'utf8');
        const rule = html.match(/<article class="rule" id="UIM-10">[\s\S]*?<\/article>/)[0];
        assert.match(rule, /<div class="figures"><a class="figure" href="..\/drafts\/optimistic-updates.gif">.*?<\/a><\/div>\n<button class="try-it" type="button" data-demo="..\/drafts\/scroll-anchoring.html#demo">▶ Try it<\/button>\n<\/article>/);
        assert.ok(!rule.includes('[▶ Try it]'), 'the link is not shown as text');
    }
    finally {
        fs.writeFileSync(file, original);
    }
});

test('the build rejects a Try it link to a demo that is not there', function () {
    const file = path.join(fixture_dir, 'docs/rules.md');
    const original = fs.readFileSync(file, 'utf8');
    try {
        fs.writeFileSync(file, try_it_add(original, 'UIM-10', '../drafts/nothing-here.html#demo'));
        const result = build();
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /no demo at ..\/drafts\/nothing-here.html#demo/);
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
    {file: 'img/maps/tree.svg', what: 'SVG with no size', data: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>')},
    {file: 'img/maps/tree-dark.svg', what: 'SVG with a zero viewBox', data: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"></svg>')},
]) {
    test(`the build rejects ${item.what} rather than silently losing reserved space`, function () {
        const file = path.join(fixture_dir, item.file);
        const original = fs.readFileSync(file);
        try {
            fs.writeFileSync(file, item.data);
            const result = build();
            assert.notEqual(result.status, 0);
            assert.match(result.stderr, /no valid PNG\/GIF\/SVG dimensions at/);
            assert.ok(result.stderr.includes(path.basename(file)), result.stderr);
        }
        finally {
            fs.writeFileSync(file, original);
        }
    });
}

test('docs/README.md counts the rules the indexes count', function () {
    const rules_markdown = fs.readFileSync(path.join(root_dir, 'docs/rules.md'), 'utf8');
    const animations_markdown = fs.readFileSync(path.join(root_dir, 'docs/animations.md'), 'utf8');
    const readme = fs.readFileSync(path.join(root_dir, 'docs/README.md'), 'utf8');
    const rules_count = rules_markdown.match(/^(\d+) rules · /m)[1];
    const animations_count = animations_markdown.match(/^(\d+) rules · /m)[1];
    assert.ok(readme.includes(`all ${rules_count} of them`), `docs/README.md does not say all ${rules_count} of them`);
    assert.ok(readme.includes(`the ${animations_count} animation rules`), `docs/README.md does not say the ${animations_count} animation rules`);
});

// rules.md with a Try it link added at the end of one rule's form cell.
function try_it_add(markdown, code, url)
{
    const lines = markdown.split('\n').map(line_try_it_add);
    return lines.join('\n');

    function line_try_it_add(line) {
        if (!line.startsWith(`| ${code} |`)) {
            return line;
        }
        const cells = line.split(' | ');
        cells[2] = `${cells[2]} [▶ Try it](${url})`;
        return cells.join(' | ');
    }
}

function build()
{
    return child_process.spawnSync(process.execPath, [path.join(fixture_dir, 'bin/build')], {cwd: fixture_dir, encoding: 'utf8'});
}
