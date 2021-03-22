---
title: Style
layout: default
ignore: true
eleventyExcludeFromCollections: true
---

# Styles

{%callout "warning" %}
🚧 **Work-In-Progress**\
This document is evolving slowly. It's not done yet. Things are rough around the edges, etc.
{%endcallout%}

This is my style guide. I also have [a colophon](/colophon), which explains what I used to build my website. This document talks more about the visual design.

<!--
Contents
- Vision & Tone
- Colors (very short, I guess)
- Typography
  - Font & Text (family, levels, line-height?, icons)
  - Links
  - Blockquote
- Inline code/var, code-blocks, and pre-blocks
- Tables (also: w/t caption)
- Callouts
- Images
- Layouts (3 variants, each one gets a rough image/svg thumbnail)
-->


## Voice & Tone

My "brand" is a visual representation of my personality and goals. I would like to exhibit formal, clean, and sensible. Another value I'd like to display is friendliness. I want to be kind, warm, and inviting. This dichotomy of logic and emotion influences all my decisions, and I want my brand to reflect that.

## Typography
- **Font stack** is just system fonts (sans-serif and color emoji)
- **Body font size** is usually 18px, and 16px on smaller screens

We really only use 3 levels of headings. This is largely for visual taste, readability, and the user's sanity. Unless you're writing an academic report, web pages generally aren't detailed enough to merit a 4 levels of headings. If you feel the need for a 4th level, try restructuring your content and/or using different components.


## Block-level Elements

> This is a blockquote

1. List
2. of
3. Things

col|col|col
---|---|---
table|without|text
rows|upon|rows

<figure>

col|col|col
---|---|---
has|detail|text
another|pointless|row

<figcaption>Technically, this is just a description.</figcaption>
</figure>

```js
function foo(bar) {
    return bar;
}
```

{% callout "info" %}
This is a callout. It can contain a lot of text; so much so that it continues on a new line.

Sometimes, you need another paragraph.
{% endcallout %}

<button class="btn">Button</button>

## Inline Elements
+ Keyboard Input: <kbd>Enter</kbd>
+ Inline code - `Inline Code`
+ [This is an internal text link](#).
+ [This is an external text link](https://github.com)
+ <strong>Strong is used to indicate strong importance.</strong>
+ <em>This text has added emphasis.</em>
+ The <b>b element</b> is stylistically different text from normal text, without any special importance.
+ The <i>i element</i> is text that is offset from the normal text.
+ The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.
+ <del>This text is deleted</del> and <ins>This text is inserted</ins>.
+ <s>This text has a strikethrough</s>
+ Superscript<sup>®</sup>.
+ Subscript for things like H<sub>2</sub>O.
+ <small>This small text is small for for fine print, etc.</small>
+ Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
+ <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q>
+ <cite>This is a citation.</cite>
+ The <dfn>dfn element</dfn> indicates a definition.
+ The <mark>mark element</mark> indicates a highlight.
+ The <var>variable element</var>, such as <var>x</var> = <var>y</var>.
+ A footnote is... a footnote[^1].

[^1]: It's a footnote.
