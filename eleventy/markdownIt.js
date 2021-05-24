// Custom Markdown parser
const hljs = require('highlight.js');

const markdownIt = require('markdown-it');
const markdownItOptions = {
    html: true,
    // breaks: true, // off?
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs code-block" data-lang="${hljs.getLanguage(lang).name}"><code>` +
                hljs.highlight(str, {
                    language: lang
                }).value +
                '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs code-block"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
};

const md = new markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-anchor'), {
        level: 2,
        permalink: true,
        // permalinkBefore: true,
        permalinkSymbol: "#",
        permalinkSpace: false,
        permalinkAttrs: () => ({role: "none"})
    })
    .use(require("markdown-it-external-anchor"), { domain: 'binyam.in' })
    .use(function(md) {
        // Recognize Mediawiki links ([[text]])
        md.linkify.add("[[", {
            validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
            normalize: match => {
                const parts = match.raw.slice(2,-2).split("|");
                parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                match.text = (parts[1] || parts[0]).trim();
                match.url = `/wiki/${parts[0].trim()}/`;
            }
        })
    })

module.exports = md;
