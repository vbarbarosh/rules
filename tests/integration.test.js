const assert = require('node:assert/strict');
const config = require('../src/config');
const test = require('node:test');
const {ESLint} = require('eslint');

test('the preset checks JavaScript and template/style references in the same Vue file', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText(`<template>
    <div class="flex-row-c gap5 app-shadow #-foo" />
</template>
<script>
    import a from 'a';
    import b from 'b';

    function component_make()
    {
        return {a, b};
    }

    export default component_make;
</script>
<style lang="sass">
    .#-foo
        @include app-transition(color)
        color: red
        &:hover
            color: blue
</style>`, {filePath: 'example.vue'});
    assert.deepEqual(result.messages, []);
});

test('standalone CSS reports positions in the original file', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('.foo {\n    transition: all 1s;\n}\n', {filePath: 'example.css'});
    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0].ruleId, 'rules/vue-style-conventions');
    assert.equal(result.messages[0].line, 2);
    assert.equal(result.messages[0].column, 5);
});

test('standalone Sass preserves includes and reports their original lines', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('.foo\n    color: red\n    @include app-border-b\n', {filePath: 'example.sass'});
    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0].messageId, 'include');
    assert.equal(result.messages[0].line, 3);
});

test('a standalone stylesheet may be assembled from sections, each led by its own @import', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('@import a\n.a\n    color: red\n\n@import b\n.b\n    color: blue\n', {filePath: 'example.sass'});
    assert.deepEqual(result.messages, []);
});

test('a standalone stylesheet may build selectors with interpolation', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('@for $i from 1 through 3\n    .gap#{$i}\n        gap: #{$i}px\n', {filePath: 'example.sass'});
    assert.deepEqual(result.messages, []);
});

test('a class exists only to extend one', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [ok] = await linter.lintText('class Restricted extends Error\n{\n}\n\nmodule.exports = Restricted;\n', {filePath: 'Restricted.cjs'});
    assert.deepEqual(ok.messages.filter(v => v.ruleId === 'no-restricted-syntax'), []);
    const [bad] = await linter.lintText('class Logger\n{\n}\n\nmodule.exports = Logger;\n', {filePath: 'Logger.cjs'});
    assert.equal(bad.messages.filter(v => v.ruleId === 'no-restricted-syntax').length, 1);
});

test('standalone SCSS supports transition mixin definitions', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('@mixin app-transition($props...) { transition: $props; }', {filePath: 'example.scss'});
    assert.deepEqual(result.messages, []);
});

test('a missing local class in a later file cannot borrow another component definition', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    await linter.lintText('<template><div class="#-foo" /></template><style>.#-foo { color: red; }</style>', {filePath: 'first.vue'});
    const [result] = await linter.lintText('<template><div class="#-foo" /></template>', {filePath: 'second.vue'});
    assert.equal(result.messages[0].messageId, 'missing');
});

test('formatting fixes converge and preserve JavaScript parsing', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config(), fix: true});
    const [result] = await linter.lintText('function main() { return 2 * 3; }\n', {filePath: 'example.js'});
    assert.equal(result.output, 'function main()\n{\n    return 2*3;\n}\n');
    assert.deepEqual(result.messages, []);
    const [again] = await linter.lintText(result.output, {filePath: 'example.js'});
    assert.equal(again.output, undefined);
    assert.deepEqual(again.messages, []);
});

test('CSS processing does not offer fixes in synthetic source coordinates', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config(), fix: true});
    const source = '.foo { transition: all 1s; }';
    const [result] = await linter.lintText(source, {filePath: 'example.css'});
    assert.equal(result.output, undefined);
    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0].fix, undefined);
});

test('malformed Sass is reported instead of silently accepting local classes', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [result] = await linter.lintText('<template><div class="#-foo" /></template><style lang="sass">\n.#-foo\n    color: (\n</style>', {filePath: 'example.vue'});
    assert.equal(result.messages.some(v => v.ruleId === 'rules/vue-local-class-style' && v.messageId === 'parse'), true);
});
