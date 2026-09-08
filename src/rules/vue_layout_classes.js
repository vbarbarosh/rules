const class_attribute_name = require('../helpers/class_attribute_name');
const class_category = require('../helpers/class_category');
const class_values = require('../helpers/class_values');

function vue_layout_classes(context)
{
    const services = context.sourceCode.parserServices;
    const patterns = (context.options[0]?.layout_patterns || ['^(flex-(row|col)|[hv]split|grid)($|[-0-9])']).map(v => new RegExp(v));
    if (!services.defineTemplateBodyVisitor) {
        return {};
    }
    return services.defineTemplateBodyVisitor({
        VAttribute: function (node) {
            if (!class_attribute_name(node)) {
                return;
            }
            const classes = class_values(node);
            const reported = new Set();
            function report(token, messageId) {
                const key = messageId + ':' + token.name;
                if (!reported.has(key)) {
                    context.report({node: token.node, messageId, data: {name: token.name}});
                    reported.add(key);
                }
            }
            for (const tokens of classes.variants) {
                const layout = tokens.some(v => patterns.some(vv => vv.test(v.name)));
                for (let i = 0, end = tokens.length; i < end; ++i) {
                    const token = tokens[i];
                    // gap closes the layout group: container first, then its
                    // flex modifiers, then gap — nothing else in between.
                    if (/^gap(?:[xyhv])?\d/.test(token.name)) {
                        const previous = tokens[i - 1];
                        const after_layout = previous && (patterns.some(v => v.test(previous.name)) || class_category(previous.name, []) === 1);
                        if (!after_layout || !tokens.slice(0, i).some(v => patterns.some(vv => vv.test(v.name)))) {
                            report(token, 'gap');
                        }
                    }
                    if (layout && /^(mg|mi)\d/.test(token.name)) {
                        report(token, 'margin');
                    }
                    if (['fluid', 'grow', 'shrink', 'flex-fluid', 'flex-grow', 'flex-shrink'].includes(token.name)) {
                        let parent = node.parent.parent.parent;
                        while (parent?.type === 'VElement' && parent.name === 'template') {
                            parent = parent.parent;
                        }
                        if (parent?.type !== 'VElement') {
                            continue;
                        }
                        const attributes = parent.startTag.attributes.filter(v => class_attribute_name(v) === 'class');
                        const names = attributes.flatMap(v => class_values(v).tokens.map(vv => vv.name));
                        const split = names.some(v => /^[hv]split(?:$|-)/.test(v));
                        const flex = names.some(v => /^flex-(row|col)(?:$|-)/.test(v));
                        if (split && token.name.startsWith('flex-') || flex && !token.name.startsWith('flex-')) {
                            report(token, 'fluid');
                        }
                    }
                }
            }
        },
    });
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [{type: 'object', properties: {layout_patterns: {type: 'array', items: {type: 'string'}}}, additionalProperties: false}],
        messages: {
            gap: 'Place "{{name}}" right after the layout group: the flex/grid/split container and its flex-* modifiers.',
            margin: 'Use gap utilities to space flex/grid children; "{{name}}" belongs on block containers.',
            fluid: 'Use fluid/grow/shrink under hsplit/vsplit, and flex-fluid/flex-grow/flex-shrink under flex-row/flex-col.',
        },
    },
    create: vue_layout_classes,
};
