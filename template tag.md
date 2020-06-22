# Clearer code with the template tag
**Outline**
1. modals/notifications
2. blog feeds
3. Leaderboards
4. group of cards (social media feed)
5. news feeds
6. task list

It's difficult to remember every HTML element. Inevitably, we can forget elements or simply not learn them. The template tag is a prime example. The most common use-case is web components. However, you can use it do show any content which needs to be dynamic.

Everyone makes a to-do list. It’s a rite-of-passage for most developers. You probably added a string of html to a container element (div), when you wanted to add an element. But if you wanted to edit that string, it would be much easier to write it in the HTML file. When you work in the HTML, you get syntax highlighting and code-completion, and you can make the markup complicated without cluttering the JS.

Modals can be complicated, but the template tag makes life easier.  You can write your markup in the HTML as usual, and wrap it in a template tag when you’re finished. The template tag will automatically hide its contents from users and screen-readers, and it will still be available in the DOM.

Blog feeds. For those who use fancy-shmancy SSG (Static Site Generator) nonsense, skip this paragraph. Traditionally, the front page of a blog lists all the posts on the website. We don’t always know how many posts to display. We can write a template and duplicate it with JS.

How about a leaderboard? Top-ten users, or something like that. You know you’ll have an image, name, and maybe a tagline, but you don’t know what to write yet. Write the markup as a template, and fill it in later.

Live feeds can be difficult to create. You can't build the site each time news comes in. Instead, you'll need to create content dynamically. This is where the template tag comes in.