// TODO move to nunjucks macro
export default function(eleventyConfig) {
  const md = eleventyConfig.libraryOverrides["md"];

  eleventyConfig.addPairedShortcode("callout", (content, type = "info") => {
    if (["info", "warning", "danger", "success"].includes(type) === false) type = "info";

    return (
      `<aside class="callout callout--${type}">\n`
      + `${md.renderInline(content.trim())}\n`
      + "</aside>"
    );
  });
}
