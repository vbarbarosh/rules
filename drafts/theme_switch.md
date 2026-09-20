- every new spa/ui should have a light/dark toggle, no exceptions
- exactly two states: light and dark; never System or Auto
- on a long page a second copy is docked in the sticky bar


# Theme switch

Every new UI — a SPA, an app screen, a report, a standalone HTML page — carries
a visible light/dark switch. No exceptions: a page that only follows
`prefers-color-scheme` has no switch, and does not count.

## Two states

The switch has exactly two states, **Light** and **Dark**. There is no System,
Auto or follow-the-OS option, not even as the default. The reader picks the
theme on the page; he does not inherit it.

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
