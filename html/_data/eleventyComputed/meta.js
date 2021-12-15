module.exports = {
    eleventyVersion: data => {
        const {devDependencies: a, dependencies: b} = data.pkg;
        const deps = Object.assign({}, a, b);
        return deps['@11ty/eleventy']?.replace("^", "");
    }
}
