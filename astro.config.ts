import sitemap from '@astrojs/sitemap';
import sugarcube from '@sugarcube-sh/vite';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { site } from './src/site.config';
import directives from './utils/directives';

export default defineConfig({
	site: site.url,
	server: {
		port: 3000,
	},
	markdown: {
		remarkPlugins: [
			remarkDirective,
			directives,
		],
	},
	integrations: [sitemap()],
	vite: {
		plugins: [sugarcube()],
	},
});
