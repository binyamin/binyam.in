const isMarkdown = (data) => data.page.inputPath.endsWith("md");

module.exports = {
	eleventyComputed: {
		permalink: (d) => isMarkdown(d) ? "/p/{{ title | slugify }}/" : false,
		category: "blog",
		layout: (d) => isMarkdown(d) ? "post" : "",
		eleventyExcludeFromCollections: (d) => isMarkdown(d) ? false : true,
	}
}
