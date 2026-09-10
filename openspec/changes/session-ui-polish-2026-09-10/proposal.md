# Proposal: Session UI Polish — Baseline Registration + Hardening

## Intent

Register the four UI changes shipped in the 2026-09-10 session (currently uncommitted at `90776f0`) as an auditable SDD change, and fold in the small remediations the exploration surfaced: one undocumented semantic regression (D1) and two accessibility/robustness gaps (Q1, Q2). Settle commit scoping for untracked session byproducts (D6). No new product features.

## Scope

### In Scope
- **Formal registration** of the 4 already-implemented changes: `SpotlightCard` wrapper, `ProjectCard` image/hover fix, infinite tools ticker, `section-eyebrow` removal. No re-implementation.
- **D1 — restore `article` semantics**: `ProjectCard` root changed from `<article>` to `<div>` because `SpotlightCard` renders a plain div. Add a root-tag prop (e.g. `as="article"`) or equivalent wrapper so project cards stay semantic.
- **Q1 — view-transition init alignment**: `SpotlightCard` listens to `astro:after-swap` only; align it to `Header.astro`'s `astro:page-load` + `astro:after-swap` pattern so cards restored via bfcache/history traversal still initialize.
- **Q2 — reduced-motion reachability**: the `prefers-reduced-motion` fallback disables animation but leaves `overflow: hidden` on `.tools-ticker`, permanently clipping tools beyond the viewport. Add `flex-wrap` or `overflow-x: auto` in the fallback.
- **D6 — commit scoping**: gitignore session byproducts (`.playwright-mcp/`, `*.log`, `verify-report.candidate.md`) and decide whether `openspec/` is tracked. Executed at apply.

### Out of Scope
- New features, redesigns, GSAP rework.
- SVG logos in the ticker (requires `skills.tools` schema change `string[]` → `{name, icon?}`) — future change.
- Test framework installation.
- Optional polish Q3 (`aria-label` target), Q4 (ticker hover on touch), Q6 (duplicated default color) — deferred unless the user opts in.

## Capabilities

### New Capabilities
- `portfolio-ui`: the UI interaction contract for the spotlight card wrapper (root semantics, init lifecycle across view transitions) and the tools ticker (motion, reduced-motion reachability). Becomes `openspec/specs/portfolio-ui/spec.md` at archive.

### Modified Capabilities
- None — `openspec/specs/` does not exist yet; no existing capability is changed.

## Approach

Keep the shipped implementation as the baseline; apply only the three targeted fixes plus commit scoping. D1: add a root-tag prop to `SpotlightCard` (default `div`, `ProjectCard` passes `article`) rather than rewriting markup. Q1: one-line listener addition matching `Header.astro:188-189`, reusing the existing `:not([data-spotlight-init])` guard. Q2: extend the reduced-motion fallback with wrap/scroll. D6: `.gitignore` additions and an explicit tracking decision. No architecture change. Verification uses `astro check`, `astro build`, and targeted visual/Playwright checks.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/SpotlightCard.astro` | Modified | Q1 init listeners; D1 root-tag prop |
| `src/components/ProjectCard.astro` | Modified | D1 pass `article` root |
| `src/components/SkillsSection.astro` | Modified | Q2 ticker markup if wrap is chosen |
| `src/styles/global.css` | Modified | Q2 reduced-motion fallback |
| `.gitignore` | Modified | D6 ignore session byproducts |
| `openspec/changes/session-ui-polish-2026-09-10/proposal.md` | New | This proposal |
| `openspec/specs/portfolio-ui/spec.md` | New (at archive) | Capability spec from the delta |
| `src/components/{About,Projects,Skills,Contact}Section.astro` | None | Eyebrow removals kept as-is |
| `src/layouts/Layout.astro` | None | `<ClientRouter />` context only |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| D1 root-tag prop changes spotlight JS assumptions | Low | Prop only changes the rendered tag; spotlight logic targets `[data-spotlight]`, verify in Playwright |
| Q2 fallback breaks the animated ticker | Low | Scope the change strictly to `prefers-reduced-motion`; check both states |
| Q1 double-binding causes duplicate listeners | Low | Existing `:not([data-spotlight-init])` guard covers it; assert single init |
| Commit scoping accidentally ignores tracked files | Low | Review `.gitignore` diff; `git status` before commit |
| Registration drifts from actual implementation | Medium | Exploration already verified all claims; keep registration to observed behavior only |

## Rollback Plan

All source fixes are small and uncommitted, so rollback is `git restore src/` (or targeted `git checkout -- <file>`) to return to `90776f0`. The registration artifacts (`proposal.md`, later specs/tasks) are additive; delete the change folder to discard. No migrations, no data, no dependency changes.

## Dependencies

- Astro 7.2.9 + `ClientRouter` (`src/layouts/Layout.astro:63`) for view-transition events.
- No new packages.

## Decisions (pending user approval)

| ID | Decision | Options |
|----|----------|---------|
| D1 | Restore `article` semantics on project cards | Restore via root-tag prop (recommended) / accept plain-div cards |
| Q1 | Fold view-transition init fix into this change | Fold in (recommended) / track separately |
| Q2 | Fold reduced-motion reachability fix into this change | Fold in (recommended) / track separately |
| D6 | Commit scoping | Ignore `.playwright-mcp/`, `*.log`, `verify-report.candidate.md`; decide whether `openspec/` is tracked |

## Success Criteria

- [ ] `astro check` reports 0 errors, 0 warnings (19 files)
- [ ] `astro build` completes
- [ ] D1: rendered project-card root is `<article>` (DOM/Playwright check)
- [ ] Q1: spotlight re-initializes after history traversal / `astro:page-load`
- [ ] Q2: under `prefers-reduced-motion`, all tools are reachable (wrapped or scrollable)
- [ ] D6: session byproducts are ignored; `git status` shows no stray `.log`/`.playwright-mcp/`
- [ ] Proposal stays under 300 lines and the 4 shipped changes remain unmodified except the targeted fixes
