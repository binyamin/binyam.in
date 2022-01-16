const path = require("path");

const filters = require("./utils/filters");
const md = require("./utils/markdownIt");
const sass = require("@binyamin/eleventy-plugin-sass");

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 *  @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {

    eleventyConfig.addPlugin(sass, {
        dir: "sass",
        file: "main.scss",
        outDir: path.resolve("dist", "css"),
        outFile: "style.min.css",
        minify: 2
    });

    // Some tweaks just for nunjucks
    eleventyConfig.addPlugin(require("./utils/nunjucks"));

    eleventyConfig.setLibrary('md', md);

    // filters
    for (const fn in filters) {
        eleventyConfig.addFilter(fn, filters[fn])
    }

    eleventyConfig.addFilter("markdownify", string => {
        return md.renderInline(string)
    })

    // Shortcodes
    require("./utils/shortcodes")(eleventyConfig, md);


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
