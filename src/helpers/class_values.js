function class_values(attribute)
{
    if (!attribute.value) {
        return {variants: [[]], tokens: [], unknown: false};
    }
    if (!attribute.directive) {
        const tokens = tokens_from_string(attribute.value.value, attribute.value);
        return {variants: [tokens], tokens, unknown: false};
    }
    return expression_classes(attribute.value.expression);
}

function tokens_from_string(value, node)
{
    return value.split(/\s+/).filter(Boolean).map(v => ({name: v, node}));
}

function expression_classes(node)
{
    if (!node || node.type === 'Literal' && (node.value === null || node.value === false)) {
        return {variants: [[]], tokens: [], unknown: false};
    }
    if (node.type === 'Literal' && typeof node.value === 'string') {
        const tokens = tokens_from_string(node.value, node);
        return {variants: [tokens], tokens, unknown: false};
    }
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
        const tokens = tokens_from_string(node.quasis[0].value.cooked, node);
        return {variants: [tokens], tokens, unknown: false};
    }
    if (node.type === 'ConditionalExpression') {
        const left = expression_classes(node.consequent);
        const right = expression_classes(node.alternate);
        const variants = [...left.variants, ...right.variants];
        return {variants: variants.slice(0, 64), tokens: [...left.tokens, ...right.tokens], unknown: left.unknown || right.unknown || variants.length > 64};
    }
    if (node.type === 'LogicalExpression' && node.operator === '&&') {
        const right = expression_classes(node.right);
        return {variants: [[], ...right.variants].slice(0, 64), tokens: right.tokens, unknown: right.unknown || right.variants.length >= 64};
    }
    if (node.type === 'ArrayExpression' || node.type === 'ObjectExpression') {
        const out = {variants: [[]], tokens: [], unknown: false};
        const children = node.type === 'ArrayExpression' ? node.elements : node.properties;
        for (const child of children) {
            let value;
            if (node.type === 'ObjectExpression') {
                if (child.type !== 'Property' || child.computed && child.key.type !== 'Literal') {
                    out.unknown = true;
                    continue;
                }
                const key = child.key.type === 'Identifier' ? child.key.name : String(child.key.value);
                const tokens = tokens_from_string(key, child.key);
                value = {variants: [[], tokens], tokens, unknown: false};
                if (child.value.type === 'Literal') {
                    value.variants = child.value.value ? [tokens] : [[]];
                    value.tokens = child.value.value ? tokens : [];
                }
            }
            else {
                value = expression_classes(child);
            }
            const variants = [];
            for (const before of out.variants) {
                for (const after of value.variants) {
                    if (variants.length < 64) {
                        variants.push([...before, ...after]);
                    }
                    else {
                        out.unknown = true;
                    }
                }
            }
            out.variants = variants;
            out.tokens.push(...value.tokens);
            out.unknown ||= value.unknown;
        }
        return out;
    }
    return {variants: [[]], tokens: [], unknown: true};
}

module.exports = class_values;
