const category_of_class = require('../helpers/category_of_class');
const class_attribute_name_of = require('../helpers/class_attribute_name_of');
const classes_from_attribute = require('../helpers/classes_from_attribute');

function vue_layout_classes(context)
{
    const services = context.sourceCode.parserServices;
    const patterns = (context.options[0]?.layout_patterns || ['^(flex-(row|col)|[hv]split|grid)($|[-0-9])']).map(v => new RegExp(v));
    if (!services.defineTemplateBodyVisitor) {
        return {};
    }
    return services.defineTemplateBodyVisitor({
        VAttribute: function (node) {
            if (!class_attribute_name_of(node)) {
                return;
            }
            const classes = classes_from_attribute(node);
            const reported = new Set();
            function report(token, messageId) {
                const key = `${messageId}:${token.name}`;
                if (!reported.has(key)) {
                    context.report({node: token.node, messageId, data: {name: token.name}});
                    reported.add(key);
                }
            }
            for (const variant of classes.variants) {
                const layout = variant.some(v => patterns.some(vv => vv.test(v.name)));
                // An element is a grid or a flex container, never both.
                const grid = variant.find(v => /^grid(?:$|[-\d])/.test(v.name));
                const flex = variant.find(v => /^i?flex-/.test(v.name) && (category_of_class(v.name, []) === 1));
                if (grid && flex) {
                    report((variant.indexOf(grid) < variant.indexOf(flex)) ? flex : grid, 'grid_flex');
                }
                for (let i = 0, end = variant.length; i < end; ++i) {
                    const token = variant[i];
                    // gap closes the layout group: container first, then its
                    // flex modifiers, then gap — nothing else in between.
                    if (/^gap(?:[xyhv])?\d/.test(token.name)) {
                        const previous = variant[i - 1];
                        const after_layout = previous && (patterns.some(v => v.test(previous.name)) || (category_of_class(previous.name, []) === 1));
                        if (!after_layout || !variant.slice(0, i).some(v => patterns.some(vv => vv.test(v.name)))) {
                            report(token, 'gap');
                        }
                    }
                    if (layout && /^(mg|mi)\d/.test(token.name)) {
                        report(token, 'margin');
                    }
                    if (['fluid', 'grow', 'shrink', 'flex-fluid', 'flex-grow', 'flex-shrink'].includes(token.name)) {
                        let parent = node.parent.parent.parent;
                        while ((parent?.type === 'VElement') && (parent.name === 'template')) {
                            parent = parent.parent;
                        }
                        if (parent?.type !== 'VElement') {
                            continue;
                        }
                        const attributes = parent.startTag.attributes.filter(v => class_attribute_name_of(v) === 'class');
                        const names = attributes.flatMap(v => classes_from_attribute(v).tokens.map(vv => vv.name));
                        const parent_split = names.some(v => /^[hv]split(?:$|-)/.test(v));
                        const parent_flex = names.some(v => /^flex-(row|col)(?:$|-)/.test(v));
                        if ((parent_split && token.name.startsWith('flex-')) || (parent_flex && !token.name.startsWith('flex-'))) {
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
            grid_flex: 'Do not put grid* and flex* layout classes on one element; "{{name}}" is the second layout.',
        },
    },
    create: vue_layout_classes,
};
