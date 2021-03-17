module.exports = (eleventyConfig, md) => {
    eleventyConfig.addPairedShortcode('callout', (content, type="info") => {
        if(['info', 'warning', 'danger', 'success'].includes(type) === false) type = "info";

        return (
            `<aside class="callout callout--${type}">\n`
            + `${md.renderInline(content.trim())}\n`
            +"</aside>"
        );
    })
}

