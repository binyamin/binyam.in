const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);

    // filters
    require("./eleventy/filters")(eleventyConfig, md);

    // Shortcodes
    require("./eleventy/shortcodes")(eleventyConfig, md);

    const wm = require("./eleventy/webmentions");
    eleventyConfig.addFilter("getMentionsForUrl", wm);

    // Collections
    const collections = ['blog', 'wiki', 'micro'];

    collections.forEach(collectionName => {
        eleventyConfig.addCollection(collectionName, function(collectionApi) {
            return collectionApi.getAllSorted().filter(d => d.data.category === collectionName)
        })
    })

    eleventyConfig.addCollection('posts', function(collectionApi){
        return collectionApi.getAllSorted().filter(d => ["blog", "micro"].includes(d.data.category));
    })

    eleventyConfig.addGlobalData("postTypes", ["blog", "micro"]);

    // Transforms
    eleventyConfig.addTransform('htmlmin', function(content) {
        if(this.outputPath && this.outputPath.endsWith(".html")) {
            return htmlmin.minify(content, {
                collapseWhitespace: true
            })
        }
        return content;
    })

    // Important, since the gitignore lists "html/wiki/**/*"
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addPassthroughCopy({ 'static': '/' });

    return {
        dir: {
            input: "html",
            output: "dist",
            layouts: "_layouts",
            includes: "_includes",
            data: "_data"
        }
    };
};
