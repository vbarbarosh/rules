const assert = require('node:assert/strict');
const child_process = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const lint_path = path.join(__dirname, '..', 'bin', 'lint');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rules-lint-'));

fs.mkdirSync(path.join(root, 'project', 'node_modules'), {recursive: true});
fs.mkdirSync(path.join(root, 'other'));
fs.writeFileSync(path.join(root, 'project', 'bad.vue'), '<template>\n    <div class="p30 db" />\n</template>\n');
fs.writeFileSync(path.join(root, 'project', 'good.js'), 'const a = 1;\n');
fs.writeFileSync(path.join(root, 'project', 'page.html'), '<script>\n[1].forEach(v => v);\n</script>\n');
fs.writeFileSync(path.join(root, 'project', 'node_modules', 'vendor.js'), 'const a = 1;\n');

// A repository keeping a download, a generated file and a local folder out
// of git, through .gitignore at two depths and .git/info/exclude; each
// holds what the linter would report.
const STYLES_BAD = 'a { color: red; }\nb { color: blue; }\n';
const repo = path.join(root, 'repo');
fs.mkdirSync(path.join(repo, 'src', 'toolchain', 'sdk'), {recursive: true});
fs.mkdirSync(path.join(repo, 'src', 'out [1]'));
child_process.execFileSync('git', ['init', '-q'], {cwd: repo});
fs.appendFileSync(path.join(repo, '.git', 'info', 'exclude'), 'out*/\n');
fs.writeFileSync(path.join(repo, '.gitignore'), 'tracked.css\n');
fs.writeFileSync(path.join(repo, 'src', '.gitignore'), 'toolchain/\n*.gen.js\n');
fs.writeFileSync(path.join(repo, 'src', 'toolchain', 'sdk', 'page.html'), `<style>\n${STYLES_BAD}</style>\n`);
fs.writeFileSync(path.join(repo, 'src', 'out [1]', 'page.css'), STYLES_BAD);
fs.writeFileSync(path.join(repo, 'src', 'made.gen.js'), '[1].forEach(v => v);\n');
fs.writeFileSync(path.join(repo, 'src', 'bad.js'), '[1].forEach(v => v);\n');
fs.writeFileSync(path.join(repo, 'tracked.css'), STYLES_BAD);
child_process.execFileSync('git', ['add', '-f', 'tracked.css'], {cwd: repo});

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

test('a page in a directory is linted, its script at the page\'s lines', function () {
    const result = lint_run(['project'], root);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /page\.html\n\s+2:1\s+error\s+Use for\.\.\.of instead of forEach/);
});

test('a given file which the preset ignores fails instead of passing unchecked', function () {
    const result = lint_run(['project/node_modules/vendor.js'], root);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /File ignored/);
});

test('what git ignores under a target is not linted', function () {
    for (const target of ['repo', 'repo/src']) {
        const result = lint_run([target], root);
        assert.equal(result.status, 1);
        assert.match(result.stdout, /bad\.js\n\s+1:1\s+error\s+Use for\.\.\.of instead of forEach/);
        assert.doesNotMatch(result.stdout, /toolchain|out \[1\]|made\.gen\.js/);
    }
});

test('a file git tracks is linted though .gitignore names it', function () {
    const result = lint_run(['repo'], root);
    assert.match(result.stdout, /tracked\.css\n\s+2:1\s+error\s+Leave one blank line between rules, not none/);
});

test('a given path which git ignores fails instead of passing unchecked', function () {
    for (const target of ['repo/src/toolchain/sdk/page.html', 'repo/src/out [1]/page.css', 'repo/src/made.gen.js']) {
        const result = lint_run([target], root);
        assert.equal(result.status, 1);
        assert.match(result.stdout, /File ignored/);
    }
    const folder = lint_run(['repo/src/toolchain/sdk'], root);
    assert.equal(folder.status, 1);
    assert.match(folder.stderr, /^lint: All files matched by .* are ignored/);
});

test('flags and a missing path print one line of usage, not a stack', function () {
    for (const args of [[], ['--fix', 'project'], ['missing.js']]) {
        const result = lint_run(args, root);
        assert.equal(result.status, 1);
        assert.doesNotMatch(result.stderr, /\n\s+at /);
        assert.match(result.stderr, (args[0] === 'missing.js') ? /^lint: No files matching/ : /^usage: /);
    }
});

function lint_run(args, cwd)
{
    return child_process.spawnSync(process.execPath, [lint_path, ...args], {cwd, encoding: 'utf8'});
}
