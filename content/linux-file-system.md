---
date: 2020-11-24T11:33:11-04:00
description: "Overview of folders in the root of most Linux distributions"
tags: [ ]
title: "Linux File System"
---

# The Linux File System

## `/bin` - Binaries

The `/bin` folder contains the basic set of binaries available to every user. It contains the binaries for basic commands such as `ls`, `cat`, `chmod`, `mv`, and more.

## `/boot` - Bootloaders

The `/boot` folder contains the files necessary to load the operating system when the computer is turned on.

## `/dev` - Devices

The `/dev` folder contains files that represent devices. In Unix-like systems like Linux, disks and just about everything else are represented as files.

For example: `sda` is a disk. Originally `sd` stood for `SCSI device` but became a catch-all for any [block storage](https://en.wikipedia.org/wiki/Block_(data_storage)) device. The letter that follows `sd`, `a` in this case, represents the order in which the device was found.

## `/etc` - Etcetera (and so on)

The `/etc` folder contains system-wide (as opposed to user-specific) configuration files.

## `/home` - Home Folders

The `/home` directory contains home directories for users other than `root`.

## `/media` - Media

The `/media` folder is where removable disks (e.g. CDs, thumb drives) are automatically mounted.

## `/mnt` - Mount

The `/media` folder is where removable disks (e.g. CDs, thumb drives) are manually mounted, very similar to the `/media` folder.

## `/opt` - Optional

The `/opt` folder is intended to hold manually installed 3rd-party software.

## `/proc` - Processes

The `/proc` folder contains pseudo files that contain information about processes and resources. All running processes have a folder under `/proc`.

## `/root` - Root (user) Home

The `/root` folder is the `root` user's home directory

## `/run` - Run (temporary) Files

The `/run` directory contains temporary files, all of which actually reside in memory. The contents of this directory are deleted upon reboot (because memory is cleared).

## `/sbin` - System (or Super User) Binaries

The `/sbin` folder contains binaries used for system administration tasks including disk and network management. It contains the binaries for commands such as `chkconfig`, `ifcondfig`, and `fsck`.

## `/srv` - Service (or Server) Data

The `/srv` folder stores service/server data to be accessed by external users, for example via a web server.

## `/sys` - System Temporary Files

The `/sys` folder contains temporary files used by the system, all of which are stored in memory (very similar to the `/run` folder). The contents of this directory are deleted upon reboot (because memory is cleared).

## `/tmp` - Temporary Files

The `/tmp` folder contains temporary files. Unlike the `/run` folder, files stored in `/tmp` are less restricted and may be accessed by other users. Generally speaking, developers should prever to use `/run` over `/tmp` for security.

## `/usr` - Users

The `/usr` folder contains "non essential" apps and files used by users (as opposed to the system).

## `/var` - Variable

The `/var` folder contains files that are expected to grow over time (e.g. logs and caches).
