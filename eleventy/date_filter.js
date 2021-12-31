function _date(datetime=new Date(), format="iso") {
    if(datetime === "now") {
        datetime = new Date();
    }
    if (format === "iso") {
        return datetime.toISOString();
    } else if (format === "human") {
        return datetime.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "long"
        }).replace(/:\d{2}([\s\w]+)$/, "$1"); // remove seconds
    } else if (format === "human-short") {
        if((new Date()).getFullYear() === datetime.getFullYear()) {
            return datetime.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            });
        } else {
            return datetime.toLocaleDateString("en-US", {
                dateStyle: "medium"
            });
        }
    } else {
        throw new Error(`desired format "${format}" not recognized`);
    }
}

function date_est(datetime, time=true, format) {
    const estFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        dateStyle: format === "short" ? "short" : "long",
        ...(time ? { timeStyle: "long" } : null),
    });

    const dt = estFormat.format(new Date(datetime));

    return dt.replace(/:\d{2}([\s\w]+)$/, "$1"); // remove seconds
}

module.exports = {_date, date_est};
