// Utility families follow @vbarbarosh/smcss 0.10.0 (src/smcss/*.sass): one
// mixin per class name, numeric suffixes parsed by parser/smcss.sass and
// parser/eval-size.sass. Unknown classes return null and do not constrain the
// order; so do the x* resets ("usually before setters") and the item-flex
// classes, which the codebase places on either side of sizing.
const decoration = /^(?:black|gray|silver|white|red|green|blue|yellow|cyan|gradient|checkerboard|rainbow|border|dashed|br\d+p?|bs\d+|is\d+|cur-[a-z-]+|o\d+|outline|oa|oh|os|no-pointer-events|resize(?:-[hv])?|no-scrollbars|theme-[a-z]+|hflip|vflip|scale\d+|rot(?:ate)?\d+|no-user-select|fit-(?:contain|cover|fill|none|scale-down))$/;
const free = /^(?:x(?:bg|border(?:-[tlrbvh]{1,2})?|br|bs|button|d|f|c|fs|fw|ls|m[tlrbvh]?|o|outline|p[tlrbvh]?|resize|x)?|flex-(?:fluid|grow|shrink|noshrink|nogrow|static)|fluid|grow|shrink)$/;
const gap = /^gap(?:[xyhv])?\d+n?$/;
const layout = /^(?:i?flex-[a-z-]+|[hv]split(?:-[a-z0-9-]+)?|grid(?:$|[-\d]).*)$/;
const position = new RegExp('^(?:stat|rel|abs|fix|sticky|tlbr\\d*|[tlrb](?:\\d+[pnm%]?|[aiwh]|0)|(?:abs|fix|sticky)-[a-z-]+|db|di|dib|dt|dtc|fl|fr|cb|cl|cr|clearfix|floats|expand(?:-[\\d-]+)?)$');
const sizing = new RegExp('^(?:(?:min-|max-)?[wh](?:\\d+[pnm%]?|[aiwh]|0)?|min\\d+x\\d+|max\\d+x\\d+|bbox|cbox|z\\d+n?)$');
const spacing = new RegExp('^(?:[mp](?:[tlrbhv]|in|ax)?(?:\\d+[pnm%]?|[aiwh]|0)?|mg\\d+|mi\\d+|pg\\d+|pi\\d+)$');
const typography = /^(?:fs\d+|fw\d+|lh\d+|ls\d+|n|i|q|ii|nowrap|u|s|uc|lc|cc|[lrbcj]|vm|vt|vb|ellipsis|text-.+)$/;

function class_category(name, prefixes)
{
    if (name.startsWith('#-')) {
        return 100;
    }
    if (prefixes.some(v => name.startsWith(v))) {
        return 90;
    }
    if (free.test(name)) {
        return null;
    }
    if (gap.test(name)) {
        return 2;
    }
    if (layout.test(name)) {
        return 1;
    }
    if (position.test(name)) {
        return 0;
    }
    if (spacing.test(name)) {
        return 10;
    }
    if (sizing.test(name)) {
        return 20;
    }
    if (decoration.test(name)) {
        return 30;
    }
    if (typography.test(name)) {
        return 40;
    }
    return null;
}

module.exports = class_category;
