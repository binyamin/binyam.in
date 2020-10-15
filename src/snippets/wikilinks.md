---
title: Parse Wikilinks in Markdown
tags: [eleventy, javascript, wikilinks, note-taking]
updated: 2020-10-14T20:23:12
---

```js
const markdownIt = require("markdown-it");
const md = markdownIt({})
    .use(function(md) {
        md.linkify.add("[[", {
            validate: /^([\w\s/-]+)(.\w+)?\s?(\|\s?([\w\s/]+))?\]\]/,
            normalize: match => {
                const parts = match.raw.slice(2,-2).split("|");
                parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                match.text = (parts[1] || parts[0]).trim();
                match.url = `/notes/${parts[0].trim()}/`;
            }
        })
    })
```
