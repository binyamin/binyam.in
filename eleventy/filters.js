const {titleCase} = require("title-case");

module.exports = (eleventyConfig, md) => {
    eleventyConfig.addFilter("absolute_url", slug => {
        return "https://binyam.in" + (slug.startsWith("/") ? slug : "/" + slug);
    })

    eleventyConfig.addFilter("escape_once", str => {
        // From <https://github.com/harttle/liquidjs/blob/master/src/builtin/filters/html.ts>
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&#34;',
            "'": '&#39;'
        }
        const unescapeMap = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&#34;': '"',
            '&#39;': "'"
        }

        function escape (str) {
            return String(str).replace(/&|<|>|"|'/g, m => escapeMap[m])
        }

        function unescape (str) {
            return String(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m])
        }

        return escape(unescape(str))
    })

    eleventyConfig.addFilter("titlecase", str => {
        return titleCase(str);
    })

    eleventyConfig.addFilter("includes", (arr, value) => {
        return arr.includes(value);
    })


    eleventyConfig.addFilter("date_est", (datetime, time=true, format) => {
        const estFormat = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            dateStyle: format === "short" ? "short" : "long",
            ...(time ? { timeStyle: "long" } : null),
        });

        const dt = estFormat.format(new Date(datetime));

        return dt.replace(/:\d{2}([\s\w]+)$/, "$1"); // remove seconds
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
