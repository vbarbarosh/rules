const assert = require('node:assert/strict');
const plugin = require('../src');
const test = require('node:test');
const {Linter, RuleTester} = require('eslint');

RuleTester.describe = test.describe;
RuleTester.it = test.it;

const tester = new RuleTester({languageOptions: {ecmaVersion: 'latest', sourceType: 'module'}});

tester.run('imports-sorted', plugin.rules['imports-sorted'], {
    valid: [
        "import Vue from 'z';\nimport axios from 'a';\nimport {readFile} from 'fs';\n\nconst out = [];",
        "#!/usr/bin/env node\nconst $ = require('jquery');\nconst Vue = require('vue');\nconst axios = require('axios');\nconst {readFile} = require('fs');",
        "// Dependencies\nconst fs = require('node:fs');\nconst path = require('node:path');",
        "const a = require('z').a;\nconst b = require('a').b;",
        "import './sass/main.sass';\nimport './main-pre';\n\nimport Vue from 'vue';\nimport axios from 'axios';",
        "import './a';\nimport './b';\nimport Vue from 'vue';",
        "require('bootstrap-sass');\nrequire('./polyfills');\n\nconst Vue = require('vue');",
        "import './b';\nimport './a';",
    ],
    invalid: [
        {code: "const b = require('a');\nconst a = require('z');", errors: [{messageId: 'order'}]},
        {code: "import Vue from 'vue';\nimport './a';", errors: [{messageId: 'anonymous'}]},
        {code: "import Vue from 'vue';\n\nimport './a';", errors: [{messageId: 'anonymous'}, {messageId: 'contiguous'}]},
        {code: "import './a';\n\n\nimport Vue from 'vue';", errors: [{messageId: 'contiguous'}]},
        {code: "import Vue from 'vue';\n\nimport {reactive} from 'vue';", errors: [{messageId: 'contiguous'}]},
        {code: "import axios from 'a';\nimport Vue from 'z';", errors: [{messageId: 'order'}]},
        {code: "import {a} from 'a';\nimport z from 'z';", errors: [{messageId: 'order'}]},
        {code: "const a = require('a');\n\nconst b = require('b');", errors: [{messageId: 'contiguous'}]},
        {code: "import a from 'a';\n// comment\nimport b from 'b';", errors: [{messageId: 'contiguous'}, {messageId: 'comments'}]},
        {code: "const x = 1;\nconst a = require('a');", errors: [{messageId: 'first'}]},
        {code: "import {\n    a\n} from 'a';", errors: [{messageId: 'single'}]},
        {code: "const a = require('a'); const b = require('b');", errors: [{messageId: 'contiguous'}]},
        {code: "import 𐀀 from 'a';\nimport Ａ from 'b';", errors: [{messageId: 'order'}]},
        {code: "const a = require('a'); // comment", errors: [{messageId: 'comments'}]},
    ],
});

tester.run('block-layout', plugin.rules['block-layout'], {
    valid: [
        'function main()\n{\n    function nested() {\n    }\n    return 1;\n}',
        'if (a) {\n    b();\n}\nelse {\n    c();\n}',
        'try {\n    a();\n}\ncatch (error) {\n}\nfinally {\n    b();\n}',
        'items.map(function (item) {\n    return item;\n});',
    ],
    invalid: [
        {code: 'function main() {\n    return 1;\n}', output: 'function main()\n{\n    return 1;\n}', errors: [{messageId: 'newline'}]},
        {code: 'if (a)\n{\n    b();\n}', output: 'if (a) {\n    b();\n}', errors: [{messageId: 'same'}]},
        {code: 'if (a) {\n    b();\n} else {\n    c();\n}', output: 'if (a) {\n    b();\n}\nelse {\n    c();\n}', errors: [{messageId: 'newline'}]},
        {code: 'function main()\n{}', output: 'function main()\n{\n}', errors: [{messageId: 'newline'}]},
    ],
});

