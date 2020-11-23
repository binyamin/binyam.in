module.exports = (eleventyConfig, md) => {
    eleventyConfig.addPairedShortcode('callout', (content, type="info") => {
        if(['info', 'warning', 'danger', 'success'].includes(type) === false) type = "info";

        return (
            `<aside class="callout callout--${type}">\n`
            + `<img class="callout__icon" src="/assets/img/icon-${type}.svg" alt="" width="24" height="24" />\n`
            + `<div>${md.render(content)}</div>\n`
            +"</aside>"
        );
    })
}

