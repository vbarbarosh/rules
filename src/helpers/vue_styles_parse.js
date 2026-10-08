const postcss = require('postcss');
const sass = require('sass-parser');
const sass_keyframes_normalize = require('./sass_keyframes_normalize');
const scss = require('postcss-scss');
const selector_parser = require('postcss-selector-parser');

const cache = new WeakMap();

function vue_styles_parse(source)
{
    if (cache.has(source)) {
        return cache.get(source);
    }
    const out = {blocks: [], classes: new Set(), errors: []};
    const document = source.parserServices.getDocumentFragment?.();
    for (const child of document?.children || []) {
        if ((child.type !== 'VElement') || (child.name !== 'style')) {
            continue;
        }
        const attributes = child.startTag.attributes;
        const lang = attributes.find(v => v.key.name === 'lang')?.value?.value || 'css';
        if (attributes.some(v => v.key.name === 'src') || !['css', 'scss', 'sass'].includes(lang) || !child.endTag) {
            out.errors.push({node: child.startTag, message: 'Cannot verify external, unclosed or unsupported styles. Use inline CSS, SCSS or Sass.'});
            continue;
        }
        const offset = child.startTag.range[1];
        const text = source.text.slice(offset, child.endTag.range[0]);
        // A same-length identifier keeps every diagnostic at its original offset.
        const normalized = text.replace(/\.#-/g, '.\uE000-');
        try {
            const root = (lang === 'css') ? postcss.parse(normalized)
                : (lang === 'scss') ? scss.parse(normalized)
                    : sass.sass.parse(sass_keyframes_normalize(normalized));
            const block = {root, offset, element: child};
            out.blocks.push(block);
            root.walkRules(function (rule) {
                let parent = rule.parent;
                while (parent) {
                    if ((parent.type === 'atrule') && /^(?:-\w+-)?keyframes$|^(?:mixin|function)$/.test(parent.name)) {
                        return;
                    }
                    parent = parent.parent;
                }
                if (!rule_has_styles(rule)) {
                    return;
                }
                const processor = selector_parser(function (selectors) {
                    selectors.walkClasses(function (node) {
                        let parent = node.parent;
                        while (parent) {
                            if ((parent.type === 'pseudo') && (parent.value === ':not')) {
                                return;
                            }
                            parent = parent.parent;
                        }
                        if (node.value.startsWith('\uE000-')) {
                            out.classes.add(`#-${node.value.slice(2)}`);
                        }
                    });
                });
                for (const selector of selectors_resolve(rule)) {
                    processor.processSync(selector);
                }
            });
        }
        catch (error) {
            out.errors.push({node: child.startTag, message: `Cannot verify style selectors: ${(error.reason || error.message).split('\n')[0]}`});
        }
    }
    cache.set(source, out);
    return out;
}

function rule_has_styles(rule)
{
    for (const node of rule.nodes || []) {
        if (((node.type === 'decl') && !node.prop.startsWith('$')) || ((node.type === 'atrule') && ['include', 'extend'].includes(node.name))) {
            return true;
        }
        if (node.nodes && (node.type !== 'rule') && rule_has_styles(node)) {
            return true;
        }
    }
    return false;
}

function selectors_resolve(rule)
{
    if (rule.selector.includes('#{')) {
        throw new Error('Sass selector interpolation requires build-time evaluation.');
    }
    let parent = rule.parent;
    while (parent && (parent.type !== 'rule')) {
        parent = parent.parent;
    }
    const children = selector_parser().astSync(rule.selector).nodes;
    if (!parent) {
        return children.map(v => v.toString());
    }
    const out = [];
    for (const parent_selector of selectors_resolve(parent)) {
        for (const child of children) {
            const copy = child.clone();
            let nested = false;
            copy.walkNesting(function (node) {
                nested = true;
                const prefix = selector_parser().astSync(parent_selector).nodes[0];
                node.replaceWith(...prefix.nodes.map(v => v.clone()));
            });
            out.push(nested ? copy.toString() : `${parent_selector} ${copy.toString()}`);
            if (out.length > 256) {
                throw new Error('Selector nesting expands beyond 256 combinations.');
            }
        }
    }
    return out;
}

module.exports = vue_styles_parse;
