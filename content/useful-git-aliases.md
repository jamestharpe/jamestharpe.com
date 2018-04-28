---
title: "Useful Git Aliases"
date: 2018-04-28T08:03:28-04:00
tools: ["Git"]
techniques: ["Shortcuts"]
draft: true
---
# Useful Git Aliases

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

If you're absent minded like I am then, an interruption can cause you to forget what you just committed. Rather than using `git ls` to check the logs, `git last` can be useful to quickly see only the most recent commit.

```bash
$ git config --global alias.last 'log -1 HEAD'

$ git last
commit 48f3317298e16046c4934b6ea6d37fa4bc0ca1c1 (HEAD -> master)
Author: James Tharpe <jimmy.tharpe@gmail.com>
Date:   Sat Apr 28 08:19:33 2018 -0400

    Starts useful git aliases article

```

## Fix the Last Commit with `git ammend`