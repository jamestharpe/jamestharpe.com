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

## Fix connection issues while on VPN

Based on [this comment](https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021), the following instructions worked for me on Ubuntu Linux:

In your WSL Linux instance, create or edit `/etc/wsl.conf` to look like this:

```ini
[network]
generateResolvConf = false
```

Back in Windows, restart WSL using [PowerShell](power-shell.md):

```PowerShell
wsl --shutdown
wsl
```

In your WSL Linux, create or edit `/etc/resolv.conf` to have the following entry (you may or may not have to delete other entries to get it working):

```text
nameserver 8.8.8.8
```

Restart WSL again:

```PowerShell
wsl --shutdown
wsl
```

Finally, once connected to the VPN, run the following command in Windows PowerShell:

```PowerShell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "Cisco AnyConnect"} | Set-NetIPInterface -InterfaceMetric 6000
```
