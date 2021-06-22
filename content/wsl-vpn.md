---
date: 2021-06-22T08:54:27-04:00
description: "How to fix VPN connection issues on Windows Subsystem for Linux"
tags: [ "wsl" ]
title: "Fix the Windows Subsystem for Linux internet connection while on VPN"
---

# WSL: Fix the Internet Connection while on VPN

Based on [this comment](https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021), the following instructions worked for me on Ubuntu Linux:

In your [WSL](wsl.md) Linux instance, create or edit `/etc/wsl.conf` to look like this:

```ini
[network]
generateResolvConf = false
```

Back in [Windows](windows.md), restart WSL using [PowerShell](powershell.md):

```PowerShell
wsl --shutdown
wsl
```

In your WSL Linux, create or edit `/etc/resolv.conf` to use [Google Public DNS](https://developers.google.com/speed/public-dns/) by creating the following entry (you may or may not have to delete other entries to get it working):

```text
nameserver 8.8.8.8
```

Restart WSL again in PowerShell:

```PowerShell
wsl --shutdown
wsl
```

Finally, once connected to the VPN, run the following command in Windows PowerShell, substituting `<vpn name>` with your VPN's name:

```PowerShell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "<vpn name>"} | Set-NetIPInterface -InterfaceMetric 6000
```

For example, if your VPN's name is `Cisco AnyConnect`, the command would look like this:

```PowerShell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "Cisco AnyConnect"} | Set-NetIPInterface -InterfaceMetric 6000
```
