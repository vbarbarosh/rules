function error_name(context)
{
    function check(node) {
        if (node && (node.type !== 'Identifier' || node.name !== 'error')) {
            context.report({node, messageId: 'name'});
        }
    }
    return {
        CatchClause: function (node) {
            check(node.param);
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
                check(callback.params[0]);
            }
        },
    };
}

module.exports = {
    meta: {type: 'suggestion', schema: [], messages: {name: 'Name the caught error "error", or omit an unused catch binding.'}},
    create: error_name,
};
