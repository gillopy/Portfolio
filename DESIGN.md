---
name: Guillermo Cabrera — Data Observatory
description: A dark, instrument-panel portfolio for an economist and data scientist.
colors:
  canvas: "#090909"
  canvas-deep: "#0f0f0f"
  surface: "#141414"
  surface-raised: "#1c1c1c"
  surface-hover: "#212121"
  hairline: "#262626"
  hairline-soft: "#1a1a1a"
  ink: "#ffffff"
  ink-muted: "#999999"
  ink-faint: "#808080"
  signal-blue: "#0099ff"
  signal-blue-hover: "#3da9ff"
  signal-violet: "#7c5cff"
  signal-chartreuse: "#c6ff4a"
  signal-online: "#34d399"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.95rem, 8vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "15px"
  xl: "20px"
  "2xl": "16px"
  pill: "100px"
spacing:
  hairline: "8px"
  inline: "12px"
  stack-sm: "16px"
  stack-md: "24px"
  stack-lg: "32px"
  block: "56px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1rem"
    height: "44px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1rem"
    height: "44px"
    typography: "{typography.label}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  input-text:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
    height: "44px"
    typography: "{typography.body}"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "0"
  chip-tag:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
    typography: "{typography.label}"
---

# Design System: Guillermo Cabrera — Data Observatory

## Overview

**Creative North Star: "The Data Observatory"**

This is an instrument panel, not a portfolio theme. The page is dark because the work happens
in dark rooms — satellite passes, overnight training runs, terminal output — and the interface
is built from the vocabulary of measurement: hairline rules, monospaced readouts, index
numbers, a graticule, a planet of signal. Nothing decorates; everything either locates the
visitor or reports a fact.

The density is low and the contrast is high. Large type is reserved for the name and the three
capability words, and everything around them drops immediately to 11–17px. Colour is almost
absent by design: a single signal blue carries every accent, a violet and a chartreuse appear
only as data-channel colours on the canvas illustration, and green exists solely to say
"available". The rest is a five-step grey ramp that separates canvas, surface and hairline
without ever drawing a visible line where a surface change would do.

Motion is one authored moment per area: content arrives once on scroll and then stays put. The
signature is the hero illustration — a hand-built orthographic globe of eleven thousand
particles with four orbiting stations reading the ML pipeline — which is drawn to canvas
rather than imported, so it can follow the theme tokens live.

**Key Characteristics:**

- Obsidian canvas with tonal surface steps instead of borders where possible.
- One accent colour, used sparingly enough to stay a signal.
- Monospace is reserved for measurement, labels and code — never as a costume for "technical".
- Hairlines and vertical rules carry structure; whitespace carries grouping.
- Motion is scroll-triggered, single-shot and fully disabled under `prefers-reduced-motion`.

> The YAML frontmatter above records the **dark palette**, which is the default. The light
> theme remaps the same token names; the override map is in the Colors section.

## Colors

A near-black five-step neutral ramp for structure, one signal blue for action, and three
reserved channel colours that appear only inside the data illustration.

### Primary

