const hljs = require('highlight.js');
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
    eleventyConfig.addLayoutAlias('default', "default.html");
    eleventyConfig.addLayoutAlias('post', "post.html");

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        watch: ['sass/**/*.scss']
    })

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("posts/**/*.md");
    });

    eleventyConfig.addShortcode("wordCount", () => {
        return `<span id="wordCount">Number of words</span>`;
    })

    eleventyConfig.addPairedShortcode("anchor", tag => {
        const string = tag.substring(tag.indexOf(">") + 1, tag.lastIndexOf("<"));
        tag = (
            tag.substring(0, tag.indexOf(">") + 1)
            + string
            + " "
            + `<a class="deeplink" href="#${slugify(string)}">§︎</a>`
            + tag.substring(tag.lastIndexOf("<"))
        )
        return tag;
    })

    eleventyConfig.addFilter("absolute_url", value => {
        return "https://binyam.in" + (value.startsWith("/") ? value : "/" + value);
    })

    /* ----------------------
    Custom Markdown Renderer 
    ----------------------- */
    const markdownIt = require('markdown-it');
    const markdownItOptions = {
        html: true,
        breaks: true,
        linkify: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' +
                       hljs.highlight(lang, str, true).value +
                       '</code></pre>';
              } catch (__) {}
            }
         
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    };

    const markdownItFootnote = require('markdown-it-footnote');

    const markdownItAnchor = require('markdown-it-anchor');
    const markdownItAnchorOptions = {
        permalink: true,
        permalinkClass: 'deeplink',
        permalinkSymbol: '&#xa7;&#xFE0E;',
        slugify: str => slugify(str)
    };

    const markdownItAttributes = require('markdown-it-attrs');

    const markdownItAbbr = require('markdown-it-abbr');

    const md = markdownIt(markdownItOptions)
        .use(markdownItFootnote)
        .use(markdownItAnchor, markdownItAnchorOptions)
        .use(markdownItAttributes)
        .use(markdownItAbbr)
    eleventyConfig.setLibrary('md', md);

    eleventyConfig.addFilter("markdownify", string => {
        return md.render(string)
    })

    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('js');

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