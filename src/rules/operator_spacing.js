function operator_spacing(context)
{
    const source = context.sourceCode;
    function check(node) {
        const tight = ['*', '/', '**'].includes(node.operator);
        const token = source.getTokenAfter(node.left, v => v.value === node.operator);
        const before = source.getTokenBefore(token);
        const after = source.getTokenAfter(token);
        if (source.getCommentsInside(node).some(v => v.range[0] >= before.range[1] && v.range[1] <= after.range[0])) {
            return;
        }
        for (const pair of [[before, token], [token, after]]) {
            const [left, right] = pair;
            const gap = source.text.slice(left.range[1], right.range[0]);
            // A slash touching a regular expression would start a line comment.
            if (left.value === '/' && source.getText(right).startsWith('/')) {
                continue;
            }
            if (/\S/.test(gap) || /[\r\n]/.test(gap)) {
                continue;
            }
            if (gap !== (tight ? '' : ' ')) {
                context.report({
                    loc: token.loc,
                    messageId: tight ? 'tight' : 'space',
                    fix: function (fixer) {
                        return fixer.replaceTextRange([left.range[1], right.range[0]], tight ? '' : ' ');
                    },
                });
            }
        }
    }
    return {BinaryExpression: check, LogicalExpression: check, AssignmentExpression: check};
}

module.exports = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: {tight: 'Write *, / and ** without surrounding spaces.', space: 'Use one space around this operator.'},
    },
    create: operator_spacing,
};
