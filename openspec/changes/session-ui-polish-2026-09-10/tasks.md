# Tasks: Session UI Polish — Baseline Registration + Hardening

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~261 product (169 tracked + 73 new SpotlightCard + ~15 fixes + ~4 gitignore); ~836 raw incl. ~575 SDD docs |
| File count | 17 (8 product, 9 openspec) |
| 400-line budget risk | Low (product 261 < 400) |
| Chained PRs recommended | No |
| Delivery strategy | ask-on-risk |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units (commits)

| Unit | Focused test | Runtime harness | Rollback boundary |
|------|--------------|-----------------|-------------------|
| C1 register shipped UI | `bun run check` | `bun run build` + Playwright hover/eyebrow/ticker | revert C1 → `90776f0` |
| C2 D1 + Q1 spotlight | `bun run check` | Playwright `<article>` + back/forward init | revert C2 → baseline spotlight |
| C3 Q2 ticker a11y | `bun run check` | Playwright `emulateMedia` reduced-motion | revert C3 → ticker clipped |
| C4 D6 scoping | `git status --short` | N/A — VCS hygiene | revert C4 → openspec untracked |

Order: C1 → C2 → C3 → C4 (C2/C3 edit files C1 commits).

## Phase 1: Baseline Registration (C1)

- [ ] 1.1 Gate: `bun run check` (0/0, 19 files) + `bun run build`.
- [ ] 1.2 Stage baseline only: `src/components/SpotlightCard.astro`, `src/components/{ProjectCard,SkillsSection,AboutSection,ProjectsSection,ContactSection}.astro`, `src/styles/global.css`.
- [ ] 1.3 Commit C1 `feat(ui): spotlight project cards, infinite tools ticker, section polish`.

## Phase 2: D1 + Q1 — Spotlight Hardening (C2)

- [ ] 2.1 `src/components/SpotlightCard.astro`: add `import type { HTMLTag } from 'astro/types'`, `as?: HTMLTag` prop, destructure `as: RootTag = 'div'`.
- [ ] 2.2 `src/components/SpotlightCard.astro`: render root as `<RootTag data-spotlight …>` (both markup sites).
- [ ] 2.3 `src/components/SpotlightCard.astro`: add `document.addEventListener('astro:page-load', initSpotlight);` after existing `initSpotlight()`.
- [ ] 2.4 `src/components/ProjectCard.astro`: pass `as="article"` to `<SpotlightCard>`.
- [ ] 2.5 Verify (dep 2.1–2.4): Playwright root `<article data-spotlight>` (Default root; Semantic project card root); back/forward → one `data-spotlight-init`/card, cursor tracks (Client navigation).
- [ ] 2.6 Commit C2 `fix(spotlight): restore article root semantics and page-load init`.

## Phase 3: Q2 — Ticker Reduced-Motion (C3)

- [ ] 3.1 `src/styles/global.css`: in `prefers-reduced-motion: reduce` add `.ticker-group { flex-wrap: wrap; justify-content: center; padding-right: 0; }` and `.ticker-group[aria-hidden="true"] { display: none; }`.
- [ ] 3.2 Verify (dep 3.1): Playwright reduced-motion → all 20 tools visible, duplicate `display:none`; no-preference → animates, no wrap (Reduced motion reachable; Motion unaffected).
- [ ] 3.3 Commit C3 `fix(ticker): keep all tools reachable under reduced motion`.

## Phase 4: D6 — Commit Scoping (C4)

- [ ] 4.1 `.gitignore`: append `.playwright-mcp/`, `*.log`, `verify-report.candidate.md`.
- [ ] 4.2 Verify: `git status --short` shows no `build.log`, `check.log`, `.playwright-mcp/`, `verify-report.candidate.md`.
- [ ] 4.3 Stage `.gitignore` + `openspec/` and commit C4 `chore(sdd): track openspec artifacts and ignore session byproducts`.

## Phase 5: Final Verification

- [ ] 5.1 Re-run `bun run check` + `bun run build`.
- [ ] 5.2 Confirm baseline unchanged except D1/Q1/Q2 (`git diff 90776f0 --stat`).
- [ ] 5.3 Confirm Single announcement (duplicate hidden + unfocusable) and Rounded cover (`rounded-t-xl`).
