# Entrypoint eras — which models each CLI's interactive mode can actually reach

The sdk (`-p`) and interactive (cli) entrypoints do not just compose different documents — on old
builds they have **opposite model reachability**. `-p` forwards whatever `--model` string it is
given, so today's API happily serves modern models to a 2025 CLI. The interactive TUI resolves
`--model` through its **built-in catalog first**, and what it does with an unknown id changed four
times. Every seam below was measured on the wire (capture proxy, request-side), 2026-08-13; causes
are in `captures-cli/manifest.json` exclusion records.

## The era map

| CLI versions | published | unknown-model behavior | what the sweep sees |
| --- | --- | --- | --- |
| 1.0.0 – 1.0.2 | 2025-05-22 (GA day) | **remap** to the era default (`claude-opus-4-20250514`) | `model-remapped`, deterministic — every model, every retry |
| 1.0.3 – 2.0.15 | 2025-05-23 → | **passthrough** — id sent verbatim; EXCEPT the opus-gate window below | captured (today's API serves the modern id) |
| 1.0.17 – 1.0.44 | 2025-06-09 → ~2025-06-26 | **opus-family gate**: every `claude-opus-*` id remaps to `claude-sonnet-4-20250514`; non-opus ids (even future ones like `sonnet-5`) still pass through | `model-remapped` for opus ids only — deterministic, 28 versions × 5 ids, zero exceptions |
| 2.0.17 – ~2.0.2x | 2025-10-15 → | **fallback** to `claude-haiku-4-5-20251001` | `model-remapped`, racy — retries sometimes win passthrough |
| ~2.0.77 – current | 2026-01-06 → | **passthrough**, stable | captured |

Three seams have dates; only one has a release note:

- **remap → passthrough, 1.0.2 → 1.0.3 (2025-05-22 → 2025-05-23)**: changelog-silent — the
  CHANGELOG jumps from 1.0.1 to 1.0.4. The launch-day substitution behavior lived under 24 hours,
  and the eight `model-remapped` exclusions naming `claude-opus-4-20250514` are its only record.
- **opus gate, [1.0.17, 1.0.44] (2025-06-09 → ~2025-06-26)**: changelog-silent. Family-based
  resolution, not catalog lookup — the CLI routes `claude-opus-*` through a plan/availability
  fallback to sonnet-4 while shipping unknown non-opus ids verbatim. Ends by 1.0.50 (opus
  passthrough resumes). Measured 2026-08-14: 139/140 opus cells in the window excluded with the
  identical substitution target; the 5/10 partial-coverage signature of these versions is this gate.
- **passthrough → haiku fallback, 2.0.15 → 2.0.17**: changelog-pinned — "Added Haiku 4.5 to model
  selector!" The fallback target the exclusions record is exactly the model that entry added.
  (Adjacent: 2.0.19 "Fixed a bug where Haiku was unnecessarily called in print mode" — same
  machinery.)
- The fallback → stable-passthrough seam (~2.0.2x → 2.0.77) is bracketable but not yet bracketed.

## The 1.0.0–1.0.2 wall is permanent

Those builds remap *everything* — era-valid ids included (`claude-3-5-haiku-20241022` was remapped
too; the id appears only in the warmup probe). The only model they will request interactively is
their default, and the API no longer serves `claude-opus-4-20250514` to this account (404). So
interactive coverage there is **evidence-only, forever**: the composed prompt (10,597 B at 1.0.0) is
recorded request-side and preserved under `_excluded/` with `--keep-excluded`, but it can never be
promoted to a capture under the admissibility rules — the run cannot prove the API would serve it.

## Consequences for sweeps

- Interactive sweeps of 1.0.3+ and 2.0.x with modern model lists are fine; the judge quarantines
  the fallback-era cells with exact causes, and re-runs convert the racy ones.
- A `model-remapped` exclusion is **structural** on 1.0.0–1.0.2 (deterministic) and **retryable** on
  2.0.17–2.0.2x (a startup race against the catalog fetch).
- Exclusion details double as history: the remap *target* in each record is the era's default model,
  so the excluded cells trace the TUI's default-model timeline for free.

## Reproduce

```bash
# the silent seam
sandbox/capture-in-docker.sh --cli-version 1.0.2 --interactive --keep-tools -m claude-opus-4-5 --force
sandbox/capture-in-docker.sh --cli-version 1.0.3 --interactive --keep-tools -m claude-opus-4-5 --force

# the changelog-pinned seam
sandbox/capture-in-docker.sh --cli-version 2.0.15 --interactive --keep-tools -m claude-opus-5 --force
sandbox/capture-in-docker.sh --cli-version 2.0.17 --interactive --keep-tools -m claude-opus-5 --force
```

Dates from `corpus/versions.json` (npm publish metadata). Behavior claims are [V] wire-verified;
the 2.0.17 attribution to the changelog entry is [C].
