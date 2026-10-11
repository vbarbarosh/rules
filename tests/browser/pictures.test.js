const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {chromium} = require('playwright');

// Run with Playwright and Chromium installed: node --test tests/browser/pictures.test.js
// Every picture in img/, drawn in three fonts the docs may meet: no text past an edge or a box's
// border, under a later box, on an arrow or on other text; no arrow end that touches nothing.
// A label on a line sits on its own pill drawn after the line; a legend sample or an axis end
// is marked data-legend or data-free.
const root_dir = path.join(__dirname, '../..');
const fonts_list = [
    {sans: 'Ubuntu', mono: 'Ubuntu Mono'},
    {sans: 'Noto Sans', mono: 'Noto Sans Mono'},
    {sans: 'Liberation Sans', mono: 'Liberation Mono'},
];
const svg_files = fs.readdirSync(path.join(root_dir, 'img'), {recursive: true})
    .filter(v => v.endsWith('.svg') && !v.endsWith('-dark.svg') && v.includes(path.sep))
    .sort();
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
            for (const fonts of fonts_list) {
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
    const order = new Map(all.map((v, i) => [v, i]));
    const texts = all.filter(v => v.tagName === 'text' && v.textContent.trim());
    const rects = all.filter(v => v.tagName === 'rect' && !(+v.getAttribute('width') >= view_box.width && +v.getAttribute('height') >= view_box.height));
    const circles = all.filter(v => v.tagName === 'circle');
    const arrows = all.filter(v => ['line', 'path', 'polyline'].includes(v.tagName));
    const text_boxes = new Map(texts.map(v => [v, text_box(v)]));
    const out = [];

    for (const text of texts) {
        const points = text_points(text);
        if (points.some(v => v.x < 8 || v.y < 4 || v.x > view_box.width - 8 || v.y > view_box.height - 4)) {
            out.push(`past the picture's edge: ${label(text)}`);
        }
        for (const rect of rects) {
            const n = points.filter(v => inside(v, quad(rect, rect.getBBox()))).length;
            if (n === 0) {
                if (points.some(v => inside(v, quad(rect, rect.getBBox(), 6)))) {
                    out.push(`next to a box's border: ${label(text)}`);
                }
            }
            else if (n < points.length) {
                out.push(`across a box's border: ${label(text)}`);
            }
            else if (order.get(rect) > order.get(text) && is_filled(rect)) {
                out.push(`under a box: ${label(text)}`);
            }
        }
        // A paragraph (the column at x 48), in no box, keeps 20 units from every box
        const loose = !rects.some(v => points.every(vv => inside(vv, quad(v, v.getBBox()))));
        if (text.getAttribute('x') === '48' && loose && rects.some(v => points.some(vv => inside(vv, quad(v, v.getBBox(), 20))))) {
            out.push(`a paragraph crowding a box: ${label(text)}`);
        }
        const own = smallest_box(points[Math.floor(points.length/2)]);
        if (own && !label_pill(text) && points.some(v => !inside(v, quad(own, own.getBBox(), -6)))) {
            out.push(`no room inside its box: ${label(text)}`);
        }
    }
    for (const [i, text] of texts.entries()) {
        const q = quad(text, text_boxes.get(text));
        for (const other of texts.slice(i + 1)) {
            if (text_points(other).some(v => inside(v, q))) {
                out.push(`on other text: ${label(text)} / ${label(other)}`);
            }
        }
    }
    for (const arrow of arrows) {
        const points = arrow_points(arrow);
        for (const text of texts) {
            const pill = label_pill(text);
            if (pill && order.get(pill) > order.get(arrow)) {
                continue;
            }
            const q = quad(text, text_boxes.get(text), 6);
            if (points.some(v => inside(v, q))) {
                out.push(`on an arrow: ${label(text)}`);
            }
        }
        if (!arrow.getAttribute('marker-end') && !arrow.getAttribute('marker-start')) {
            continue;
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

    function to_root(element, x, y) {
        const m = svg.getCTM().inverse().multiply(element.getCTM());
        return {x: m.a*x + m.c*y + m.e, y: m.b*x + m.d*y + m.f};
    }

    function label(element) {
        return element.textContent.trim().slice(0, 40);
    }

    function quad(element, box, pad = 0) {
        return [
            to_root(element, box.x - pad, box.y - pad),
            to_root(element, box.x + box.width + pad, box.y - pad),
            to_root(element, box.x + box.width + pad, box.y + box.height + pad),
            to_root(element, box.x - pad, box.y + box.height + pad),
        ];
    }

    function inside(point, q) {
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
        return fill && fill !== 'none' && fill !== 'transparent' && element.getAttribute('fill-opacity') !== '0';
    }

    // The glyphs' box: from the cap height to the descender, not the font's full line
    function text_box(text) {
        const box = text.getBBox();
        const font_size = parseFloat(text.getAttribute('font-size')) || 16;
        const y = +text.getAttribute('y') || box.y;
        return {x: box.x, y: Math.max(box.y, y - font_size*0.78), width: box.width, height: Math.min(box.height, font_size)};
    }

    function text_points(text) {
        const box = text_boxes.get(text);
        const out = [];
        for (let i = 0; i <= 8; ++i) {
            for (let j = 0; j <= 4; ++j) {
                out.push(to_root(text, box.x + box.width*i/8, box.y + box.height*j/4));
            }
        }
        return out;
    }

    // A label on a line: a filled rect with no border drawn right before the text
    function label_pill(text) {
        const prev = text.previousElementSibling;
        return (prev && prev.tagName === 'rect' && !prev.getAttribute('stroke') && is_filled(prev)) ? prev : null;
    }

    function smallest_box(point) {
        const boxes = rects.filter(v => inside(point, quad(v, v.getBBox(), -6)));
        boxes.sort((a, b) => a.getBBox().width*a.getBBox().height - b.getBBox().width*b.getBBox().height);
        return boxes[0] ?? null;
    }

    // 61 points along the line, then its arrowheads as filled triangles
    function arrow_points(arrow) {
        const length = arrow.getTotalLength();
        const out = [];
        for (let k = 0; k <= 60; ++k) {
            const p = arrow.getPointAtLength(length*k/60);
            out.push(to_root(arrow, p.x, p.y));
        }
        const size = 8*(parseFloat(arrow.getAttribute('stroke-width')) || 1);
        if (arrow.getAttribute('marker-end')) {
            out.push(...head_points(out[60], out[59], size));
        }
        if (arrow.getAttribute('marker-start')) {
            out.push(...head_points(out[0], out[1], size));
        }
        return out;
    }

    function head_points(tip, from, size) {
        const d = Math.hypot(tip.x - from.x, tip.y - from.y) || 1;
        const ux = (tip.x - from.x)/d;
        const uy = (tip.y - from.y)/d;
        const out = [];
        for (let k = 0; k <= 6; ++k) {
            for (let w = -3; w <= 3; ++w) {
                const back = size*k/6;
                const half = size/2*(k/6)*w/3;
                out.push({x: tip.x - ux*back - uy*half, y: tip.y - uy*back + ux*half});
            }
        }
        return out;
    }

    // Within 8 units of a box's border, a circle, another line, or inside a text it points to
    function is_attached(end, arrow) {
        for (const rect of rects) {
            const q = quad(rect, rect.getBBox());
            for (let i = 0; i < 4; ++i) {
                if (segment_distance(end, q[i], q[(i + 1) % 4]) <= 8) {
                    return true;
                }
            }
        }
        for (const circle of circles) {
            const c = to_root(circle, +circle.getAttribute('cx'), +circle.getAttribute('cy'));
            if (Math.abs(Math.hypot(end.x - c.x, end.y - c.y) - +circle.getAttribute('r')) <= 8) {
                return true;
            }
        }
        for (const other of arrows.filter(v => v !== arrow)) {
            const length = other.getTotalLength();
            for (let k = 0; k <= 40; ++k) {
                const p = other.getPointAtLength(length*k/40);
                const q = to_root(other, p.x, p.y);
                if (Math.hypot(end.x - q.x, end.y - q.y) <= 8) {
                    return true;
                }
            }
        }
        return texts.some(v => inside(end, quad(v, text_boxes.get(v), 12)));
    }

    function segment_distance(point, a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const u = Math.max(0, Math.min(1, ((point.x - a.x)*dx + (point.y - a.y)*dy)/(dx*dx + dy*dy)));
        return Math.hypot(point.x - a.x - u*dx, point.y - a.y - u*dy);
    }
}
