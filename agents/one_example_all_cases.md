- A UI has several dropdowns; each loads its list from the backend every time
  it is opened, and each time shows a lag. I ask the agent: cache it. It
  caches that one request, and skips every other one built the same way. Not
  told, not done: one bolt tightened, while 100-500 components work the same
  way and should move to the cache too.
- The same in everything. Ask to move a button, and it moves exactly that,
  nothing more.
- I may be wrong, and the decision may turn out so-so. So I want an answer
  back first: this will lead to these consequences. Agents rarely look
  ahead like that.
- Unless it was said explicitly that a change concerns one particular case,
  take it in general; understand the idea. "I don't like these buttons, let's
  change their font" means all buttons, everywhere. A style, the way a
  component works, caching: the others must be looked at too.
- I cannot sit and point at every case. That is exactly the machine's work:
  given one concrete example, find all the similar cases in the project.
- Sometimes asking first is right: the project is big, do we really scan
  everything, or make only this local change? Asking to clarify is fine,
  normal.
- Not a rule maybe, a guide: something I give an agent once, "work like
  this", instead of fixing things point by point every time.

# One example, all cases

The author shows one case and means all cases like it. A request that points
at a dropdown, a button or a query names a kind of thing through one
instance of it. The agent's job is to find the rest of that kind, not to fix
the one instance and stop.

This page is meant to be handed to an agent as it is: "work like this".
It is one case of [Consequences first](consequences_first.md).

## Why

The author sees one case because that is the one in front of them. The
project holds the other hundred, built the same way, with the same flaw.
Fixing only the shown one leaves the project inconsistent: one dropdown is
fast and the rest lag, one button has the new font and the rest the old.
Then the author has to find each remaining case and point at it, one message
each. Finding every case of a pattern is the work a machine does better than
a person; leaving it to the author leaves the agent's work to them.

A change also has consequences the author may not have weighed. A cache
serves stale data after an edit; a moved button may now cover another one or
leave a gap. The author would rather hear that before the change than
discover it after.

## The rule

1. **An example names a class.** Unless the author says the change is for
   this one case only, it applies to every case like it. "Change the font of
   these buttons" means every button. "Cache this list" means every list
   loaded the same way.
2. **Find the like cases before changing anything.** Search the project for
   the same pattern: the same component, the same kind of request, the same
   style, the same idiom. The example is the way in, not the boundary.
3. **Change them all, or say which stay.** The change goes to every case
   found. A case left as it was is named in the reply, with the reason; none
   is left out silently.
4. **Ask when the sweep is large or the class unclear.** When the like cases
   are many across a big project, or the example could belong to more than
   one class, ask one question that carries what was found: "only this
   dropdown, or all 37 lists that load on open?". Asking to clarify scope is
   expected, not a failure.
5. **Say what the change will cause.** Before making it, name the
   consequences seen: what else moves, breaks or goes stale, and what it
   costs. When a consequence makes the change a poor one, say so first and
   offer the better way; the author decides.
