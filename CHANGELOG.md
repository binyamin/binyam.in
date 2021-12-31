# Changelog for this site

Note: This changelog begins at v4.2.0, since that's when I decided to start keeping it.
<!-- Write that what AND why, in order to track my thought process throughout development, and not revert changes left and right. -->
<!-- https://keepachangelog.com/en/1.0.0/ -->

## Unreleased
- Use nunjucks instead of liquid, for template engine. Nunjucks has the bonus of supporting [macros](http://mozilla.github.io/nunjucks/templating.html#macro).
- Switch back to sass. The gain from css was minimal, and the size of the css file made it annoying to when scrolling.

## 4.6.0 - 10-31-2021
**Partial listing**
- Typography overhaul
- rewrote home-page
- switch from scss to css
- add h-feed
Also updated a bunch of static pages

## 4.2.0 - 01-04-2021
- Added this changelog, in order to track my thought process and make better design decisions in the future
- removed hashtags from posts (visibly). I don't have enough posts for it to be important. Now, it just takes up space.
- inline code is now dark-grey instead of red, since the red color disrupted the flow of reading.
- stopped processing "#foo" as a hashtag-link. The links don't lead anywhere except a 404.
