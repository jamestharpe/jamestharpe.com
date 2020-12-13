---
date: 2017-09-04T06:24:27-04:00
redirect_from: ["/useful-docker-shortcut-commands/"]
tags: [ "docker", "shell" ]
title: "Useful Docker Commands"
---

# Useful Docker Shell Command and "Shortcuts"

## Start/Stop All Docker Containers

This example starts then stops all containers:

```bash
$ docker start $(docker ps -aq)
a12b34c5d678
b23c46d6e789
c34d57e7f790

$ docker stop $(docker ps -q)
a12b34c5d678
b23c46d6e789
c34d57e7f790
```

## Remove All Docker Images

This example removes all Docker images:

```bash
$ docker rmi $(docker image ls -q)
Deleted: sha256:4314bd051463a3bbd0debc5f4c94455582187a969b710e99bd425ad0b01d6e75
Deleted: sha256:b51d913d9cc8529e31119787300e3858fb8e275b0fd763c3fc1e8346dc25bb2a
Deleted: sha256:46510f51a25eeb15c9bdf3a1cc52561d88e35f3d59809260da1b1f6499babcb4
Deleted: sha256:4b962de5545cfdec0724c35d5711060b1620bd22ec2d9cc4ed5589fd7beb178a
```

> Note: This will fail on images with running containers

## Remove all Docker Containers

```bash
$ docker rm -f $(docker ps -aq)
a12b34c5d678
b23c46d6e789
c34d57e7f790
```

### Stop All Running Containers

```bash
docker stop $(docker ps -aq)
```

### Remove all Stopped Containers

```bash
docker rm $(docker ps -aq)
```

## Remove all Docker Networks

```bash
$ docker network rm $(docker network ls -q)
4f0ae26eba78
3a0bd36fab79
3f1ad27eaa88
```

## Remove all Docker Volumes

```bash
$ docker volume rm $(docker volume ls -q)
MyVolume1
MyVolume2
MyVolume3
```
