module.exports = {
    isPost: (data) => {
        return ["blog", "micro"].includes(data.category)
    },
    title: (data) => {
        if(data.title) {
            if(data.meta.isPost) {
                return data.title;
            } else {
                return data.title + " • " + data.site.title;
            }
        }
        return data.site.title;
    },
    desc: data => data.desc || data.site.desc,
    image_twitter: function(data) {
        if(data.category == 'blog') {
            return `https://binyam.in/assets/uploads/${this.slugify(data.title)}.png`;
        }
        if(data.thumbnail) {
            return this.absolute_url(data.thumbnail);
        }
        return data.site.image.twitter;
    },
    eleventyVersion: data => {
        const {devDependencies: a, dependencies: b} = data.pkg;
        const deps = Object.assign({}, a, b);
        return deps['@11ty/eleventy']?.replace("^", "");
    }
}
