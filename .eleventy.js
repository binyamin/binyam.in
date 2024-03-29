const path = require("path");

const filters = require("./utils/filters.js");
const markdown = require("./utils/markdown.js");
const sass = require("@binyamin/eleventy-plugin-sass");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(markdown);
	eleventyConfig.addPlugin(sass, {
		dir: "sass",
		file: "main.scss",
		outDir: path.resolve("dist", "css"),
		outFile: "style.min.css",
		minify: 2
	});

	// filters
	for (const [key, value] of Object.entries(filters)) {
		eleventyConfig.addFilter(key, value);
	}

	eleventyConfig.addNunjucksFilter("date", require("./utils/date-njk"));

	// Shortcodes
	eleventyConfig.addPlugin(require("./utils/shortcodes"));


	// Collections
	const collections = ['blog', 'wiki', 'micro'];

	collections.forEach(collectionName => {
		eleventyConfig.addCollection(collectionName, function (collectionApi) {
			return collectionApi.getAllSorted().filter(d => d.data.category === collectionName)
		})
	})


	eleventyConfig.addCollection('posts', function (collectionApi) {
		return collectionApi.getAllSorted().filter(d => {
			return ["blog", "micro"].includes(d.data.category)
		});
	})
	eleventyConfig.addGlobalData("postTypes", ["blog", "micro"]);


	// Important, since the gitignore lists "src/posts/wiki/**/*"
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addPassthroughCopy({ 'static': '/' });

	// Ignore draft wiki posts
	eleventyConfig.ignores.add('src/posts/wiki/**/_*.md');

	return {
		dir: {
			input: "src",
			output: "dist",
			layouts: "templates",
			includes: "templates/includes",
			data: "data"
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk"
	};
};
