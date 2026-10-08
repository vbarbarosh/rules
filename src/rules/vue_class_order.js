const category_of_class = require('../helpers/category_of_class');
const class_attribute_name_of = require('../helpers/class_attribute_name_of');
const classes_from_attribute = require('../helpers/classes_from_attribute');

function vue_class_order(context)
{
    const services = context.sourceCode.parserServices;
    const options = context.options[0] || {};
    const prefixes = options.app_prefixes || ['app-', 'vb-', 'np-'];
    if (!services.defineTemplateBodyVisitor) {
        return {};
    }
    return services.defineTemplateBodyVisitor({
        VAttribute: function (node) {
            if (!class_attribute_name_of(node)) {
                return;
            }
            const classes = classes_from_attribute(node);
            if (classes.unknown && (options.check_dynamic !== false)) {
                context.report({node, messageId: 'dynamic'});
            }
            for (const variant of classes.variants) {
                let previous = -1;
                let vertical = false;
                let line_height = false;
                for (const token of variant) {
                    const category = category_of_class(token.name, prefixes);
                    if (category === null) {
                        continue;
                    }
                    if ((category < previous) || (vertical && /^ph\d/.test(token.name)) || (line_height && /^f[sw]\d/.test(token.name))) {
                        context.report({node: token.node, messageId: 'order', data: {name: token.name}});
                        return;
                    }
                    previous = category;
                    vertical ||= /^pv\d/.test(token.name);
                    line_height ||= /^lh\d/.test(token.name);
                }
            }
        },
    });
}

module.exports = {
    meta: {
        type: 'layout',
        schema: [{type: 'object', properties: {app_prefixes: {type: 'array', items: {type: 'string'}}, check_dynamic: {type: 'boolean'}}, additionalProperties: false}],
        messages: {
            order: 'Class "{{name}}" is out of order: layout, spacing, sizing, decoration, typography, app classes, local classes last; ph before pv, fs and fw before lh.',
            dynamic: 'Cannot verify this dynamic class value. Use literal strings, arrays, object keys or conditional branches.',
        },
    },
    create: vue_class_order,
};
