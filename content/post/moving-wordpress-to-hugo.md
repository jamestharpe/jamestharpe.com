---
title: "Moving from WordPress to Hugo"
date: 2017-07-21T06:44:00-04:00
draft: true
---

# Moving my Blog from WordPress to Hugo

I've decided to move [my website](https://www.jamestharpe.com/) off of [WordPress](https://wordpress.org/) and on to a static site generator. After building sites for several clients sites using [Jekyll](https://jekyllrb.com/), I thought it would be nice to try something new.

## Why not Jekyll?

Though I liked Jekyll overall, I did have a few complaints:

* **Clunky Liquid syntax.**  I found Liquid to be too verbose and a bit awkward. Liquid is meant for people with very little coding experience, which often means expecting users to take "the long way" to achieve something more experienced developers might expect to find a shortcut for.
* **Slow code/test cycle.** Site's with a lot of content or complex templates take too long to generate. I sometimes found myself spending as much time tweaking my development build settings to speed up site generation as I did on actual development.
* **Just-okay Windows Support.** Jekyll works on Windows, but it takes more effort than I'd like. Some features break or require extra configuration, for example file monitoring wasn't working on Windows for a while (this is fixed now).

## Enter Hugo

[Hugo](http://gohugo.io/) seems to address all my Jekyll grievances:

* Hugo uses Go's [html](https://golang.org/pkg/html/template/) and [text](https://golang.org/pkg/text/template/) templating libraries
* Hugo is _fast_
* Auto-reload makes the dev/test cycle extremely convenient
* Hugo easily installs on Windows

### Scaffolding with Hugo

Following the [Hugo Quick Start Guide](https://gohugo.io/getting-started/quick-start/), scaffolding this website only took a few moments on the command line, and "just worked" without any fuss:

```bash
# Install Hugo
choco install hugo --yes
...

# Scaffold my website
hugo new site jamestharpe.com
...

# Add my first post
hugo new post/moving-wordpress-to-hugo.md

# Install a theme to test with
git clone https://github.com/dim0627/hugo_theme_robust.git && cd hugo_theme_robust && git checkout 3baae29 && cd ../..
...

# Preview the site
hugo server --buildDrafts
...
```

The result:

[![](/img/jamestharpe.com-hugo-scaffold_678x463.png)](/img/jamestharpe.com-hugo-scaffold_995x680.png)

### Trying out Auto Reload

todo: GIF of auto-reload in action