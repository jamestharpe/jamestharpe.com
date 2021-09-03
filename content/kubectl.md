---
date: 2021-08-18T07:13:14-04:00
description: "The CLI interface for Kubernetes"
tags: ["kubernetes", "cli"]
title: "Kubernetes CLI: kubectl"
---

# Kubernetes CLI: kubectl

`kubectl` is the command line interface for [Kubernetes](kubernetes.md).

## Basic `kubectl` commands

| Command                                             | Description                                           |
| --------------------------------------------------- | ----------------------------------------------------- |
| `kubectl get pods`                                  | List all pods                                         |
| `kubectl cluster-info`                              | Display cluster information                           |
| `kubectl get all`                                   | List all resources: Pods, deployments, services, etc. |
| `kubectl run [container-name] --image=[image-name]` | Create a deployment for a pod                         |
| `kubectl port-forward [pod-name] [port-number]`     | Forward a port to a pod to allow external access      |
| `kubectl create [resource]`                         | Create a resource                                     |
| `kubectl apply [resource]`                          | Create or update resource                             |

## Useful Aliases for `kubectl`

A common practice for `kubectl` is to alias it to `k` for convenience.

To alias `kubectl` to `k` in [PowerShell](powershell.md):

```powershell
Set-Alias -Name k -Value kubectl
```

To alias `kubectl` to `k` in [bash](bash.md):

```bash
alias k="kubectl"
```

You can test the alias by running `k version`.
