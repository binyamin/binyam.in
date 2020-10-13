const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);

    const wm = require("./eleventy/webmentions");
    eleventyConfig.addFilter("getMentionsForUrl", wm);
    require("./eleventy/filters")(eleventyConfig, md);

    eleventyConfig.addLayoutAlias('default', "default.html");
    eleventyConfig.addLayoutAlias('post', "post.html");

    eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md");
    });

    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob("src/notes/**/*.md");
    });

    eleventyConfig.addShortcode("wordCount", () => {
        return `<span id="wordCount">Number of words</span>`;
    })

    eleventyConfig.setBrowserSyncConfig({
        online: false
    })

    const {Liquid} = require("liquidjs"); // Waiting for Eleventy@1.0.0 🎉
    eleventyConfig.setLibrary("liquid", new Liquid({
        extname: ".liquid",
        dynamicPartials: false,
        strict_filters: false
    }))

    eleventyConfig.addWatchTarget("src/sass/**/*.scss");

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addPassthroughCopy({'.cache/thumbnails': 'assets/uploads'});

    return {
        useGitIgnore: false,
        dir: {
            input: "src",
            output: "dist",
            layouts: "layouts",
            includes: "includes",
            data: "data"
        },
        passthroughFileCopy: true
    };
};
