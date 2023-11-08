const { titleCase } = require("title-case");

module.exports = {
	absolute_url(slug) {
		return "https://binyam.in" + (slug.startsWith("/") ? slug : "/" + slug);
	},
	date_est(datetime, time = true, format) {
		const estFormat = new Intl.DateTimeFormat("en-US", {
			timeZone: "America/New_York",
			dateStyle: format === "short" ? "short" : "long",
			...(time ? { timeStyle: "long" } : null),
		});

		const dt = estFormat.format(new Date(datetime));

		return dt.replace(/:\d{2}([\s\w]+)$/, "$1"); // remove seconds
	},
	// TODO is this necessary? Can nunjucks do this? (ie. `{{ foo | title }}`)
	titlecase(str) {
		return titleCase(str);
	},
	// TODO I think nunjucks can do this with `in`
	includes(arr, value) {
		return arr.includes(value);
	},
	// TODO revisit - is this necessary? Would eleventy's native slugify produce any different results?
	slugify(str) {
		return str
			.toLowerCase()
			.replace(/[^\w\s-]+/g, '')
			.replace(/\s+/g, '-')
			;
	},
	// TODO What happens without this filter?
	escape_once(str) {
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

		function escape(str) {
			return String(str).replace(/&|<|>|"|'/g, m => escapeMap[m])
		}

		function unescape(str) {
			return String(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m])
		}

		return escape(unescape(str))
	},
	getMentionsForUrl: (require("./webmentions.js"))
}
