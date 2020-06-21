---
layout: default
permalink: /notes/
title: My Notes
---

{% for n in notes %}
[[{{n.title}}]]
{{n.title}}
{% endfor %}