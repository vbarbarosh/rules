const assert = require('node:assert/strict');
const config = require('../src/config');
const test = require('node:test');
const {ESLint} = require('eslint');

test('the full preset agrees on value, event and error callback names', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const sources = [
        'items.map(v => v.uid);',
        'items.sort((a, b) => a - b);',
        'promise.catch(e => report(e));',
        "promise['catch'](e => report(e));",
        'promise?.catch?.(e => report(e));',
        'promise.then(v => accept(v), e => report(e));',
        "promise['then'](null, e => report(e));",
        'promise.then(null, (e, detail) => report(e, detail));',
        'promise.catch(() => report());',
        'promise.catch(handler);',
        'promise.catch(e => report(e), v => accept(v));',
        'promise.catch({fallback: v => accept(v)});',
        'items.map(v => v.some(vv => vv.active));',
        'items.map(v => v.catch(e => report(e)));',
        'promise.catch(e => values.map(vv => vv.uid));',
        'promise.catch(e => fallback.catch(e => report(e)));',
        'promise.catch(function (error) {\n    fallback.catch(function (error) {\n        report(error);\n    });\n});',
        'try {\n    run();\n}\ncatch (error) {\n    promise.catch(e => report(e));\n    promise.catch(function (error) {\n        report(error);\n    });\n    try {\n        retry();\n    }\n    catch (error2) {\n        report(error2);\n    }\n}',
        "server.on('error', e => report(e));",
        "server.once('error', e => report(e));",
        "server['addListener']('error', e => report(e));",
        "server.prependListener('error', e => report(e));",
        "server.prependOnceListener('error', e => report(e));",
        "server.on('error', e => report(e), v => accept(v));",
        "server.on('data', v => accept(v));",
        "server[method]('error', v => accept(v));",
        "el.addEventListener('click', v => v.stopPropagation());",
        "el.addEventListener('error', v => report(v));",
        "el.addEventListener('error', function (event) {\n    report(event);\n});",
        "server.on('error', function (error) {\n    report(error);\n});",
        'promise.catch(function (error) {\n    report(error);\n});',
        'promise.then(null, function (error) {\n    report(error);\n});',
        'try {\n    run();\n}\ncatch (error) {\n    report(error);\n}',
        'try {\n    run();\n}\ncatch {\n    recover();\n}',
    ];
    for (const source of sources) {
        const [result] = await linter.lintText(source, {filePath: 'callback.js'});
        assert.deepEqual(result.messages, [], source);
    }
});

test('the full preset assigns each callback naming diagnostic to one rule', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const cases = [
        ['promise.catch(v => report(v));', 'error-name', 'name'],
        ['promise.catch(error => report(error));', 'error-name', 'name'],
        ["promise['catch'](error => report(error));", 'error-name', 'name'],
        ['promise.then(null, v => report(v));', 'error-name', 'name'],
        ["server.on('error', v => report(v));", 'error-name', 'name'],
        ["server.once('error', (v, detail) => report(v, detail));", 'error-name', 'name'],
        ['promise.catch(({message}) => report(message));', 'error-name', 'name'],
        ["el.addEventListener('error', e => report(e));", 'tiny-arrows', 'name'],
        ["el.addEventListener('click', event => report(event));", 'tiny-arrows', 'name'],
        ['promise.catch({fallback: e => report(e)});', 'tiny-arrows', 'name'],
        ['promise.catch(function (e) {\n    report(e);\n});', 'error-name', 'name'],
        ['promise.catch(e => { report(e); });', 'tiny-arrows', 'block'],
        ['promise.catch(e =>\n    report(e));', 'tiny-arrows', 'tiny'],
        ['promise.catch(e => fallback.catch(ee => report(ee)));', 'error-name', 'name'],
        ['try {\n    run();\n}\ncatch (error) {\n    promise.catch(function (error2) {\n        report(error2);\n    });\n}', 'error-name', 'name'],
        ['try {\n    run();\n}\ncatch (error) {\n    try {\n        retry();\n    }\n    catch (error) {\n        report(error);\n    }\n}', 'error-name', 'name'],
    ];
    for (const [source, rule, message] of cases) {
        const [result] = await linter.lintText(source, {filePath: 'callback.js'});
        assert.deepEqual(result.messages.map(v => [v.ruleId, v.messageId]), [[`rules/${rule}`, message]], source);
    }
});

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

test('classes are allowed, with or without a superclass', async function () {
    const linter = new ESLint({overrideConfigFile: true, overrideConfig: config()});
    const [extended] = await linter.lintText('class Restricted extends Error\n{\n}\n\nmodule.exports = Restricted;\n', {filePath: 'Restricted.cjs'});
    assert.deepEqual(extended.messages, []);
    const [plain] = await linter.lintText('class Logger\n{\n}\n\nmodule.exports = Logger;\n', {filePath: 'Logger.cjs'});
    assert.deepEqual(plain.messages, []);
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
