`render_*` constructs asset content, such as CSS, HTML or SVG, from state.
An asset can itself be a string; the distinction from `format_*` is what the
output is for. `format_*` returns text for a person to read.

```php
public function render_css(): string
{
    return "body { color: {$this->text_color}; }";
}
```

The CSS above is asset content for a browser, not a formatted human-facing
value. A formatted size or duration is `format_*`, even if it is computed
from an object's own state.

The prefix separates constructed content from stored attributes:
`$this->text_color` is stored; `$this->render_css()` derives content on each
call.

- recomputed per call — never cached, never stored
- may return `null` when not applicable
- may throw when the state makes the asset meaningless
- synchronous and pure: constructing content does not itself update the DOM,
  write a file or start a download

Producing a downloadable artifact — a zip, a csv, an xlsx — is `export_*`,
which may be async and side-effectful. Rendering its content and delivering
an artifact are separate operations.

Compare the two neighboring naming families:

| Family | Output purpose | Example |
|---|---|---|
| `format_*` | String a person reads | `format_bytes(1457664)` → `"1.4 MB"` |
| `render_*` | Constructed asset content | `$theme->render_css()` → CSS content |

See [format_xxx.md](format_xxx.md). Neither `to_json()` nor `render_json()`
is an established usage demonstrated by these examples; do not invent a
JSON case to decide the boundary between these families.
