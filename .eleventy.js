const puppeteer = require("puppeteer-core");

module.exports = function(eleventyConfig) {
    eleventyConfig.addLayoutAlias('default', "default.html");
    eleventyConfig.addLayoutAlias('post', "post.html");

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        watch: ['sass/**/*.scss']
    })

    // eleventyConfig.addPlugin(require("eleventy-xml-plugin"))

    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/**/*.md");
    });

    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('js');

    eleventyConfig.addShortcode("wordCount", _ => {
        return `<span id="wordCount">Number of words</span>`;
    })

    return {
        dir: {
            input: "./",
            output: "./dist",
            layouts: "layouts",
            includes: "includes",
            data: "data"
        },
        passthroughFileCopy: true
    };
};