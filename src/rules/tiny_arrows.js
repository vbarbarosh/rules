const is_error_callback = require('../helpers/is_error_callback');

function tiny_arrows(context)
{
    return {
        ArrowFunctionExpression: function (node) {
            if (is_options_method(node)) {
                context.report({node, messageId: 'method'});
                return;
            }
            if ((node.body.type === 'BlockStatement') && !is_noop(node, context.sourceCode)) {
                context.report({node, messageId: 'block'});
            }
            else if ((node.loc.start.line !== node.loc.end.line) || !['CallExpression', 'NewExpression', 'Property'].includes(node.parent.type)) {
                context.report({node, messageId: 'tiny'});
            }
            const last = node.params.at(-1);
            if ((last?.type === 'Identifier') && context.sourceCode.getDeclaredVariables(node).find(v => v.name === last.name)?.references.length === 0) {
                context.report({node: last, messageId: 'unused', data: {name: last.name}});
            }
            if ((node.params.length === 1) && !is_error_callback(node)) {
                const param = node.params[0];
                const expected = free_value_name(context.sourceCode.getScope(node).upper);
                if ((param.type === 'Identifier') && (param.name !== expected)) {
                    context.report({node: param, messageId: 'name', data: {expected}});
                }
                if (['ObjectPattern', 'ArrayPattern'].includes(param.type)) {
                    context.report({node: param, messageId: 'destructured', data: {expected}});
                }
            }
        },
    };
}

// `v`, unless it is already taken where the arrow stands; then `vv`, `vvv`.
function free_value_name(scope)
{
    let name = 'v';
    while (is_taken(scope, name)) {
        name += 'v';
    }
    return name;
}

function is_taken(scope, name)
{
    for (let s = scope; s; s = s.upper) {
        if (s.set.has(name)) {
            return true;
        }
    }
    return false;
}

// `() => {}` is a no-op, as `ignore` is; it is laid out as any tiny arrow.
function is_noop(node, source)
{
    return (node.body.body.length === 0) && (source.getCommentsInside(node.body).length === 0);
}

function is_options_method(node)
{
    const property = node.parent;
    const table = property?.parent;
    const option = table?.parent;
    if ((property?.type !== 'Property') || (property.value !== node) || (table?.type !== 'ObjectExpression') || (option?.type !== 'Property') || (option.value !== table)) {
        return false;
    }
    if (option.key.type === 'Identifier') {
        return !option.computed && (option.key.name === 'methods');
    }
    if (option.key.type === 'TemplateLiteral') {
        return (option.key.expressions.length === 0) && (option.key.quasis[0].value.cooked === 'methods');
    }
    return (option.key.type === 'Literal') && (option.key.value === 'methods');
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {
            method: 'Options-style methods use function expressions, even when they only return an expression.',
            block: 'An arrow with a {} body is not an arrow; write function (...) { ... } instead.',
            tiny: 'Use a function declaration/expression; arrows are only single-line expression callbacks.',
            name: 'Name this arrow parameter "{{expected}}".',
            unused: 'A parameter the arrow does not use is not declared: () => run(), not {{name}} => run().',
            destructured: 'Take the parameter whole as "{{expected}}" and read its fields: v => v.uid, not ({uid}) => uid.',
        },
    },
    create: tiny_arrows,
};
