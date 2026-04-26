import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import * as feedsmith from 'feedsmith';
import logo from '~/assets/img/logo.png';
import * as cfg from '~/site.config';

export const GET: APIRoute = async (ctx) => {
	const posts = (await Promise.all([
		getCollection('blog'),
		getCollection('micro'),
	])).flat();

	posts.sort((a, b) => +b.data.date - +a.data.date);

	const BLOG_URL = new URL('/p', cfg.site.url);

	const xml = feedsmith.generateAtomFeed({
		id: BLOG_URL.href,
		title: { value: cfg.blog.title },
		updated: new Date(),
		authors: [
			{
				name: cfg.me.name,
				uri: cfg.site.url,
			},
		],
		links: [
			{ href: ctx.url.href, rel: 'self' },
			{ href: BLOG_URL.href, rel: 'alternate' },
		],
		icon: logo.src,
		entries: posts.map((p) => ({
			id: new URL(`/p/${p.data.slug}`, cfg.site.url).href,
			title: { value: p.data.title },
			updated: p.data.modified ?? p.data.date,
			links: [
				{
					href: `/p/${p.data.slug}`,
					rel: 'alternate',
				},
			],
			published: p.data.date,
			content: { value: p.rendered!.html, type: 'html' },
		})),
	});

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
