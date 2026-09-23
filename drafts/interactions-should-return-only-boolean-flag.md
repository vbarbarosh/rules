# Interactions must express intent, not expose control flow

- popovers/modals are responsible for executing actions instead of just asking
  about user intention

## Rule

Interactions (modals, popovers, etc.) must execute their own logic and return a
boolean commit flag.

- `true`  → changes were committed
- `false` → no-op (cancel or no changes)

## Canonical form

These are the best practices for [vue-modal](https://github.com/vbarbarosh/vue-modal).
Inside the modal, `modal.return(true)` after the change is committed and
`modal.return(false)` on cancel; at the call site, the promise resolves with
that flag:

```js
if (await modal_upload().promise()) {
    await blocking(this.refresh());
}
```
