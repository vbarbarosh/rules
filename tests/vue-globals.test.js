const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

test('the documented Vue px helper returns strings for dimensions and empty values', function () {
    const markdown = fs.readFileSync(path.join(__dirname, '../vue2/vue-globals.md'), 'utf8');
    const source = markdown.match(/```\n([\s\S]*?)\n```/)[1];
    let methods;
    vm.runInNewContext(source, {Vue: {mixin}});
    for (const value of [0, null, undefined, false, '', NaN]) {
        assert.equal(methods.px(value), '0');
    }
    for (const [value, expected] of [[10, '10px'], [-1, '-1px'], [1.5, '1.5px']]) {
        assert.equal(methods.px(value), expected);
    }
    function mixin(options) {
        methods = options.methods;
    }
});
