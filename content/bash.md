---
title: "Bourne Again Shell (Bash)"
date: 2020-11-16T10:15:11-04:00
tags: ["shell", "terminal"]
description: "A Unix shell"
redirect_from: ["/languages/bash/"]
---

# Bash

Bash is a Unix shell

## Bash Command Shortcuts

| Command   | Use                                | Example                                                                |
| --------- | ---------------------------------- | ---------------------------------------------------------------------- |
| `history` | Show list of previous commands     | `history 5` will show last five commands executed                      |
| `!123`    | Execute command `123` from history | `sudo !123` will execute command 123 from history with `sudo`          |
| `!!`      | Execute previous command           | `sudo !!` will execute the last command with sudo                      |
| `&`       | Run command in background          | `hugo serve &` will run [`hugo serve`](/tools/hugo/) in the background |

## Bash Command Chains

| Operator                  | Use                                          | Example                                                                               |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `;`                       | Chain commands, despite failure              | `mkdir a; mkdir b` will call `mkdir b` whether `mkdir a` succeeds or not              |
| `&&`                      | Chain commands, if successful                | `mkdir a && mkdir b` will call `mkdir b` only if `mkdir a` succeeds                   |
| <code>&#124;&#124;</code> | Chain commands, if failure                   | <code>mkdir a &#124;&#124; mkdir b</code> will call `mkdir b` only if `mkdir a` fails |
| <code>&#124;</code>       | Pass command output as input to next command | <code>ps -ef &#124; less</code> will use `less` to scroll through output of `pf -es`  |
