---
layout: note
permalink: /notes/
title: My Notes
---
{% for n in collections.notes %}
{{n.data.title}}
{% endfor %}