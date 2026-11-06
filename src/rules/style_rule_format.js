const vue_styles_parse = require('../helpers/vue_styles_parse');

// CSS-12 and CSS-13: one selector a line in a selector list, and one
// blank line between rules, in every style block of a file.
function style_rule_format(context)
{
    const source = context.sourceCode;
    if (!source.parserServices.getDocumentFragment?.()) {
        return {};
    }
    return {
        Program: function () {
            for (const block of vue_styles_parse(source).blocks) {
                function report(node, messageId, data) {
                    const position = node.source.start;
                    const start = source.getLocFromIndex(block.offset);
                    const line = start.line + position.line - 1;
                    const column = (position.line === 1) ? start.column + position.column - 1 : position.column - 1;
                    context.report({loc: {line, column}, messageId, data});
                }
                for (const container of [block.root, ...containers_of(block.root)]) {
                    if (keyframes_inside(container)) {
                        continue;
                    }
                    for (const [i, node] of container.nodes.entries()) {
                        if ((node.type === 'rule') && !selector_has_one_per_line(selector_text_of(block, node))) {
                            report(node, 'selectors');
                        }
                        const prev = container.nodes[i - 1];
                        if (!prev || !block_is(prev) || !['rule', 'atrule', 'comment'].includes(node.type) || ((node.type === 'atrule') && (node.name === 'else'))) {
                            continue;
                        }
                        const blank = Math.max(0, node.source.start.line - prev.source.end.line - 1);
                        if (blank !== 1) {
                            report(node, 'blank', {count: blank ? String(blank) : 'none'});
                        }
                    }
                }
            }
        },
    };
}

function containers_of(root)
{
    const out = [];
    root.walk(function (node) {
        if (node.nodes) {
            out.push(node);
        }
    });
    return out;
}

// Keyframe steps are not selectors: `0%, 100%` stays on one line.
function keyframes_inside(node)
{
    let parent = node;
    while (parent) {
        if ((parent.type === 'atrule') && /^(?:-\w+-)?keyframes$/.test(parent.name)) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}

function block_is(node)
{
    return (node.type === 'rule') || ((node.type === 'atrule') && Boolean(node.nodes));
}

// Indented Sass normalizes a selector list to one line, so its text is read
// from the source: the lines up to the first that does not end in a comma.
function selector_text_of(block, rule)
{
    if (block.lang !== 'sass') {
        return rule.raws.selector?.raw ?? rule.selector;
    }
    const lines = [];
    for (const line of block.text.slice(rule.source.start.offset).split('\n')) {
        lines.push(line);
        if (!line.trimEnd().endsWith(',')) {
            break;
        }
    }
    return lines.join('\n');
}

// Every comma between selectors closes its line; none starts one. Commas
// inside parentheses, brackets, interpolation and strings do not count.
function selector_has_one_per_line(selector)
{
    let depth = 0;
    let quote = null;
    for (let i = 0, end = selector.length; i < end; ++i) {
        const c = selector[i];
        if (quote) {
            if (c === '\\') {
                ++i;
            }
            else if (c === quote) {
                quote = null;
            }
            continue;
        }
        if ((c === '"') || (c === '\'')) {
            quote = c;
        }
        else if ('([{'.includes(c)) {
            ++depth;
        }
        else if (')]}'.includes(c)) {
            --depth;
        }
        else if ((c === ',') && (depth === 0)) {
            if (!/^[ \t]*\r?\n/.test(selector.slice(i + 1)) || /\n[ \t]*$/.test(selector.slice(0, i))) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    meta: {
        type: 'layout',
        schema: [],
        messages: {
            selectors: 'Put each selector of a list on its own line, the comma closing the line.',
            blank: 'Leave one blank line between rules, not {{count}}.',
        },
    },
    create: style_rule_format,
};
