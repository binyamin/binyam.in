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

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        watch: ['src/sass/**/*.scss']
    })

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md");
    });

    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob("src/notes/**/*.md");
    });

    eleventyConfig.addShortcode("wordCount", () => {
        return `<span id="wordCount">Number of words</span>`;
    })

    eleventyConfig.addPairedShortcode("notice", function(content) {
        return `<div class="notice">${md.render(content)}</div>`;
    });

    eleventyConfig.setBrowserSyncConfig({
        online: false
    })

    const {Liquid} = require("liquidjs");
    eleventyConfig.setLibrary("liquid", new Liquid({
        extname: ".liquid",
        dynamicPartials: false,
        strict_filters: false
    }))

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