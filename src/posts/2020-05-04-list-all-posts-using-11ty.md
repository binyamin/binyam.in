---
title: List all Posts using 11ty
date: 2020-05-04T12:00:00-04:00
thumbnail: /assets/uploads/11ty-post.jpg
tags: [code, blogging, eleventy]
desc: >-
   Unlike Jekyll, Eleventy doesn't create a collection of all posts. But you can do it yourself very easily.
---

On the front page of a blog, we often list the title of every post on the site. [Jekyll](https://jekyllrb.com) will automatically list all pages within the `_post` directory under one collection. [11ty](https://11ty.dev), however, creates collections based on the tags. In other words, the only way to tell 11ty that your page is a blog post is by adding an extra tag. You may not want to add the same tag for every post, especially if you already categorize your posts.

One ~~workaround~~ _fully documented feature_ is to create a custom collection. In `.eleventy.js`, use the `addCollection` method to define a new collection. You can call it _posts_, if you want to (you can also call it _ice_cream_). Use [glob syntax](https://github.com/isaacs/node-glob) to get only the pages inside your post folder. You can now find all your blog posts with the `collections.posts` variable.

Here's the code for your `.eleventy.js` file.
```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/**/*.md");
    });
    //...
}
```

*[11ty]: Eleventy
