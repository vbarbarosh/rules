- Use optimistic updates when building user interfaces: the user acts, sees
  the change immediately, and keeps working without waiting for the backend.
- Keep the list received from the backend as an immutable snapshot. Do not
  change its objects to show a local action.
- Keep temporary local state separately. For example, marking an item as
  read records that item's read state locally and sends the update at once.
- After the backend confirms the update, read the data from the backend
  again and replace the snapshot with the newly received list.
- Clear the corresponding temporary state after the refreshed snapshot
  contains the confirmed change.
- If a request fails, it can be retried.

# Optimistic updates

The user marks an item as read. It looks read at once, and they move on. The
backend request happens alongside that action; it does not hold up the UI.

## Two separate states

Keep the last backend result as a snapshot: a list such as `items`. Treat the
list and its objects as immutable. A refresh replaces the snapshot; a local
click never edits it.

Keep pending changes separately, keyed by item identity, such as
`pending_read_by_uid`. Render the snapshot with these local changes applied
as an overlay. Rendering the overlay does not mutate the snapshot either.

## The sequence

1. Record the intended change in the local overlay and show it immediately.
2. Send the update to the backend at once, without blocking unrelated work.
3. After the update is acknowledged, reread the affected backend data using
   `refresh` or `refresh_<part>`.
4. Replace the snapshot with that fresh result.
5. Clear only the pending change that this result confirms. A later local
   action, or a pending change on another item, stays in the overlay.

For a read action:

```text
items                         last backend snapshot
pending_read_by_uid[uid]      local intended read state
visible read state            pending value, otherwise snapshot value

click Read → overlay → update → acknowledge → refresh → replace → clear
```

An update acknowledgement alone is not a refreshed snapshot. Keep the
overlay until the reread includes the confirmed value; this also handles a
backend whose read results take time to reflect a completed write.

## Overlapping actions

Associate each pending change with its operation or revision. A response for
an earlier action cannot remove a later overlay. An older refresh cannot
replace a newer snapshot.

For repeated changes to the same field, preserve the user's action order,
for example by serializing writes for that item or using backend revisions.
Different items can update independently. Undo is another intended change;
it must not be overwritten when an earlier action finishes.

## Failure and retry

Keep a failed change identifiable as unsynchronized and provide a retry
where it happened. The user can keep working; the UI does not silently claim
the backend saved a failed request.

Retry the step that failed. If the update succeeded but the reread failed,
retry the reread while keeping the overlay. If the update's outcome is
unknown, make retries safe: send the desired state, such as `read = true`,
or use an operation identity the backend can deduplicate. Repeating a toggle
or an increment blindly can apply it twice.

## Related rules

- [refresh.md](refresh.md): reread remote data and replace local snapshots.
- [no_confirmations.md](no_confirmations.md): act immediately and offer Undo.
- [scroll_anchoring.md](scroll_anchoring.md): a background refresh keeps the
  reader's place when content changes on its own.
