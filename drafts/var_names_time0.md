```
+    $begin = microtime(true);
--->
$time0 = microtime(true);
```

- when you need to measure how long something runs, keep the start time in a variable named time0; the current time minus time0 is the elapsed time
- outside elapsed-time measurement, use start/finish or begin/end where the corresponding pair is used; do not use start as an unpaired timestamp name

# time0

The variable holding the start time of a measurement is always named `time0`.
The elapsed time is the current time minus `time0`.

```php
$time0 = microtime(true);
run_import($rows);
printf("import: %s\n", format_duration(microtime(true) - $time0));
```

```js
const time0 = Date.now();
await run_import(rows);
console.log(`import: ${format_duration(Date.now() - time0)}`);
```

The subtraction gives a number, the measurement. What a person sees goes
through `format_duration` (FN-02), never `${Date.now() - time0}ms` at the
call site: a value that reads as "5 minutes" today reads as "240 minutes"
once the job grows, where "4h" was wanted. The helper picks the shape for
its context, `1h 23m 33s`, `2m 35s`, or a clock's `00:02:15`, and shows
hours only when there are hours; a project has one such helper per
context, and every call site shares it.

For an elapsed-time measurement, do not substitute `begin`, `start` or `t0`
for `time0`.

Outside this measurement role, `start` belongs with `finish`, and `begin`
with `end`. Use these names when the corresponding pair is actually used:

```js
const start = range.start;
const finish = range.finish;
```

This is not a ban on externally defined property names. A parser's
`node.source.start` and `node.source.end` remain its API.
