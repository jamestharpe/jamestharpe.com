---
date: 2021-11-22T13:00:54-04:00
description: "How to manage virtual environments with Python, Pip, and VEnv"
tags: ["python", "python-pip"]
title: "Python Virtual Environments"
---

# Virtual environments with Python, Pip, and VEnv

In [Python](python.md) development, a **virtual environment** is an isolated context for [installing Python packages](python-pip.md). As of Python 3.3, `venv` is included to help manage virtual environments.

## Create and use a virtual environment

To create a virtual environment, it's usually best to specify the Python version explicitly to ensure the environment is setup with the expected version:

```bash
python3.8 -m venv path/to/environment
```

A best practice is to use a virtual environment per project. A common convention to do so is to create the environment in a folder called `venv` directly in the project folder:

```bash
cd my-project
python3.8 -m venv venv
```

To use the virtual environment, it needs to be activated:

```bash
source venv/bin/activate
which python3 # confirm expected python version
```

Once activated, it's usually necessary to install the project dependencies which are most often referenced by a `requirements.txt` file:

```bash
python3 -m pip install -r requirements.txt
```

Finally, the virtual environment can be deactivated when it's no longer needed:

```bash
deactivate
```

## Why virtual environments are important: Dependency hell

**Dependency hell** is the confusion caused when dependency needs conflict between projects, users, and systems.

Unlike most other [programming language](computer-languages.md) package managers that install packages in the current working directory, [`pip`](python-pip.md) by default installs packages as globally as possible. When installing a package, `pip` will first try to install that package system-wide. If system-wide installation is not permitted, `pip` will install the package for the current user.

These "as global as possible" installations can cause dependency hell when:

* Multiple projects have conflicting dependencies
* Project dependencies conflict with system dependencies
* Multiple users of the same system need conflicting dependencies
* Projects need to be tested against different versions of Python
* Projects need to be tested against different library versions

For these reasons, a best practice for Python and `pip` is to _always use a virtual environment_.

## What are virtual environments?

A **virtual environment** is an isolated context for installing Python packages. To prevent dependency hell, a new virtual environment should be created for every project.

A common convention
...
