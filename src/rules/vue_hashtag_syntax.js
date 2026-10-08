const class_attribute_name_of = require('../helpers/class_attribute_name_of');

function vue_hashtag_syntax(context)
{
    const source = context.sourceCode;
    const services = source.parserServices;
    if (!services.getDocumentFragment?.()) {
        return {};
    }
    function check_script(node) {
        const raw = source.getText(node);
        if (raw.includes('#-') && raw.replace(/'\.#-/g, "'.LOCAL-").includes('#-')) {
            context.report({node, messageId: 'script'});
        }
    }
    const template_visitor = {
        VAttribute: function (node) {
            const raw = source.getText(node);
            if (raw.includes('#-') && (!class_attribute_name_of(node) || !/\b(class|card_class)="[^"]+?"/.test(raw))) {
                context.report({node, messageId: 'template'});
            }
        },
    };
    const script_visitor = {
        Literal: check_script,
        TemplateLiteral: check_script,
    };
    return services.defineTemplateBodyVisitor(template_visitor, script_visitor);
}

module.exports = {
    meta: {
        type: 'problem',
        schema: [],
        messages: {
            template: 'The hashtag loader does not rewrite this attribute. Use a supported class attribute with ="..." and no spaces around =.',
            script: 'The hashtag loader only rewrites single-quoted JS selectors starting with \'.#-. Keep local class values in the template.',
        },
    },
    create: vue_hashtag_syntax,
};
