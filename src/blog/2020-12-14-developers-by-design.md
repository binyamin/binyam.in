---
title: Developers By Design
tags: [design,web,code]
date: 2020-12-14T18:19:27-05:00
desc: >-
    Design fundamentals for aesthetically-challenged developers. A guide for
    developers who don't _want_ to learn design.
ignore: true
eleventyExcludeFromCollections: true
---

**What is design?**
At its core, visual design aims to simplify the user's experience. A well-designed website looks and feels natural. It's like commenting your code - when done well, users can easily find their way.

**How do you design well?**
Don't design something nice; design something sensible. It should also look nice, so users want to stay. Aesthetics are a small, but vital, part of design.


## Text
Make sans-serif your first choice.

The majority of your body text should be at least 16 pixels. 18 px is nice. [Learn more](https://learnui.design/blog/mobile-desktop-website-font-size-guidelines.html#desktop-web)

```css
html {
  font-family: sans-serif;
  font-size: 112.5%;
}
```

## Color
[Studies show](https://uxmovement.com/content/why-you-should-never-use-pure-black-for-text-or-backgrounds/) that pure black text with a pure white background is hard to read. Try a dark grey for your body text. And tell Batman that your website does _not_ come in black. At least, not `#000`.

```css
body {
  color: #333;
}
```

## Layout
**maximum line length**
[Research indicates](https://ux.stackexchange.com/a/108803) that website content should be roughly between 60 and 70 characters wide (use the [ch](https://developer.mozilla.org/en-US/docs/Web/CSS/length#ch) unit in CSS). Wider lines of text will make it harder to move from the end of one line to the start of the next line. Narrower, and your eyes are moving from side-to-side too often.

```css
body {
  width: 66ch;
}
```

## Resources
- https://ishadeed.com/article/pixel-perfection/ (has design tips for developers)
## Links
- [Refractoring UI](https://refactoringui.com/book/) (book, paid) - written by developers
- [Learn UI Design](https://learnui.design/) (free blog & paid course)
- ["Color in UI Design: A (Practical) Framework"](https://learnui.design/blog/color-in-ui-design-a-practical-framework.html), by Eric Kennedy

### TL;DR
```css
html {
  font-family: sans-serif;
  font-size: 112.5%;
}

body {
  color: #333;
  width: 66ch;
}
```
