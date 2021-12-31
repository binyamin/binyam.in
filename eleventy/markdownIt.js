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
    .use(require('markdown-it-attrs'), {
        allowedAttributes: ['id', 'class', 'rel', /^data-.+$/]
    })
    .use(require("markdown-it-external-anchor"), { domain: 'binyam.in' })
    .use(require("@binyamin/markdown-it-wikilinks"), {
        base: '/wiki/'
    })

module.exports = md;
