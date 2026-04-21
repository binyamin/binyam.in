import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import * as cfg from '~/site.config';

export const GET: APIRoute = async () => {
	const posts = await getCollection('blog');
	posts.sort((a, b) => +b.data.date - +a.data.date);

	return rss({
		site: new URL('/c/blog', cfg.site.url),
		title: `${cfg.site.title} - Articles`,
		description:
			'In contrast to my journal, these posts aim to be fleshed-out pieces of writing.',
		items: posts.map((p) => ({
			title: p.data.title,
			link: `/p/${p.data.slug}`,
			content: p.rendered!.html,
			pubDate: p.data.date,
			description: p.data.description,
		})),
	});
};
