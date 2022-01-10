const filters = require("./eleventy/filters");
const md = require("./eleventy/markdownIt");

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 *  @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
    eleventyConfig.setLibrary('md', md);

    // filters
    for (const fn in filters) {
        eleventyConfig.addFilter(fn, filters[fn])
    }

    eleventyConfig.addNunjucksFilter("date", require("./eleventy/date-njk"));

    eleventyConfig.addFilter("markdownify", string => {
        return md.renderInline(string)
    })


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
        return collectionApi.getAllSorted().filter(d => {
            return ["blog", "micro"].includes(d.data.category)
        });
    })
    eleventyConfig.addGlobalData("postTypes", ["blog", "micro"]);


    // Important, since the gitignore lists "src/posts/wiki/**/*"
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addPassthroughCopy({ 'static': '/' });

    eleventyConfig.addWatchTarget("sass");

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
