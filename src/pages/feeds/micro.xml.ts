import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import * as cfg from '~/site.config';

export const GET: APIRoute = async () => {
	const posts = await getCollection('micro');
	posts.sort((a, b) => +b.data.date - +a.data.date);

	return rss({
		site: new URL('/c/micro', cfg.site.url),
		title: `${cfg.site.title} - Microblog`,
		description:
			`These are my half-baked thoughts. It's sort-of a hatching ground for full-grown articles, with personal updates mixed in.`,
		items: posts.map((p) => ({
			title: p.data.title,
			link: `/p/${p.data.slug}`,
			content: p.rendered!.html,
			pubDate: p.data.date,
			description: p.data.description,
		})),
	});
};
