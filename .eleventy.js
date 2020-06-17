const hljs = require('highlight.js');
const fs = require("fs");
const path = require("path");
const { S_IFMT } = require('constants');

module.exports = function (eleventyConfig) {
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

    const markdownItAttributes = require('markdown-it-attrs');

    const markdownItAbbr = require('markdown-it-abbr');

    const md = markdownIt(markdownItOptions)
        .use(markdownItFootnote)
        .use(markdownItAttributes)
        .use(markdownItAbbr)
    eleventyConfig.setLibrary('md', md);

    /* ----------------------
     Plugins, Filters,
     and Shortcodes
    ---------------------- */
    
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

    eleventyConfig.addPairedShortcode("notice", function(content) {
        return `<div class="notice">${md.render(content)}</div>`;
    });

    eleventyConfig.addFilter("absolute_url", value => {
        return "https://binyam.in" + (value.startsWith("/") ? value : "/" + value);
    })

    eleventyConfig.addFilter("slugify", str => {
        return str
            .toLowerCase()
            .replace(/[^\w\s]+/g,'')
            .replace(/\s+/g,'-')
        ;
    })

    eleventyConfig.addFilter("markdownify", string => {
        return md.render(string)
    })

    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('js');


    eleventyConfig.addFilter("getMentionsForUrl", (webmentions, url) => {
            const allowedTypes = ['mention-of', 'in-reply-to']
        
            const hasRequiredFields = entry => {
                const { author, published, content } = entry
                return author.name && published && content
            }
        
            return webmentions.children
                .filter(entry => entry['wm-target'] === url)
                .filter(entry => allowedTypes.includes(entry['wm-property']))
                .filter(hasRequiredFields)
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