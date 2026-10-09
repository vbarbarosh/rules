function return_out(context)
{
    return {
        // `out` is the value returned as `return out;`, and only that.
        VariableDeclarator: function (node) {
            if ((node.id.type !== 'Identifier') || (node.id.name !== 'out')) {
                return;
            }
            const variable = context.sourceCode.getDeclaredVariables(node)[0];
            const fn = variable.scope.variableScope.block;
            if (fn.type === 'Program') {
                return;
            }
            let returned = false;
            const misshaped = new Set();
            for (const reference of variable.references.filter(v => v.isRead())) {
                const statement = return_of(reference.identifier, fn);
                if (!statement) {
                    continue;
                }
                if (statement.argument === reference.identifier) {
                    returned = true;
                }
                else {
                    misshaped.add(statement);
                }
            }
            for (const statement of misshaped) {
                context.report({node: statement, messageId: 'shape'});
            }
            if (!returned && (misshaped.size === 0)) {
                context.report({node: node.id, messageId: 'unreturned'});
            }
        },
        ReturnStatement: function (node) {
            if (node.argument?.type !== 'Identifier') {
                return;
            }
            const statements = (node.parent.type === 'BlockStatement') ? node.parent.body : [];
            const previous = statements[statements.indexOf(node) - 1];
            if ((previous?.type === 'VariableDeclaration') && (previous.kind === 'const') && (previous.declarations.length === 1)) {
                const declaration = previous.declarations[0];
                const variable = context.sourceCode.getDeclaredVariables(previous)[0];
                if ((declaration.id.name === node.argument.name) && declaration.init
                    && variable.references.filter(v => v.isRead()).every(v => v.identifier === node.argument)) {
                    context.report({node, messageId: 'direct'});
                    return;
                }
            }
            if (node.argument.name === 'out') {
                return;
            }
            let scope = context.sourceCode.getScope(node);
            while (scope) {
                const variable = scope.set.get(node.argument.name);
                if (variable) {
                    const definition = variable.defs[0];
                    const init = definition?.node?.init;
                    if ((definition?.type === 'Variable') && ['ObjectExpression', 'ArrayExpression', 'NewExpression'].includes(init?.type)
                        && (variable.scope.variableScope === context.sourceCode.getScope(node).variableScope)) {
                        context.report({node: node.argument, messageId: 'name'});
                    }
                    return;
                }
                scope = scope.upper;
            }
        },
    };
}

// The return statement of fn that holds this identifier, if any.
function return_of(identifier, fn)
{
    for (let node = identifier.parent; node && (node !== fn); node = node.parent) {
        if (node.type === 'ReturnStatement') {
            return node;
        }
        if (/Function/.test(node.type)) {
            return null;
        }
    }
    return null;
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {
            name: 'Name the locally constructed return value "out".',
            direct: 'Return the expression directly instead of declaring a const only to return it.',
            shape: '"out" is returned only as `return out;`; a value returned transformed or on a condition is named by what it is.',
            unreturned: '"out" names the value the function returns as `return out;`; this one never is.',
        },
    },
    create: return_out,
};
