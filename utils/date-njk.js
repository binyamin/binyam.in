const dayjs = require("dayjs");

const advancedFormat = require("dayjs/plugin/advancedFormat");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

dayjs.tz.setDefault("America/New_York");

module.exports = function date(timestamp, format, kwargs={}) {
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
