---
layout: note
permalink: /notes/
title: About these Notes
---

{% for n in collections.notes %}
- [{{n.data.title}}]({{n.url}})
{% endfor %}