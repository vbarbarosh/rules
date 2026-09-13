
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

**Intermittent failures** are failures that happen **sometimes**, but **not always**,
and usually **cannot be reproduced consistently**.

They appear to be random or unpredictable — sometimes the system works perfectly,
and sometimes it fails — even though **you didn't change anything**.

## In other words:

* Run #1 → works ✅
* Run #2 → fails ❌
* Run #3 → works again ✅

This inconsistency is what makes intermittent failures **annoying and hard to debug**.

### Common Causes

Intermittent failures usually come from:

* **Timing issues / race conditions**
* **Network instability**
* **Concurrency issues** (threads/processes interfering)
* **Uninitialized values**
* **Hardware flakiness** (bad RAM, overheating, etc.)
* **Resource limits** hit sometimes (e.g., connection pool exhausted)

### Why They Are Painful

Because:

* They don't fail every time
* Logs often don't show a clear cause
* "Works on my machine" happens a lot

### Example

```js
// Sometimes fetch() returns slow, causing timeout.
// Sometimes it's fast. So the test occasionally fails.
test("API returns data", async function () {
    const data = await fetch("/api/data");
    expect(data.ok).toBe(true);
});
```

If network is slow → test fails
If network is normal → test passes
→ **intermittent failure**
