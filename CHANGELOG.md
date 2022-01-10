# Changelog for this site

This changelog begins at v4.2.0, since that's when I decided to start keeping it.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- Write that what AND why, in order to track my thought process throughout development, and not revert changes left and right. -->

## 4.7.0 - 1-10-2022
- Use nunjucks instead of liquid for the templating engine. Nunjucks has the bonus of supporting [macros](http://mozilla.github.io/nunjucks/templating.html#macro).
- Switch back to sass. The gain from css was minimal, and the size of the css file became annoying when scrolling.
- Made major changes to the folder structure. More information is available in the dropdown.
<details>
   <summary>Specific folder changes</summary>

  - `/eleventy` -> `/utils` - it's a more generic name, and I'm using this convention with other projects
  - `/html` -> `/src` - the folder isn't just for html; it's for RSS, JSON-feed, XML, and everything on the site except for assets (eg. js, css, images).
  - `/../_data` -> `/../data` - looks better & more uniform when there are fewer folders under the root.
  - Group folders by kind (posts, pages, files):
    - (posts)
      - `/../{blog,micro,wiki}` -> `/../posts/..`
      - `/../archive.njk` -> `/../posts/archive.njk`
    - (pages - standalone HTML)
      - `/../test` -> `/../pages/test`
      - `/../feeds/index.md` -> `/../pages/feeds.md`
    - (files - not HTML)
      - `/../feeds/*.{njk,11ty.js}` -> `/../files/feeds/..`
      - `/../{sitemap.njk,style.11ty.js}` -> `/../files/..`
  - Group markup files which don't produce any output
    - `/../_layouts` -> `/../templates`
    - `/../_includes` -> `/../templates/includes`
</details>

## 4.6.0 - 10-31-2021
<strong>Edit</strong>: For some reason, I jumped from `4.2.0` to `4.6.0`. I'm not sure why.

**Partial listing**
- Typography overhaul
- rewrote home-page
- switch from scss to css
- add h-feed
- Also updated a bunch of static pages

## 4.2.0 - 01-04-2021
- Added this changelog, in order to track my thought process and make better design decisions in the future
- removed hashtags from posts (visibly). I don't have enough posts for it to be important. Now, it just takes up space.
- inline code is now dark-grey instead of red, since the red color disrupted the flow of reading.
- stopped processing "#foo" as a hashtag-link. The links don't lead anywhere except a 404.
