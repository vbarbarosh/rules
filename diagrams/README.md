# Diagrams

A visual language: the kinds of picture an agent draws in its replies, so the
author reads at a glance what words would take a page to say. For each kind:
what it shows, when it fits and when it does not, its parts, how it is drawn.

- [sequence.md](sequence.md) — who talks to whom, in time order: the course of events in a request, a failure, a retry or a fix; today beside proposed
- [case.md](case.md) — one real request, today beside fixed: the question on top, today's answer in red beside the answer with the fix in green, then big numbers, what works and what is missing
- [screen.md](screen.md) — where on the screen: a grey wireframe of the screen, amber numbered circles on the spots that change, a numbered list beside it saying what changes; a frame per state when it matters
- [state.md](state.md) — what states a thing has and what moves it between them; boxes, arrows, a dot where it starts
- [flowchart.md](flowchart.md) — what is decided where: steps, questions as diamonds, each answer its own arrow
- [swimlanes.md](swimlanes.md) — who does each step: a lane per actor, a box per step in its lane, arrows in order across lanes; done green, the hand-off that waits on you amber, to come grey dashed
- [questions.md](questions.md) — what is known and what is not: how a thing works stage by stage, the facts in green, the open questions in amber where they arise
- [causetree.md](causetree.md) — why it happened: the failure in red on top, each row down its "because", ruled-out causes in grey with the reason, the root cause amber, the fix green beside it
- [timeline.md](timeline.md) — what happened when, from a log: one line of time, each event at its moment
- [milestone.md](milestone.md) — where a goal stands: its steps as dots on one line, done green, now blue, ahead grey, and who each waits on
- [plangraph.md](plangraph.md) — what waits on what: a box per part of a plan, arrows to the parts that wait on it, side-by-side parts in one column, the longest chain bold blue; done green, under way blue, not started grey, waits on you amber
- [roadmap.md](roadmap.md) — what is planned when: the months on one line, a lane per area of work, a bar per piece, a red line for today; done green, under way blue, at risk amber, planned grey
- [kanban.md](kanban.md) — where each piece of work is: a column per stage, a card per piece, a limit on Doing; what waits on you in amber, what is blocked in red
- [quadrant.md](quadrant.md) — what to do first: value up, effort right, four quarters (do first green, plan blue, later grey, skip dashed grey), a dot per piece of work with its name on a pill
- [containers.md](containers.md) — which parts exist, where each runs, what goes between them (C4 containers)
- [entities.md](entities.md) — what data there is and how it links: a box per kind, 1 and n at the ends
- [dashboard.md](dashboard.md) — where each part stands: a RAG status dashboard, big numbers on top, tiles coloured green, amber or red, or by where each part is; a whole beside its gap
- [linechart.md](linechart.md) — a number over time: a point per day or hour joined by a line, a dashed line at a deploy or a fix; red before, green after, a goal line if there is one
- [heatmap.md](heatmap.md) — when it happens: days as rows, hours as columns, each cell as dark as its count, a legend scale, the hot spot in a blue frame
- [versions.md](versions.md) — which version runs where: a row per deployed part, its version, commit and date, latest or unknown, the verdict on top
- [cloud.md](cloud.md) — what runs where: the internet, the edge, a cloud region, its network and subnets, each part an icon in its place
- [network.md](network.md) — addresses, ports, who may connect: subnets as bands, security groups with their rules, every link with its port
- [tiers.md](tiers.md) — the tiers a request passes: columns from the edge to the data, the main path bold
- [isometric.md](isometric.md) — the system as a model: blocks on an isometric floor, networks as platforms; for a slide
- [servicemap.md](servicemap.md) — what talks to what, live: circles with a health ring, links as thick as their traffic
- [sankey.md](sankey.md) — where the traffic goes, how much: bands that split and end, each as wide as its share
- [waterfall.md](waterfall.md) — where one request spends its time: a row per span indented under its caller, a bar from start to end on a millisecond axis; the slowest red, waits as an amber band
- [dataflow.md](dataflow.md) — where data crosses a trust boundary: parties, processes, stores, the crossings numbered
- [matrix.md](matrix.md) — every link in a grid: the parts as rows and columns, a cell where the row calls the column
- [callgraph.md](callgraph.md) — which function calls which: a program from its entry down, the helpers at the bottom
- [pipeline.md](pipeline.md) — a script's data flow: files in, steps, files out
- [modules.md](modules.md) — which file needs which: files in their folders, packages in their own shape
- [changemap.md](changemap.md) — what a change touches: the folder tree trimmed to the touched files, green + added, blue ~ changed, red − removed, lines added and removed as numbers and bars, untouched folders folded as "…", the total on top
- [flame.md](flame.md) — where one run spends its time: call stacks as bars, as wide as their time
- [treemap.md](treemap.md) — how big each part is: each function a rectangle, its area its lines
