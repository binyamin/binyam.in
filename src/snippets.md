---
layout: default
title: Code Snippets
---

# Code Snippets
Assorted pieces of code I find myself writing often.


{% for snip in collections.snippets %}
**{{snip.data.title}}**{.larger}
⌚ {{snip.data.updated | date: "%B %d, %Y"}}
{% for tag in snip.data.tags %}[<b role="img">#</b>{{tag}}](/search?tag={{tag}})&nbsp;{% endfor %}
{{snip.templateContent}}
{% endfor %}

*[⌚]: Last updated
