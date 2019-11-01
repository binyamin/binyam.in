---
layout: post
main_class: post
title: Six Uses for Webpack
date: 2019-11-01T16:57:05.622Z
desc: >-
  I've always tried to avoid Webpack. After all, it's not the only tool of its
  kind on the market. However, once you know how to use it comfortably, it can
  be a very effective tool.
---
I've always tried to avoid [Webpack](https://webpack.js.org). I would tell myself it was either too complicated or unnecessary. After all, it's not the only tool of its kind on the market. Recently, however, I've come to terms with  Webpack. Once you know how to use it comfortably, it can be a very effective tool.

Webpack's main usage is bundling JavaScript. In node.js, `require` or `import` is used to include an external resource in your JavaScript file. Browsers don't understand `require`, so you must either include the resource in the head of your html or make an http request to a url. If you bundle your in-browser code though, Webpack will combine your file with all of the files that you imported through `require`. Bundling can also take care of features which may not be compatible with all browsers, such as es6 notation. This requires the babel plugin.

Another use-case is minifying CSS and/or JavaScript. Minification is simply stripping all white-space from a file. It's a very effective way of decreasing file size, thus speeding up load time. Minifying JS requires no plugins, however minifying css does. There are also plugins which increase the browser-compatibility of your css, such as autoprefixer.

You can preprocess scss. There are other ways such as gulp, node-sass and even a VS Code extension, but once you're using webpack this is a pretty useful feature. This requires a webpack loader.

You can compile jsx for ReactJS. This is can be easier to set up in some situations, especially in a complex environment such as an electron app. There's a good tutorial on compiling jsx with webpack [here](https://www.valentinog.com/blog/babel/). Note that this requires a plugin as well.

You can compile typescript with it. Admittedly, you *can* [compile typescript within VS Code](https://code.visualstudio.com/Docs/languages/typescript), however it's useful, because you can do two things with one command such as compile scss *and* typescript. This requires a plugin.

You can run a development server with your static files. There are extensions to do that, but it can prove useful when running multiple tasks or complicated setups. This requires an extra package.

I don't know the next time you will consider using webpack, but I hope that now you will be more prepared.
