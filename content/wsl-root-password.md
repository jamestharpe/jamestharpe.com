---
date: 2021-06-22T08:53:27-04:00
description: "How to reset the any users password in Windows Subsystem for Linux"
tags: [ "wsl" ]
title: "Reset the a user's password in Windows Subsystem for Linux (WSL)"
---

# WSL: Reset a User's Password

On [Windows Subsystem for Linux](wsl.md), you can reset a user's password using the `--user` (or `-u`) flag to run the [`passwd`](https://man7.org/linux/man-pages/man1/passwd.1.html) Linux command as the specified user.

1. Open [PowerShell](powershell.md), then use the `wsl -u root` to run the next command as the `root` user.
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
