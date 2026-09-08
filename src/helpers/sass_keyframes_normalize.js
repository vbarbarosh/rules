function sass_keyframes_normalize(text)
{
    const lines = text.split('\n');
    let keyframes_indent = null;
    let frame_indent = null;
    for (let i = 0, end = lines.length; i < end; ++i) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
            continue;
        }
        const indent = line.match(/^\s*/)[0].length;
        if (keyframes_indent !== null && indent <= keyframes_indent) {
            keyframes_indent = null;
            frame_indent = null;
        }
        if (/^@(?:-\w+-)?keyframes\b/.test(trimmed)) {
            keyframes_indent = indent;
            frame_indent = null;
        }
        else if (keyframes_indent !== null) {
            frame_indent ??= indent;
            if (indent === frame_indent && /^(?:from|to|\d*\.?\d+%)(?:\s*,\s*(?:from|to|\d*\.?\d+%))*\s*$/.test(trimmed)) {
                // sass-parser currently treats percentages as ordinary selectors.
                // Frame selectors are excluded from class analysis; retain offsets.
                lines[i] = line.replace(/\d*\.?\d+%/g, function (value) {
                    return 'x'.repeat(value.length);
                });
            }
        }
    }
    return lines.join('\n');
}

module.exports = sass_keyframes_normalize;
