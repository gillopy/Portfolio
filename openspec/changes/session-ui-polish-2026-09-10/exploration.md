# Exploration — session-ui-polish-2026-09-10

- **Phase**: SDD exploration (baseline verification of already-implemented work)
- **Artifact store**: openspec (repo-local, `./openspec`)
- **HEAD**: `90776f0` — work is uncommitted (6 modified files in `src/` + new `src/components/SpotlightCard.astro`)
- **Diagnostics**: `bun run check` → **Result (19 files): 0 errors, 0 warnings, 0 hints** (re-run this phase; matches summary claim)

## Verified-claims table

| # | Claim (summary.md) | Evidence (actual) | Verdict |
|---|---|---|---|
| 1 | Touched files: 2 new blocks in global.css, ProjectCard, SkillsSection, 4 section components, new SpotlightCard | `git status --short`: exactly `M AboutSection, ContactSection, ProjectCard, ProjectsSection, SkillsSection, global.css` + `?? src/components/SpotlightCard.astro`; `git diff --stat`: 139 insertions / 30 deletions | **VERIFIED** |
| 2 | SpotlightCard: wrapper with `<slot />` | `SpotlightCard.astro:41-43` (`.spotlight-content > slot`) | **VERIFIED** |
| 3 | SpotlightCard: 2 overlay layers | `:39` `.spotlight-border` + `:40` `.spotlight-glow`, both `aria-hidden="true"` | **VERIFIED** |
| 4 | CSS-var mouse tracking `--mx/--my` | `:57-58` `card.style.setProperty('--mx'/'--my')` | **VERIFIED** |
| 5 | rAF throttle | `:65` `if (!raf) raf = requestAnimationFrame(render)`; `render` resets `raf = 0` (`:56`) | **VERIFIED** |
| 6 | Re-init on `astro:after-swap` | `:80` `document.addEventListener('astro:after-swap', initSpotlight)`; `ClientRouter` is mounted (`Layout.astro:63`), so the event fires | **VERIFIED** |
| 7 | Props `class`, `glowColor` (default `#0099ff` @15%), `borderColor`, `glowSize` 600, `borderSize` 120 | `:25-31` defaults `rgba(0, 153, 255, 0.15)`, `rgba(255,255,255,0.55)`, 600, 120; exposed as CSS vars at `:37` | **VERIFIED** (file is 81 lines, not "1–90" — see D2) |
| 8 | ProjectCard wrapped in `<SpotlightCard>`; outer `overflow-hidden` and `hover:border-hairline` removed | `ProjectCard.astro:4,14,69`; diff shows old `<article class="... overflow-hidden ... hover:border-hairline ...">` replaced; inner image `overflow-hidden` retained | **VERIFIED** (semantic side effect: `article` → `div`, see D1) |
| 9 | `.spotlight-*` rules in global.css at 301–363, with pointer-coarse opt-out and focus-within activation | Block at `global.css:301-363` (`:301` comment, `:351-356` `data-spotlight-active` + `:focus-within` selectors, `:358-363` `@media (pointer: coarse) { display: none }`); border layer uses radial `mask-image` (`:328-337`), glow layer radial 600px (`:341-347`) | **VERIFIED** |
| 10 | Change 2: `rounded-t-xl` on image link + inner container | `ProjectCard.astro:15` (`a.project-image ... rounded-t-xl`) and `:16` (`div.aspect-video ... rounded-t-xl`) | **VERIFIED** |
| 11 | Change 2: tags carry `hover:bg-surface hover:text-accent hover:ring-accent`; no-op `group-hover:ring-hairline` removed | `ProjectCard.astro:41` and `:46` — both spans have the three hover utilities; diff confirms `group-hover:ring-hairline` removed from first span; second span also gained `transition-colors duration-200` (not mentioned in summary, benign) | **VERIFIED** |
| 12 | Change 3: `.tools-ticker` with `.ticker-track` and 2 `.ticker-group`s, second `aria-hidden`; old `.tools-container` box removed | `SkillsSection.astro:78-91`; group 2 has `aria-hidden="true"` at `:85`, `tabindex="-1"` sits on each inner `.ticker-item` span (`:87`), not on the group div; diff confirms old `tools-container rounded-xl bg-surface p-6 ring-1` box and `tools-grid`/`tool-item` markup removed | **VERIFIED** (wording imprecision, see D5) |
| 13 | Change 3: `--ticker-duration: 45s`, `@keyframes ticker-scroll` with `translateX(-50%)`, mask fades, hover pause, reduced-motion static fallback | `global.css:365-415`: `--ticker-duration: 45s` (`:367`), mask `12%/88%` (`:369-370`), hover pause (`:378-380`), keyframe `to { transform: translateX(-50%) }` (`:406-408`), `prefers-reduced-motion` → `animation: none` + mask removed (`:409-415`) | **VERIFIED** (block ends at 415, not 414 — trivial, D4) |
| 14 | Change 4: zero `section-eyebrow` hits in `src/` | `grep section-eyebrow src/` → 0 hits; diff shows the 4 `<span>` removals (About/Projects/Skills/Contact) and the `.section-eyebrow` CSS block removed from global.css | **VERIFIED** |
| 15 | "bun run check → 0 errores (19 archivos)" | Re-executed: `Result (19 files): 0 errors, 0 warnings, 0 hints` | **VERIFIED** |

## Deviations (summary vs. actual)

