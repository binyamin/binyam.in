Tagged with #wikilinks, #eleventy.

Code:
```js
// .eleventy.js

module.exports = function (eleventyConfig) {
    const markdownIt = require('markdown-it');
	
    const md = markdownIt();
		.use(require("markdown-it-wikilinks"))
		
    eleventyConfig.setLibrary('md', md);
}
```
https://github.com/jsepia/markdown-it-wikilinks

https://github.com/kwvanderlinde/markdown-it-wikilinks