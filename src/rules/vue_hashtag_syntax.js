const class_attribute_name = require('../helpers/class_attribute_name');

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
    return services.defineTemplateBodyVisitor({
        VAttribute: function (node) {
            const raw = source.getText(node);
            if (raw.includes('#-') && (!class_attribute_name(node) || !/\b(class|card_class)="[^"]+?"/.test(raw))) {
                context.report({node, messageId: 'template'});
            }
        },
    }, {
        Literal: check_script,
        TemplateLiteral: check_script,
    });
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
