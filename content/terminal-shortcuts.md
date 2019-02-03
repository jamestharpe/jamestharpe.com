---
title: "Terminal Shortcuts"
date: 2019-02-02T18:11:15-05:00
languages: []
tools: ["terminal"]
techniques: ["Shortcuts"]
frameworks: []
projects: []
draft: false
---

# Use the Terminal _Faster_

I've always been a fan of working faster with [shortcuts](/techniques/shortcuts/) and the terminal is no exception. I recently took some time to learn some terminal shortcuts to make working with CLIs faster. 

Here's what I learned.

## Terminal Keyboard Shortcuts

| Shortcut   | Use                                          | Notes                          |
| ---------- | -------------------------------------------- | ------------------------------ |
| `⬆`        | Scroll up through previous commands          |                                |
| `⬇`        | Scroll down through previous commands        |                                |
| `Ctrl`+`a` | Jump to beginning of line                    | Works in most text editors     |
| `Ctrl`+`e` | Jump to end of line                          | Works in most text editors     |
| `Ctrl`+`l` | Clear screen                                 | Similar to the `clear` command |
| `Ctrl`+`r` | Search & execute previous command            |                                |
| `Ctrl`+`u` | Delete everything to the left of the cursor  | Works in VS Code               |
| `Ctrl`+`k` | Delete everything to the right of the cursor | Works in VS Code               |

## Terminal Command Shortcuts

| Command   | Use                                | Example                                                                |
| --------- | ---------------------------------- | ---------------------------------------------------------------------- |
| `history`  | Show list of previous commands     | `history 5` will show last five commands executed                      |
| `!123`    | Execute command `123` from history | `sudo !123` will execute command 123 from history with `sudo`          |
| `!!`      | Execute previous command           | `sudo !!` will execute the last command with sudo                      |
| `&`       | Run command in background          | `hugo serve &` will run [`hugo serve`](/tools/hugo/) in the background |

## Terminal Command Chains

| Operator | Use                                          | Example                                                                 |
| -------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `;`      | Chain commands, despite failure              | `mkdir a; mkdir b` will call `mkdir b` whether `mkdir a` suceeds or not |
| `&&`     | Chain commands, if succesful                 | `mkdir a && mkdir b` will call `mkdir b` only if `mkdir a` succeeds     |
| `||`     | Chain commands, if failure                   | `mkdir a || mkdir b` will call `mkdir b` only of `mkdir a` fails        |
| `|`      | Pass command output as input to next command | `ps -ef | less` will use `less` to scroll through output of `pf -es`    |

## More Resources

* [Terminal Cheetsheet for Mac](https://github.com/0nn0/terminal-mac-cheatsheet)
* [Git Bash Shortcuts for Windows](https://gist.github.com/tuxfight3r/60051ac67c5f0445efee)
* [Julia Evans's Twitter Feed](https://twitter.com/b0rk)