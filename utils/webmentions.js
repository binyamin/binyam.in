// Webmentions filter
module.exports = (webmentions, url) => {
    const replyTypes = ['mention-of', 'in-reply-to']
    const likeType = "like-of"

    const hasRequiredFields = entry => {
        return !!entry.author.name
    }

    const children = webmentions.children
        .filter(entry => entry['wm-target'] === url)
        .filter(hasRequiredFields)

    return {
        likes: children.filter(entry => entry["wm-property"] === likeType),
        replies: children.filter(entry => replyTypes.includes(entry['wm-property']))
    }
}
