module.exports = function (eleventyConfig) {

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);

    // filters
    require("./eleventy/filters")(eleventyConfig, md);

    const wm = require("./eleventy/webmentions");
    eleventyConfig.addFilter("getMentionsForUrl", wm);

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md");
    });

    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob("src/notes/**/*.md");
    });

    eleventyConfig.addCollection("snippets", function (collection) {
        return collection.getFilteredByGlob("src/snippets/**/*.md");
    });


    eleventyConfig.setBrowserSyncConfig({
        online: false
    })

    // Important, since the gitignore lists "src/notes/**/*"
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget("src/sass/**/*.scss");

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy({'.cache/thumbnails': 'assets/uploads'});
    eleventyConfig.addPassthroughCopy("src/keybase.txt");

    return {
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
