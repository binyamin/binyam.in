// Custom Markdown parser
/** @type {import("highlight.js").default} */
const hljs = require('highlight.js');

const markdownIt = require('markdown-it');

/** @type {import("markdown-it-anchor").default} */
const anchor = require("markdown-it-anchor");

/** @type {import("markdown-it").Options} */
const markdownItOptions = {
    html: true,
    linkify: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs code-block" data-lang="${hljs.getLanguage(lang).name}"><code>`
                + hljs.highlight(str, {
                    language: lang
                }).value
                + '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs code-block"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
};

const md = new markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'), {
        allowedAttributes: ['id', 'class', 'rel', /^data-.+$/]
    })
    .use(anchor, { level: 2 })
    .use(require("markdown-it-external-anchor"), { domain: 'binyam.in' })
    .use(require("@binyamin/markdown-it-wikilinks"), {
        base: '/wiki/'
    })

module.exports = md;
