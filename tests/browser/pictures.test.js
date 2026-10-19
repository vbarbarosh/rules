const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/pictures.test.js
// Every picture in img/, drawn in three fonts the docs may meet: no text past an edge or a box's
// border, under a later box, on an arrow or on other text; no arrow end that touches nothing;
// a curved arrow meets its target square on, so its head points straight in; every url(#id),
// light and dark, names an element. A label on a line sits on its own pill drawn after the
// line; a legend sample or an axis end is marked data-legend or data-free.
const root_dir = path.join(__dirname, '../..');
const FONTS_LIST = [
    {sans: 'Ubuntu', mono: 'Ubuntu Mono'},
    {sans: 'Noto Sans', mono: 'Noto Sans Mono'},
    {sans: 'Liberation Sans', mono: 'Liberation Mono'},
];
const img_files = fs.readdirSync(path.join(root_dir, 'img'), {recursive: true});
const svg_files = img_files.filter(v => v.endsWith('.svg') && !v.endsWith('-dark.svg') && v.includes(path.sep)).sort();
let browser;

test.before(async function () {
    browser = await chromium.launch({executablePath: chromium.executablePath()});
});

test.after(async function () {
    await browser?.close();
});

for (const file of svg_files) {
    test(`img/${file}: text inside its boxes, clear of arrows, every arrow attached`, async function () {
        const page = await browser.newPage();
        try {
            const svg = fs.readFileSync(path.join(root_dir, 'img', file), 'utf8');
            for (const fonts of FONTS_LIST) {
                const css = `text{font-family:'${fonts.sans}'!important} text[font-family*=mono]{font-family:'${fonts.mono}'!important}`;
                await page.setContent(`<!doctype html><style>body{margin:0}${css}</style>${svg}`);
                await page.evaluate(() => document.fonts.ready);
                assert.deepEqual(await page.evaluate(find_faults), [], fonts.sans);
            }
        }
        finally {
            await page.close();
        }
    });
    test(`img/${file}: the dark picture is the light one in other colours`, function () {
        assert.equal(strip_colours(file.replace(/\.svg$/, '-dark.svg')), strip_colours(file));
    });
    // An id taken for a colour changes case with it, and an arrow loses its head
    test(`img/${file}: every url(#id), light and dark, names an element`, function () {
        for (const name of [file, file.replace(/\.svg$/, '-dark.svg')]) {
            const svg = fs.readFileSync(path.join(root_dir, 'img', name), 'utf8');
            const ids = new Set(Array.from(svg.matchAll(/\bid="([^"]+)"/g), v => v[1]));
            assert.deepEqual(Array.from(svg.matchAll(/url\(#([^)]+)\)/g), v => v[1]).filter(v => !ids.has(v)), [], name);
        }
    });
}

function strip_colours(file)
{
    return fs.readFileSync(path.join(root_dir, 'img', file), 'utf8').replace(/#[0-9a-fA-F]{3,8}\b/g, '#');
}

// Runs in the page: the faults of the one picture on it
function find_faults()
{
    const svg = document.querySelector('svg');
    const view_box = svg.viewBox.baseVal;
    const all = Array.from(svg.querySelectorAll('*')).filter(v => !v.closest('defs,marker'));
    const order = new Map(all.map((element, index) => [element, index]));
    const texts = all.filter(v => (v.tagName === 'text') && v.textContent.trim());
    const rects = all.filter(v => (v.tagName === 'rect') && !((+v.getAttribute('width') >= view_box.width) && (+v.getAttribute('height') >= view_box.height)));
    const circles = all.filter(v => v.tagName === 'circle');
    const arrows = all.filter(v => ['line', 'path', 'polyline'].includes(v.tagName));
    const text_boxes = new Map(texts.map(v => [v, text_box_of(v)]));
    const out = [];

    for (const text of texts) {
        const points = text_points_of(text);
        if (points.some(v => (v.x < 8) || (v.y < 4) || (v.x > view_box.width - 8) || (v.y > view_box.height - 4))) {
            out.push(`past the picture's edge: ${label_of(text)}`);
        }
        for (const rect of rects) {
            const n = points.filter(v => is_inside(v, quad_of(rect, rect.getBBox()))).length;
            if (n === 0) {
                if (points.some(v => is_inside(v, quad_of(rect, rect.getBBox(), 6)))) {
                    out.push(`next to a box's border: ${label_of(text)}`);
                }
            }
            else if (n < points.length) {
                out.push(`across a box's border: ${label_of(text)}`);
            }
            else if ((order.get(rect) > order.get(text)) && is_filled(rect)) {
                out.push(`under a box: ${label_of(text)}`);
            }
        }
        // A paragraph (the column at x 48), in no box, keeps 20 units from every box
        const loose = !rects.some(v => points.every(vv => is_inside(vv, quad_of(v, v.getBBox()))));
        if ((text.getAttribute('x') === '48') && loose && rects.some(v => points.some(vv => is_inside(vv, quad_of(v, v.getBBox(), 20))))) {
            out.push(`a paragraph crowding a box: ${label_of(text)}`);
        }
        const own = smallest_box_of(points[Math.floor(points.length/2)]);
        if (own && !label_pill_of(text) && points.some(v => !is_inside(v, quad_of(own, own.getBBox(), -6)))) {
            out.push(`no room inside its box: ${label_of(text)}`);
        }
    }
    for (const [index, text] of texts.entries()) {
        const q = quad_of(text, text_boxes.get(text));
        for (const other of texts.slice(index + 1)) {
            if (text_points_of(other).some(v => is_inside(v, q))) {
                out.push(`on other text: ${label_of(text)} / ${label_of(other)}`);
            }
        }
    }
    for (const arrow of arrows) {
        const points = arrow_points_of(arrow);
        for (const text of texts) {
            const pill = label_pill_of(text);
            if (pill && (order.get(pill) > order.get(arrow))) {
                continue;
            }
            const q = quad_of(text, text_boxes.get(text), 6);
            if (points.some(v => is_inside(v, q))) {
                out.push(`on an arrow: ${label_of(text)}`);
            }
        }
        if (!arrow.getAttribute('marker-end') && !arrow.getAttribute('marker-start')) {
            continue;
        }
        const is_curved = (arrow.tagName === 'path') && /[CcQqSsTtAa]/.test(arrow.getAttribute('d'));
        for (const [which, end] of [['start', points[0]], ['end', points[60]]]) {
            if (is_curved && arrow.getAttribute(`marker-${which}`) && !is_along_axis(arrow, which)) {
                out.push(`a curved arrow's head off its axis: ${Math.round(end.x)},${Math.round(end.y)}`);
            }
        }
        if (arrow.closest('[data-legend],[data-free]')) {
            continue;
        }
        for (const end of [points[0], points[60]]) {
            if (!is_attached(end, arrow)) {
                out.push(`an arrow ending at nothing: ${Math.round(end.x)},${Math.round(end.y)}`);
            }
        }
    }
    return out;

    function root_point_from(element, x, y) {
        const m = svg.getCTM().inverse().multiply(element.getCTM());
        return {x: m.a*x + m.c*y + m.e, y: m.b*x + m.d*y + m.f};
    }

    function label_of(element) {
        return element.textContent.trim().slice(0, 40);
    }

    function quad_of(element, box, pad = 0) {
        return [
            root_point_from(element, box.x - pad, box.y - pad),
            root_point_from(element, box.x + box.width + pad, box.y - pad),
            root_point_from(element, box.x + box.width + pad, box.y + box.height + pad),
            root_point_from(element, box.x - pad, box.y + box.height + pad),
        ];
    }

    function is_inside(point, q) {
        let sign = 0;
        for (let i = 0; i < 4; ++i) {
            const a = q[i];
            const b = q[(i + 1) % 4];
            const cross = (b.x - a.x)*(point.y - a.y) - (b.y - a.y)*(point.x - a.x);
            if (cross === 0) {
                continue;
            }
            if (sign === 0) {
                sign = Math.sign(cross);
            }
            else if (Math.sign(cross) !== sign) {
                return false;
            }
        }
        return true;
    }

    function is_filled(element) {
        const fill = element.getAttribute('fill');
        return fill && (fill !== 'none') && (fill !== 'transparent') && (element.getAttribute('fill-opacity') !== '0');
    }

    // The glyphs' box: from the cap height to the descender, not the font's full line
    function text_box_of(text) {
        const box = text.getBBox();
        const font_size = parseFloat(text.getAttribute('font-size')) || 16;
        const y = +text.getAttribute('y') || box.y;
        return {x: box.x, y: Math.max(box.y, y - font_size*0.78), width: box.width, height: Math.min(box.height, font_size)};
    }

    function text_points_of(text) {
        const box = text_boxes.get(text);
        const out = [];
        for (let i = 0; i <= 8; ++i) {
            for (let j = 0; j <= 4; ++j) {
                out.push(root_point_from(text, box.x + box.width*i/8, box.y + box.height*j/4));
            }
        }
        return out;
    }

    // A label on a line: a filled rect with no border drawn right before the text
    function label_pill_of(text) {
        const prev = text.previousElementSibling;
        return (prev && (prev.tagName === 'rect') && !prev.getAttribute('stroke') && is_filled(prev)) ? prev : null;
    }

    function smallest_box_of(point) {
        const boxes = rects.filter(v => is_inside(point, quad_of(v, v.getBBox(), -6)));
        boxes.sort((a, b) => a.getBBox().width*a.getBBox().height - b.getBBox().width*b.getBBox().height);
        return boxes[0] ?? null;
    }

    // 61 points along the line, then its arrowheads as filled triangles
    function arrow_points_of(arrow) {
        const length = arrow.getTotalLength();
        const out = [];
        for (let i = 0; i <= 60; ++i) {
            const p = arrow.getPointAtLength(length*i/60);
            out.push(root_point_from(arrow, p.x, p.y));
        }
        const size = 8*(parseFloat(arrow.getAttribute('stroke-width')) || 1);
        if (arrow.getAttribute('marker-end')) {
            out.push(...head_points_of(out[60], out[59], size));
        }
        if (arrow.getAttribute('marker-start')) {
            out.push(...head_points_of(out[0], out[1], size));
        }
        return out;
    }

    function head_points_of(tip, from, size) {
        const d = Math.hypot(tip.x - from.x, tip.y - from.y) || 1;
        const ux = (tip.x - from.x)/d;
        const uy = (tip.y - from.y)/d;
        const out = [];
        for (let i = 0; i <= 6; ++i) {
            for (let j = -3; j <= 3; ++j) {
                const back = size*i/6;
                const half = size/2*(i/6)*j/3;
                out.push({x: tip.x - ux*back - uy*half, y: tip.y - uy*back + ux*half});
            }
        }
        return out;
    }

    // Within 8 units of a box's border, a circle, another line, or inside a text it points to
    function is_attached(end, arrow) {
        for (const rect of rects) {
            const q = quad_of(rect, rect.getBBox());
            for (let i = 0; i < 4; ++i) {
                if (segment_distance_of(end, q[i], q[(i + 1) % 4]) <= 8) {
                    return true;
                }
            }
        }
        for (const circle of circles) {
            const c = root_point_from(circle, +circle.getAttribute('cx'), +circle.getAttribute('cy'));
            if (Math.abs(Math.hypot(end.x - c.x, end.y - c.y) - +circle.getAttribute('r')) <= 8) {
                return true;
            }
        }
        for (const other of arrows.filter(v => v !== arrow)) {
            const length = other.getTotalLength();
            for (let i = 0; i <= 40; ++i) {
                const p = other.getPointAtLength(length*i/40);
                const q = root_point_from(other, p.x, p.y);
                if (Math.hypot(end.x - q.x, end.y - q.y) <= 8) {
                    return true;
                }
            }
        }
        return texts.some(v => is_inside(end, quad_of(v, text_boxes.get(v), 12)));
    }

    // A curved arrow meets its target square on: the control point next to a marked end stands
    // straight above, below or beside it (an arc's is sampled), and its last 12 units run along
    // that axis, under the head, within 1 unit
    function is_along_axis(arrow, which) {
        const length = arrow.getTotalLength();
        const end = end_and_control_of(arrow.getAttribute('d'), which);
        const control = end.control ?? along(1);
        const is_vertical = Math.abs(control.x - end.tip.x) <= 1;
        if (!is_vertical && (Math.abs(control.y - end.tip.y) > 1)) {
            return false;
        }
        for (let i = 1; i <= 12; ++i) {
            const p = along(i);
            if (Math.abs(is_vertical ? p.x - end.tip.x : p.y - end.tip.y) > 1) {
                return false;
            }
        }
        return true;

        function along(distance) {
            return arrow.getPointAtLength((which === 'end') ? length - distance : distance);
        }
    }

    // A path's first or last point and the control point next to it, in its own units; null
    // for an arc. A straight segment's control point is its other end.
    function end_and_control_of(d, which) {
        const tokens = d.match(/[a-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi);
        const segments = [];
        let point = {x: 0, y: 0};
        let first = point;
        let base = point;
        let command = '';
        let index = 0;
        while (index < tokens.length) {
            if (/[a-z]/i.test(tokens[index])) {
                command = tokens[index++];
            }
            const kind = command.toUpperCase();
            const previous = segments.at(-1);
            base = (command === kind) ? {x: 0, y: 0} : point;
            let controls = [];
            let to;
            switch (kind) {
            case 'M':
                point = at();
                first = point;
                command = (command === 'M') ? 'L' : 'l';
                continue;
            case 'Z':
                to = first;
                break;
            case 'L':
                to = at();
                break;
            case 'H':
                to = {x: base.x + next(), y: point.y};
                break;
            case 'V':
                to = {x: point.x, y: base.y + next()};
                break;
            case 'C':
                controls = [at(), at()];
                to = at();
                break;
            case 'S':
                controls = [['C', 'S'].includes(previous?.kind) ? mirror(previous) : point, at()];
                to = at();
                break;
            case 'Q':
                controls = [at()];
                to = at();
                break;
            case 'T':
                controls = [['Q', 'T'].includes(previous?.kind) ? mirror(previous) : point];
                to = at();
                break;
            case 'A':
                index += 5;
                controls = null;
                to = at();
                break;
            default:
                throw new Error(`unknown path command: ${command}`);
            }
            segments.push({kind, from: point, controls, to});
            point = to;
        }
        const segment = (which === 'end') ? segments.at(-1) : segments[0];
        const tip = (which === 'end') ? segment.to : segment.from;
        if (!segment.controls) {
            return {tip, control: null};
        }
        const candidates = [segment.from, ...segment.controls, segment.to];
        if (which === 'end') {
            candidates.reverse();
        }
        return {tip, control: candidates.find(v => (v.x !== tip.x) || (v.y !== tip.y)) ?? tip};

        function next() {
            return +tokens[index++];
        }

        function at() {
            return {x: base.x + next(), y: base.y + next()};
        }

        // The previous segment's last control point reflected through the current point
        function mirror(previous) {
            const control = previous.controls.at(-1);
            return {x: 2*point.x - control.x, y: 2*point.y - control.y};
        }
    }

    function segment_distance_of(point, a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const u = Math.max(0, Math.min(1, ((point.x - a.x)*dx + (point.y - a.y)*dy)/(dx*dx + dy*dy)));
        return Math.hypot(point.x - a.x - u*dx, point.y - a.y - u*dy);
    }
}
