/**
 * JSON feed for https://binyam.in
 * @see https://jsonfeed.org/version/1.1 (docs)
 */

// Note: If necessary (size>=1mb), implement pagination

class Feed {
    data() {
        return {
            permalink: "/feeds/all.json",
            eleventyExcludeFromCollections: true
        }
    }

    render(data) {
        return JSON.stringify({
            version: "https://jsonfeed.org/version/1.1",
            title: "Binyamin Green's Feed",
            home_page_url: "https://binyam.in",
            feed_url: "https://binyam.in/feeds/all.json",
            description: data.meta.desc,
            icon: "https://binyam.in/assets/logo.png",
            favicon: "https://binyam.in/assets/logo.png",
            language: "en-US",
            authors: [
                {
                    name: data.meta.author.name,
                    url: data.meta.baseUrl,
                    avatar: "https://binyam.in/assets/img/profile/profile@128.jpeg"
                }
            ],
            items: data.collections.posts.map(p => ({
                id: this.absolute_url(p.url),
                url: this.absolute_url(p.url),
                title: p.data.title,
                content_html: this.escape_once(p.templateContent),
                summary: p.data.desc || "No description provided",
                date_published: p.data.date,
                ...(p.data.modified ? {date_modified: p.data.modified} : {}),
                ...(p.data.tags ? {tags: p.data.tags} : {})
            }))
        }, null, 4);
    }
}



module.exports = Feed;
