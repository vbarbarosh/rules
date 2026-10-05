- Dynamic content: the user works with a document, reads it carefully, and
  something above is added, or an element above grows.
- What I am looking at, the component I work with, stays right where it is:
  the scrollbars and the scroll position adapt so the UI never jumps.
- Added above or below: the visible rectangle stays in place; it never jumps
  or twitches.
- An element above expanded not because I clicked it, but because the app
  decided to: the scroll position is corrected after it.
- It is in the tests: a test checks that dynamic content behaves exactly so.
- Illustrated with pictures, a GIF.

# Scroll anchoring

The reader is in the middle of a view, reading. The app adds a message above,
a summary at the top finishes and grows, or a list re-renders. What the reader
was looking at stays exactly where it was on the screen. The scroll position
takes up the difference, so nothing jumps, and the reader never has to scroll
back to find their place.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="scroll-anchoring-dark.gif">
  <img alt="a summary grows at the top; on the left the message being read drops, on the right it stays" src="scroll-anchoring.gif">
</picture>

The summary at the top grows. On the left, the browser alone lets Message 2,
the one being read, drop by 84 px. On the right it stays on the dashed line.
The demo is [scroll-anchoring.html](scroll-anchoring.html); the still frames
are `scroll-anchoring.png` and `scroll-anchoring-dark.png`.

## The rule

Content the app adds, removes or resizes on its own never moves what the
reader is looking at. That is the element on the middle line of the view: it
stays at the same screen position, to the pixel. This holds whether the change
is above it, at the top of the view or below it.

A change the reader makes is not covered: a block they click open may push
down what is below it.

## The browser is not enough

Browsers anchor scrolling on their own (`overflow-anchor: auto`, on by
default). It covers one case: an element changes in place, entirely above the
view. Measured in the demo, Chromium, Firefox and WebKit agree to the pixel,
and all three let the read element move in three cases:

| Change | Browser alone | Kept in place |
|---|---|---|
| a message added above the view | 0 px | 0 px |
| the summary grows above the view | 0 px | 0 px |
| a message added while the view is at the very top | 74 px | 0 px |
| the summary grows at the top of the view, partly visible | 84 px | 0 px |
| the summary grows while the view is at the very top | 84 px | 0 px |
| a re-render that grows the summary | 84 px | 0 px |

- **At the very top** (`scrollTop` 0) the browser does not anchor at all.
- **A growing element at the top of the view** becomes the browser's anchor
  itself. It keeps its own top in place and grows downward, over what is
  being read. This is the jump in Visual Notes, where the conversation's
  summary finishes while the reader is below it.
- **A re-render** replaces the elements, so the browser's anchor is gone.

## Keeping it in place

Every change the app makes on its own goes through one function. Before the
change, it notes the element on the middle line by its `data-uid` and that
element's screen position. After the change, it finds the element by the same
uid, because a re-render may have replaced the node, and scrolls by the
difference.

```js
// Returns keep(update): runs update() and moves the scroll position so
// the element on the middle line of the scroller stays where it was.
// update() may be async: with Vue it ends with `await this.$nextTick()`.
function scroll_keep(scroller)
{
    return async function (update) {
        const anchor0 = scroll_anchor_find(scroller);
        await update();
        if (!anchor0) {
            return;
        }
        const anchor = scroller.querySelector(`[data-uid="${anchor0.uid}"]`);
        if (anchor) {
            scroller.scrollTop += anchor.getBoundingClientRect().top - anchor0.top;
        }
    };
}

// The first element with a data-uid that reaches below the middle line.
function scroll_anchor_find(scroller)
{
    const rect = scroller.getBoundingClientRect();
    const middle = rect.top + rect.height/2;
    for (const element of scroller.querySelectorAll('[data-uid]')) {
        const element_rect = element.getBoundingClientRect();
        if (element_rect.bottom > middle) {
            return {uid: element.dataset.uid, top: element_rect.top};
        }
    }
    return null;
}
```

The scroll is set in the same task as the change, before the browser paints,
so the reader never sees the jump and its correction.

## The test

Every view with dynamic content has a test of this rule. The test scrolls the
view, notes the screen position of the element on the middle line, makes the
change, and asserts that the element moved 0 px. It covers each kind of change
the view has (added above, grown at the top of the view, re-rendered), both in
the middle of the view and at the very top.

One more check runs the same measurement on the browser alone and expects it
to move. Without that check, a test that measures the wrong thing would
pass too.

[scroll-anchoring.test.js](scroll-anchoring.test.js) is that test for the
demo. With the keeping turned off, four of its seven checks fail.

```
npm i --no-save playwright && npx playwright install chromium
node --test drafts/scroll-anchoring.test.js
```
