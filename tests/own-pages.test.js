const assert = require('node:assert/strict');
const child_process = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const rules_config = require('../src/config');
const test = require('node:test');

const {ESLint} = require('eslint');

const root_dir = path.join(__dirname, '..');

// The repository's own pages follow its rules: their styles and their scripts.
test('every page puts one selector per line (CSS-12)', function () {
    const breaks = [];
    for (const style of styles_from_pages()) {
        style.root.walkRules(function (rule) {
            const selectors = postcss.list.comma(rule.selector);
            const lines = rule.selector.split('\n').map(v => v.trim());
            if ((selectors.length > 1) && (lines.join('\n') !== selectors.join(',\n'))) {
                breaks.push(`${style.file}:${style.line + rule.source.start.line - 1}: ${rule.selector}`);
            }
        });
    }
    assert.deepEqual(breaks, []);
});

test('every page puts one blank line between rules (CSS-13)', function () {
    const breaks = [];
    for (const style of styles_from_pages()) {
        style.root.walk(function (node) {
            const previous = node.prev();
            if (['rule', 'atrule'].includes(node.type) && previous && (previous.type !== 'comment') && !/^\n\n[ \t]*$/.test(node.raws.before)) {
                breaks.push(`${style.file}:${style.line + node.source.start.line - 1}: ${node.selector || `@${node.name}`}`);
            }
        });
    }
    assert.deepEqual(breaks, []);
});

test('every page script passes the lint', async function () {
    const eslint = new ESLint({cwd: root_dir, overrideConfigFile: true, overrideConfig: [...rules_config(), {files: ['**/*.js'], languageOptions: {sourceType: 'script'}}]});
    const breaks = [];
    for (const script of blocks_from_pages(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
        const [result] = await eslint.lintText(script.text, {filePath: path.join(root_dir, 'page-script.js')});
        for (const message of result.messages) {
            breaks.push(`${script.file}:${script.line + message.line - 1}: ${message.ruleId}: ${message.message}`);
        }
    }
    assert.deepEqual(breaks, []);
});

// Every <style> block of every tracked page, parsed.
function styles_from_pages()
{
    return blocks_from_pages(/<style[^>]*>([\s\S]*?)<\/style>/g).map(v => ({...v, root: postcss.parse(v.text)}));
}

// The blocks a regex finds in every tracked page, with the line each starts on.
function blocks_from_pages(regex)
{
    const out = [];
    const files = child_process.execFileSync('git', ['ls-files', '*.html'], {cwd: root_dir, encoding: 'utf8'}).split('\n').filter(Boolean);
    for (const file of files) {
        const text = fs.readFileSync(path.join(root_dir, file), 'utf8');
        for (const match of text.matchAll(regex)) {
            out.push({file, line: text.slice(0, match.index).split('\n').length, text: match[1]});
        }
    }
    return out;
}
