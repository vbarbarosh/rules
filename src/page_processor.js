const page_blocks_parse = require('./helpers/page_blocks_parse');

const blocks_by_filename = new Map();

function page_preprocess(text, filename)
{
    const blocks = page_blocks_parse(text);
    blocks_by_filename.set(filename, blocks);
    return blocks.map((v, i) => ({text: v.text, filename: `${i}.${v.ext}`}));
}

function page_postprocess(messages, filename)
{
    const blocks = blocks_by_filename.get(filename) || [];
    blocks_by_filename.delete(filename);
    const out = [];
    for (const [i, list] of messages.entries()) {
        const block = blocks[i];
        for (const message of list) {
            out.push({
                ...message,
                line: message.line + block.line - 1,
                column: page_column(block, message.line, message.column),
                endLine: message.endLine ? message.endLine + block.line - 1 : undefined,
                endColumn: message.endLine ? page_column(block, message.endLine, message.endColumn) : undefined,
                fix: undefined,
                suggestions: undefined,
            });
        }
    }
    return out;
}

// The first line of a block shares the page's line with its opening tag;
// every later line lost the block's base indent.
function page_column(block, line, column)
{
    return (line === 1) ? block.column + column - 1 : column + block.indent;
}

const page_processor = {preprocess: page_preprocess, postprocess: page_postprocess, supportsAutofix: false};

module.exports = page_processor;
