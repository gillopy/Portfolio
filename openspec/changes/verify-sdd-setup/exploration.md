# Exploration: verify-sdd-setup

## Current State
- Stack: Astro 7.2.9 + Tailwind 4 + GSAP + TS (strict), Bun, SSG content-driven.
- Testing: none (no runner, no test scripts). Quality gate: `astro check` + `astro build`.
- SDD OpenSpec: `openspec/config.yaml` present, `openspec/specs/` empty, `openspec/changes/archive/` empty. No prior SDD change has been archived — pipeline never exercised end-to-end.
- Artifact store declared: `openspec` (file-authoritative). Global `~/.config/opencode/opencode.json` provides 7 SDD agents (muse-spark-1.2-contributor).
- Change `verify-sdd-setup` does not exist yet; directory just created.

## Affected Areas
- `openspec/changes/verify-sdd-setup/` — new change folder (exploration.md, proposal.md, future specs/design/tasks/verify-report.md).
- `openspec/specs/` — not modified; remains source of truth (currently empty).
- `public/.sdd-verify` or `openspec/changes/verify-sdd-setup/.dummy` — optional 1-line dummy to prove apply/verify without touching `src/`.
- `src/` — explicitly NOT touched (zero runtime impact).

## Approaches
1. **Zero-code dummy (no file outside openspec)** — change lives only inside `openspec/changes/verify-sdd-setup/`
   - Pros: zero risk, zero build impact, cleanest rollback (delete folder)
   - Cons: `sdd-apply`/`sdd-verify` do nothing visible beyond filesystem; still validates pipeline
   - Effort: Low

2. **Single dummy artifact in `public/` or `openspec/` subtree** — create 1 trivial file (e.g., `.sdd-verify` with timestamp)
   - Pros: gives apply a concrete file to create, verify a concrete check (`astro build` + file exists)
   - Cons: adds one untracked/ignored file outside openspec if in `public/`
   - Effort: Low

3. **Minimal docs-only change (`README` note)** — add comment to README explaining verification
   - Pros: visible
   - Cons: mutates tracked docs unnecessarily; violates "no logic, minimal scope"
   - Effort: Low

## Recommendation
Approach 1 with optional variant of Approach 2 inside the change folder itself (e.g., `openspec/changes/verify-sdd-setup/.dummy`). Keeps scope to 0-1 file inside the change folder, no `src/` mutation, no build regression risk. Proves proposal→spec→design→tasks→apply→verify→archive flow with minimal ceremony.

## Risks
- Pipeline tooling missing locally (`gentle-ai` binary not on PATH) — verify before archive; fallback to manual file moves.
- Over-scoping dummy to real code — mitigated by freezing scope to openspec-only files.

## Ready for Proposal
Yes — scope is frozen, approach 1 (+ optional in-folder dummy) approved by user ("hazlo"), no further clarification needed. Next: `sdd-propose`.
