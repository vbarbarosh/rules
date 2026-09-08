function tiny_arrows(context)
{
    return {
        ArrowFunctionExpression: function (node) {
            if (node.body.type === 'BlockStatement' || node.loc.start.line !== node.loc.end.line
                || !['CallExpression', 'NewExpression', 'Property'].includes(node.parent.type)) {
                context.report({node, messageId: 'tiny'});
            }
            if (node.params.length === 1 && node.params[0].type === 'Identifier') {
                const depth = context.sourceCode.getAncestors(node).filter(v => v.type === 'ArrowFunctionExpression').length;
                const error_handler = node.parent.callee?.type === 'MemberExpression'
                    && node.parent.callee.property.name === 'catch';
                const expected = error_handler ? 'error' : 'v'.repeat(depth + 1);
                if (node.params[0].name !== expected) {
                    context.report({node: node.params[0], messageId: 'name', data: {expected}});
                }
            }
        },
    };
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {tiny: 'Use a function declaration/expression; arrows are only single-line expression callbacks.', name: 'Name this arrow parameter "{{expected}}".'},
    },
    create: tiny_arrows,
};
