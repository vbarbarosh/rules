function imports_sorted(context)
{
    const source = context.sourceCode;
    return {
        Program: function (node) {
            let previous = null;
            let closed = false;
            for (const statement of node.body) {
                if (!statement_is_import(statement)) {
                    closed = true;
                    continue;
                }
                if (closed) {
                    context.report({node: statement, messageId: 'first'});
                }
                if (statement.loc.start.line !== statement.loc.end.line) {
                    context.report({node: statement, messageId: 'single'});
                }
                if (source.getAllComments().some(v => v.loc.start.line <= statement.loc.end.line && v.loc.end.line >= statement.loc.start.line)) {
                    context.report({node: statement, messageId: 'comments'});
                }
                if (previous) {
                    // Side-effect imports form their own block at the top, in
                    // the order they run; one blank line may separate it from
                    // the named imports, which are the sorted ones.
                    const anonymous = statement_is_anonymous(statement);
                    const boundary = statement_is_anonymous(previous) && !anonymous;
                    if (anonymous && !statement_is_anonymous(previous)) {
                        context.report({node: statement, messageId: 'anonymous'});
                    }
                    const gap = statement.loc.start.line - previous.loc.end.line;
                    if (gap !== 1 && !(boundary && gap === 2)) {
                        context.report({node: statement, messageId: 'contiguous'});
                    }
                    const before = Buffer.from(source.lines[previous.loc.start.line - 1]);
                    const after = Buffer.from(source.lines[statement.loc.start.line - 1]);
                    if (!anonymous && !boundary && Buffer.compare(before, after) > 0) {
                        context.report({node: statement, messageId: 'order'});
                    }
                    const comments = source.getCommentsAfter(previous);
                    if (comments.some(v => v.loc.start.line > previous.loc.end.line && v.range[0] < statement.range[0])) {
                        context.report({node: statement, messageId: 'comments'});
                    }
                }
                previous = statement;
            }
        },
    };
}

function statement_is_import(node)
{
    if (node.type === 'ImportDeclaration') {
        return true;
    }
    if (node.type === 'ExpressionStatement') {
        return expression_is_require(node.expression);
    }
    return node.type === 'VariableDeclaration' && node.declarations.every(v => expression_is_require(v.init));
}

// import './x'; or require('x'); — nothing is bound
function statement_is_anonymous(node)
{
    if (node.type === 'ImportDeclaration') {
        return node.specifiers.length === 0;
    }
    return node.type === 'ExpressionStatement';
}

function expression_is_require(node)
{
    if (node?.type === 'MemberExpression') {
        return expression_is_require(node.object);
    }
    return node?.type === 'CallExpression' && node.callee.type === 'Identifier'
        && node.callee.name === 'require' && node.arguments.length === 1
        && node.arguments[0].type === 'Literal' && typeof node.arguments[0].value === 'string';
}

module.exports = {
    meta: {
        type: 'layout',
        schema: [],
        messages: {
            first: 'Imports and requires must be the first statements in the file.',
            single: 'Keep each import/require statement on one line for whole-line sorting.',
            contiguous: 'Keep imports/requires contiguous, one per line, without blank lines; one blank line may follow the side-effect imports.',
            anonymous: 'Side-effect imports and requires go in their own block at the top, before the named ones.',
            comments: 'Move comments outside the import/require block.',
            order: 'Sort complete import/require lines in byte order (LC_ALL=C sort).',
        },
    },
    create: imports_sorted,
};
