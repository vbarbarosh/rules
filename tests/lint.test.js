const assert = require('node:assert/strict');
const child_process = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const lint = path.join(__dirname, '..', 'bin', 'lint');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rules-lint-'));

fs.mkdirSync(path.join(root, 'project', 'node_modules'), {recursive: true});
fs.mkdirSync(path.join(root, 'other'));
fs.writeFileSync(path.join(root, 'project', 'bad.vue'), '<template>\n    <div class="p30 db" />\n</template>\n');
fs.writeFileSync(path.join(root, 'project', 'good.js'), 'const a = 1;\n');
fs.writeFileSync(path.join(root, 'project', 'node_modules', 'vendor.js'), 'const a = 1;\n');

test.after(function () {
    fs.rmSync(root, {recursive: true, force: true});
});

test('a path outside the working directory is linted, not ignored', function () {
    const bad = lint_run(['../project/bad.vue'], path.join(root, 'other'));
    assert.equal(bad.status, 1);
    assert.match(bad.stdout, /Class "db" is out of order/);
    const good = lint_run(['../project/good.js'], path.join(root, 'other'));
    assert.equal(good.status, 0);
});

test('a relative directory resolves against the working directory', function () {
    const result = lint_run(['project'], root);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /bad\.vue/);
});

test('a given file which the preset ignores fails instead of passing unchecked', function () {
    const result = lint_run(['project/node_modules/vendor.js'], root);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /File ignored/);
});

test('flags and a missing path print one line of usage, not a stack', function () {
    for (const args of [[], ['--fix', 'project'], ['missing.js']]) {
        const result = lint_run(args, root);
        assert.equal(result.status, 1);
        assert.doesNotMatch(result.stderr, /\n\s+at /);
        assert.match(result.stderr, args[0] === 'missing.js' ? /^lint: No files matching/ : /^usage: /);
    }
});

function lint_run(args, cwd)
{
    return child_process.spawnSync(process.execPath, [lint, ...args], {cwd, encoding: 'utf8'});
}
