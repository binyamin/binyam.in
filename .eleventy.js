const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);
    
    const wm = require("./eleventy/webmentions");
    eleventyConfig.addFilter("getMentionsForUrl", wm);

    eleventyConfig.addLayoutAlias('default', "default.html");
    eleventyConfig.addLayoutAlias('post', "post.html");

    eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        watch: ['src/sass/**/*.scss']
    })

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md");
    });

    eleventyConfig.addShortcode("wordCount", () => {
        return `<span id="wordCount">Number of words</span>`;
    })

    eleventyConfig.addPairedShortcode("notice", function(content) {
        return `<div class="notice">${md.render(content)}</div>`;
    });

    eleventyConfig.addFilter("absolute_url", value => {
        return "https://binyam.in" + (value.startsWith("/") ? value : "/" + value);
    })

    eleventyConfig.addFilter("slugify", str => {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]+/g,'')
            .replace(/\s+/g,'-')
        ;
    })

    eleventyConfig.addFilter("markdownify", string => {
        return md.renderInline(string)
    })

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addPassthroughCopy({'.cache/thumbnails': 'assets/uploads'});

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