- **Signal Blue** (#0099ff): the only interactive accent. Selection, focus rings, the active
  nav underline, the section-title rule, link text inside content, the spotlight border on
  card hover, and the final character-glyph stop on the name. It marks action and current
  state — never decoration.

### Secondary

- **Signal Violet** (#7c5cff): a data channel, not a UI accent. It tints one landing-mass
  group on the globe, one orbit, and the hero's secondary ambient glow. It should never
  appear on a control.

### Tertiary

- **Signal Chartreuse** (#c6ff4a): the third data channel, used for one continental group on
  the globe. It is intentionally outside comfortable UI territory; keeping it inside the
  canvas is what stops it looking accidental.

### Neutral

- **Obsidian Canvas** (#090909): the page floor. Everything sits on it or above it.
- **Obsidian Deep** (#0f0f0f): recessed fills — the contact info panel, input backgrounds.
- **Graphite Surface** (#141414): the raised plane. Cards, the hero header shell, the primary
  button at rest.
- **Graphite Raised** (#1c1c1c): the hover plane for anything sitting on Graphite.
- **Graphite Hover** (#212121): reserved for the deepest interactive step (form submit hover).
- **Hairline** (#262626): every visible 1px structure — card borders, section rules, dividers,
  the scrollbar thumb.
- **Hairline Soft** (#1a1a1a): divisions *inside* a surface, where a full hairline would read
  as a hard edge (table rows, contact list separators).
- **Ink / Ink-Muted / Ink-Faint** (#ffffff / #999999 / #808080): a three-step text ramp.
  Body and summary copy uses Ink-Muted; micro-labels use Ink-Faint.

### Named Rules

**The One Signal Rule.** Signal Blue marks action, selection or current state. If an element is
not interactive and not currently selected, it does not get the accent. Its rarity is the point.

**The Semantic Status Rule.** Availability is `--color-status-online` (#34d399 dark, #128a4a
light) and nothing else. Never reuse a channel colour (violet, chartreuse) or a raw palette
utility for a status meaning.

**The No-Opacity-Text Rule.** Secondary text is a *token* (Ink-Muted, Ink-Faint), never a
muted colour faded with alpha. `text-ink-muted/70` measured 3.75:1 and failed AA; the token at
full opacity measures 5.04:1.

### Light theme override map

The light theme overrides these custom properties under `html[data-theme="light"]`. Accent
values were re-derived to clear AA on the light canvas; `--code-bg` and `--on-accent` are
deliberately pinned dark in both themes because Shiki's `github-dark` foreground must stay
readable on the code card.

| Token | Dark (default) | Light |
| --- | --- | --- |
| `--color-canvas` | #090909 | #fbfbfb |
| `--color-canvas-2` | #0f0f0f | #f4f4f4 |
| `--color-surface` | #141414 | #ffffff |
| `--color-surface-2` | #1c1c1c | #ececec |
| `--color-surface-3` | #212121 | #e0e0e0 |
| `--color-hairline` | #262626 | #e4e4e4 |
| `--color-hairline-soft` | #1a1a1a | #eeeeee |
| `--color-ink` | #ffffff | #171717 |
| `--color-ink-muted` | #999999 | #565656 |
| `--color-ink-faint` | #808080 | #6b6b6b |
| `--color-accent` | #0099ff | #006fdd |
| `--color-accent-hover` | #3da9ff | #0062c4 |
| `--color-accent-2` | #7c5cff | #6a4cf5 |
| `--color-accent-3` | #c6ff4a | #4f7d00 |
| `--color-status-online` | #34d399 | #128a4a |

## Typography

**Display Font:** Space Grotesk (fallback `sans-serif`)
**Body Font:** DM Sans (fallback `sans-serif`)
**Label/Mono Font:** JetBrains Mono (fallback `monospace`)

**Character:** A geometric grotesque with slightly mechanical curves carries the headings; a
humanist sans keeps long-form reading comfortable; a mono face handles anything that is a
measurement, an identifier, a label or code. The pairing reads as "technical practice,
human practitioner" — which is the product's whole claim.

### Hierarchy

- **Display** (700, 2.95rem → 5.2rem across breakpoints, line-height 0.9, tracking -0.04em):
  the name in the hero only. The tracking floor is hit exactly here and nowhere else.
- **Headline** (700, 1.875rem → 2.25rem, line-height 1.15, tracking -0.02em): section titles
  on the home page and the article index. Carries a 48px accent rule beneath it that widens
  to 80px on hover, with a soft accent bloom on the lettering.
- **Title** (700, 1.125–1.25rem, line-height 1.15–1.35, tracking -0.02 to -0.03em): project
  card names, article row titles, contact panel headings, MDX `h2`/`h3` inside content.
- **Body** (400, 0.875–1.15rem, line-height 1.6–1.7): summaries, card copy, prose. The hero
  summary caps at 58ch and the contact copy at 48ch. The about paragraphs carry no character
  cap at all — they run to ~90 characters per line at 1440px — and the article/project reading
  column is a fixed `max-w-4xl` (896px) rather than a measure. Both are **known gaps**, not
  intended behaviour; a 65–75ch cap is the target.
- **Label** (500, 0.6875rem, tracking 0.08–0.14em, uppercase): category labels, dates,
  technology tags, the "Respuesta < 24h" note, table headers, the readout strip. The
  11px floor is the designed minimum for functional text.

### Named Rules

**The Mono Means Measured Rule.** JetBrains Mono is only for code, data, identifiers,
measurements and labels. It is never used to make a marketing line feel technical.

**The 0.04em Floor Rule.** Negative tracking stops at -0.04em, and only the hero name reaches
it. Everything else sits between -0.01em and -0.03em; tighter reads as a compression artefact.

## Layout

A single centred container capped at 1280px with 24px gutters at every breakpoint. Vertical
rhythm is generous and uniform: every home section opens with `padding-block: 96px`, a
gradient hairline at its top edge, a heading block, a 40px rule, then content.

The home is a vertical scroll of six full-width bands with no sidebar and no sticky
sub-navigation — the header is the only persistent control. Two content patterns repeat:
a two-up card grid capped at 1024px for projects, and a full-width flat row list for
articles, where each row is a single `<a>` with a bottom hairline and the last row's border
removed.

The hero is the one asymmetric composition: a 58/42 split that becomes a stack below 1024px.
At `lg` and up, the professional title moves out of the flow and into a second grid column
beside the name, bottom-aligned with the name block, so it reads as part of the heading rather
than as a line of its own.

Breakpoints follow Tailwind defaults, with two project-specific decisions: the desktop
navigation appears at **900px** (not 1024px, to protect the 768–899px band), and the hero's
three capability words sit in one row from 640px up.

Detail routes (article and project) drop the marketing rhythm entirely: a 20px `border-b`
header bar with a back link, then a fixed `max-w-4xl` (896px) reading column at 48px vertical
padding. Session-specific detail: the header component is **not** rendered on those routes,
because its nav items are home-page anchors that would all be dead links.

## Elevation & Depth

**Tonal, not shadowed.** The system conveys depth by moving between the five neutral steps —
canvas → deep → surface → raised → hover — and by declaring each edge exactly once: either a
hairline border or a shadow, never both. Most surfaces (cards, panels) use a border in the
dark theme and shift to a shadow vocabulary in the light theme, where a border alone reads as
a wireframe on white.

Four shadows exist, each scoped to one role and each with a theme-specific value:

### Shadow Vocabulary

- **Hero shell** (`--header-shell-shadow`): under the floating header pill in the hero state.
  Dark: `0 8px 32px rgba(0,0,0,0.35)`. Light: `0 8px 24px rgba(23,23,23,0.10)`.
- **Portrait lift** (`--shadow-portrait`): behind the about-section portrait, paired with a
  blurred shade layer. Dark: `0 16px 40px rgba(0,0,0,0.5)`. Light: two layers inside the
  contracted 0.08–0.12 alpha band.
- **Card hover** (`--shadow-card-hover`): available for raised interactive cards. Dark:
  `0 16px 40px rgba(0,0,0,0.4)`. Light: `0 10px 28px rgba(23,23,23,0.09)`.
- **Hero panel** (`--shadow-hero`): the largest lift, used on the hero's framed surfaces.

### Named Rules

**The One Declaration Rule.** A surface gets a border or a shadow, never both. A 1px border
under a wide soft shadow is the ghost card this system avoids.

**The Alpha Band Rule.** Light-theme shadows stay inside 0.08–0.12 alpha. Anything heavier
reads as a dark-theme value pasted onto a light surface.

## Shapes

The form language is **control-panel rectangles with soft corners**. Corner radius is
functional and small, and the project overrides Tailwind's radius scale with its own values:
6px on buttons and code-copy controls (`--radius-sm`), 10px on chips and the skip link
(`--radius-md`), 15px on code cards and inline images (`--radius-lg`), 20px on form fields
(`--radius-xl`). Cards and panels use 16px — Tailwind's unmodified `rounded-2xl` — so the
project's own scale sits *inside* the card radius rather than replacing it. Nothing is fully
rounded except true circles (status dots, the portrait, the scroll-to-top control) and the
100px pill, which is reserved for small inline badges.

Borders are always exactly 1px and always `--color-hairline`, except inside a surface where
`--color-hairline-soft` prevents a hard seam. There is no coloured left or right border
anywhere in the system; status and emphasis are carried by dots, rules under headings, and
full-width top rules.

Clipping is used deliberately in two places: project covers are clipped to the card's top
corners (`16px 16px 0 0`) and carry an inset hairline so a light cover still sits inside the
dark world; and the ticker rails are masked with a horizontal gradient at both edges so items
fade rather than cut.

## Components

### Buttons

- **Shape:** gently squared, 6px radius, 44px minimum height.
- **Primary:** Graphite Surface fill with a Hairline border and Ink text, 11px monospace
  uppercase at 0.14em tracking. This is deliberately *not* a filled accent button — the
  accent arrives on hover, which is what keeps the One Signal Rule intact.
- **Hover / Focus:** the surface steps up to Graphite Raised, the border turns Signal Blue,
  and the button lifts 1px. Focus is a 2px Signal Blue outline at 3px offset, global.
- **Secondary:** identical geometry with Ink-Muted text at rest, resolving to Ink on hover.
- **Ghost:** no border and no fill — monospace uppercase Ink-Muted that lifts to Ink and
  widens its gap on hover. Used for in-flow "start a conversation" links.
- **Form submit:** the one intentional exception, and it is scoped to the forum: a 15px
  radius, sentence-case, semibold DM Sans button with a permanent accent border. Forms want
  readable labels more than they want consistency with the toolbar.

### Chips

- **Style:** Graphite Raised fill, 1px Hairline ring, Ink-Muted 11px monospace, 10px radius.
- **State:** article tag chips lift their text to Signal Blue on hover. Technology tags on
  project cards are separator-delimited text rather than chips, and a `+N` overflow marker in
  Signal Blue reports the hidden count.

### Cards / Containers

- **Corner Style:** 16px radius, covers clipped to the top corners.
- **Background:** Graphite Surface on the Obsidian Canvas floor.
- **Shadow Strategy:** border only at rest; see Elevation & Depth.
- **Border:** 1px Hairline drawn by the spotlight layer, which is transparent until hover.
- **Internal Padding:** 24px horizontal, 20px top and 24px bottom around the text block.
- **Distinctive behaviour:** the **spotlight card** — a cursor-tracked radial mask lights only
  the border segment under the pointer while a 600px radial glow follows it inside the card.
  Both layers are `display: none` on coarse pointers, so touch devices get a clean card.

### Inputs / Fields

- **Style:** Obsidian Canvas fill recessed inside a Graphite Surface panel, 1px Hairline
  border, 20px radius, 44px minimum height.
- **Focus:** the border shifts to Signal Blue at 70% with a 1px Signal Blue ring at 10%. The
  global 2px outline is suppressed here so the field's own focus treatment reads.
- **Caret:** Signal Blue, set globally.
- **Error / Disabled:** not implemented; the form relies on native validation and a hidden
  honeypot field.

### Navigation

- **Style:** a 10px JetBrains Mono uppercase label set at 0.14em tracking, Ink-Muted at rest.
- **Default / hover / active:** a 1px Signal Blue rule sits under the current item; on hover
  the same rule animates in from 0 to full width over 300ms.
- **Header behaviour:** two states. In the hero it is a floating 12px-radius pill with
  `backdrop-filter: blur(16px)`, transparent page background and a hairline border. Past 32px
  of scroll it becomes a flush sticky bar with an 80% canvas background. The two thresholds
  differ (enter at 32px, leave at 4px) because the header itself changes height by ~22px —
  without that hysteresis the layout change re-triggers the scroll test and flickers.
- **Mobile treatment:** below 900px the links collapse into a hamburger; the panel animates
  open with the Web Animations API on a height curve, traps nothing, closes on `Escape`, on an
  outside click, and automatically once the page scrolls more than 12px.

### Signature Components

**The Data Planet.** A dependency-free canvas illustration in the hero: an orthographic globe
of land and ocean particles derived from simplified Natural Earth polygons, a sparse proximity
network across landmasses, a graticule, and four tilt-orbit stations whose icons read the
pipeline (database → model → container → inference). It reads its palette from the live CSS
custom properties and redraws on theme change, pauses when offscreen, hidden or reduced-motion
(where it renders one static frame aligned to South America), and tears down its observers and
listeners on client-router navigation.

**The Tool Rail.** Two counter-scrolling marquee rows of the toolchain, 45s per cycle, edge
masked, with hover and focus dropping playback rate to 0.33 via the Web Animations API rather
than a CSS duration change (which would jump). Under reduced motion the animation stops and
the duplicated group is hidden so the list wraps and stays fully readable.

**The Reading Surfaces.** Project and article bodies render MDX through a shared typographic
layer: a fixed 896px column, 11px monospace uppercase table headers, 15px-radius code cards
pinned to `github-dark` in both themes with line numbers and a copy button, and
`katex-display` math that scrolls horizontally instead of overflowing. GFM tables fall back to
locally scrollable blocks below 640px rather than pushing the page wide.

## Do's and Don'ts

### Do:

- **Do** declare elevation once per surface — a 1px Hairline border *or* a shadow, never both.
- **Do** express secondary text with the Ink-Muted / Ink-Faint tokens. Both clear AA on the
  canvas at full opacity.
- **Do** keep body and prose measure between 58ch and 75ch.
- **Do** route every "available" indicator through `--color-status-online` in both themes.
- **Do** give every interactive element a minimum 44×44px target and a visible focus ring.
- **Do** guard any new motion behind `prefers-reduced-motion` and tear down listeners on
  `astro:before-preparation`.
- **Do** keep functional text at 11px or above.
- **Do** read the palette from CSS custom properties at runtime if a canvas or WebGL surface
  needs it, so it follows the theme swap.

### Don't:

- **Don't** put Signal Blue on a non-interactive, non-selected element. The accent loses its
  meaning the moment it becomes decoration.
- **Don't** fade text with alpha to create a hierarchy step; use the ramp token.
- **Don't** use the violet or chartreuse channel colours on UI controls — they belong to the
  data illustration.
- **Don't** use JetBrains Mono to make a marketing sentence feel technical.
- **Don't** exceed -0.04em negative tracking, and don't apply it anywhere except the hero name.
- **Don't** add fully rounded corners to cards or panels; circles and the 100px badge pill are
  the only exceptions.
- **Don't** stack a hairline border under a wide soft shadow.
- **Don't** mix the toolbar button language (mono, uppercase, 6px radius) into body copy or
  prose links — it is a control vocabulary, not a text style.
- **Don't** introduce a second status colour; availability is green and only green.
