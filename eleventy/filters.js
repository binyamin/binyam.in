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

    function timeOfDay(h) {
        if(h >= 0 && h < 6) {
            // 12am - 6am
            return "night";
        } else if (h >= 6 && h < 12) {
            //6am - 12pm
            return "morning";
        } else if (h >= 12 && h < 18) {
            // 12pm - 6pm
            return "afternoon";
        } else if (h >= 18 && h <= 23) {
            // 6pm - 12am
            return "evening";
        }
    }

    eleventyConfig.addFilter("pretty_date", (datetime) => {
        if(!datetime) return datetime;
        const dt = new Date(datetime);

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const tod = timeOfDay(dt.getHours());
        const dow = dayNames[dt.getDay()];
        const m = monthNames[dt.getMonth()];
        const d = dt.getDate();
        const y = dt.getFullYear();

        return `${dow} ${tod}, ${m} ${d} ${y}`;
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
