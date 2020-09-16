const fs = require("fs");
const axios = require("axios").default;
const datacache = require("@binyamin/data-cache");

const cfg = require("../.env.json");

// https://spotify.dev/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce
// See https://spotify.dev/documentation/web-api/reference-beta/#category-personalization

// Instructions
// 1. Run `initConfig();` to generate code_challenge, etc.
// 2. Go to `code_url();`
// 3. Copy the returned url, and enter the `code` query param in `.env.json`
// 4. Exchange code for access token with `codeToAccessToken()`;

function initConfig() {
    fs.writeFileSync(".env.json", JSON.stringify({ ...cfg, ...require("pkce-gen").create(true) }, null, 4));
}

function code_url() {
    const url = "https://accounts.spotify.com/authorize"
        + "?client_id=" + cfg.client_id
        + "&response_type=code"
        + "&redirect_uri=https://binyam.in"
        + "&code_challenge_method=S256"
        + "&code_challenge=" + cfg.code_challenge
        + "&state=" + cfg.state
        + "&scope=user-top-read"
    ;
    return url;
}

function codeToAccessToken() {
    const body =
        "client_id=" + cfg.client_id
        + "&grant_type=authorization_code"
        + "&code=" + cfg.code
        + "&redirect_uri=https://binyam.in"
        + "&code_verifier=" + cfg.code_verifier
    ;

    axios.post("https://accounts.spotify.com/api/token", body, {
        headers: {
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
    .then(res => {
        console.log(res.data);
        fs.writeFileSync(".env.json", JSON.stringify({ ...cfg, access_token: res.data }, null, 4));
    })
    .catch(err => {
        console.error(err.response.data)
        throw err;
    })
}

function saveStats(accessToken) {
    axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        headers: {
            Authorization: "Bearer "+ accessToken
        }
    })
    .then(res => {
        datacache.set("spotify.tracks", res.data);
    })
    .catch(err => {
        console.error(err.response.data)
        throw err;
    })

    axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
        headers: {
            Authorization: "Bearer "+ accessToken
        }
    })
    .then(res => {
        datacache.set("spotify.artists", res.data);
    })
    .catch(err => {
        console.error(err.response.data)
        throw err;
    })
}

function refreshAccessToken(refresh_token) {
    const body =
        "grant_type=refresh_token"
        + "&refresh_token=" + refresh_token
        + "&client_id=" + cfg.client_id
    ;
    axios.post("https://accounts.spotify.com/api/token", body, {
        headers: {
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
    .then(res => {
        console.log(res.data);
        fs.writeFileSync(".env.json", JSON.stringify({ ...cfg, access_token: res.data }, null, 4));
    })
    .catch(err => {
        console.error(err.response.data)
        throw err;
    })
}
