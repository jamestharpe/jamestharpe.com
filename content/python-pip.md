---
date: 2021-11-22T13:00:54-04:00
description: "Python's package manager"
tags: ["python", "package-managers"]
title: "Pip: Python's Package Manager"
---

# Pip: Python's Package Manager

Pip is [Python's](python.md) [package manager](package-managers.md).

## The "safe" way to call `pip`

> TLDR: Prefix `pip` commands with `python3 -m`

Though `pip` can be called directly, the version of `pip` called is dependent on the [shell's](shell.md) `PATH` variable. If multiple versions of Python and `pip` are installed, the `pip` command may not run the expected version of `pip`.

The simplest way to avoid this confusion is to call `pip` via `python3` by prefixing `pip` commands with `python3 -m`. For example, instead of running `pip install <package-name>`, call `python3 -m pip install <package-name>`. This ensures the version of `pip` called is the version associated with the version of `python` or `python3` executed. This works because the `python3 -m` command uses the `sys.path` variable to find `pip` instead of the terminal's `PATH` variable.

## Useful `pip` commands

| Command                                | Description                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `pip install <package-name>`           | Installs the specified package                                                   |
| `pip install --upgrade <package-name>` | Upgrades the specified package to the latest version                             |
| `pip show <package-name>`              | Shows a summary of the specified package installation: Name, version, path, etc. |

## `pip` resources

- [`pip` official website](https://pip.pypa.io/en/stable/)
- [`pip` user guide](https://pip.pypa.io/en/stable/user_guide/)
- [Python Package Index](https://pypi.org/)
