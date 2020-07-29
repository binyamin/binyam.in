const { arrayReplaceAt } = require("markdown-it/lib/common/utils");

module.exports = (eleventyConfig, md) => {
    eleventyConfig.addFilter("absolute_url", value => {
        return "https://binyam.in" + (value.startsWith("/") ? value : "/" + value);
    })
    
    eleventyConfig.addFilter("titlecase", str => {
        return titleCase(str);
    })

    function alphabetaSort (left, right) {
        // Thanks to Sindre Sorhus for the logic here

        const collator = new Intl.Collator();
        const compare = (left, right) => left === right ? 0 : collator.compare(left, right);

        function caselessCompare(left, right) {
            const lowercaseComparison = compare(left.toLowerCase(), right.toLowerCase());
            return lowercaseComparison === 0 ? compare(left, right) : lowercaseComparison;
        }

        function articleCompare(left, right) {
            const articleComparison = caselessCompare(left.replace(/^(a|an|the)\s/i, ""), right.replace(/^(a|an|the)\s/i, ""));
            return articleComparison === 0 ? caselessCompare(left, right) : articleComparison;
        }
        
        return articleCompare(left, right);
    }

    eleventyConfig.addFilter("sort_ab", (arr, key) => {
        return arr.sort((a,b) => alphabetaSort(a[key], b[key]));
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