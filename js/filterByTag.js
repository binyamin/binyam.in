const posts = [...document.querySelectorAll("#postList li")];
const tag = location.search.slice(location.search.indexOf("=") + 1);

if(tag) {
    let postsNoTag = posts.filter(l => JSON.parse(l.dataset.tags).includes(tag) === false);
    let postCount = posts.length - postsNoTag.length;

    let pageTag = document.getElementById("pageTag");
    pageTag.prepend(`${postCount} ${(postCount) > 1 ? "posts" : "post"} tagged with ${tag}`);
    pageTag.removeAttribute("hidden");

    postsNoTag.forEach(p => {
        p.setAttribute("hidden", true);
    });
}