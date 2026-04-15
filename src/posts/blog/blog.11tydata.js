const isMarkdown = (data) => data.page.inputPath.endsWith("md");

export default {
	eleventyComputed: {
		permalink: (d) => isMarkdown(d) ? "/p/{{ title | slugify }}/" : false,
		category: "blog",
		layout: (d) => isMarkdown(d) ? "post" : "",
		eleventyExcludeFromCollections: (d) => isMarkdown(d) ? false : true,
	}
}
