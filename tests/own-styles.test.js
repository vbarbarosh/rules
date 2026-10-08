const assert = require('node:assert/strict');
const child_process = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const test = require('node:test');

const root_dir = path.join(__dirname, '..');

// The repository's own pages follow its CSS rules.
test('every page puts one selector per line (CSS-12)', function () {
    const out = [];
    const files = child_process.execFileSync('git', ['ls-files', '*.html'], {cwd: root_dir, encoding: 'utf8'}).split('\n').filter(Boolean);
    for (const file of files) {
        const text = fs.readFileSync(path.join(root_dir, file), 'utf8');
        for (const match of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
            const line = text.slice(0, match.index).split('\n').length;
            postcss.parse(match[1]).walkRules(function (rule) {
                const selectors = postcss.list.comma(rule.selector);
                const lines = rule.selector.split('\n').map(v => v.trim());
                if (selectors.length > 1 && lines.join('\n') !== selectors.join(',\n')) {
                    out.push(`${file}:${line + rule.source.start.line - 1}: ${rule.selector}`);
                }
            });
        }
    }
    assert.deepEqual(out, []);
});
