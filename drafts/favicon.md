- a project has a cover image in two versions, light and dark
- next to it: a project must also have a favicon, maybe in several
  variants: the standard small one first, then a bigger icon, and the
  other standard variants of a favicon

# Favicon

A project has a favicon: the small picture a browser shows in its tab, its
bookmarks and its history, and a phone on its home screen. It is drawn
once and comes in the standard sizes, each where a browser or a phone
looks for one.

![One drawing in five files, smallest to biggest: favicon.ico at 16, 32 and 48 pixels for older tabs, icon.svg at any size for every tab, apple-touch-icon.png at 180 for the iPhone home screen, icon-192.png for the Android home screen, icon-512.png for the install](../img/rules/proj_favicon_sizes.svg)

## The files (PROJ-31)

| File | Size | Where it shows |
|------|------|----------------|
| `favicon.ico` | 16, 32 and 48 in one file | the tab of an older browser; whatever asks for `/favicon.ico` on its own, a feed reader or a link preview |
| `icon.svg` | any | the tab of a modern browser, sharp at every zoom |
| `apple-touch-icon.png` | 180×180 | the home screen of an iPhone or an iPad |
| `icon-192.png` | 192×192 | the home screen of an Android phone |
| `icon-512.png` | 512×512 | installing the site as an app, and its splash screen |

`icon.svg` is the drawing; the other four are rendered from it, so all
five show the same picture. At 16 pixels the details of a big drawing
turn to mush: the drawing is a simple shape that still reads at that size.

## In the head

Every page links them:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

`sizes="32x32"` keeps a browser that draws SVG from taking the `.ico`
instead. The two big ones are listed in `manifest.webmanifest`:

```json
{
    "name": "rules",
    "icons": [
        {"src": "/icon-192.png", "type": "image/png", "sizes": "192x192"},
        {"src": "/icon-512.png", "type": "image/png", "sizes": "512x512"}
    ]
}
```

## Light and dark

A tab strip is light or dark, as the browser's theme is. The cover has a
version for each (PROJ-22); the favicon is one drawing that reads on both,
a shape on a background of its own. `icon.svg` may change its colours for
the dark in a query of its own:

```html
<style>
@media (prefers-color-scheme: dark) {
    .mark { fill: #f4f6ed; }
}
</style>
```

The `.ico` and the PNGs have no query: their drawing reads on both as it
is.

## Where they live

At the root of what the project's site or app serves: a browser asks for
`/favicon.ico` there, with no link at all. A site served under a path,
such as a GitHub Pages site under `/rules/`, gains nothing from its root:
the browser asks the domain's, not its own. It keeps the set in `img/`,
beside its cover, the manifest too, and every page links them relative to
itself: `img/icon.svg` from the top, `../img/icon.svg` from `docs/`. A
project with no site keeps the set in `img/` as well.

`apple-touch-icon.png` is the full square, with no corners cut: an iPhone
rounds them itself, and paints a transparent corner black.

This governs new work; an existing project is given its set as work of its
own (CORE-01).
