---
layout: default
title: Code Snippets
ignore: true
eleventyExcludeFromCollections: true
---

# Code Snippets
Assorted pieces of code I find myself writing often.


{% for snip in collections.snippets %}
**{{snip.data.title}}**{.larger}
Last updated {{snip.data.updated | date: "%B %d, %Y"}}
{{snip.templateContent}}
{% endfor %}
