- when building a system, I first build it as a set of commands, and only
  then the interaction between these commands; that way the system is easier
  to build and to understand, one sees what it does and what its parts are,
  and the parts can be debugged, looked at and understood separately
- second: there must be a visualisation; the parts being made are
  illustrated, and always as pictures
- watch is a bad example of a command: a command starts, does its work, and
  that is all, there it ends
- import does not call render, which then calls send; there is some other
  system above them, a layer over all these commands, that uses them: calls
  one, packs the arguments, passes them on
- the big parts are singled out into so-called commands; that means we can
  pass some parameters, run the command many times, look into it alone,
  separate it from the rest of the application
- here is a set, here is a system, some big application, and the parts that
  can be singled out into commands; that is how they are shown clearly; the
  personal details are anonymized before they go into the rules
- any command can be called by hand, at any time; the system is built on
  that assumption
- when a command is called, the application, all the UI that depends on
  this command, knows it was called: it can show some progress, and in some
  cases start the command again
- in some cases a command must run as a single instance; the command itself
  builds such a mechanism, so that one need not think about it
- the starting assumption: whenever I want, I call it and nothing breaks;
  the command does everything right, it finds the state and what is to be
  done; in some cases it may end with an error and a message that the
  process is already running
- the examples: show many commands, name them, and say that a command just
  runs like a function: you ran it, it returned its result, and that is
  all; the system is something else, above, and works with all of them
- this is done first of all to take the complexity out of the whole system
  and split it into relatively small blocks, each on its own
- all of it goes onto the System page

# A system as commands

A system is built in two steps. First its commands: each thing the system
does becomes a command, run like a function, with its arguments in and its
result out, and then it ends. Only then the system above them: what calls
which command, when, and with what. The point is to take the complexity out
of one big application and split it into small blocks, each read, run and
fixed on its own.

## Commands first, a system above

A command has a name, an input and an output. It starts, does its work and
ends; something that keeps running, a watcher, the window, the clock, is
not a command but one of the things that start them.

The commands never call one another. The application above picks a
command, packs its arguments, calls it and passes its result on: one
command leaves a file, and the application, the clock or a click starts the
next one on it. A command can then be run again and again with other
arguments, and read apart from everything else.

Every command is drawn: one picture each, what goes in and what comes out,
and one picture of how they connect, made with the command and kept beside
it.

## Any time, seen, guarded

Any command can be called by hand at any time, and the system is built on
that: called whenever, the command reads the state and does what is left,
the whole job, the rest of it, or nothing.

The pages that depend on a command know when it runs: they read the file it
writes, show its progress and offer to start it again.

A command that must run one at a time guards itself: a second call sees the
first and ends with an error that says so, so no caller has to check first.

These rules stand on the [System](../docs/system.md) page beside the
[history of actions](history.md), research still.
