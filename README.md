# Portfolio Website

A modern, responsive portfolio built with Astro and Tailwind CSS that showcases data-science projects, long-form articles, skills and contact info — with scroll-driven animations and dedicated detail views. Site content is in Spanish (locale `es_PY`); this README is in English.

## 🚀 Features

- **Responsive design**: fully responsive layout for all devices
- **Dark / light theme**: persisted toggle with a flash-of-unstyled-content guard in the page head
- **Scroll animations**: GSAP + ScrollTrigger reveals, parallax and a progress bar (reduced-motion aware)
- **Content collections**: projects and articles written as MDX with typed frontmatter
- **Code highlighting**: Shiki syntax highlighting with a copy button on every code block
- **Math support**: KaTeX rendering inside MDX via remark-math + rehype-katex
- **Contact form**: Formspree-backed; the endpoint lives in `src/data/siteConfig.json`
- **SEO**: canonical URLs, Open Graph images, `robots.txt` and a generated sitemap (`@astrojs/sitemap`)

## 🛠️ Technologies

- [Astro](https://astro.build/) — the web framework for content-driven websites
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first CSS with a CSS-first setup (no JavaScript config file)
- [GSAP + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scroll-driven animations
- [Bun](https://bun.sh/) — package manager & runtime (migrated from npm)
- [TypeScript](https://www.typescriptlang.org/) — typed client scripts and content schemas

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.1+) — check with `bun --version`
- [Node.js](https://nodejs.org/) (v18+ required by Astro tooling; the package manager is Bun)

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/gillopy/Portfolio.git
cd Portfolio
```

2. **Install dependencies**

```bash
bun install
```

3. **Start the development server**

```bash
bun run dev
# open http://localhost:4321
```

## 🧭 Commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server on `0.0.0.0:4321` |
| `bun run build` | Production build into `dist/` |
| `bun run check` | Type-check templates and scripts (`astro check`) |
| `bun run preview` | Serve the latest build locally |

## 📚 Project Structure

```
/
├── public/                  # Static files: favicons, OG images, robots.txt, Cloudflare _headers
├── scripts/
│   └── seo-assets.mjs       # Idempotent generator for favicons / OG / PWA icons
├── src/
│   ├── components/          # Sections and UI (Hero, About, Projects, Articles, Skills, Contact…)
│   ├── content/
│   │   ├── projects/        # One folder per project: MDX entry + cover + supporting images
│   │   └── articles/        # One folder per article: MDX entry + cover + figures
│   ├── data/                # JSON config: profile.json, siteConfig.json, skills.json
│   ├── layouts/             # Layout.astro shell + Project/Article detail layouts
│   ├── pages/               # index.astro, 404.astro, project/[id].astro, articles/[slug].astro
│   ├── scripts/             # Client runtimes: theme.ts, copy-buttons.ts, animations.ts
│   ├── styles/              # global.css — Tailwind 4 theme tokens, typography, keyframes
│   ├── content.config.ts    # Typed collections: projects, articles
│   └── env.d.ts             # Ambient Astro types
├── astro.config.mjs         # Site URL, MDX + sitemap integrations, Tailwind plugin, KaTeX
├── tsconfig.json            # Astro strict presets
└── vercel.json              # Vercel cache headers (Cloudflare reads public/_headers)
```

## 🧩 Customization

### Projects & articles (MDX)

Content lives in two Astro collections defined in `src/content.config.ts`:

- **`projects`** — `src/content/projects/<id>/<id>.mdx`: title, short description, tags, links (demo/GitHub, optional PDF/notebook) and a folder-local `cover` image. Shown in the projects section and rendered at `/project/<id>`.
- **`articles`** — `src/content/articles/<slug>/<slug>.mdx`: adds `publishDate` (newest-first ordering) and an `attribution` credit. Shown in the articles section and rendered at `/articles/<slug>`.

Add a folder with an MDX file and its images and the entry appears automatically; the `cover: image()` field lets Astro optimize each cover at build time.

### JSON data (`src/data/`)

- `profile.json` — name, headline, summary, about text and social links (used by the hero, about, contact and footer sections)
- `siteConfig.json` — title, description, canonical `siteUrl`, Twitter handle, locale, nav items, Formspree endpoint and "more projects" link
- `skills.json` — the `tools` list rendered by the skills ticker

### Styling & fonts

Theme colors, spacing and effects are defined CSS-first in `src/styles/global.css` (Tailwind 4 has no JavaScript config file). Typography loads three faces from Google Fonts in `src/layouts/Layout.astro`: **Space Grotesk** (display), **DM Sans** (body) and **JetBrains Mono** (code).

## 🚢 Deployment

`bun run build` produces a fully static site in `dist/`, deployed to **both Vercel and Cloudflare Pages**:

- **Canonical origin**: `https://guillermocabrera.pages.dev` — declared in `src/data/siteConfig.json` and `public/robots.txt`, and emitted in canonical, OG and sitemap URLs.
- `vercel.json` and `public/_headers` set immutable cache headers for build assets on each host — **keep both**.
- **`SITE_URL` precedence**: `astro.config.mjs` resolves the origin as `process.env.SITE_URL?.trim() || siteConfig.siteUrl`. A `SITE_URL` environment variable set at deploy time overrides `siteConfig.json`; leave it unset (or set it to the canonical origin) so generated metadata stays on `pages.dev`.
- Build command `bun run build`, publish directory `dist`.

## 🙏 Acknowledgments

- Design inspiration: [Guillermo Cabrera's Portfolio](https://guillermocabrera.pages.dev/)
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- Icons drawn as inline SVG in the components

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change, then submit a pull request.

## 📬 Contact

If you have any questions or feedback, please reach out through the contact form on the website or create an issue in this repository.

---

Made with ❤️ using [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/gillopy/Portfolio)
