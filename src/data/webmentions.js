const fs = require("fs");
const path = require("path");
const axios = require("axios").default

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'

async function fetchWebmentions() {
    const domain = 'binyam.in'
    const token = "5fABdaCA4Cgxw1r6RhF4rw"
    const url = `${API_ORIGIN}?domain=${domain}&token=${token}`

    try {
        const response = await axios.get(url)
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
    const cacheDir = path.join(__dirname, "../../.cache");
    const cachedFile = path.join(cacheDir, "webmentions.json");

    if(fs.existsSync(cacheDir) === false) {
        fs.mkdirSync(cacheDir)
    }

    if(process.env.NODE_ENV === "production") {
        return await fetchWebmentions();
    } else {
        if(fs.existsSync(cachedFile)) {
            return JSON.parse(fs.readFileSync(cachedFile, {encoding: "utf-8"}));
        } else {
            const webmentions = await fetchWebmentions();
            fs.writeFileSync(cachedFile, JSON.stringify(webmentions, null, 4))
            return webmentions;
        }
    }
}