const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'

async function fetchWebmentions() {
    const domain = 'binyam.in'
    const token = "5fABdaCA4Cgxw1r6RhF4rw"
    const url = `${API_ORIGIN}?domain=${domain}&token=${token}`

    try {
        const response = await fetch(url)
        if (response.ok) {
            const feed = await response.json()
            return feed
        }
    } catch (err) {
        console.error(err)
        return null
    }
}

module.exports = async function() {
    if(process.env.NODE_ENV === "production") {
        return (await fetchWebmentions());
    } else {
        if(fs.existsSync(path.join(__dirname, "../cache/webmentions.json"))) {
            return JSON.parse(fs.readFileSync(path.join(__dirname, "../cache/webmentions.json"), {encoding: "utf-8"}));
        } else {
            const webmentions = await fetchWebmentions();
            fs.writeFileSync(path.join(__dirname, "../cache/webmentions.json"), JSON.stringify(webmentions, null, 4))
            return webmentions;
        }
    }
}