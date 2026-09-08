const path = require('node:path');

function style_preprocess(text, filename)
{
    const lang = path.extname(filename).slice(1);
    return ['<template />\n<style lang="' + lang + '">\n' + text + '\n</style>'];
}

function style_postprocess(messages)
{
    const out = [];
    for (const message of messages[0]) {
        out.push({
            ...message,
            line: Math.max(1, message.line - 2),
            endLine: message.endLine ? Math.max(1, message.endLine - 2) : undefined,
        });
    }
    return out;
}

module.exports = {preprocess: style_preprocess, postprocess: style_postprocess, supportsAutofix: false};
