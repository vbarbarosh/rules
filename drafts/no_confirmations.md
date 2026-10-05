- No constant confirmations. The user deletes something, cancels something:
  the app does not ask. "Are you sure you want to rename the file from A to
  B?" sounds like "are you an idiot?", every time.
- If the user wants to delete it, they want to delete it: it is deleted, and
  the user keeps working.
- If it was a mistake, the user can restore it: a deleted file goes to the
  trash; a rename or a change has an undo, a short history kept for a while.
- A confirmation only in special, emergency cases, and then not a plain
  modal but a more deliberate workflow: a confirmation sent by email, or
  something like it.
- A constant modal is clicked through on autopilot; one day you make the
  mistake anyway. It does not help; it is a bad experience.
- A good experience: the app says "fine, done"; and if you did it by
  accident, "fine, let's restore it".
- The rule is "the user is not an idiot", put politely. I may make a mistake
  once a year, and then I remember it for life. `rm -rf` in the terminal does
  not ask either: you typed it, so you know what you are doing; you are
  responsible, aware, smart.

# Trust the user

The user means what they do. The app does what they asked, right away, and
makes it easy to take back. It does not ask "Are you sure?" first.

The terminal has always worked this way: `rm -rf` does not ask whether you
really want it. You typed it, so you meant it. An app can do one better and
keep the way back open: it trusts the user like the terminal does, and still
lets them undo.

## Why

A confirmation that comes every time stops being read. After the third
"Are you sure you want to delete this?", the hand clicks OK before the eyes
reach the question. So the dialog costs a click and an interruption on every
action, and it still fails on the one action that was a mistake: that one is
clicked through like all the others. It also talks down to the user, doubting
every decision they make.

Undo protects against the mistake after the user has seen it, which is when
they notice it. It costs nothing on all the other actions.

## The rule

1. **The action happens at once.** Delete, rename, move, cancel, clear: the
   app does it without a confirmation dialog, and the user keeps working.
2. **Every such action can be taken back.**
   - A deleted thing goes to a trash, and can be restored from there.
   - A rename, an edit or a move has an Undo, backed by a short history kept
     for a while.
   - The way back is at hand right after the action, for example a
     "Deleted · Undo" notice where it happened, so a mistake can be undone
     without looking for it.
3. **A confirmation is for the exceptional case only.** That means an action
   that cannot be undone and costs a lot when wrong, such as closing an
   account or erasing data for good. Even there, it is not the everyday
   OK/Cancel modal. It is a deliberate step that cannot be clicked through on
   autopilot: typing the name of what goes, or a confirmation link sent by
   email.

An app that needs a confirmation on an everyday action is missing its undo.
The fix is the undo, not the dialog.
