// Custom Markdown parser

const hljs = require('highlight.js');

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

const mdWikilinksOptions = {
    baseURL: "/notes/",
    relativeBaseURL: "../",
    uriSuffix: "/",
    linkPattern: /\[\[([\w\s/-]+)(\|([\w\s/]+))?\]\]/,
    postProcessPageName: (pageName) => {
        return pageName.trim().toLowerCase().replace(/\s/g, "-");
    }
}

const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-abbr'))
    .use(require("@kwvanderlinde/markdown-it-wikilinks")(mdWikilinksOptions))
    .use(function(md) {
        md.linkify.add("#", {
            validate: /[\w-]+/,
            normalize: match => {
                match.url = "/notes/search?tag=" + match.raw.slice(1);
            }
        })
    })

module.exports = md;