---
date: 2021-01-07T09:28:11-04:00
description: "Tips and tricks for using Windows Subsystem for Linux (WSL)"
tags: [ "linux", "windows" ]
title: "Windows Subsystem for Linux (WSL)"
---

# WSL Tips and Tricks

## Reset Root User's Password

1. Open [PowerShell](powershell.md), then use the `wsl -u root` command to change the password.
2. At the prompt, enter `passwd <username>` where `<username>` is the account to change the password of, (e.g. `passwd james`).
3. Enter your password twice as prompted. It will not show in the [terminal](terminal.md).

The password is now changed! Here's an example session using the username `current_user`:

```powershell
PS C:\> wsl -u root
root@COMPUTER:/mnt/c/Users/current_user/# passwd current_user
Enter new UNIX password:
Retype new UNIX password:
passwd: updated successfully
root@COMPUTER:/mnt/c/Users/current_user/# exit
logout
PS C:\>
```