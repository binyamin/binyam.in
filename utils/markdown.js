const markdownIt = require('markdown-it');

// markdown-it plugins
const footnote = require('markdown-it-footnote');
const attrs = require('markdown-it-attrs');
/** @type {import("markdown-it-anchor").default} */
const anchor = require("markdown-it-anchor");
const external = require("markdown-it-external-anchor");
const wikilinks = require("@binyamin/markdown-it-wikilinks");

/** @type {import("highlight.js").default} */
const hljs = require('highlight.js');

// Syntax highlighter function for markdown-it
function highlight(str, lang) {
	if (lang && hljs.getLanguage(lang)) {
		try {
			return `<pre class="hljs code-block" data-lang="${hljs.getLanguage(lang).name}"><code>`
				+ hljs.highlight(str, {
					language: lang
				}).value
				+ '</code></pre>';
		} catch (__) { }
	}

	return '<pre class="hljs code-block"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
function plugin(eleventyConfig) {
	/** @type {import("markdown-it").Options} */
	const markdownItOptions = {
		html: true,
		linkify: true,
		highlight,
	};

	const md = new markdownIt(markdownItOptions)
		.use(footnote)
		.use(attrs, {
			allowedAttributes: ['id', 'class', 'rel', /^data-.+$/]
		})
		.use(anchor, { level: 2 })
		.use(external, { domain: 'binyam.in' })
		.use(wikilinks, {
			base: '/wiki/'
		})

	eleventyConfig.setLibrary("md", md);
	eleventyConfig.addFilter("markdownify", (str) => md.renderInline(str));
}

module.exports = plugin;
