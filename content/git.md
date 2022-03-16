---
date: 2020-11-17T07:54:30-04:00
description: "A distributed version-control system to track changes, typically for software development projects"
redirect_from: ["/tools/git/", "/linus-torvalds"]
tags: [ "cli", "open-source-software", "version-control" ]
title: "Git"
---

# Git

**Git** is a free, [open-source](open-source-software.md) [distributed](distributed-systems.md) [version control](version-control.md) system created by Linus Torvalds in 2005 to replace BitKeeper as the version control system for the [Linux](linux.md) kernel. Git is licensed under [GPLv2](https://opensource.org/licenses/gpl-2.0.php) and the code is [downloadable from GitHub](https://github.com/git/git).

As with  many distributed systems, nearly all of actions in Git are additive. Even when you delete a file from a project, it still exists in Git's database - Git "adds" the fact that the file was deleted, rather than actually deleting the file, even though the file will be removed from the working directory.

## Git file states: Modified, staged, committed

Generally speaking, files tracked by a Git repository can be in one of three states:

* **Modified**: The file in the working directory is different than the file in the repository.
* **Staged**: The file is in the staging area, but not yet committed to the repository.
* **Committed**: The file in the working directory matches the file in the repository.

Files are modified simply by working on them and saving them to disk. Git will detect that the file in the working directory is different from the file in the repository. The `git add` command is used to copy a file to the staging area. The staging area exists to group related sets of changes together into a single commit. The `git commit` command copies the file to the Git repository.

## Terms Associated with Git

* **Branch**: A copy of the code that diverges from the main line of development. Branches are used to do work without interfering with other lines of development. When you "check out" a branch, all the code in your "working directory" is replaced with the code from the branch. It's easy to switch back and forth between branches in git, so you don't have to worry about losing any work.
* **Check out**: When you switch from one branch to another.
* **Commit**: When you record a related set of changes in the repository.
* **Clone**: The creation of a copy of an existing Git repository. When you clone a repository, you don't just get the latest code - you get a full copy of virtually all of the data that the remote repository has, including every version of every file for the history of the project.
* **Fork**: Similar to a clone, a fork is a copy of a repository used as an upstream. You'll typically create a fork if you don't have permission to modify the original repository - instead, you create a "fork" of the repository so that you have permission to modify it. The fork can then be used to propose changes to the original repository (this is one of the "magical" features of Git that make it so great for open source).
* **Origin**: An alias on your system for a particular remote repository that makes it easy to refer to. "Origin" is the default alias, created when you clone a repository.
* **Pull**: When you download changes from a remote repository to your local repository.
* **Push**: When you upload changes in your local git repository to a remote repository (usually the "origin").
* **Repository**: A Git database that contains the complete history of your code.
* **Tag**: The same as a branch, but essentially read-only.
* **Merge**: A strategy to integrate changes from one branch to another where two separate histories are "combined" via a special type of commit (called a merge commit).
* **Rebase**: A strategy to integrating changes from one branch to another where the history of the target branch is changed so that it appears to have "started" from the most recent commit in the source branch.
* **Pull request** / **merge request**: Not actually part of Git! This is a feature of most git hosting platforms (GitHub, GitLab, BitBucket) where a merge is proposed and collaborated on.

## Additional Resources for Git

* [Official Git Website](https://www.git-scm.com/)
* [Git Tutorial](https://www.git-scm.com/docs/gittutorial)
* [Pro Git (Book)](https://git-scm.com/book/en/v2)
