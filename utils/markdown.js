import markdownIt from "markdown-it";

// markdown-it plugins
import anchor from "markdown-it-anchor";
import attrs from "markdown-it-attrs";
import external from "markdown-it-external-anchor";
import footnote from "markdown-it-footnote";

import hljs from "highlight.js";

// Syntax highlighter function for markdown-it
function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="hljs code-block" data-lang="${hljs.getLanguage(lang).name}"><code>`
        + hljs.highlight(str, {
          language: lang,
        }).value
        + "</code></pre>";
    } catch (__) {}
  }

  return "<pre class=\"hljs code-block\"><code>" + md.utils.escapeHtml(str) + "</code></pre>";
}

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
export default function plugin(eleventyConfig) {
  /** @type {import("markdown-it").Options} */
  const markdownItOptions = {
    html: true,
    linkify: true,
    highlight,
  };

  const md = new markdownIt(markdownItOptions)
    .use(footnote)
    .use(attrs, {
      allowedAttributes: ["id", "class", "rel", /^data-.+$/],
    })
    .use(anchor, { level: 2 })
    .use(external, { domain: "binyam.in" })

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (str) => md.renderInline(str));
}
