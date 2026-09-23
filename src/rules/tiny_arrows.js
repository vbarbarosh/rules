function tiny_arrows(context)
{
    return {
        ArrowFunctionExpression: function (node) {
            if (node.body.type === 'BlockStatement') {
                context.report({node, messageId: 'block'});
            }
            else if (node.loc.start.line !== node.loc.end.line || !['CallExpression', 'NewExpression', 'Property'].includes(node.parent.type)) {
                context.report({node, messageId: 'tiny'});
            }
            if (node.params.length === 1) {
                const param = node.params[0];
                const depth = context.sourceCode.getAncestors(node).filter(v => v.type === 'ArrowFunctionExpression').length;
                const error_handler = node.parent.callee?.type === 'MemberExpression'
                    && node.parent.callee.property.name === 'catch';
                const expected = error_handler ? 'error' : 'v'.repeat(depth + 1);
                if (param.type === 'Identifier' && param.name !== expected) {
                    context.report({node: param, messageId: 'name', data: {expected}});
                }
                if (['ObjectPattern', 'ArrayPattern'].includes(param.type)) {
                    context.report({node: param, messageId: 'destructured', data: {expected}});
                }
            }
        },
    };
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {
            block: 'An arrow with a {} body is not an arrow; write function (...) { ... } instead.',
            tiny: 'Use a function declaration/expression; arrows are only single-line expression callbacks.',
            name: 'Name this arrow parameter "{{expected}}".',
            destructured: 'Take the parameter whole as "{{expected}}" and read its fields: v => v.uid, not ({uid}) => uid.',
        },
    },
    create: tiny_arrows,
};
