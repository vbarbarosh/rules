```js
assert_valid_username(username);
assert_valid_email(email);
assert_valid_password(password);
assert_confirmation_requested(user);
assert_email_sent(user);
```

- the approach in general, not PHP alone: in JavaScript too, functions like
  `assert_valid_username`, `assert_valid_email`, `assert_valid_password`,
  `assert_confirmation_requested`, `assert_email_sent`
- such asserts are placed in the code to show our intentions, our
  expectations: what we expect at this point
- an assert works so that either everything holds, or an exception

# Assert functions

An `assert_*` function states what the code expects at the place where it
is called. Either everything it checks holds, and it returns nothing, or it
throws. The approach is the same in every language.

```js
function sign_up(form)
{
    assert_valid_username(form.username);
    assert_valid_email(form.email);
    assert_valid_password(form.password);
    // the work, on values known to be valid
}
```

- Its name is the expectation: `assert_` and what must be true,
  `assert_valid_email`, `assert_email_sent`.
- It returns nothing. The call is a statement, never a condition: no `if`
  around it, no result to test. Read in a row, the asserts say what the code
  after them relies on.
- What it checks either holds or ends in an exception; there is no third
  way out, no `false`, no `null`. A guard that gives up quietly is another
  thing (FN-15), and so is a predicate that answers, `is_*`.
- `assert_*` is a verb-first family (NAME-18). In a PHP class the methods
  stand right after the constructor (FILE-27).

This governs new code; existing code is not rewritten for it (CORE-01).
