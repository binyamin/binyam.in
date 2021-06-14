/**
 * JSON feed for https://binyam.in/c/<category>
 * @see https://jsonfeed.org/version/1.1 (docs)
 */

// Note: If necessary (size>=1mb), implement pagination

class Feed {
    data() {
        return {
            pagination: {
                data: "categories",
                size: 1,
                alias: "c"
            },
            permalink: (data) => `/feeds/${data.c.key}.json`,
            eleventyExcludeFromCollections: true
        }
    }

    render(data) {
        return JSON.stringify({
            version: "https://jsonfeed.org/version/1.1",
            title: `${data.meta.title} (${data.c.title})`,
            home_page_url: `https://binyam.in/c/${data.c.key}/`,
            feed_url: this.absolute_url(data.page.url),
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
            items: [...data.collections[data.c.key]].reverse().map(p => ({
                id: this.absolute_url(p.url),
                url: this.absolute_url(p.url),
                title: p.data.title,
                content_html: this.escape_once(p.templateContent),
                ...(p.data.desc ? {summary: p.data.desc } : {}),
                date_published: p.data.date,
                ...(p.data.modified ? {date_modified: p.data.modified} : {}),
                ...(p.data.tags ? {tags: p.data.tags} : {})
            }))
        }, null, 4);
    }
}



module.exports = Feed;
