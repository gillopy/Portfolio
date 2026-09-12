// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';          // default export = plugin function
import rehypeKatex from 'rehype-katex';        // default export = plugin function
import siteConfig from './src/data/siteConfig.json' with { type: 'json' };

const resolvedSite = process.env.SITE_URL?.trim() || siteConfig.siteUrl;
if (resolvedSite.includes('portfolio-netlify-placeholder')) {
  console.warn('[seo] placeholder siteUrl in use — set SITE_URL env or update src/data/siteConfig.json before production deploy');
}

// https://astro.build/config
export default defineConfig({
  site: resolvedSite,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },     // unchanged; flows through unified route
    processor: unified({
      remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]], // tuple form; docs-attested
      rehypePlugins: [rehypeKatex],
    }),
  },
});