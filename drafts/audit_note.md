- a full audit goes to `notes/audit-<date>.md`
- scope, verdict table, finding register with ids, file:line evidence, order
  of work
- there is no issue tracker; the finding register is the issue list
- see `notes/audit-2026-09-02.md`


# Audit note

The report of a full audit is one file, `notes/audit-<YYYY-MM-DD>.md`, dated by
the day of the audit. `notes/` is created when absent. The projects have no
issue tracker: the finding register of the newest audit note is the issue list,
and later audits refer to findings by their ids.

## Shape

In this order:

1. **Title** — `# Project audit — 2026-09-02`.
2. **Repository line** — name, branch, HEAD, size (tracked files, commits, first
   and last commit).
3. **Scope** — every check actually run, and what was not exercised. A check
   which was not run is said so; it is never implied.
4. **Verdict** — a paragraph naming the main risk, then a *health at a glance*
   table, one row per area:

        | Area           | Status                 |
        |----------------|------------------------|
        | Internal links | 13/13 resolve          |
        | Demo scripts   | 3/3 run without error  |
        | Secrets        | none in tree or history |

5. **Finding register** — one table of all findings:

        | Id       | Severity | Area    | Title                              |
        |----------|----------|---------|------------------------------------|
        | RULES-01 | high     | docs    | Classes banned in one file, shown in another |
        | RULES-02 | low      | hygiene | No `.gitignore`                    |

6. **Findings** — numbered sections by area, one `### <id> <title> (<severity>)`
   per finding.
7. **What is good** — what should be kept as it is.
8. **Recommended order of work** — the findings as an ordered list of steps.
9. **Status of prior findings** — every id from the previous audit note: fixed,
   still open, or withdrawn.
10. **Appendix: file inventory**.

## Findings

- An id is `<PROJECT>-NN`. It is never reused and never renumbered; a fixed
  finding keeps its id in *Status of prior findings*.
- Every finding cites `file:line` and the evidence: the quoted lines, the
  command which was run and what it printed. A finding without a reproduction
  or a line reference is not actionable.
- A finding in the author's own text is reported only; it is not patched.

## The file

The note is written by the AI as a whole, so it has no top half and no
separator. It is left untracked; it is committed only on request.
