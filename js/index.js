// word count
if(document.getElementById("wordCount")) {
    let content = document.querySelector(".e-content");
    const count = content.textContent.match(/(\w\S*)+/g).length;
    document.getElementById("wordCount").textContent = count + " words"
};

// import twitter widget
if(document.querySelector(".twitter-tweet")) {
    let s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js"
    document.body.append(s)
}

// Mark external links
if(document.querySelectorAll("a[href]").length > 0) {
    document.querySelectorAll("a[href]").forEach(l => {
        const isLinkLocal = (new URL(l.href)).hostname === location.hostname;

        if(!isLinkLocal && !l.relList.contains("referrer")) {
            l.relList.add("external");
            l.relList.add("noreferrer");
            l.target = "_blank"
        };
    })
}