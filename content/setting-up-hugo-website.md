---
title: "Setting up my Hugo Website"
languages: [ "Markdown", "TOML" ]
tools: [ "Hugo" ]
techniques: [ "Static Site Generation" ]
projects: [ "JamesTharpe.com" ]
date: 2017-08-20T06:24:00-04:00
---
# Moving my Website to Hugo

I've decided to move [my website](https://www.jamestharpe.com/) off of [WordPress](https://wordpress.org/) and on to a static site generator. After building sites for several clients using [Jekyll](https://jekyllrb.com/), I thought it would be nice to try something new.

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

# Scaffold my website
hugo new site jamestharpe.com && cd jamestharpe.com

# Add my first post
hugo new post/setting-up-hugo.md

# Install a theme to test with
git clone https://github.com/dim0627/hugo_theme_robust.git && cd hugo_theme_robust && git checkout 3baae29 && cd ../

# Preview the site
hugo server --buildDrafts
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

### Changing Themes: Minimal

After browsing the [Hugo Themes site](https://themes.gohugo.io/) I settled on [Minimal](https://themes.gohugo.io/theme/minimal/) as my starter theme (sorry, Robust). Switching themes is pretty easy:

```bash
git submodule add git@github.com:calintat/minimal.git themes/minimal
git submodule init
git submodule update
```

Note that this time I opted to use add a [git submodule](https://git-scm.com/docs/git-submodule) rather than a clone, which allows me to easily update to the latest version of the theme automatically:

```bash
git submodule update --remote themes/minimal
```

### Taxonomy

Hugo comes with [tags and categories](https://gohugo.io/content-management/taxonomies/) by default. I plan to blog about software development and related topics, and I tend to use a lot of technologies which makes it difficult to organize my planned posts into simple tags and categories. Instead, I've decided to go with a more custom approach:

* **Languages** will cover the programming languages used in each article, in this article I'm using [markdown](/languages/markdown/)
* **Frameworks** will cover the frameworks used in each article, for example ASP.NET
* **Tools** will cover the tools used in each article, in this article I'm using [hugo](/tools/hugo/)
* **Techniques** will cover the techniques used in each article, in this article I'm using static site generation

Setting up this custom taxonomy is easy. Just open the site's `config.toml` file and add your custom taxonomies in `single = "plural"` format:

```toml
[taxonomies]
    framework = "frameworks"
    language = "languages"
    technique = "techniques"
    tool = "tools"
```

Then simply assign them in each article's frontmatter:

```markdown
---
title: "Setting up my Hugo Website"
languages: [ "markdown", "toml" ]
tools: [ "hugo" ]
technique: [ "static site generation" ]
# ...
---
```

Hugo will now generate [list pages](https://gohugo.io/templates/lists/) for each taxonomy.

### Publishing My Hugo Site to GitHub Pages

[GitHub Pages](https://pages.github.com/) allows static website hosting from a GitHub repository by publishing your website to a `/docs` folder or to a `gh-pages` branch. Though publishing to the `/docs` folder requires less setup, the `gh-pages` branch approach seems cleaner and the setup is easily automated.

#### Script to Setup Hugo Site Publishing to `gh-pages` Branch

This script only needs to be run once. It was modified from the [Hosting on GitHub Hugo documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/):

```bash
# Create branch

git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push -u origin gh-pages
git checkout master

# Add worktree
rm -rf public
git worktree add -B gh-pages public origin/gh-pages
```

This creates the `gh-pages` branch with a new history, independent from `master` (read more about [orphan branches](https://git-scm.com/docs/git-checkout/#git-checkout---orphanltnewbranchgt) in the Git docs). It then checks out the `gh-pages` branch into the `public` folder (which is ignored in `.gitignore`), which is where Hugo will statically generate the site by default.

#### Script to Publish Hugo Site to GitHub Pages

```bash
echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

hugo
pushd public
git add --all
git commit -m "Publishing to gh-pages as of $(date)"
git push
popd
```

This generates the Hugo site, commits the generated files to the `gh-pages` branch, then pushes them to GitHub, which makes it live!