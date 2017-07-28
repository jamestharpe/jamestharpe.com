---
title: "Setting up my Hugo Website"
date: 2017-07-28T06:44:00-04:00
draft: true
---
# Moving my Website to Hugo

I've decided to move [my website](https://www.jamestharpe.com/) off of [WordPress](https://wordpress.org/) and on to a static site generator. After building sites for several clients sites using [Jekyll](https://jekyllrb.com/), I thought it would be nice to try something new.

Since my website has been very neglected, most of the content is outdated so I'm not going to bother moving much of it over. If I were, I might try the [wordpress-to-hugo-exporter exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter).

## Why not Jekyll?

Though I liked Jekyll overall, I did have a few complaints:

* **Clunky Liquid syntax.**  I found Liquid to be too verbose and a bit awkward. Liquid is meant for people with very little coding experience, which often means expecting users to take "the long way" to achieve something more experienced developers might like to do more succinctly.
* **Slow code/test cycle.** Sites with a lot of content or complex templates take too long to generate. I sometimes found myself spending as much time tweaking my development build settings to speed up site generation as I did on actual development.
* **Just-okay Windows support.** Jekyll [works on Windows](https://jekyllrb.com/docs/windows/), but it takes more effort than I'd like. Some features break or require extra configuration, for example file monitoring wasn't working on Windows for a while (this is fixed now).

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
hugo new site jamestharpe.com && cd jamestharpe.com
...

# Add my first post
hugo new post/setting-up-hugo.md

# Install a theme to test with
git clone https://github.com/dim0627/hugo_theme_robust.git && cd hugo_theme_robust && git checkout 3baae29 && cd ../..
...

# Preview the site
hugo server --buildDrafts
...
```

The result:

[![Scaffolded Hugo Website](/img/jamestharpe.com-hugo-scaffold_600x409.png)](/img/jamestharpe.com-hugo-scaffold_995x680.png)

Huzzah!

### Trying out Auto Reload

Let's try Hugo's auto-reload feature:

![Hugo auto-reload demo](/img/hugo-auto-reload_600x634.gif)

Now that's the quick dev/test cycle I've been looking for!

### Modifying the Theme

Just to get started, I chose the [Robust Hugo theme](https://themes.gohugo.io/robust/). One of the first things I noticed was that it puts the page title as an `h1` tag in each article.

In most cases, I'd prefer the title and the article heading to be different. I'd also like to simply put the heading in markdown for each article, rather than having it be based on frontmatter. Let's see if we can improve things.

To override a template in a Hugo theme, all you need to do is copy the file from the `themes/{theme-name}/layouts/` directory into your site's `layouts/` directory:

![Override a Hugo Template](/img/hugo-override-layout_364x578.png)

Finally, remove the offending code and save:

![Hugo override template demo](/img/hugo-override-layout_600x633.gif)

Voilà!

### Finishing Touches

TODO: IA, Better Theme, Publish