module.exports = (eleventyConfig, md) => {
    eleventyConfig.addFilter("absolute_url", value => {
        return "https://binyam.in" + (value.startsWith("/") ? value : "/" + value);
    })
    
    eleventyConfig.addFilter("titlecase", str => {
        return titleCase(str);
    })
    
    eleventyConfig.addFilter("slugify", str => {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]+/g,'')
            .replace(/\s+/g,'-')
        ;
    })
    
    eleventyConfig.addFilter("markdownify", string => {
        return md.renderInline(string)
    })
}