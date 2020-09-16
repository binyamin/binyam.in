const datacache = require("@binyamin/data-cache");

module.exports = function() {
    const data = datacache.get("spotify.tracks");
    
    return data.items.map(entry => ({
        title: entry.name,
        link: entry.external_urls.spotify,
        type: entry.type,
        artists: entry.artists.map(a => a.name),
        duration_ms: entry.duration_ms,
        id: entry.id,
        album: {
            album_type: entry.album.album_type.toLowerCase(),
            title: entry.album.name,
            album_art: Object.fromEntries(entry.album.images.map(i => [i.height, i.url])),
        }
    }));
}