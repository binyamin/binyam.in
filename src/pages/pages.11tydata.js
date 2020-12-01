module.exports = {
    layout: "default",
    eleventyComputed: {
        permalink: (data) => {
            return data.permalink || (data.page.filePathStem.replace("/pages", "") + "/")
        }
    }
}
