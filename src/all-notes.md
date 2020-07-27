---
permalink: /notes/all/
layout: default
title: All My Notes
---

# All My Notes

{% for note in collections.notes %}
- [{{note.data.title}}]({{note.url}})
{% endfor %}