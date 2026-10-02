function error_name(context)
{
    // error at the top, error2 inside a catch, error3 inside two
    function check(node, anchor) {
        const depth = context.sourceCode.getAncestors(anchor).filter(v => v.type === 'CatchClause').length;
        const name = depth ? `error${depth + 1}` : 'error';
        if (node && (node.type !== 'Identifier' || node.name !== name)) {
            context.report({node, messageId: 'name', data: {name}});
        }
    }
    return {
        CatchClause: function (node) {
            check(node.param, node);
        },
        CallExpression: function (node) {
            const callee = node.callee;
            if (callee.type !== 'MemberExpression') {
                return;
            }
            const name = callee.computed ? callee.property.value : callee.property.name;
            const event = ['on', 'once', 'addListener', 'addEventListener'].includes(name) && node.arguments[0]?.value === 'error';
            const callback = name === 'catch' ? node.arguments[0] : event ? node.arguments[1] : null;
            if (callback && ['FunctionExpression', 'ArrowFunctionExpression'].includes(callback.type)) {
                check(callback.params[0], node);
            }
        },
    };
}

module.exports = {
    meta: {type: 'suggestion', schema: [], messages: {name: 'Name the caught error "{{name}}", or omit an unused catch binding.'}},
    create: error_name,
};
