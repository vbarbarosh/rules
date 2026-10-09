- every new spa/ui should have a light/dark toggle, no exceptions
- exactly two states: light and dark; never System or Auto
- one button shows the current theme: sun for light, crescent for dark; click toggles directly
- reuse img/theme-sun.svg and img/theme-moon.svg everywhere; size and border may follow the interface
- on a long page a second copy is docked in the sticky bar


# Theme switch

Every new UI — a SPA, an app screen, a report, a standalone HTML page — carries
a visible light/dark switch. No exceptions: a page that only follows
`prefers-color-scheme` has no switch, and does not count.

## Two states

The switch has exactly two states, **Light** and **Dark**. There is no System,
Auto or follow-the-OS option, not even as the default. The reader picks the
theme on the page; he does not inherit it.

## One shared icon pair

One button shows the **current theme**: the sun in Light, the crescent in Dark.
Clicking it goes straight to the other theme. It opens no menu.

Use the same SVG paths everywhere: [sun](../img/theme-sun.svg) and
[crescent](../img/theme-moon.svg), taken from the
[Rebalancer theme switch](https://facebook.github.io/rebalancer/docs/intro/).
Do not substitute Unicode symbols, an emoji, another icon library or a newly
drawn moon. The button's size and border may follow its interface; the pair
and its meaning stay the same. In a page header it takes the look of the
icons beside it: the size of the GitHub icon and no frame
([page_header.md](page_header.md)). The icons use `currentColor`.

Use a native `button type="button"`. Hide its SVGs from assistive technology
with `aria-hidden="true"` and `focusable="false"`. Its accessible label names
the current theme and the action, for example “Light theme. Switch to dark
theme.” Update the label and every copy of the icon together. Enter and Space
activate the button normally.

The [scroll-anchoring demo](scroll-anchoring.html) contains a working example.
`bin/build` inlines the shared assets into generated pages and synchronizes
the marked copies in handwritten examples. This keeps their color and local
file previews working without duplicating an independent icon design.

## Mechanics

The light palette lives on bare `:root`; the dark one redefines the same tokens
under `:root[data-theme="dark"]`:

```css
:root {
    --color-bg: #FFFFFF;
    --color-text: #1B1F23;
}
:root[data-theme="dark"] {
    --color-bg: #15181C;
    --color-text: #E6E8EB;
}
```

The root element is always stamped with `data-theme="light"` or
`data-theme="dark"` — on load, before the first paint. The initial value comes
from `localStorage`; with nothing stored, `prefers-color-scheme` is read once,
as a starting point only. The choice is saved back to `localStorage`, and both
the read and the write sit in `try`/`catch`, since storage can be blocked.

```js
function theme_read()
{
    try {
        const out = localStorage.getItem('theme');
        if (out === 'light' || out === 'dark') {
            return out;
        }
    }
    catch (error) {
        console.warn(error);
    }
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function theme_write(theme)
{
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem('theme', theme);
    }
    catch (error) {
        console.warn(error);
    }
}
```

## Long pages

The switch stays reachable after the header scrolls away. A page with a sticky
bar docks a second copy of the switch at the far right of that bar — after any
count label, not before it. The docked copy is shown only while the header one
is off screen, and collapses to zero width otherwise.
