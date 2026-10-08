const is_error_callback = require('../helpers/is_error_callback');

function error_name(context)
{
    function check(node, anchor) {
        const arrow = anchor.type === 'ArrowFunctionExpression';
        const depth = (anchor.type === 'CatchClause') ? context.sourceCode.getAncestors(anchor).filter(v => v.type === 'CatchClause').length : 0;
        const name = arrow ? 'e' : depth ? `error${depth + 1}` : 'error';
        if (node && ((node.type !== 'Identifier') || (node.name !== name))) {
            context.report({node, messageId: 'name', data: {name}});
        }
    }
    return {
        CatchClause: function (node) {
            check(node.param, node);
        },
        ':matches(FunctionExpression, ArrowFunctionExpression)': function (node) {
            if (is_error_callback(node)) {
                check(node.params[0], node);
            }
        },
    };
}

module.exports = {
    meta: {type: 'suggestion', schema: [], messages: {name: 'Name the caught error "{{name}}", or omit an unused catch binding.'}},
    create: error_name,
};
