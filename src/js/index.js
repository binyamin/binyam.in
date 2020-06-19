// word count
if(document.getElementById("wordCount")) {
    let content = document.querySelector(".e-content");
    const count = content.textContent.match(/(\w\S*)+/g).length;
    document.getElementById("wordCount").textContent = count + " words"
};

// Mark external links
if(document.querySelectorAll("a[href]").length > 0) {
    document.querySelectorAll("a[href]").forEach(l => {
        const isLinkLocal = (new URL(l.href)).hostname === location.hostname;

        if(!isLinkLocal && !l.relList.contains("referrer")) {
            l.relList.add("external");
            l.relList.add("noreferrer");
            l.relList.add("noopener")
            l.target = "_blank"
        };
    })
}