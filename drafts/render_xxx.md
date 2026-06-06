`render_*` derives a small value — usually a string — from the
object's own state. The Vue analogy: a computed property, written
as a method.

```php
public function render_dashboard_url(): string
{
    return url()->query('/dashboard/big-tables', ['folder' => $this->link->uid]);
}

public function render_name_email()
{
    if ($this->name) {
        return sprintf('%s <%s>', $this->name, $this->email);
    }
    return $this->email;
}

public function render_white_label_config(): ?array
{
    if (!$this->agent_email) {
        return null;
    }
    return ['app_header' => false, /* ... */];
}
```

The prefix separates derived values from stored attributes:
`$this->email` is a column; `$this->render_dashboard_url()` is
computed from state on every call.

- recomputed per call — never cached, never stored
- may return `null` when not applicable
- may throw when the state makes the value meaningless

Not for heavy artifacts. Producing something downloadable and
substantial — a zip, a csv, an xlsx — is `export_*`, which may be
async and side-effectful; `render_*` is never either.

`format_*` transforms an input; `render_*` derives from self:

```php
format_usd($cents)          // value in → string out
$user->render_name_email()  // state in → string out
```
