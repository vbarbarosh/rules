function block_layout(context)
{
    const source = context.sourceCode;
    function check_gap(before, after, newline) {
        const same = before.loc.end.line === after.loc.start.line;
        if (same !== newline) {
            return;
        }
        const gap = source.text.slice(before.range[1], after.range[0]);
        context.report({
            loc: after.loc,
            messageId: newline ? 'newline' : 'same',
            fix: /^\s*$/.test(gap) ? function (fixer) {
                const indent = source.lines[after.loc.start.line - 1].match(/^\s*/)[0];
                return fixer.replaceTextRange([before.range[1], after.range[0]], newline ? '\n' + indent : ' ');
            } : null,
        });
    }
    function check_block(node) {
        const open = source.getFirstToken(node);
        const close = source.getLastToken(node);
        const parent = node.parent;
        if (parent && parent.type !== 'Program' && parent.type !== 'BlockStatement') {
            const ancestors = source.getAncestors(parent);
            const top = parent.type === 'FunctionDeclaration' && !ancestors.some(v => /Function/.test(v.type));
            check_gap(source.getTokenBefore(open), open, top);
        }
        if (source.getTokenAfter(open) !== close) {
            check_gap(open, source.getTokenAfter(open), true);
        }
        check_gap(source.getTokenBefore(close), close, true);
    }
    return {
        BlockStatement: check_block,
        SwitchStatement: function (node) {
            const open = source.getTokenAfter(node.discriminant, v => v.value === '{');
            const close = source.getLastToken(node);
            check_gap(source.getTokenBefore(open), open, false);
            if (source.getTokenAfter(open) !== close) {
                check_gap(open, source.getTokenAfter(open), true);
            }
            check_gap(source.getTokenBefore(close), close, true);
        },
        'Program:exit': function () {
            for (const token of source.ast.tokens) {
                if (['else', 'catch', 'finally'].includes(token.value)) {
                    const previous = source.getTokenBefore(token);
                    if (previous?.value === '}') {
                        check_gap(previous, token, true);
                    }
                }
            }
        },
    };
}

module.exports = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: {newline: 'Start this token on a new line.', same: 'Keep this opening brace on the declaration line.'},
    },
    create: block_layout,
};
