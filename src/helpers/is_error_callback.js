function is_error_callback(node)
{
    if (!['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type)) {
        return false;
    }
    const call = node.parent;
    if ((call?.type !== 'CallExpression') || (call.callee.type !== 'MemberExpression')) {
        return false;
    }
    const callee = call.callee;
    const name = callee.computed ? callee.property.value : callee.property.name;
    if (name === 'catch') {
        return call.arguments[0] === node;
    }
    if (name === 'then') {
        return call.arguments[1] === node;
    }
    return ['on', 'once', 'addListener', 'prependListener', 'prependOnceListener'].includes(name)
        && (call.arguments[0]?.value === 'error')
        && (call.arguments[1] === node);
}

module.exports = is_error_callback;
