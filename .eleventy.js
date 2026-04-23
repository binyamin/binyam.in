import path from 'node:path';

import sass from '@binyamin/eleventy-plugin-sass';
import eleventyBacklinks from 'eleventy-plugin-backlinks';
import dateNjk from './utils/date-njk.js';
import filters from './utils/filters.js';
import markdown from './utils/markdown.js';
import shortcodes from './utils/shortcodes.js';

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
export default function(eleventyConfig) {
	eleventyConfig.addPlugin(markdown);
	eleventyConfig.addPlugin(sass, {
		dir: 'sass',
		file: 'main.scss',
		outDir: path.resolve('dist', 'css'),
		outFile: 'style.min.css',
		minify: 2,
	});

	eleventyConfig.addPlugin(eleventyBacklinks, {
		folder: '/wiki',
	});

	// filters
	for (const [key, value] of Object.entries(filters)) {
		eleventyConfig.addFilter(key, value);
	}

	eleventyConfig.addNunjucksFilter('date', dateNjk);

	// Shortcodes
	eleventyConfig.addPlugin(shortcodes);

	// Collections
	const collections = ['blog', 'wiki', 'micro'];

	collections.forEach(collectionName => {
		eleventyConfig.addCollection(collectionName, function(collectionApi) {
			return collectionApi.getAllSorted().filter(d =>
				d.data.category === collectionName
			);
		});
	});

	eleventyConfig.addCollection('posts', function(collectionApi) {
		return collectionApi.getAllSorted().filter(d => {
			return ['blog', 'micro'].includes(d.data.category);
		});
	});
	eleventyConfig.addGlobalData('postTypes', ['blog', 'micro']);

	// Important, since the gitignore lists "src/posts/wiki/**/*"
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addPassthroughCopy({ 'static': '/' });

	// Ignore draft wiki posts
	eleventyConfig.ignores.add('src/posts/wiki/**/_*.md');

	return {
		dir: {
			input: 'src',
			output: 'dist',
			layouts: 'templates',
			includes: 'templates/includes',
			data: 'data',
		},
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	};
}
