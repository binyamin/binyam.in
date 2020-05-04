// data/webmentions.js
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'

module.exports = async function() {
    const domain = 'binyam.in'
    const token = '5fABdaCA4Cgxw1r6RhF4rw'
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