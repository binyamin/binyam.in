const fetch = require("node-fetch");
const datacache = require("@binyamin/data-cache");

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
        return await fetchWebmentions();
    } else {
        const wmcache = datacache.get("webmentions");
        if(wmcache) {
            return JSON.parse(wmcache);
        } else {
            const webmentions = await fetchWebmentions();
            datacache.set("webmentions", webmentions);
            return webmentions;
        }
    }
}