- Probably the first thing to do: give a task to a real developer. The first
  thing they do is build, at least in their head, an understanding of the
  consequences. What if this, what if that, and then like so.

# Consequences first

A developer given a task does not start typing. They first picture what the
change leads to: what if this, what if that. Only then do they start, and the
work follows from that picture. An agent works the same way.

## Why

An agent that starts at once changes exactly what was named and stops there.
Whatever follows from the change is left for the author to find: the other
cases built the same way, the states that break the layout, the decision that
needed asking. Thinking first takes a minute. Without it, each consequence
costs the author a message, found one at a time.

## The rule

1. **Before the first edit, ask "what if".** What else is built like this?
   What does the change touch, slow down, leave stale or break? What happens
   when the data is long, empty, absurd? What does the author not see from
   where they stand?
2. **Let the answers shape the work.** They decide the scope (see
   [One example, all cases](one_example_all_cases.md)), the states to
   test (see [Every state before done](every_state_before_done.md)) and the
   stories to tell (see [Every point of view](every_point_of_view.md)).
3. **Tell the author what was found.** A consequence that makes the change a
   poor one is said before the change, with the better way. What was decided
   along the way is said for information. What is truly ambiguous is asked,
   once, with the options.
