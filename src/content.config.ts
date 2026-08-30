import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({
		pattern: '**/*.mdx',
		base: './src/content/projects',
		generateId: ({ entry }) => (entry.split('/').pop() ?? entry).replace(/\.[^/.]+$/, ''),
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			shortDescription: z.string(),
			tags: z.array(z.string()),
			links: z.object({
				demo: z.string(),
				github: z.string(),
				pdf: z.string().optional(),
				ipynb: z.string().optional(),
			}),
			// Cover image lives in the same folder as the MDX entry.
			cover: image(),
		}),
});

export const collections = { projects };