---
layout: default
permalink: /notes/
title: My Notes
---

{% for n in collections.notes %}
[[{{n.title}}]]
{{n.title}}
{% endfor %}