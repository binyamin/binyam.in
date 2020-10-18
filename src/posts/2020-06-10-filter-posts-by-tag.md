---
title: Filter Posts by Tag
date: 2020-06-10
modified: 2020-10-18T10:47:39-04:00
tags: [code, blogging]
desc: >-
    Blogs can quickly become disorganized. With a bit of javascript, you can filter your posts by tag.
---
Blogs can quickly become disorganized. You might want to link to a page on your website which only lists posts about CSS. With a bit of javascript, you can use `/blog?tag=css` to filter your posts.

⚠️ For the following method to work, each post item should have a [data attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) of `data-tags="[tag1,tag2]">`.

First, we need to find our posts. Use the `document.querySelectorAll` method[^1]. The method takes one parameter: A selector string formatted like a css selector. Now, we need to get the tag in the url. The global `location.search` variable provides us with the query parameters at the end of the url. This will give us a string, such as `?topic=css`, which we can manipulate to find the tag.

Find which posts *don't* have the tag. For each post, check if the tags in the `data-tags` attribute include the one we found in the url. (Hint: use `Array.filter`) Then, hide the filtered posts. HTML has a handy `hidden` attribute for situations like this. Set the hidden attribute of each filtered post to `true`.

You can now filter your blog posts by tag. Here's the full snippet.

```html
<ul>
  <li class="post">
      <!-- contents -->
  </li>
 <!-- more -->
</ul>
```

```js
// Select all posts
const posts = [...document.querySelectorAll(".post")];

// Get the tag in the url
const tag = location.search.slice(location.search.indexOf("=") + 1);

if(tag) {
    // Find which posts don’t have the tag
    let postsNoTag = posts.filter(l => {
        return JSON.parse(l.dataset.tags).includes(tag) === false;
    });

	// Hide all posts which don’t have the tag
    postsNoTag.forEach(p => {
        p.setAttribute("hidden", true);
    });
}
```

[^1]: For more details, see [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
