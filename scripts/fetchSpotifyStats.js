const axios = require("axios").default;
const qs = require("qs");
const datacache = require("@binyamin/data-cache");
const crypto = require("crypto");

const cfg = require("../.env.json");

// https://spotify.dev/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce
async function codeToAccessToken() {
    const body = qs.stringify({
        client_id: cfg.client_id,
        grant_type: "authorization_code",
        code: cfg.code,
        redirect_uri: "https://binyam.in",
        code_verifier: cfg.code_verifier
    })

    try {
        const res = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                contentType: "appplication/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        return res;
    } catch (err) {
        throw err;
    }
}

// See https://spotify.dev/documentation/web-api/reference-beta/#category-personalization
function saveStats(accessToken) {
    accessToken = accessToken || cfg.auth0.access_token;

    axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            Authorization: "Bearer "+ accessToken
        }
    })
    .then(res => {
        datacache.set("spotify.top_tracks", res.data);
    })
    .catch(err => {
        throw err;
    })
}

function refreshAccessToken(refresh_token) {
    axios.post("https://accounts.spotify.com/api/token", qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
        client_id: cfg.client_id
    }), {
        headers: {
            contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        throw err;
    })
}
