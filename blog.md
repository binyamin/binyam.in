---
title: Blog
layout: default
---

# Blog
I write articles on web design and development, and occasionally just ramble. I publish on [Dev.To](https://dev.to/b3u) and [Hackernoon](https://hackernoon.com/binyamin).

---

{% for post in site.posts %}
<p class="text-grey pull-left">{{post.date | date: "%b %d, %Y"}}&nbsp;&mdash;&nbsp;</p>

**[{{ post.title }}]({{post.url}})**\
{{post.excerpt | strip_html | truncate: 200}} [read more]({{post.url}})
<p class="is-center is-marginless">•&nbsp;•&nbsp;•</p>
{% endfor %}