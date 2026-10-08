const class_attribute_name_of = require('../helpers/class_attribute_name_of');
const classes_from_attribute = require('../helpers/classes_from_attribute');
const vue_styles_parse = require('../helpers/vue_styles_parse');

function vue_local_class_style(context)
{
    const source = context.sourceCode;
    const services = source.parserServices;
    if (!services.getDocumentFragment?.()) {
        return {};
    }
    const styles = vue_styles_parse(source);
    let errors_reported = false;
    function check(name, node) {
        if (!name.startsWith('#-')) {
            return;
        }
        // Unverifiable styles matter only once a local class asks to be verified.
        if (styles.errors.length > 0) {
            if (!errors_reported) {
                errors_reported = true;
                for (const error of styles.errors) {
                    context.report({node: error.node, messageId: 'parse', data: {message: error.message}});
                }
            }
            return;
        }
        if (!styles.classes.has(name)) {
            context.report({node, messageId: 'missing', data: {name}});
        }
    }
    const template_visitor = {
        VAttribute: function (node) {
            if (class_attribute_name_of(node)) {
                const reported = new Set();
                for (const token of classes_from_attribute(node).tokens) {
                    if (!reported.has(token.name)) {
                        check(token.name, token.node);
                        reported.add(token.name);
                    }
                }
            }
        },
    };
    const script_visitor = {
        Literal: function (node) {
            if ((typeof node.value === 'string') && source.getText(node).startsWith("'.#-")) {
                for (const match of node.value.matchAll(/\.(#-[\w-]+)/g)) {
                    check(match[1], node);
                }
            }
        },
    };
    return services.defineTemplateBodyVisitor(template_visitor, script_visitor);
}

module.exports = {
    meta: {
        type: 'problem',
        schema: [],
        messages: {missing: 'Local class "{{name}}" has no nonempty selector in this component\'s style blocks.', parse: '{{message}}'},
    },
    create: vue_local_class_style,
};
