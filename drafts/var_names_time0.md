```
+    $begin = microtime(true);
--->
$time0 = microtime(true);
```

- when you need to measure how long something runs, keep the start time in a variable named time0; the current time minus time0 is the elapsed time

# time0

The variable holding the start time of a measurement is always named `time0`.
The elapsed time is the current time minus `time0`.

```php
$time0 = microtime(true);
run_import($rows);
printf("import: %.3fs\n", microtime(true) - $time0);
```

```js
const time0 = Date.now();
await run_import(rows);
console.log(`import: ${Date.now() - time0}ms`);
```

- `begin`, `start` and `t0` do not exist.
