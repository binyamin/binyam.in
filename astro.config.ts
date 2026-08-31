import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { site } from './src/site.config';
import mdastPlugins from './utils/mdast';

export default defineConfig({
	site: site.url,
	server: {
		port: 3000,
	},
	fonts: [
		{
			name: 'Fraunces',
			provider: fontProviders.fontsource(),
			cssVariable: '--font-family-serif',
			fallbacks: ['serif'],
			weights: ['400 700'],
			styles: ['normal', 'italic'],
		},
	],
	markdown: {
		shikiConfig: {
			theme: 'vitesse-light',
		},
		processor: satteri({
			features: { directive: true },
			mdastPlugins,
		}),
	},
	integrations: [sitemap()],
});
