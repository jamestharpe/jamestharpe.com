---
date: 2020-12-20T11:19:46-04:00
description: "An end-to-end DevOps tool chain centered on Git"
tags: [ "gitlab-ci-cd" ]
title: "GitLab CI/CD Tips"
---

# GitLab CI/CD

**GitLab CI** is the part of [GitLab](gitlab.md) that enables automation for [CI/CD](ci-cd.md).

## Leave out `ref` on `include` `project` configurations

The typical include in a `gitlab-ci.yml` file might look something like this:

```yaml
include:
  - project: 'my-org/templates'
    ref: main
    file: '/common-functions.yml'
```

However, if you leave out `ref` then the default branch (typically `main` or `master`).
