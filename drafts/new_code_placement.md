```php
    public function render_css()
    {
        return "@font-face {
  font-family: '{$this->family}';
  font-style: normal;
  font-weight: normal;
  font-display: swap;
  src: url(font.woff2) format('woff2'),
       url(font.woff) format('woff'),
       url(font.ttf) format('truetype');
}";
    }

    // Describes the font for the AI agent from its stored font.ttf and saves
    // it; throws when the font has no ttf or the model gives no answer
    public function describe(): void
    {
        $ttf_url = $this->remote_files['font.ttf']->url ?? null;
        if (!$ttf_url) {
            throw new Exception("Custom font {$this->pub_id} has no font.ttf to describe");
        }
        $this->descriptor = tempdir(function ($d) use ($ttf_url) {
            file_put_contents("$d/font.ttf", s3_get_contents($ttf_url));
            return font_descriptor("$d/font.ttf", $this->family);
        });
        $this->save();
    }

    public function render_human_status()
    {
        switch ($this->status) {
        case CustomFont::STATUS_EMPTY:
            return 'empty';
        case CustomFont::STATUS_STARTED:
            return 'started';
        case CustomFont::STATUS_COMPLETE:
            return 'complete';
        case CustomFont::STATUS_FAILED:
            return 'failed';
        default:
            throw new Exception("Invalid font status: {$this->pub_id}[{$this->status}]");
        }
    }
```

block with     public function describe(): void
was inserted by agent;

- there is a set of render functions, render_css, render_human_status and many more, and the agent put describe between them for no reason; that must not happen. Look at the surroundings, work out their rules even when nowhere written, and make the new edit not differ from what is around it. Here describe goes after the render functions, never between them

- explicit rules take priority for new code. Follow the surrounding code only where no explicit rule applies. Rules emerge during the work; introducing one does not require rewriting code that predates it. That code can be refactored separately when there is an opportunity.

# New code takes its place from its surroundings

Before inserting code, read the code around the place it goes: which
functions stand together, in what order, with what comments and spacing.
Follow explicit rules first (CORE-01). Where no explicit rule applies,
continue the surrounding order and style: an order nobody wrote down is
still an order (CORE-02).

This governs new code. Existing code may predate the current rules;
introducing a rule does not require rewriting or reorganizing it.
Refactoring that code is separate work for a suitable opportunity.

A run of functions of one family — `render_*`, `format_*`, `click_*` —
stays unbroken. A new function of the family joins the run. A function of
another family goes outside it, never between two of its members.

```php
public function render_css()
{
}

public function render_human_status()
{
}

// Describes the font for the AI agent from its stored font.ttf and saves it
public function describe(): void
{
}
```

- `describe()` between `render_css()` and `render_human_status()` splits
  the run; it goes after it.
