const isMarkdown = (data) => data.page.inputPath.endsWith("md");

module.exports = {
	eleventyComputed: {
		permalink: (d) => isMarkdown(d) ? `/p/${d.page.fileSlug}/` : false,
		category: "micro",
		layout: (d) => isMarkdown(d) ? "post" : "",
		eleventyExcludeFromCollections: (d) => isMarkdown(d) ? false : true,
	}
}
