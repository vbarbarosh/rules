Rules for naming files, functions, classes, methods, variables, etc.

<p align="center">
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/vbarbarosh/rules" alt="License"></a>
<a href="https://github.com/vbarbarosh/rules" rel="nofollow"><img src="https://img.shields.io/github/stars/vbarbarosh/rules" alt="stars"></a>
</p>

<p align="center">
<img src="img/logo-by-chat-gpt.png" style="max-height:400px;">
</p>

## Everything should look uniform

The generic advice is as follows: write new code in the same way the existing code is written.

If something isn't explicitly specified, it doesn't mean it's not important.
The naming of files, functions, CSS classes, formatting, and even the order of
attributes are all important and should follow the same systematic approach.
It's just not written down.

## Natural Pairs

- construct/destruct
- create/destroy
- open/close
- begin/end
- start/finish
- first/last
- next/previous
- get/put
- src/dest
- source/destination
- res/rej
- resolve/reject
- req/res
- request/response
- setup/teardown
- push/pull
- enabled/disabled

## Phrases

- [Happy Path](https://en.wikipedia.org/wiki/Happy_path) – the ideal scenario without errors
- [Edge Case](https://en.wikipedia.org/wiki/Edge_case)
- Transient Error – temporary issues that resolve quickly
- Intermittent Failure – a failure that happens sometimes, unpredictably
- Error Flood – scenario with 75% errors (?)
- Flaky Test - tests that produce inconsistent results, sometimes passing and sometimes failing, without any changes to the code or test being tested

### Intermittent failures

**Intermittent failures** are failures that happen **sometimes**, but **not always**, and usually **cannot be reproduced consistently**.

They appear to be random or unpredictable — sometimes the system works perfectly, and sometimes it fails — even though **you didn’t change anything**.

### In other words:

* Run #1 → works ✅
* Run #2 → fails ❌
* Run #3 → works again ✅

This inconsistency is what makes intermittent failures **annoying and hard to debug**.

#### Common Causes

Intermittent failures usually come from:

* **Timing issues / race conditions**
* **Network instability**
* **Concurrency issues** (threads/processes interfering)
* **Uninitialized values**
* **Hardware flakiness** (bad RAM, overheating, etc.)
* **Resource limits** hit sometimes (e.g., connection pool exhausted)

#### Why They Are Painful

Because:

* They don’t fail every time
* Logs often don’t show a clear cause
* “Works on my machine” happens a lot

#### Example

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

## Common Patterns

### value / label

For lists of selectable options (select, dropdown, radio, tabs, etc.) always use:

```js
{value: <internal>, label: <display>}
```

## Related

- [Naming is Hard: Let's Do Better - Kate Gregory - NDC TechTown 2024](https://youtu.be/aiy5TrU-Hwc?si=ns7DAQ2sXZcV7mj9&t=1179)
- https://github.com/WhiteHouse/api-standards
- https://spring.io/guides/gs/rest-service
- https://codeguide.co/
