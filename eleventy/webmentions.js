// Webmentions filter
module.exports = (webmentions, url) => {
    const allowedTypes = ['mention-of', 'in-reply-to']

    const hasRequiredFields = entry => {
        const { author, published, content } = entry
        return author.name && published && content
    }

    return webmentions.children
        .filter(entry => entry['wm-target'] === url)
        .filter(entry => allowedTypes.includes(entry['wm-property']))
        .filter(hasRequiredFields)
}