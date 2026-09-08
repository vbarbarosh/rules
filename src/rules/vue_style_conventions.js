const vue_styles = require('../helpers/vue_styles');

function vue_style_conventions(context)
{
    const source = context.sourceCode;
    if (!source.parserServices.getDocumentFragment?.()) {
        return {};
    }
    // A standalone stylesheet is a file, not a block: its root may be
    // assembled from sections, each led by its own @import.
    const standalone = /\.(?:css|scss|sass)$/.test(context.physicalFilename);
    const prefixes = context.options[0]?.app_prefixes || ['app-', 'vb-', 'np-'];
    const mixin_name = prefixes[0] + 'transition';
    const mixin_alternatives = prefixes.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const include_regex = new RegExp('^(?:' + mixin_alternatives + ')transition(?:-fast|-debug)?\\s*\\(');
    const mixin_regex = new RegExp('^(?:' + mixin_alternatives + ')transition(?:-fast|-debug)?(?:\\s|\\(|$)');
    return {
        Program: function () {
            for (const block of vue_styles(source).blocks) {
                function report(node, messageId) {
                    const start = node.source.start;
                    const line = source.getLocFromIndex(block.offset).line + start.line - 1;
                    const column = start.line === 1 ? source.getLocFromIndex(block.offset).column + start.column - 1 : start.column - 1;
                    context.report({loc: {line, column}, messageId, data: {mixin: mixin_name}});
                }
                block.root.walk(function (node) {
                    if (node.type === 'atrule' && ['import', 'include'].includes(node.name)) {
                        const previous = node.parent.nodes.slice(0, node.parent.nodes.indexOf(node));
                        if (node.name === 'include' && node.parent.type === 'rule' && previous.some(v => v.type === 'decl' && !v.prop.startsWith('$'))) {
                            report(node, 'include');
                        }
                        if (node.name === 'import' && !(standalone && node.parent.type === 'root') && previous.some(v => v.type !== 'comment' && !(v.type === 'atrule' && ['charset', 'use', 'forward', 'import'].includes(v.name)))) {
                            report(node, 'import');
                        }
                        if (node.name === 'include' && include_regex.test(node.params)) {
                            if (/(?:\(|,)\s*['"]?all['"]?\s*(?:,|\))/.test(node.params)) {
                                report(node, 'all');
                            }
                        }
                    }
                    if (node.type === 'decl' && /^(?:-\w+-)?transition(?:-|$)/.test(node.prop)) {
                        let parent = node.parent;
                        let mixin = false;
                        while (parent) {
                            mixin ||= parent.type === 'atrule' && parent.name === 'mixin' && mixin_regex.test(parent.params);
                            parent = parent.parent;
                        }
                        if (!mixin) {
                            report(node, 'transition');
                        }
                    }
                });
            }
        },
    };
}

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [{type: 'object', properties: {app_prefixes: {type: 'array', items: {type: 'string'}}}, additionalProperties: false}],
        messages: {
            include: 'Inside a rule, @include goes first, ahead of the property declarations.',
            import: '@import goes first in its style block.',
            transition: 'Use @include {{mixin}}(...) instead of writing transition properties.',
            all: 'List exact transition properties; never all.',
        },
    },
    create: vue_style_conventions,
};
