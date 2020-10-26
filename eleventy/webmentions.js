// Webmentions filter
module.exports = (webmentions, url) => {
    const replyTypes = ['mention-of', 'in-reply-to']
    const likeType = "like-of"

    const hasRequiredFields = entry => {
        const { author, published, content } = entry
        return author.name && published && content
    }

    const children = webmentions.children
        .filter(entry => entry['wm-target'] === url)
        .filter(hasRequiredFields)

    return {
        like: children.filter(entry => entry["wm-property"] === likeType),
        replies: children.filter(entry => replyTypes.includes(entry['wm-property']))
    }
}
