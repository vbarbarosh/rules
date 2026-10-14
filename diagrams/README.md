# Diagrams

A visual language: the kinds of picture an agent draws in its replies, so the
author reads at a glance what words would take a page to say. For each kind:
what it shows, when it fits and when it does not, its parts, how it is drawn.

- [sequence.md](sequence.md) — who talks to whom, in time order: the course of events in a request, a failure, a retry or a fix; today beside proposed
- [case.md](case.md) — one real request, today beside fixed: the question on top, today's answer in red beside the answer with the fix in green, then big numbers, what works and what is missing
- [state.md](state.md) — what states a thing has and what moves it between them; boxes, arrows, a dot where it starts
- [flowchart.md](flowchart.md) — what is decided where: steps, questions as diamonds, each answer its own arrow
- [questions.md](questions.md) — what is known and what is not: how a thing works stage by stage, the facts in green, the open questions in amber where they arise
- [timeline.md](timeline.md) — what happened when, from a log: one line of time, each event at its moment
- [milestone.md](milestone.md) — where a goal stands: its steps as dots on one line, done green, now blue, ahead grey, and who each waits on
- [containers.md](containers.md) — which parts exist, where each runs, what goes between them (C4 containers)
- [entities.md](entities.md) — what data there is and how it links: a box per kind, 1 and n at the ends
- [dashboard.md](dashboard.md) — where each part stands: a RAG status dashboard, big numbers on top, tiles coloured green, amber or red, or by where each part is; a whole beside its gap
- [versions.md](versions.md) — which version runs where: a row per deployed part, its version, commit and date, latest or unknown, the verdict on top
- [cloud.md](cloud.md) — what runs where: the internet, the edge, a cloud region, its network and subnets, each part an icon in its place
- [network.md](network.md) — addresses, ports, who may connect: subnets as bands, security groups with their rules, every link with its port
- [tiers.md](tiers.md) — the tiers a request passes: columns from the edge to the data, the main path bold
- [isometric.md](isometric.md) — the system as a model: blocks on an isometric floor, networks as platforms; for a slide
- [servicemap.md](servicemap.md) — what talks to what, live: circles with a health ring, links as thick as their traffic
- [sankey.md](sankey.md) — where the traffic goes, how much: bands that split and end, each as wide as its share
- [dataflow.md](dataflow.md) — where data crosses a trust boundary: parties, processes, stores, the crossings numbered
- [matrix.md](matrix.md) — every link in a grid: the parts as rows and columns, a cell where the row calls the column
- [callgraph.md](callgraph.md) — which function calls which: a program from its entry down, the helpers at the bottom
- [pipeline.md](pipeline.md) — a script's data flow: files in, steps, files out
- [modules.md](modules.md) — which file needs which: files in their folders, packages in their own shape
- [flame.md](flame.md) — where one run spends its time: call stacks as bars, as wide as their time
- [treemap.md](treemap.md) — how big each part is: each function a rectangle, its area its lines
