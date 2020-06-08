if(document.querySelector(".twitter-tweet")) {
    let s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js"
    document.body.append(s)
}