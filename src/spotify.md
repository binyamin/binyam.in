---
layout: default
title:
---
# My Spotify Stats

{% for song in spotifyStats %}
1. **{{song.title}}**\
   {{song.artists}}
{% endfor %}