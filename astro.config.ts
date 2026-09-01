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
			// We use local fonts, instead of fontsource, because Astro Fonts
			// uses the version w/o optical sizing & most other axes
			provider: fontProviders.local(),
			cssVariable: '--font-family-serif',
			fallbacks: ['serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/fraunces-latin-full-normal.woff2'],
						style: 'normal',
						weight: '400 700',
					},
					{
						src: ['./src/assets/fonts/fraunces-latin-full-italic.woff2'],
						style: 'italic',
						weight: '400 700',
					},
				],
			},
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
