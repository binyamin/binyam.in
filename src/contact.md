---
layout: default
title: Contact Me
desc: Have a question, or want to chat? Here's how to reach me.
---

# Contact Me
Have a question? Just want to chat? I aim to respond to everyone within 24 hours.

{% for link in site.links %}
- **{{link.name|titlecase}}**: [{{link.handle}}]({{link.url}}){%if link.me %}{rel=me}{%endif%}
{% endfor %}
