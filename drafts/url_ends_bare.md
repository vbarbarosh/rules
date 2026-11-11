- a small rule for agents that write .md files: never put a full stop at
  the end of a sentence that ends with a URL
- that link is 100% broken: it can no longer be clicked
- no full stop: the sentence ends there, and the next one goes on as
  before, with a capital letter
- better still, the next sentence is a paragraph of its own

# A URL ends its sentence bare

A sentence in a Markdown file that ends with a bare URL ends there: no
full stop after the URL, nothing after it at all. A viewer that turns a
bare URL into a link may take the full stop into it, and the link then
opens a page that does not exist.

```
✗  See https://example.com/docs. Read it first.

✓  See https://example.com/docs Read it first.

✓  See https://example.com/docs

   Read it first.
```

- The URL is the last word of its sentence, with nothing after it.
- The next sentence starts as it always does, with a capital letter.
  Better still, it starts a paragraph of its own, as in the last example:
  the URL then ends its line too.
- A bare URL is one written out as it is. A link written `[name](url)`
  shows its name and keeps the URL inside its brackets: its sentence keeps
  its full stop, after the `)`.

This governs new text; existing files are not rewritten for it (CORE-01).
