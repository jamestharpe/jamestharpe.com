---
title: "Docker: Fix Invalid Bind Mount Spec Git Bash"
date: 2017-11-07T13:44:06-05:00
tools: [ "Docker", "Git Bash" ]
draft: false
---
# Error response from daemon: invalid bind mount spec

The call to `docker run` using Git Bash on Windows was recently frustrating me when I tried to specify a volume using `-v`:

```bash
$ docker run -it -v /c/Users/james/Code/my-application:/app james/testcontainer sh
C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: invalid bind mount spec "/C/Users/james/Code/my-application;C:\\Program Files\\Git\\app": invalid volume specification: '/C/Users/james/Code/my-app;C:\Program Files\Git\app': invalid mount config for type "bind": invalid mount path: '\Program Files\Git\app' mount path must be absolute.
See 'C:\Program Files\Docker\Docker\Resources\bin\docker.exe run --help'.
```

I tried multiple formats for the path, but ultimatly discovered that it is necessary to prefect the path with an extra slash (`/`), like so:

```bash
$ docker run -it -v //c/Users/james/Code/my-application:/app james/testcontainer sh
```

This is necessary when using `pwd` as well, for example:

```bash
$ docker run -it -v /$(pwd):/app james/testcontainer sh
```

The syntax to mount a docker volume to the current parent directory turned out to be quite interesting as well: 

```bash
$ docker run -it -v /$(pwd)/..:/app james/testcontainer sh
```