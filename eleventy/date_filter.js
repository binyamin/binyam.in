function date_est(datetime, time=true, format) {
    const estFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        dateStyle: format === "short" ? "short" : "long",
        ...(time ? { timeStyle: "long" } : null),
    });

    const dt = estFormat.format(new Date(datetime));

    return dt.replace(/:\d{2}([\s\w]+)$/, "$1"); // remove seconds
}

module.exports = {date_est};
