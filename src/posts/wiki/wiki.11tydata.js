import {titleCase} from "title-case";

export default {
	layout: "note",
	category: "wiki",
	eleventyComputed: {
		title: data => titleCase(data.title || data.page.fileSlug),
	}
}
