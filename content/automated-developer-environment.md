---
title: "Automatically Build a Developer Environment on Windows"
date: 2017-09-18T11:42:46-04:00
description: "A step-by-step guide to automate tool and framework installation for developers that use Windows"
redirect_from: ["/automatic-development-environment-setup/", "/techniques/everything-in-version-control/", "/techniques/grows/"]
tags: [ "powershell", "chocolatey" ]
draft: false
---

# Automate Your Development Environment Setup

Starting from a fresh OS installation, manually installing and configuring a full development environment can take several days. Even then, it's easy to forget some bit of configuration or forget to install some critical software. By following the GROWS [everything in version control](http://growsmethod.com/practices/EverythingInVC.html) practice, it's easy to save a ton of time and minimize disruption by automating the process.

Most of the software I write is developed on Windows, so I decided to write the script using PowerShell and [Chocolatey](https://chocolatey.org/). MacOS users can follow a similar pattern using [Homebrew](https://brew.sh/).

## Overview of the Automation Process

The goal of the script is to start from a base OS installation and finish with a complete development environment. To write the script, it's easiest to use a write-test-tweak approach:

1. Write a command in the PowerShell ISE (running elevated)
1. Copy-paste the command from the script into the shell panel and execute it
1. Tweak the command if needed

Once your script is completed, you can easily maintain it by following the same process every time you install a new tool or adjust a setting. I prefer to store my script in OneDrive for easy access from a base Windows installation (which includes OneDrive), but I also check it in to GitHub to share with the world.

> **Warning**: If you're development environment is already setup manually, installing software via Chocolatey can sometimes cause conflicts. It's best to uninstall any applications you'll be managing with Chocolatey, then reinstall with Chocolatey (or just start from scratch).

## Basic Script Structure

I've broken [my script](https://github.com/jamestharpe/windows-development-environment/blob/master/env-windows.ps1) into four sections:

1. Utility methods
1. Chocolatey install
1. Configure Windows settings
1. Install and configure tools

## Utility Method: Refresh the PATH environment variable in PowerShell

Many of the tools you'll instal will have dependencies, which need to be available via the Windows PATH environment variable for the script to succeed. PowerShell does not automatically pick up changes to the PATH. To do that, this simple utility function will help:

```PowerShell
function RefreshEnvPath
{
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") `
        + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}
```

This method simply re-reads the Machine and User `Path` environment variables, concatenates them, and stores them in the variable PowerShell uses to read the PATH.

## Script to Install Chocolatey

The next addition to the script is to install Chocolatey (choco, for short):

```PowerShell
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
RefreshEnvPath
```

Note the call to `RefreshEnvPath`: That ensures the `choco` command will run without having to start a new PowerShell window.

## Script to Configure Windows Settings

The Windows Explorer default settings don't work well for most developers. The following script will show file extensions and hidden files:

```PowerShell
# Navigate registry
Push-Location
Set-Location HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced

# Show file extensions
Set-ItemProperty . HideFileExt "0"
# Show hidden files
Set-ItemProperty . Hidden "1"

Pop-Location

# Force Windows Explorer restart so settings take effect
Stop-Process -processName: Explorer -force
```

## Script to Install Developer Tools

With Chocolaty installed, to install development tools requires a simple call to `choco install [tool name] --yes`. The `--yes` flag is required so that the script doesn't prompt you to approve each installation before proceeding. For example, to install Visual Studio Code, simply run:

```PowerShell
choco install vscode --yes
```

When installing a tool that needs to be configured or is a prerequisite of another tool, remember to call `RefreshEnvPath` before proceeding, or your script will error out.

### Script to Customize VS Code

Vanilla Visual Studio Code isn't very interesting, so let's customize it by installing some common plug-ins. Here's what I install by default:

```PowerShell
RefreshEnvPath

# Pretty icons
code --install-extension robertohuertasm.vscode-icons

# PowerShell
code --install-extension ms-vscode.PowerShell

# HTML, CSS, JS
code --install-extension Zignd.html-css-class-completion
code --install-extension lonefy.vscode-JS-CSS-HTML-formatter
code --install-extension robinbentley.sass-indented
code --install-extension dbaeumer.vscode-eslint
code --install-extension steoates.autoimport

# TypeScript
code --install-extension eg2.tslint
code --install-extension johnpapa.Angular2

# Docker
code --install-extension PeterJausovec.vscode-docker
```

The commands to install VS Code extensions from PowerShell are slightly different compared to what you would put directly into the VS Code command pallet. To know what value to pass into the `--install-extension` command, you can grab the fully qualified extension name from the Visual Studio Marketplace URL, like so:

![Fully qualified VS code extension name example](/img/vs-code-extension-fully-qualified-name_600x357.png)

## Advanced Options

I recently configured a similar script for a large development team. Though the team uses a lot of required tools, they also have a lot options that boil down to personal preference. For example, some of the developers prefer IntelliJ while others prefer Eclipse.

This can be easily handled by accepting arguments and choosing wise defaults. As an example, let's install both by default but allow the user to specify the IDE as a command-line argument. Start by using `params` at the top of the script:

```PowerShell
params(
    [string[]]
    $ide=@("intellij","eclipse")
)
```

Later on, we can read the argument:

```PowerShell
if($ide -contains "intellij"){
    choco install intellijidea-ultimate --yes
}
if($ide -contains "eclipse"){
    choco install eclipse --yes
}
```

Finally, the script can be called with the `-ide` argument. Here's an example to install only Eclipse:

```PowerShell
env-windows.ps1 -ide eclipse
```

## A Full Example

You can view [the script](https://github.com/jamestharpe/windows-development-environment/blob/master/env-windows.ps1) I use personally on [my GitHub page](https://github.com/jamestharpe/) (MIT License). Contributions welcome!