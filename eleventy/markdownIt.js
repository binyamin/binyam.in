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
    baseUrl: "/notes/",
    uriSuffix: "/",
    linkPattern: /\[\[([\w\s/-]+)(\|([\w\s/]+))?\]\]/,
    generatePageNameFromLabel: (label) => {
        return label
        .toLowerCase()
        .replace(/[^\w\s-]+/g,'')
        .replace(/\s+/g,'-')
        .replace(/\.[md|markdown]$/g,'')
        ;
    }
}

const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-abbr'))
    .use(require("@kwvanderlinde/markdown-it-wikilinks")(mdWikilinksOptions))

module.exports = md;