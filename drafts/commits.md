```
docs: link the placement rules, gates and portals as they stand

docs/README.md lists placement.md; objects.md describes gates and
portals as the placement rules now put them.
```

```
docs: link the placement rules, gates and portals as they stand
maps: gates and portals placed by the rules
maps: placement rules for gates and portals, and map-check
maps: one name for the gate jump reach
docs: build-docs and a github pages workflow
readme: elites and arcade saves as the code has them
docs: an index, linked from the readme
docs: every object in space and its purpose
docs: goals, contracts and story, how they are offered and paid
docs: balance, every number and where it lives
docs: more principles, shoot, crash and health bar among them
pause: say what save slots and new run do
menu: arcade demo raiders stay inside the scene
menu: a mode card only picks, the button under the cards starts
```

- a commit title is all lowercase: a subject of one or two words, the category of the commit, then a short description; 70-72 characters in all. A commit may carry a short description of the details, if they are really needed

# Commit messages

A commit title is `scope: description`, all lowercase, 72 characters at most.

```
maps: placement rules for gates and portals, and map-check
```

- The scope is one or two words: the part of the project the commit
  changes, its category. `docs`, `maps`, `menu`, `readme`.
- The description is short and follows `: `.
- Everything is lowercase, names included: `readme`, `github pages`.
- The whole title, scope included, is 72 characters at most.

The details go in a body, after one blank line, only when they are really
needed. A body is short, in ordinary sentences:

```
docs: link the placement rules, gates and portals as they stand

docs/README.md lists placement.md; objects.md describes gates and
portals as the placement rules now put them.
```
