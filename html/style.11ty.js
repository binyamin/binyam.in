const path = require("path");
const sass = require("sass");
const CleanCSS = require("clean-css");

// Compile Sass - Shamelessly copied from MaxBoeck / eleventastic
// @see https://github.com/maxboeck/eleventastic/blob/master/src/assets/styles/styles.11ty.js

const isDev = process.env.NODE_ENV === undefined || /^dev(elopment)?$/i.test(process.env.NODE_ENV);
const isProd = process.env.CI || !isDev;

module.exports = class {
    async data() {
        const entryPath = path.join(__dirname, "../sass/main.scss");
        return {
            permalink: `/css/style.css`,
            eleventyExcludeFromCollections: true,
            entryPath
        }
    }

    // Compile Sass to CSS,
    // Embed Source Map in Development
    async compile(config) {
        return new Promise((resolve, reject) => {
            if (!isProd) {
                config.sourceMap = true
                config.sourceMapEmbed = true
                config.outputStyle = 'expanded',
                config.outFile = 'style.css'
            }
            return sass.render({
                ...config,
                includePaths: [
                    "../sass",
                    "../node_modules"
                ]
                // importer: function(url, prev, _done) {
                //     console.log(url)
                //     return {file: url};
                // }
            }, (err, result) => {
                if (err) {
                    return reject(err)
                }
                resolve(result.css.toString())
            })
        })
    }

    // Minify & Optimize with CleanCSS in Production
    async minify(css) {
        return new Promise((resolve, reject) => {
            if (!isProd) {
                resolve(css)
            }
            const minified = new CleanCSS().minify(css)
            if (!minified.styles) {
                return reject(minified.errors)
            }
            resolve(minified.styles)
        })
    }

    // render the CSS file
    async render({ entryPath }) {
        try {
            const css = await this.compile({
                file: entryPath
            })
            const result = await this.minify(css)
            return result;
        } catch (err) {
            // if things go wrong
            if (isProd) {
                // throw and abort in production
                throw new Error(err)
            } else {
                console.error(err)
            }
        }
    }
}
