---
title: "Useful Git Aliases"
date: 2018-04-28T08:03:28-04:00
tools: ["Git"]
techniques: ["Shortcuts"]
draft: false
---
# Git Aliases for Productivity

A recent addition to by [Automatic Development Environment Setup](/automatic-development-environment-setup) script were several [Git](/tools/git/) aliases that help to speed things up. Here is how and why I set them up.

## Start the Day with `git pom`

The first step in most developer workflows is to run `git pull origin master` to ensure your local work is current with the main line of development. Shave a few seconds off this routine step by shortening the command to `git pom`:

```bash
$ git config --global alias.pom 'pull origin master'

$ git pom
remote: Counting objects: 5, done.
remote: Total 5 (delta 2), reused 2 (delta 2), pack-reused 3
Unpacking objects: 100% (5/5), done.
...
```

## Get Caught Up with `git ls`

Once you've pulled the latest from `master`, it can be helpful to see what's changed in the repository. Configuring an alias for `git ls` can simplify common but verbose calls to `git log ...`:

```bash
$ git config --global alias.ls "log --pretty=format:'%C(yellow)%h %ad%Cred%d %Creset%s%Cblue [%cn]' --decorate --date=short"

$ git ls
48f3317 2018-04-28 (HEAD -> master) Starts useful git aliases article [James Tharpe]
44b55a0 2018-04-01 (origin/master, origin/HEAD) Started CLI/TypeScript article [James Tharpe]
3748172 2017-12-22 Publishes serverles-aws-backend [James Tharpe]
5d51a2e 2017-12-22 Completes serverless-aws-backend.md [James Tharpe]
cd058e2 2017-12-17 WIP: Form2Email [James Tharpe]
...
:
```

(just type `q` to quit)

## Pick Up Where You Left Off With `git last`

If you're absent-minded like I am then an interruption can cause you to forget what you just committed. Rather than using `git ls` to check the logs, `git last` can be useful to quickly see only the most recent commit.

```bash
$ git config --global alias.last 'log -1 HEAD'

$ git last
commit 48f3317298e16046c4934b6ea6d37fa4bc0ca1c1 (HEAD -> master)
Author: James Tharpe <jimmy.tharpe@gmail.com>
Date:   Sat Apr 28 08:19:33 2018 -0400

    Starts useful git aliases article

```

## Prepare for the Daily Standup with `git standup`

A quick way to remember what you were working on recently for your team's daily standup is to view the Git log since yesterday. A nice alias for this is `git standup`:

```bash
$ git config --global alias.standup "log --since yesterday --author $(git config user.email) --pretty=short"

$ git standup
commit 0d686aeef569e6762abab8e16cd2118a791be600 (HEAD -> master)
Author: James Tharpe <jimmy.tharpe@gmail.com>

    Outlines git aliases article

commit 6ded0e6b249b28984127f1221a713f69b74830e5
Author: James Tharpe <jimmy.tharpe@gmail.com>

    Starts useful git aliases article
```

## Get _Everything_ with `git everything`

Working with Git submodules can be prone to error, since subodules don't update like the rest of your codebase does when you run `git pom` or similar commands. To avoid forgetting to update or initialize submodules in your repository, configure `git everything`:

```bash
$ git config --global alias.everything "! git pull && git submodule update --init --recursive"

$ git everything
remote: Counting objects: 8, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 8 (delta 5), reused 8 (delta 5), pack-reused 0
Unpacking objects: 100% (8/8), done.
From github.com:jamestharpe/jamestharpe.com
   44b55a0..0d686ae  master     -> origin/master
Updating 44b55a0..0d686ae
Fast-forward
 content/useful-git-aliases.md | 63 +++++++++++++++++++++++++++++++++++++++++++
 themes/minimal                |  2 +-
 2 files changed, 64 insertions(+), 1 deletion(-)
 create mode 100644 content/useful-git-aliases.md
Submodule 'themes/minimal' (git@github.com:calintat/minimal.git) registered for path 'themes/minimal'
Cloning into 'C:/Users/james/code/me/temp/jamestharpe.com/themes/minimal'...
Submodule path 'themes/minimal': checked out '2ac9acc008de52f61cc79fe2f93e61ba62e17d3b'
```

## Prune Branches Merged with `master` with `git branch-clean`

Branches help keep track of incompleted or undelivered work, but once the work is complete we sometimes forget to remove the branches we no longer need. To clean up branches that are already merged with master in one swoop, configure `git branch-clean`:

```bash
$ git config --global alias.branch-clean "! git branch --merged master | grep -v '^[ *]*master$' | xargs git branch -d"

$ git branch-clean
$ git branch-clean
Deleted branch article/useful-git-aliases (was da41448).
Deleted branch article/hire-me (was 23841b8).
```

## Remember Git Aliases with Yet Another Alias

So you've setup all these aliases but can't remember them. One more alias to help remmeber all your aliases:

```bash
$ git config --global alias.aliases "config --get-regexp alias"

$ git aliases
alias.pom pull origin master
alias.last log -1 HEAD
alias.ls log --pretty=format:'%C(yellow)%h %ad%Cred%d %Creset%s%Cblue [%cn]' --decorate --date=short
alias.ammend commit -a --amend
alias.standup log --since yesterday --author jimmy.tharpe@gmail.com --pretty=short
alias.everything ! git pull && git submodule update --init --recursive
alias.aliases config --get-regexp alias
```

## Learn More About Git Aliases

Check out the [Git Basics - Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) chapter of Pro Git to learn more about Git aliases.