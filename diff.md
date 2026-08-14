---
title: Diff any two captures
sidebar: false
aside: false
pageClass: diff-page
---

# Diff any two captures

Pick any two cells of the corpus — by entrypoint (sdk `-p` vs interactive cli), CLI version, and
model — and see exactly what changed. **Normalized** mode (default) strips the two measured
capture-environment confounds (`Today's date`, `OS Version` kernel line) using the corpus's own
shared definition, so a diff shows real content changes, never instrument noise. The URL updates as
you pick — every diff is a shareable, citable link.

<DiffTool />

## Reading the output

- **Section chips** summarize the change the way the corpus reports transitions: sections added,
  removed, or changed between A and B.
- The unified view collapses long unchanged runs; word-level marks show the exact rewording inside
  replaced blocks.
- An **excluded** cell shows its exclusion cause instead of text — the corpus records *why* a cell
  is empty (model remapped by the CLI's catalog, API 404, login race), and so does this page.
