import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';
import logo from '~/assets/img/logo.png';
import profile from '~/assets/img/profile.jpeg';
import * as cfg from '~/site.config';

export const GET: APIRoute = async (ctx) => {
	const avatar = await getImage({
		src: profile,
		format: 'jpeg',
		width: 128,
		height: 128,
	});

	const posts = (await Promise.all([
		getCollection('blog'),
		getCollection('micro'),
	])).flat();

	posts.sort((a, b) => +b.data.date - +a.data.date);

	return Response.json({
		version: 'https://jsonfeed.org/version/1.1',
		title: cfg.blog.title,
		description: cfg.blog.description,
		home_page_url: new URL('/p', cfg.site.url),
		feed_url: ctx.url,
		icon: logo.src,
		favicon: logo.src,
		language: 'en-US',
		authors: [
			{
				name: cfg.me.name,
				url: cfg.site.url,
				avatar: new URL(avatar.src, cfg.site.url),
			},
		],
		items: posts.map((p) => ({
			id: new URL(`/p/${p.data.slug}`, cfg.site.url),
			url: new URL(`/p/${p.data.slug}`, cfg.site.url),
			title: p.data.title,
			content_html: p.rendered!.html,
			...(p.data.description ? { summary: p.data.description } : {}),
			date_published: p.data.date,
			...(p.data.modified ? { date_modified: p.data.modified } : {}),
			...(p.data.tags ? { tags: p.data.tags } : {}),
		})),
	});
};
