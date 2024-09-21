---
date: 2022-01-14T10:13:30-04:00
description: "An open-source infrastructure-as-code software tool to declaratively manage cloud services"
tags: [ "infrastructure-as-code" ]
title: "Terraform"
draft: true
---

# Terraform

**Terraform** is an software tool written by HashiCorp to manage [infrastructure as code](infrastructure-as-code.md) automatically through human-readable declarative configuration files.

The core components of Terraform are: the executable, configuration files (`*.tf` files), provider plugins, and state data. The terraform executable reads configuration files that define the desired infrastructure, reads the state data of the current infrastructure, calculates the changes required for the state to match the configuration, and applies those changes through the provider plugins. Provider plugins manage the specific API calls to the target infrastructure provider (AWS, Azure, etc.) and are the mechanism that allows Terraform to be cloud-agnostic.

Terraform works by tracking infrastructure state in a state file, then calculating the differences between the current and desired state to create a plan. When a plan is applied, Terraform uses the provider API to make the changes.

Related sets of infrastructure can be combined to form **modules** in Terraform.
Terraform achieves consistent, repeatable deployments of infrastructure.
Multiple cloud platforms
Track resource state

## Terraform Resources

* [Terraform Official Tutorials](https://learn.hashicorp.com/terraform)
* [Terraform Official Documentation](https://www.terraform.io/docs)
* [Terraform source code on GitHub](https://github.com/hashicorp/terraform)
* [Terraform Registry](https://registry.terraform.io/)
