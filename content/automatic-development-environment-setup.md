---
title: "Automatic Development Environment Setup"
date: 2017-08-19T11:42:46-04:00
languages: [ "PowerShell" ]
tools: [ "Chocolatey" ]
techniques: [ "Everything in Version Control", "GROWS" ]
draft: true
---
# How to Automate Your Development Environment Setup

Starting from a fresh OS installation, manually installing and configuring a full development environment can take several days. Even then, it's easy to forget some bit of configuration or to install some critical software. By following the [everything in version control](http://growsmethod.com/practices/EverythingInVC.html) practice from GROWS, it's easy to save a ton of time and minimize disruption by automating the process.

Most of the software I write is developed on Windows, so I decided to write the script using PowerShell and [Choclatey](https://chocolatey.org/). MacOS users can follow a similar pattern using [Homebrew](https://brew.sh/).

## Overview of the Automation Process

The goal of the script is to start from a base OS installation and finish with a complete development environment. To write the script, it's easiest to use a write-test-tweak approach:

1. Write a command in the PowerShell ISE (running elevated)
1. Copypasta the command from the script into the shell panel and execute it
1. Tweak the command if needed

Once your script is completed, you can easily maintain it by following the same process every time you install a new tool or adjust a setting. I prefer to store my script in OneDrive for easy access from a base Windows installation (which includes OneDrive).

One note of warning: If you're development environment is already setup manually, installing software via Chocolatey can sometimes mess things up. It's best to uninstall any applications you'll be managing with Chocolatey, or simply start from scratch.

## Basic Script Structure

I've broken [my script](https://github.com/jamestharpe/windows-development-environment/blob/master/env-windows.ps1) into four sections:

1. Utility methods
1. Chocolatey install
1. Configure Windows settings
1. Install and configure tools

## Utility Methods

TODO: RefreshEnvPath

## Script to Install Chocolatey

TODO: Installation

## Script to Configure Windows Settings

## Script to Install Developer Tools

### Script to Customize VS Code

You can view [the script](https://github.com/jamestharpe/windows-development-environment/blob/master/env-windows.ps1) on [my GitHub page](https://github.com/jamestharpe/) (MIT License).