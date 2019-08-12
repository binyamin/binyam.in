---
layout: blog
---

<header>
    <h1>Welcome to My Blog</h1>
</header>

{% for post in site.posts %}
[{{post.title}}]({{post.url}}) - *{{post.date | date: "%b %d, %Y"}}*
{{post.excerpt}}

---
<br/>
{% endfor %}