---
layout: home
hero:
  name: CC System Prompt Time Machine
  text: Every Claude Code system prompt, on the wire.
  tagline: 389 CLI versions × 10 models × two entrypoints — captured byte-exact by a logging proxy, never transcribed by a model. Navigable, diffable, and honest about its holes.
  actions:
    - theme: brand
      text: Diff any two captures
      link: /diff
    - theme: alt
      text: Version timeline
      link: /versions/README
    - theme: alt
      text: Methodology
      link: /methodology
features:
  - title: Wire-captured, not self-reported
    details: A local proxy records the system field the CLI actually sends. No model cooperation, no transcription, sha-bound bytes.
  - title: Two entrypoints, two corpora
    details: Headless (-p / sdk) and interactive (TUI) compose different documents — and on old builds have opposite model reachability. Never mixed.
  - title: Honest holes
    details: A cell without a capture carries its exclusion cause — model remapped by the era's catalog, API 404, login race — instead of pretending to be data.
  - title: Self-distrusting
    details: The methodology page carries a measured confound catalog and a retraction log. The instrument lies more often than the subject.
---
