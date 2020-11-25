---
title: Recent Songs
modified: 2020-11-24T20:48:16-05:00
---

# Recently Played Songs
Updated on {{ modified | pretty_date }}


## Top Ten
Here are the 10 songs I've listened to the most over the past 4 weeks. Data is from Spotify.
{% for track in spotifyStats %}
1. [_{{track.title}}_]({{track.link}}) by {{track.artists | join: ", " }} ({{track.duration}})
{% endfor %}

{% comment %}
```json
{
  title: "V'yazor",
  link: 'https://open.spotify.com/track/1j3lETHCywGMjqEPKkDLUM',
  type: 'track',
  artists: [ 'Levy Falkowitz' ],
  duration_ms: 262191,
  duration: '4:22',
  id: '1j3lETHCywGMjqEPKkDLUM',
  album: {
    album_type: 'album',
    title: 'Achake Loi',
    album_art: {
      '64': 'https://i.scdn.co/image/ab67616d00004851797db83353f2cf6529323ceb',
      '300': 'https://i.scdn.co/image/ab67616d00001e02797db83353f2cf6529323ceb',
      '640': 'https://i.scdn.co/image/ab67616d0000b273797db83353f2cf6529323ceb'
    }
  }
}
```
{% endcomment %}