- **D1 — Undocumented semantic change (material)**: `ProjectCard.astro` root was `<article class="project-card">`; `<SpotlightCard>` renders a plain `<div data-spotlight>`, so every project card lost its `article` element. Not mentioned anywhere in summary.md. Conflicts with the project's own Astro standard ("does the HTML stay semantic" — astro-best-practices review checklist).
- **D2 — Line-count drift**: summary claims `SpotlightCard.astro` "1–90"; actual file is 81 lines.
- **D3 — Line-range drift**: ticker markup is `SkillsSection.astro:72-91`, summary says "73–93".
- **D4 — Line-range drift**: ticker CSS block spans `global.css:365-415`, summary says "365–414".
- **D5 — Attribute placement wording**: summary says the second group has "`aria-hidden` y `tabindex="-1"`"; actual: `aria-hidden` on the group `div:85`, `tabindex="-1"` on each child span (`:87`). Intent-equivalent, description imprecise.
- **D6 — Untracked files beyond the summary's scope**: `.atl/`, `.playwright-mcp/`, `build.log`, `check.log`, `verify-report.candidate.md`, and `openspec/` itself are all untracked. None touch `src/`, but they affect commit scoping (what to ignore vs. commit) and are not addressed by the summary.

## Quality / a11y flags for the future proposal

- **Q1 — View-transition init convention drift**: `Header.astro:188-189` (project's own pattern) listens to **both** `astro:page-load` and `astro:after-swap` with an anti-duplicate guard; `SpotlightCard.astro:80` listens to `astro:after-swap` only, plus a top-level call. `astro:after-swap` does not fire on bfcache/history traversal (`astro:pageshow`/`page-load` do), so cards restored that way could remain uninitialized. The `:not([data-spotlight-init])` selector is a correct double-binding guard. Fix is one line: add `astro:page-load` listener, matching Header.astro.
- **Q2 — Reduced-motion ticker content becomes unreachable**: fallback sets `animation: none` and removes the mask, but `.tools-ticker` keeps `overflow: hidden` and `.ticker-track` keeps `width: max-content` — tools beyond the viewport are permanently invisible with no scroll or wrap. Needs `flex-wrap` or `overflow-x: auto` in the fallback.
- **Q3 — Ticker a11y details**: `aria-hidden="true"` on the duplicate group is the right call (screen readers get the list once from group 1). However, `aria-label="Herramientas y tecnologías"` on the `.tools-ticker` div (`SkillsSection.astro:78`) is unreliable — `aria-label` on a generic `div` without a role is ignored by much AT; and `tabindex="-1"` on non-focusable spans is redundant (harmless). Also: the second (aria-hidden) group still renders visually while paused on hover — fine, purely decorative.
- **Q4 — Hover states are pointer-only**: ticker hover-pause (`.tools-ticker:hover`) and `.ticker-item:hover` color do nothing on touch; the `pointer: coarse` opt-out exists only for the spotlight, not the ticker. On touch the marquee scrolls with no way to stop it — acceptable for decorative text but worth an explicit decision in the proposal.
- **Q5 — Orphan CSS check: clean**: `.tools-container` / `.tool-item` / `.tools-grid` had **no rules in global.css at HEAD** (verified via `git show HEAD:src/styles/global.css`) — they were Tailwind-only markup hooks. Current file has zero hits. No dead CSS left from the removed box.
- **Q6 — Duplicated default color**: `rgba(0, 153, 255, 0.15)` appears both as the Astro prop default (`SpotlightCard.astro:27`) and as the CSS `var()` fallback (`global.css:346`). Minor maintenance coupling; fine to keep, note for consistency if a theme token (`--color-accent`) could be used instead.

## Evidence for the proposal (paths + keep/change notes)

| Path | Role | Note for proposal |
|---|---|---|
| `src/components/SpotlightCard.astro` (new, 81 lines) | Reusable spotlight wrapper | **Keep**; consider Q1 (add `astro:page-load`); optionally accept a root-tag prop to fix D1 |
| `src/components/ProjectCard.astro` | Only current consumer | **Keep**; D1 fix (restore `article` semantics) is the only structural candidate |
| `src/components/SkillsSection.astro:72-91` | Ticker markup | **Keep**; Q3 (drop or fix `aria-label` target) optional |
| `src/styles/global.css:301-363` | Spotlight styles | **Keep** |
| `src/styles/global.css:365-415` | Ticker styles | **Keep**; Q2 (reduced-motion reachability) is the strongest fix candidate |
| `src/components/{About,Projects,Skills,Contact}Section.astro` | Eyebrow removals | **Keep** as-is, complete |
| `src/layouts/Layout.astro:63` | `<ClientRouter />` | Context only — proves after-swap fires |
| `openspec/changes/session-ui-polish-2026-09-10/summary.md` | Session record | Registration baseline for proposal |

## Open questions

1. **article→div (D1)**: restore `<article>` inside the spotlight content, or accept plain-div cards? (Design call; affects the proposal's scope — currently out of the four stated changes.)
2. **Q1 + Q2**: are these folded into the formal proposal as hardening tasks, or tracked separately? Both are 1-3 line fixes.
3. **Commit scoping (D6)**: which untracked artifacts get gitignored (`.playwright-mcp/`, `*.log`, `verify-report.candidate.md`, `.atl/`) and whether `openspec/` is committed to the repo.
4. **Pending decisions carried from summary.md** (not part of this baseline): SVG logos in ticker (requires `skills.tools` schema change `string[]` → `{name, icon?}`) and `--ticker-duration` tuning.

## Readiness

Baseline is real, complete, and type-clean: all four summary changes exist in the working tree exactly as claimed (modulo cosmetic line-number drift and one undocumented `article`→`div` semantic side effect). Ready for **propose** to formally register this work, optionally folding Q1/Q2 in as explicit hardening requirements.
