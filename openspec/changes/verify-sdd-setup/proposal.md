# Proposal: Verify SDD Pipeline Setup

## Intent
Prove the global-optimal SDD stack works end-to-end before real work. No business logic change — validates `proposal→spec→design→tasks→apply→verify→archive` with `openspec` store, strict_tdd false, RDD on.

## Scope

### In Scope
- SDD change `verify-sdd-setup` with full lifecycle (exploration, proposal, spec, design, tasks, apply, verify, archive).
- 0–1 dummy file inside `openspec/changes/verify-sdd-setup/` (e.g., `.dummy` or `.sdd-verify`) to give apply/verify a concrete artifact; no `src/` mutation.

### Out of Scope
- Any `src/`, `public/`, build, routing, or styling changes.
- Test framework installation, config changes, or new specs that persist beyond this change.
- Real product features or refactoring.

## Capabilities

### New Capabilities
- None — dummy pipeline-only change, no product capability introduced.

### Modified Capabilities
- None — `openspec/specs/` is empty; no existing capability modified.

## Approach
Approach 1 (openspec-only dummy) from exploration. Keep change inside `openspec/changes/verify-sdd-setup/`. Each phase creates/updates its single artifact; apply creates trivial in-folder file; verify runs `astro check` + `astro build`; archive moves folder to `openspec/changes/archive/YYYY-MM-DD-verify-sdd-setup/`. Minimal, reversible, fast (<10 min total).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `openspec/changes/verify-sdd-setup/proposal.md` | New | This proposal |
| `openspec/changes/verify-sdd-setup/exploration.md` | New | Brief exploration (already written) |
| `openspec/changes/verify-sdd-setup/.dummy` | New (optional) | Trivial file for apply/verify proof |
| `openspec/changes/verify-sdd-setup/specs/**` | New | Delta spec stub (no product requirement) |
| `openspec/changes/verify-sdd-setup/design.md` | New | Minimal design stub |
| `openspec/changes/verify-sdd-setup/tasks.md` | New | 3–5 tasks grouped by phase |
| `openspec/changes/verify-sdd-setup/verify-report.md` | New | Verify report |
| `src/**`, `public/**` | None | Explicitly not touched |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `gentle-ai` CLI not on PATH for sdd-verify-validate | Medium | Skip validator or manual archive; no code impact |
| Scope creep into real code | Low | Freeze to openspec-only; reject src changes in review |
| Build break on unrelated change | Low | Verify isolated: `astro check` + `astro build` only |

## Rollback Plan
Delete `openspec/changes/verify-sdd-setup/` (and archived copy if created). No `src/` revert needed. No migrations. Single `git rm -rf` + commit.

## Dependencies
- None. Requires `openspec/config.yaml` (exists) and `~/.config/opencode/opencode.json` global (exists).

## Success Criteria

- [ ] `proposal.md` and `exploration.md` exist in `openspec/changes/verify-sdd-setup/` and pass `openspec` conventions
- [ ] Subsequent phases create `specs/`, `design.md`, `tasks.md` without mutating `src/`
- [ ] `sdd-apply` creates dummy + `sdd-verify` passes `astro check` and `astro build`
- [ ] `sdd-archive` moves change to `openspec/changes/archive/YYYY-MM-DD-verify-sdd-setup/` cleanly; `openspec/specs/` unchanged
- [ ] Whole flow completed in <30 min, 0 production regressions
