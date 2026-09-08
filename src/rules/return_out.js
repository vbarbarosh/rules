function return_out(context)
{
    return {
        ReturnStatement: function (node) {
            if (node.argument?.type !== 'Identifier') {
                return;
            }
            const statements = node.parent.type === 'BlockStatement' ? node.parent.body : [];
            const previous = statements[statements.indexOf(node) - 1];
            if (previous?.type === 'VariableDeclaration' && previous.kind === 'const' && previous.declarations.length === 1) {
                const declaration = previous.declarations[0];
                const variable = context.sourceCode.getDeclaredVariables(previous)[0];
                if (declaration.id.name === node.argument.name && declaration.init
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
                    if (definition?.type === 'Variable' && ['ObjectExpression', 'ArrayExpression', 'NewExpression'].includes(init?.type)
                        && variable.scope.variableScope === context.sourceCode.getScope(node).variableScope) {
                        context.report({node: node.argument, messageId: 'name'});
                    }
                    return;
                }
                scope = scope.upper;
            }
        },
    };
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {
            name: 'Name the locally constructed return value "out".',
            direct: 'Return the expression directly instead of declaring a const only to return it.',
        },
    },
    create: return_out,
};
