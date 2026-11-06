const script_types = ['', 'module', 'text/javascript', 'application/javascript', 'text/ecmascript', 'application/ecmascript'];

// The inline scripts and styles of an HTML page, each cut out with its
// place in the page: the line and column where it starts, and the base
// indent taken off every line after the first.
function page_blocks_parse(text)
{
    // A commented-out element is not code; the mask keeps every offset.
    const masked = text.replace(/<!--[\s\S]*?-->/g, v => v.replace(/[^\n]/g, ' '));
    const out = [];
    for (const match of masked.matchAll(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi)) {
        const name = match[1].toLowerCase();
        const attributes = match[2];
        const type = (attributes.match(/\btype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/i) || []).slice(1).find(v => v !== undefined) ?? '';
        if ((name === 'script') && (/\bsrc\s*=/i.test(attributes) || !script_types.includes(type.trim().toLowerCase()))) {
            continue;
        }
        if ((name === 'style') && !['', 'text/css'].includes(type.trim().toLowerCase())) {
            continue;
        }
        const offset = match.index + match[1].length + attributes.length + 2;
        const lines = text.slice(offset, offset + match[3].length).split('\n');
        const before = text.slice(0, offset);
        const indents = lines.slice(1).filter(v => v.trim()).map(v => v.match(/^[ \t]*/)[0].length);
        const indent = indents.length ? Math.min(...indents) : 0;
        out.push({
            ext: (name === 'script') ? 'js' : 'css',
            text: [lines[0], ...lines.slice(1).map(v => (v.trim() ? v.slice(indent) : ''))].join('\n'),
            line: before.split('\n').length,
            column: offset - before.lastIndexOf('\n'),
            indent,
        });
    }
    return out;
}

module.exports = page_blocks_parse;
