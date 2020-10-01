const {titleCase} = require("title-case");

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s]+/g, '')
        .replace(/\s+/g, '-');
}

function removeFrontmatter(content="") {
    content = content.trimStart();
    let yamlFm = content.substring(3, content.indexOf("---", 3)).trim();

    if(!yamlFm || !content.startsWith("---")) return content; // Content has no frontmatter

    return content.replace(`---\n${yamlFm}\n---`, "");
}

module.exports = {
    layout: "note",
    type: "note",
    eleventyComputed: {
        title: data => titleCase(data.title || data.page.fileSlug),
        permalink: data => (
            data.page.fileSlug === "notes" ? "/notes/" : `/notes/${slugify(data.page.fileSlug)}/`
        ),
        backlinks: (data) => {
            const notes = data.collections.notes;
            const currentFileSlug = data.page.fileSlug;

            // Search each note for backlinks
            return notes.filter(n => {
                // Only fetch backlinks
                const noteContent = n.template.inputContent;

                // This regex finds all wikilinks in the note
                const linksInNote = (noteContent.match(
                    /\[\[([\w\s/-]+)(\|([\w\s/]+))?\]\]/g
                ) || [])
                .map(m => (
                    // Extract link location
                    m.slice(2,-2).split("|")[0]
                ));

                return linksInNote.includes(currentFileSlug);
            }).map(n => {
                // Construct return object
                const noteContent = removeFrontmatter(n.template.inputContent);


                // Truncate noteContent for preview
                let preview = noteContent.slice(0, 200);

                // truncate preview further, to last period
                preview = preview.slice(0, preview.lastIndexOf(".") +1);

                return {
                    url: n.url,
                    title: n.data.title,
                    preview
                }
            })
        }
    }
}
