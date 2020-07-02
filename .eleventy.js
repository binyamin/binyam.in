module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);
    
    require("./eleventy/filters")(eleventyConfig, md);

    eleventyConfig.addLayoutAlias('default', "default.html");
    eleventyConfig.addLayoutAlias('post', "post.html");

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