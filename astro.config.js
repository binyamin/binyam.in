import { defineConfig } from 'astro/config';
import { site } from '~/site.config';

export default defineConfig({
	site: site.url,
	server: {
		port: 3000,
	},
});
