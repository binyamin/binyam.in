const dayjs = require("dayjs");

const advancedFormat = require("dayjs/plugin/advancedFormat");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

dayjs.tz.setDefault("America/New_York");

function date(timestamp, format, kwargs={}) {
    if(timestamp == "now" || !timestamp) {
        timestamp = new Date();
    }

    let dt = dayjs(timestamp);

    const tz = kwargs.tz || kwargs.timezone;
    if(tz) dt = dt.tz(tz);

    if(format === "rfc" || format === "string") {
        return dt.toString();
    } else if (format == 'iso') {
        return dt.toISOString();
    } else {
        return dt.format(format);
    }
}

function joinClasses(...groups) {
    // Combine arrays of classes as `one two | three`
    return groups.map(g => {
        if(["symbol", "object"].includes(typeof g)) {
            let gg = g.filter(n => !!n);
            return gg.length > 0 ? gg.join(" ") : [];
        }
        return g ?? [];
    }).flat().join(" | ");
}

module.exports = function(eleventyConfig, _opts) {
    eleventyConfig.addNunjucksFilter("date", date);

    // This is a function to use inside my templates; it's a nunjucks-specific feature
    eleventyConfig.addNunjucksGlobal("class", joinClasses);
}
