# Interactions must express intent, not expose control flow

## Rule

Interactions (modals, popovers, etc.) must execute their own logic and return a boolean commit flag.

- `true`  → changes were committed
- `false` → no-op (cancel or no changes)

---

## Canonical form

```js
if (await modal_upload().promise()) {
    await blocking(this.refresh());
}
```
