---
date: 2024-09-21T05:01:25-04:00
description: ""
tags: ["infrastructure-as-code", "open-source-software"]
title: "Publish/Subscribe Pattern (Pub-sub)"
---

# Pulumi

**Pulumi** is an [open-source software](open-source.md) tool to manage [infrastructure as code](infrastructure-as-code.md) through a variety of [languages](computer-languages.md), including [TypeScript](typescript.md), [Python](python.md), [Go](golang.md), and C#.

## Core Concepts in Pulumi

### Stacks

A **stack** represents a single instance of an infrastructure, often mapped to environments like dev, test, or prod. Each stack can have its own set of configurations and parameters. Stacks allow the management of different environments using the same codebase.

### Resources

**Resources** are the fundamental building blocks of infrastructure in Pulumi and represent things like virtual machines, databases, networks, and storage. These map to real-world cloud services from AWS, Azure, GCP, or Kubernetes clusters.

Resources include:

* Managed resources: Resources that are managed by Pulumi (like an EC2 instance or an S3 bucket).
* Component resources: Resources composed of other resources that can be reused.

Pulumi ensures that resources are created in the right order through inputs (e.g. the type of EC2 instance to create) and outputs (e.g. an EC2 instance ID).

### Providers

**Providers** are plugins that allow Pulumi to interact with different cloud platforms.

### State Management

**Pulumi** tracks the resources it creates using a state file to determine which resources to update, replace, or delete when infrastructure code changes. State can be stored by Pulumi's managed service, in local files, or in remote backends (S3, GCP buckets, Azure Blob Storage, etc.).

## Pulumi Resources

* [Pulumi homepage](https://www.pulumi.com/)
* [Pulumi IaC documentation](https://www.pulumi.com/docs/iac/get-started/)
* [Pulumi Examples Git Repository](https://github.com/pulumi/examples)
* [Pulumi Tutorials](https://www.pulumi.com/tutorials/)
* [Pulumi on YouTube](https://www.youtube.com/c/PulumiTV)
