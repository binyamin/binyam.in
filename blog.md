---
title: Blog
layout: default
---

# Welcome to My Blog
I write articles on web design and development, and occasionally just ramble. I publish articles to [Dev.To](https://dev.to/b3u) and [Hackernoon](https://hackernoon.com/binyamin).

---

{% for post in site.posts %}
<span class="text-grey">{{post.date | date: "%b %d, %Y"}}</span> &mdash; **[{{ post.title }}]({{post.url}})**\
{{post.excerpt | strip_html | truncate: 200}} [read more]({{post.url}})
<p class="is-center">•&nbsp;•&nbsp;•</p>
{% endfor %}