import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { site } from './src/site.config';
import mdastPlugins from './utils/mdast';

export default defineConfig({
	site: site.url,
	server: {
		port: 3000,
	},
	markdown: {
		processor: satteri({
			features: { directive: true },
			mdastPlugins,
		}),
	},
	integrations: [sitemap()],
});
