module.exports = {
    isPost: (data) => {
        return (data.categories.map(c => c.key)).includes(data.category);
    },
    title: (data) => {
        if(data.title) {
            if (data.isPost) {
                return data.title;
            } else {
                return `${data.title} • Binyamin Green`;
            }
        }
        return "Binyamin Green";
    },
    desc: ({ desc }) => desc || "Binyamin Green is a student in practice and a web developer at heart.",
    image: {
        og: "https://binyam.in/assets/logo.png",
        twitter: (data) => {
            if(data.thumbnail) {
                return this.absolute_url(data.thumbnail);
            }
            if(data.category === "blog") {
                return `"https://binyam.in/assets/uploads/"${this.slugify(data.title)}.png`
            }
        }
    },
    type: ({isPost}) => isPost ? "article" : "website",
    author: {
        name: "Binyamin Aron Green"
    },
    twitterHandle: "binyamingreen",
    baseUrl: "https://binyam.in"
}
