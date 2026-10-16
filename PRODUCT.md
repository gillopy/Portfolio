# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences share one surface, and the repository evidences both:

- **Hiring managers and technical recruiters** evaluating Guillermo Cabrera for a full-time,
  remote-first data science or applied economics role. `src/data/profile.json` states
  `Disponibilidad: Tiempo completo, Remoto`, and the site's primary CTA is a project tour.
- **Prospective clients** who already have data and want an end-to-end result. The contact
  section is framed around that job ("Cuéntame qué quieres construir y qué resultado buscas")
  and commits to a response window.

Both arrive from a CV, LinkedIn or GitHub link, usually on a first visit with no prior
context, and decide within one scroll whether to make contact.

> **Open decision (not established):** the relative priority of the two audiences. The
> repository gives them equal weight; if one should lead, the hero CTA and the contact copy
> are the levers.

## Product Purpose

A personal portfolio for a Paraguayan economist and data scientist. It exists to convert a
cold visit into a conversation by proving the work rather than asserting it: six documented
projects with code, metrics and narrative, plus long-form articles that demonstrate method.

Success means an inbound contact — an interview or a project enquiry.

## Positioning

A working observatory, not a gallery. Every project on the site is a real pipeline with a
public repository, a stated method and visible output; the long-form articles reproduce the
statistics rather than summarizing them. The differentiator a neighbouring portfolio could
not copy is the combination of econometric rigour and deployable engineering — forecasting
and time-series work that has actually shipped, in a regional (Paraguay / Latin America)
context most data portfolios ignore.

## Operating Context

- Content is file-based and authored in Markdown/MDX next to its images, one directory per
  project or article (`src/content/projects/<slug>/`, `src/content/articles/<slug>/`).
- Publishing a project or article means adding a directory with frontmatter (title,
  description, tags, links, cover) — not editing components.
- The site is bilingual-adjacent but Spanish-first: all UI copy and content are in Spanish
  (`es_PY`), with English technical terms left untranslated.
- Contact is a Formspree POST; the CV is an external Google Drive link.
- Deployment is Cloudflare Pages (`guillermocabrera.pages.dev`); the canonical URL is
  configured through `SITE_URL` or `src/data/siteConfig.json`.

## Capabilities and Constraints

Confirmed functionality:

- Home with six sections: hero, about, projects, articles, stack, contact.
- Project detail pages rendering MDX with KaTeX display math, syntax-highlighted code and
  GFM tables; article pages with the same rendering plus a reading layout.
- Content collections with typed frontmatter (`src/content.config.ts`).
- Light and dark themes, persisted in `localStorage`, with a full token override set for
  light and a no-flash inline theme script in the document head.
- SEO layer: canonical URLs, Open Graph and Twitter cards, JSON-LD (`Person` + `WebSite` on
  the home, `Blog` on the articles index), sitemap, `robots` control per route.
- Client-side routing via Astro's `ClientRouter`, with every script written to survive
  `astro:page-load` / `astro:after-swap` and to tear down on `astro:before-preparation`.

Constraints:

- No backend. The only server interaction is the third-party Formspree endpoint.
- Astro 7 with Tailwind 4 (via `@tailwindcss/vite`) and GSAP for scroll-driven motion.
- `astro check` and `astro build` are memory-heavy on the author's machine; they are run
  deliberately rather than on every save.

## Brand Commitments

- The name **Guillermo Cabrera** and the **GC / "Data Observatory"** monogram lockup, used
  identically in the header and the footer.
- The framing "Observatorio de datos" — the observatory metaphor is the identity, not a
  section title.
- Spanish-first voice: direct, technical, first person, no hype adjectives.
- Real assets only. The portfolio portrait is a photograph; the hero illustration is an
  authored canvas, not stock.

## Evidence on Hand

- `src/data/profile.json` — name, title, summary, about copy, professional details, social
  handles, portrait path.
- `src/data/siteConfig.json` — canonical URL, nav items, form endpoint, social handle.
- Six project case studies with covers, extra figures and full MDX narrative.
- Three long-form articles with generated figures and covers.
- `public/` — favicon set, web manifest, profile photograph, default OG image.

**Absences future work must not fabricate:** there are no client testimonials, no logos, no
pricing, no employment history and no benchmark numbers beyond those inside individual
project write-ups. Do not invent them.

## Product Principles

1. **Evidence over adjectives.** A claim ships with a repository, a figure or a metric, or it
   does not ship.
2. **The work leads; the interface recedes.** Projects and articles are the content. Chrome
   that does not help a visitor evaluate the work is noise.
3. **One scroll to a decision.** The hero must establish who this is, what they do and what
   to do next without requiring a second page.
4. **Technical register, honest numbers.** The visual and verbal language is the data
   practitioner's, and no metric is stated more precisely than the underlying run supports.
5. **Local first.** The site reflects a Paraguay/Latin America practice; regional context is
   an asset, never a caveat.

## Accessibility & Inclusion

- WCAG AA is the working standard for text contrast in both themes.
- All motion is guarded: `prefers-reduced-motion` disables scroll reveals, the progress bar
  and the reduced-motion path of the canvas illustration.
- Keyboard support is a requirement: visible focus rings, a skip link, logical tab order,
  `aria-label` on icon-only controls and a mobile menu that closes on `Escape`.
