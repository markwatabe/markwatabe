import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
});

// Set INCLUDE_DRAFTS=true (see `npm run dev:drafts`) to build the
// unpublished posts in ./drafts alongside the real ones.
const includeDrafts = process.env.INCLUDE_DRAFTS === 'true';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema,
});

const drafts = defineCollection({
	loader: glob({
		base: './drafts',
		pattern: includeDrafts ? ['**/*.{md,mdx}', '!README.md'] : [],
	}),
	schema,
});

export const collections = { blog, drafts };
