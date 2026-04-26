import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import * as cfg from '~/site.config';

export const GET: APIRoute = async (ctx) => {
	const posts = (await Promise.all([
		getCollection('blog'),
		getCollection('micro'),
	])).flat();

	posts.sort((a, b) => +b.data.date - +a.data.date);

	return rss({
		site: cfg.site.url,
		title: cfg.blog.title,
		description: cfg.blog.description,
		items: posts.map((p) => ({
			title: p.data.title,
			link: `/p/${p.data.slug}`,
			content: p.rendered!.html,
			pubDate: p.data.date,
			description: p.data.description,
		})),
	});
};
