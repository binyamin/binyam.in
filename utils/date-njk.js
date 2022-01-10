const dayjs = require("dayjs");
const dayjsAdvancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(dayjsAdvancedFormat);

module.exports = function date(timestamp, format, _kwargs) {
    if(timestamp == "now" || !timestamp) {
        timestamp = new Date();
    }
    if(format === "rfc" || format === "string") {
        return dayjs(timestamp).toString();
    } else if (format == 'iso') {
        return dayjs(timestamp).toISOString();
    } else {
        return dayjs(timestamp).format(format);
    }
}
