import { defineConfig } from 'astro/config';
import { site } from './src/site.config';

export default defineConfig({
	site: site.url,
	server: {
		port: 3000,
	},
});
