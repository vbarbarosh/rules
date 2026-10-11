# Maps and ways (MAP)

Words for the shapes knowledge takes, and for the way a piece of work goes:
where we are, where we came from, where we are going.

| Term            | Definition                                                                                                    |
|-----------------|---------------------------------------------------------------------------------------------------------------|
| tree            | One root; every other node has exactly one parent; no circles. Folders, outlines, an org chart.               |
| graph           | Nodes and edges, directed or not, with no rule on how they link: several parents, circles.                    |
| map             | A smaller picture that keeps what matters of something bigger and leaves the rest out on purpose.             |
| taxonomy        | Kinds and kinds of kinds, each one "is a" the one above it (animal › bird › owl). A tree of kinds.            |
| ontology        | The concepts of a field, their instances, the relations between them and their rules, written down.           |
| knowledge graph | An ontology filled with real things: not "a message answers a message" but "this reply answers that message". |
| roadmap         | The whole way ahead: where we go and in what order, not exactly when. Now / Next / Later.                     |
| milestone       | One point on the way, reached or not. Takes no time, unlike a task.                                           |
| breadcrumbs     | The trail behind: from the root to where you stand, each crumb a way back (Home › Docs › Page).               |
| timeline        | Events placed along time.                                                                                     |
| backlog         | Work known but not yet planned, in no fixed order.                                                            |

## Tree

One root, and every other node has exactly one parent, so there are no
circles and exactly one path from the root to any node. Folders, an outline,
an org chart, a family line.

In the agent notes: the folders of a note (agentdir, commondir, messages,
roadmaps). A thread is a tree as long as each message answers one message.

A tree is a graph with rules; a taxonomy is a tree of kinds.

![Tree: the folders of a note](../img/maps/tree.svg)

## Graph

Things (nodes) and the links between them (edges), directed or not, with no
rule on how they link: a node may have several parents, and links may run in
circles.

In the agent notes: a conversation, an arrow for each `Re:` line. One reply
answered two messages at once, so the conversation is a graph, not a tree.

Trees, taxonomies and ontologies are all graphs.

![Graph: a conversation drawn by its Re: lines](../img/maps/graph.svg)

## Map

A smaller picture that keeps what matters of something bigger: where things
are and how they connect. "The map is not the territory": a map leaves things
out on purpose. In code, a map (a dictionary) goes from keys to values, one
value per key. Also a mind map, a concept map, a site map.

In the agent notes: a roadmap is a map of the way; "the terms and how they
relate" below is a concept map; a glossary maps each term to its meaning.

![Map](../img/maps/map.svg)

## Taxonomy

Sorting into kinds and kinds of kinds, each one "is a" the one above it:
animal › bird › owl. Linnaeus for living things, the shelves of a library.

In the agent notes: a message is the author's or the agent's; a page is a
subject file, a cover or a plan; a marker is `.working` or `.cancelled`.

A taxonomy is a tree, and the backbone of an ontology, which adds the other
links.

![Taxonomy: the kinds of things in a note](../img/maps/taxonomy.svg)

## Ontology

In philosophy, the study of what exists. In computing, an explicit map of
what a field talks about: concepts (Message), instances (20261010_055019-me
is a Message), relations (a Conversation is made of Messages) and rules
(every Conversation has exactly one Subject file). It is written down so
people and programs use the words the same way: RDF and OWL are the
standards, Schema.org the best known on the web.

A glossary defines words one by one; an ontology also says how they connect.
Written down once, a rename (workdir → subjectdir) happens in one place,
and an agent can check a word against it.

![Ontology: the words of a note and how they connect](../img/maps/ontology.svg)

![The terms of this glossary and how they relate](../img/maps/terms-map.svg)

## Knowledge graph

An ontology filled with real things: not "a message answers a message" but
"062624-agent answers 055019-me". What search engines and AI retrieval use.

In the agent notes: every message, subject file and plan of a note with
their links; the app could build it, and it would feed an agent's context.

## Roadmap

The whole way ahead: where we are going and in what order, not exactly when.
A product roadmap is often three columns, Now / Next / Later. It changes as
we learn, and it is meant to be shown, so it stays coarse: themes and stages,
not tasks.

In the agent notes: an agent's plan for one conversation,
`roadmaps/<time>-agent-plan.md`, its parts `- [ ] **P1** …` ticked as each is
done, new ones added at the end; and the author's roadmaps in the app, lists
of work across projects.

A roadmap is laid on a timeline, marked by milestones and fed by a backlog.

![Roadmap](../img/maps/roadmap.svg)

## Milestone

The Roman stone by the road that said how far it was to Rome. In a project, a
point that is reached or not ("Released", "Signed"); it takes no time, unlike
a task. A diamond on a Gantt chart; on GitHub, a group of issues with a due
date.

In the agent notes: the goal's steps in a subject file, drawn under the
cover: done, now or next. The step that is now waits on the agent while it
works and on the author after its reply; a step is named as it stands
("Testing" while now, "Tested" once done); the last is always "Done: nothing
left, to the archive".

![Milestone](../img/maps/milestone.svg)

## Breadcrumbs

The trail that shows where you are and how you got there, as in Hansel and
Gretel; on a web page, Home › Docs › Page, each crumb a link back up.

Against roadmap and milestone: breadcrumbs look back (the way behind, from
the root to here), a roadmap looks ahead (the whole way, in order), and a
milestone is one stone on that way. A milestone passed is, in effect, a
breadcrumb.

In the agent notes: the path `agentdir › commondir › Terms`, and the chain of
`Re:` lines back to a conversation's first message.

![Breadcrumbs, roadmap and milestone side by side](../img/maps/breadcrumbs-roadmap-milestone.svg)

## Timeline

Events placed along time. In the agent notes: the change log at the end of
each subject file, and the times in message names. A roadmap is laid on one.

## Backlog

The work known but not yet planned, in no fixed order. In the agent notes:
the "what is next" list of a subject file, the parts not yet on a roadmap. It
feeds a roadmap.