tester.run('tiny-arrows', plugin.rules['tiny-arrows'], {
    valid: [
        'items.map(v => v.uid);',
        'items.map(v => v.some(vv => vv.active));',
        'items.sort((a, b) => a - b);',
        'promise.catch(error => log(error));',
        'hover(el, {end: () => this.hover_lock = null});',
        'const handlers = {end: () => done()};',
    ],
    invalid: [
        {code: 'items.map(v => { return v; });', errors: [{messageId: 'tiny'}]},
        {code: 'items.map(v =>\n    v.uid);', errors: [{messageId: 'tiny'}]},
        {code: 'const helper = v => v;', errors: [{messageId: 'tiny'}]},
        {code: 'const handlers = {end: () => { done(); }};', errors: [{messageId: 'tiny'}]},
        {code: 'items.map(item => item.uid);', errors: [{messageId: 'name'}]},
        {code: 'items.map(v => v.map(v => v.uid));', errors: [{messageId: 'name'}]},
    ],
});

tester.run('error-name', plugin.rules['error-name'], {
    valid: ['try {} catch (error) {}', 'try {} catch {}', "server.on('error', function (error) {});", 'promise.catch(function () {});'],
    invalid: [
        {code: 'try {} catch (err) {}', errors: [{messageId: 'name'}]},
        {code: 'try {} catch ({message}) {}', errors: [{messageId: 'name'}]},
        {code: 'promise.catch(function (e) {});', errors: [{messageId: 'name'}]},
        {code: "server.once('error', function (ex) {});", errors: [{messageId: 'name'}]},
        {code: "promise['catch'](err => report(err));", errors: [{messageId: 'name'}]},
    ],
});

tester.run('return-out', plugin.rules['return-out'], {
    valid: [
        'function f() { const out = []; out.push(1); return out; }',
        'function f(value) { return value; }',
        'function f() { return {}; }',
        'const items = []; function f() { return items; }',
        'function f() { const data = fetch(); log(data); return data; }',
        'function f() { const out = {self: function () { return out; }}; return out; }',
    ],
    invalid: [
        {code: 'function f() { const items = []; items.push(1); return items; }', errors: [{messageId: 'name'}]},
        {code: 'function f() { const value = new Map(); value.set(1, 2); return value; }', errors: [{messageId: 'name'}]},
        {code: 'function f() { const out = {}; return out; }', errors: [{messageId: 'direct'}]},
        {code: 'function f() { const out = fetch(); return out; }', errors: [{messageId: 'direct'}]},
        {code: 'async function f() { const out = await fetch(); return out; }', errors: [{messageId: 'direct'}]},
        {code: 'function f() { const result = 42; return result; }', errors: [{messageId: 'direct'}]},
    ],
});

tester.run('operator-spacing', plugin.rules['operator-spacing'], {
    valid: ['const x = a*b + c/d - e**2;', 'const x = a % 2;', 'const x = a /* reason */ * b;', 'const x = a/ /x/.test(b);'],
    invalid: [
        {code: 'const x = a * b;', output: 'const x = a*b;', errors: [{messageId: 'tight'}, {messageId: 'tight'}]},
        {code: 'const x = a+b;', output: 'const x = a + b;', errors: [{messageId: 'space'}, {messageId: 'space'}]},
        {code: 'x+=2;', output: 'x += 2;', errors: [{messageId: 'space'}, {messageId: 'space'}]},
    ],
});

test('side-effect requires keep the order they run in and are never rewritten', function () {
    const linter = new Linter();
    const source = "require('z');\nrequire('a');\n\nconst b = require('b');\nconst a = require('a');";
    const result = linter.verifyAndFix(source, [{plugins: {rules: plugin}, rules: {'rules/imports-sorted': 'error'}}]);
    assert.equal(result.output, source);
    assert.equal(result.fixed, false);
    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0].messageId, 'order');
    assert.equal(result.messages[0].line, 5);
});
