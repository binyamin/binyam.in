---
layout: post
title: Six Uses for Webpack
date: 2019-11-15T11:05:00.622Z
desc: I've always tried to avoid Webpack. However, once you know how to use it, it can be a very effective tool.
tags: [code]
---
I've always tried to avoid Webpack. I would tell myself it was either too complicated or unnecessary. After all, it's not the only tool of its kind on the market. Yet recently I've come to terms with  Webpack. Once you know how to use it, it can be a very effective tool.

Webpack's main usage is bundling JavaScript. In node.js, we generally use `require` or `import` to include an external resource in our JavaScript file. Yet browsers don't understand `require`. You can either include the resource in the head of your HTML or make an HTTP request to a URL. With Webpack, though, you can bundle your in-browser code. Webpack will combine all the files that you imported using require and stick them in your file. Bundling can also take care of features such as ES6 notation which may not be compatible across all browsers. This requires the babel plugin.

Another use-case is minifying CSS and/or JavaScript. Minification strips all white-space from a file. It's a very effective way of decreasing file size, thus speeding up load time. Minifying JavaScript requires no plugins, yet minifying CSS does. There are also plugins which increase the browser-compatibility of your CSS.

You can preprocess SCSS. There are other ways, such as gulp, node-sass, and even a VS Code extension. But once you're using Webpack this is a pretty useful feature. This requires a Webpack loader.

You can compile JSX for ReactJS. This is can be easier to set up in some situations, especially in a complex environment such as an electron app. There's a good tutorial on compiling JSX with Webpack [here](https://www.valentinog.com/blog/babel/). Note that this requires a plugin as well.

You can compile Typescript with it. You _can_ [compile Typescript within VS Code](https://code.visualstudio.com/Docs/languages/typescript),  though Webpack may be more efficient because you can run many tasks with one command. This requires a plugin.

You can run a development server with your static files. Extensions do exist to serve that purpose, though Webpack can prove useful when running many tasks or complicated setups. This requires an extra package.

I don't know the next time you will consider using Webpack, but I hope that now you will be more prepared.
