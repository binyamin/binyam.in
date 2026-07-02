import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type SchemaContext } from 'astro:content';

const Post = ({ image }: SchemaContext) =>
	z.object({
		title: z.string().nonempty(),
		description: z.string().nonempty().optional(),
		date: z.coerce.date(),
		modified: z.coerce.date().optional(),
		thumbnail: image().optional(),
		tags: z.array(z.string().nonempty()).min(1).optional(),
		folders: z.array(z.string().nonempty()).min(1).optional(),
		elsewhere: z.array(z.httpUrl()).min(1).optional(),
	}).strict();

const blog = defineCollection({
	loader: glob({ base: './content/blog', pattern: '**/*.md' }),
	schema: (c) =>
		Post(c).transform((data) => ({
			...data,
			slug: z.util.slugify(data.title),
		})),
});

const micro = defineCollection({
	loader: glob({ base: './content/micro', pattern: '**/*.md' }),
	schema: (c) =>
		Post(c).transform((data) => ({
			...data,
			slug: data.date.toISOString().split('T')[0],
		})),
});

export const collections = { blog, micro };
