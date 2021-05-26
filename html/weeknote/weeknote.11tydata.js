const isMarkdown = (data) => data.page.inputPath.endsWith("md");

module.exports = {
    eleventyComputed: {
        permalink: (d) => isMarkdown(d) ? `/p/${d.page.fileSlug}/` : "false",
        title: (d) => `Week of ${new Date(d.date).toLocaleDateString("en-us", {timeZone: "america/new_york"})}`,
        category: "weeknote",
        layout: (d) => isMarkdown(d) ? "post" : "",
        eleventyExcludeFromCollections: (d) => isMarkdown(d) ? false : true,
    }
}
