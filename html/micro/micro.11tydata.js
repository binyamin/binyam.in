const isMarkdown = (data) => data.page.inputPath.endsWith("md");

module.exports = {
    eleventyComputed: {
        permalink: (d) => isMarkdown(d) ? "/p/{{page.fileSlug}}/" : false,
        category: "micro",
        isPost: true,
        layout: (d) => isMarkdown(d) ? "post" : "",
        eleventyExcludeFromCollections: (d) => isMarkdown(d) ? false : true,
    }
}
