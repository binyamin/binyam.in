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
                return '<pre class="hljs code-block"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs code-block"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
};

const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-anchor'), {
        level: 2,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: "#",
        permalinkSpace: false,
        permalinkAttrs: () => ({role: "none"})
    })
    .use(require("markdown-it-for-inline"), "link_external", "link_open", function(tokens, idx) {
        // Prevent XSS attacks & provide good UX
        // Mark external, absolute links;

        // Note: Only affects markdown not HTML

        const regexp = /^https?:\/\/(?!(binyam\.in|localhost))/; // Is link external?
        const url = tokens[idx].attrGet("href");

        if(regexp.test(url)) {
            let oldRel = tokens[idx].attrGet("rel");
            let relStr = `${oldRel || ""} noopener noreferrer`.trim();

            tokens[idx].attrSet("rel",  relStr);
            tokens[idx].attrSet("target", "_blank")
        }
    })
    .use(function(md) {
        md.linkify.add("#", {
            validate: /^[\w-]+/,
            normalize: match => {
                match.url = "/notes/search?tag=" + match.raw.slice(1);
            }
        })
    })
    .use(function(md) {
        // Recognize Mediawiki links ([[text]])
        md.linkify.add("[[", {
            validate: /^([\w\s/-]+)(.\w+)?\s?(\|\s?([\w\s/]+))?\]\]/,
            normalize: match => {
                const parts = match.raw.slice(2,-2).split("|");
                parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                match.text = (parts[1] || parts[0]).trim();
                match.url = `/notes/${parts[0].trim()}/`;
            }
        })
    })

module.exports = md;
