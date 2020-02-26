---
layout: post
main_class: post
title: A Sample Post
date: 2019-11-15T12:00:00.629Z
---
# Markdown

## What is Markdown
*This* is Markdown, created by *Josh Gruber*. [^1]

> Blockquotes can be written like so

**Example Code Block**
```js
function dev(isAwake) => {
    if(isAwake) {
        return code();
    } else {
        return drinkCoffee();
    }
}
```

## Features
1. Formatting
  * `**bold**` or `__bold__` (**text**)
  * `*italics*` or `_italics_` (*text*)
  * `~~strikethrough~~` (~~text~~)
  * `` `code` ``
2. Elements
  + `[Link Text](URL)`
  + `![Alt Text](URL "title")`
  + horizontal rule (`---`) 
  + `> Blockquote`
  + **Code Blocks**
````md
```js
// Code here ...
```
````

3. Headings
  + `# H1`
  + `######H6`
  + Everything in between
4. Lists
  - Unordered (`-`,`+`,`*`)
  - Ordered (`1.`)
5. GFM
  - [x] Task lists (`- [ ]`, `- [x]`)
  - [x] `:tada:` :tada:
  - [ ] yaml frontmatter => table
6. Kramdown
  * Footnotes - `Footnotes [^2]. [^2]:They are cool.`
  * Abbreviations (GFM) - `*[abbr]: Abbreviation`
7. Also
  - `<!-- Comment -->`
  - *Some* `html` is okay

a     |   b
--- | ---
c | d

## Lots of Text
Red flag UX, but show pony. We need to aspirationalise our offerings. The last person we talked to said this would be ready bake it in can we parallel path but what's the real problem we're trying to solve here? or can we align on lunch orders. Get buy-in waste of resources, yet accountable talk. Talk to the slides waste of resources beef up if you want to motivate these clowns, try less carrot and more stick re-inventing the wheel.

## Footnotes
[^1]: Markdown can be written quite easily. It is [documented](https://daringfireball.net/projects/markdown/) in its original form by the creator and by GitHub as [GitHub Flavored Markdown (GFM)](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)

*[GFM]: GitHub Flavored Markdown