import dayjs from "dayjs";
import dayjsAdvancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(dayjsAdvancedFormat);

export default function date(timestamp, format, _kwargs) {
  if (timestamp == "now" || !timestamp) {
    timestamp = new Date();
  }
  if (format === "rfc" || format === "string") {
    return dayjs(timestamp).toString();
  } else if (format == "iso") {
    return dayjs(timestamp).toISOString();
  } else {
    return dayjs(timestamp).format(format);
  }
}
