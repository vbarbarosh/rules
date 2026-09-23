
- [Happy Path](https://en.wikipedia.org/wiki/Happy_path) – the ideal scenario without errors
- [Smoke Tests](https://en.wikipedia.org/wiki/Smoke_testing_(software)) – a small set of basic
  tests that verify whether the most critical parts of a system work at all.
  They answer one question: Does the application run without immediately
  breaking? If smoke tests fail, deeper testing is usually pointless. (Why "smoke"? From
  hardware: Power it on – if smoke comes out, something is seriously broken.)
- [Edge Case](https://en.wikipedia.org/wiki/Edge_case)
- Transient Error – temporary issues that resolve quickly
- Intermittent Failure – a failure that happens sometimes, unpredictably
- Error Flood – scenario with 75% errors (?)
- Flaky Test – tests that produce inconsistent results, sometimes passing and sometimes failing, without any changes to the code or test being tested
- Showstopper Bug – a defect so severe that it prevents the system from functioning or blocks further
  progress (development, testing, or release). Work cannot reasonably continue until it is fixed.

## Intermittent failures

A failure that happens sometimes, unpredictably, and usually cannot be
reproduced consistently. Run #1 works, run #2 fails, run #3 works again — even
though nothing was changed.

Common causes: timing issues and race conditions, network instability,
concurrency issues (threads or processes interfering), uninitialized values,
hardware flakiness (bad RAM, overheating), resource limits hit sometimes (a
connection pool exhausted).

Painful because it does not fail every time, logs often do not show a clear
cause, and "works on my machine" happens a lot.

```js
// Sometimes fetch() returns slow, causing timeout.
// Sometimes it's fast. So the test occasionally fails.
test("API returns data", async function () {
    const data = await fetch("/api/data");
    expect(data.ok).toBe(true);
});
```
