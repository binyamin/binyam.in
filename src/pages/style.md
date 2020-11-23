---
title: Style
layout: default
ignore: true
eleventyExcludeFromCollections: true
---

# Styles

## Text
# H1
## H2
### H3
#### H4
##### H5

A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.

> This is a blockquote

1. List
2. of
3. Things

## Block-level Elements
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
+ This is a [#chip](#){.chip}
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
