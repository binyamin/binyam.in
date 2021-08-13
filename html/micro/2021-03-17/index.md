---
title: I shaved 65 kilobytes off my site
date: 2021-03-18T00:53:47.797Z
tags: [changelog, web]
---

I saved 65 KB on this site. Basically, I removed two web-fonts and cut out some CSS. Overall, I went from 93.8 KB to 28.8 KB.

I rewrote my styles using vanilla CSS. Originally, I was using a [SCSS](https://sass-lang.com/) because of its nesting capability. Another benefit of SCSS is that you can split your styles among multiple files. By default, CSS doesn't perform well in that respect[^1]. An advantage of using CSS, was that it forced me to write my styles more succinctly. By limiting myself to one file, I gave myself a practical reason to keep the file size to a minimum.

I also started loading fewer web-fonts. I removed the body and display web-fonts, opting for local fonts instead. I was using Roboto (sans-serif) for the body text, and Lora (serif) for the headings. I switched them both to a single, local-only, "catch-all" font stack. I can hardly tell the difference.

Otherwise, I made minimal changes to the website's visual design. In the process of rewriting the CSS, I made some stylistic decisions. For example, I changed the theme of my code blocks from "Nord" (a dark theme) to "GitHub Light". I also removed the CSS reset I was using, which was [normalize.css by Nicolas Gallagher](https://necolas.github.io/normalize.css/).

{% render 'table.html' %}

Oh, and the best part is... my site is now only 100 ms faster. 326% smaller, 8.3% faster. Go figure. 🤷‍♂️

[^1]: Think about it. Every time you request a CSS file, whether using a `<link/>` tag or `@include` syntax, you make a network request. As every network request has a cost, it's much more practical to combine your CSS into one file.
