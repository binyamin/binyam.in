---
title: Writing CSS with Purpose
desc: I don’t understand CSS. I just write it.
date: 2022-01-20T19:00:58.453Z

# The post talks about ...
tags: [code, css, web, design]

# The entire post is meant to be a ...
folders:
  - changelog
  - opinion
  # tutorial
  # - quote
  # - tutorial
  # - yearly-review

# Array of links to syndicated copies
elsewhere:
  - https://news.indieweb.org/en/binyam.in/p/writing-css-with-purpose/
  - https://twitter.com/binyamingreen/status/1484581274148876297
  - https://mas.to/web/statuses/107661662800086647
---

<!-- this `link` should be removed, once POSSE is part of the post layout -->
<link class="u-syndication" href="https://news.indieweb.org/en" />

I've been paying more attention to my website recently. I've been asking why it exists, what I want it to look like, and other such questions.

Anyhow, as I rewrite my CSS, I've begun to realize how poorly I use it as a language. My process for writing it consists mostly of trial-and-error, without any idea of what I'm doing. That makes it hard to rewrite the code, since there's no organization or logic.

{#
<!-- There are many methods for writing and structuring CSS. There are linters to keep you in check, and style-guides to give you advice. And that's great &mdash; it's important to be able to find a block of CSS when you need to change it. -->
#}
## An Analogy

I guess my point is that <b>writing CSS is kinda like typing on a keyboard</b>.[^css-kbd] Some typists don't have the layout memorized. This group looks down at the keyboard when typing, then up at the screen to check for accuracy, and then down again. Other typists know the layout perfectly well, and focus their eyes on the screen at all times.

In the same fashion, some developers try CSS rules until they get what they want. The conversation goes something like this: <q>Let's try `float: left`. Nope. How about flexbox? Ah, there we go. But it's not wrapping (<em>sigh</em>).</q>

Other developers know <em>why</em> each rule does what it does. They don't need to see the browser as often. There's no "guess and check". This second group transcends methodologies like [BEM](http://getbem.com), and opinionated questions like "how to order your rules".

## An Ideal

When you stop <i>pushing divs across the screen</i>, you start making a website. I want to stop pushing divs. [Websites are coffee makers](https://ia.net/topics/on-apps-and-coffee), and I want to brew some coffee. Currently, though, I don’t <em>understand</em> CSS. I just <em>write</em> it.

[^css-kbd]: Not literally. I mean, I suppose you <em>are</em> typing on a keyboard. Unless your name is Josh Comeau, and [you can code without using your hands](https://www.joshwcomeau.com/blog/hands-free-coding/). But, I digress.
