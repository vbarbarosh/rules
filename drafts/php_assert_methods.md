```php
public function __construct(...)
{
}

public function assert_*(...): void
{
}
```

- a rule for PHP: functions like `public function assert_*(...): void` stand
  right after the constructor, `public function __construct`

# assert methods follow the constructor

In a PHP class the methods named `assert_*` stand right after the
constructor, before every other method.

```php
class Post
{
    public function __construct(...)
    {
    }

    public function assert_owner(...): void
    {
    }

    public function assert_draft(...): void
    {
    }

    public function publish(...): void
    {
    }

    public function rename(...): void
    {
    }
}
```

- An assert method is `public function assert_*(...): void`: it returns
  nothing.
- Together they are one family, a run that stays unbroken (FILE-26): a new
  `assert_*` joins the run, and no other method stands between the
  constructor and the last of them.
- `publish()` above `assert_owner()`, or between the two assert methods, is
  out of place: it goes after the run.

This governs new code; existing classes are not reordered for it (CORE-01).
