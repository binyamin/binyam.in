// Mark external links
if(document.querySelectorAll("a[href]").length > 0) {
    document.querySelectorAll("a[href]").forEach(l => {
        const isLinkLocal = ["binyam.in", "localhost"].includes((new URL(l.href)).hostname);

        if(l.target === "_blank") {
            l.relList.add("noopener")
            l.relList.add("noreferrer");

        }

        if(!isLinkLocal) {
            l.relList.add("external");
        };
   })
}
