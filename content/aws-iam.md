---
title: "AWS Identity and Access Management (IAM)"
date: 2019-04-19T15:55:30-04:00
tags: ["aws"]
description: "AWS IAM: Identity Access Management for the AWS Cloud"
---

# AWS Identity and Access Management (IAM)

IAM is a global service (no need to set a region) that completely manages all AWS Security "in the cloud" (as opposed to "of the cloud").

IAM Consists of:

* **Users** are intended to represent an actual person. Users can be part of a Group or have policies attached directly.
* **Groups** are collections of users, typically by function (dev, dba, etc), with a set of policies attached
* **Roles** are for internal usage within AWS (assigned to AWS objects, e.g. an EC2 instance, though users can assume roles as well)
* **Policies** are sets of access permissions to AWS resources

**IAM Federation** allows a company to integrate its identity provider (e.g. Active Directory) with IAM to supply identity/authentication.

IAM _does not_ include Security Groups. **Security Groups** are part of EC2 and act as a firewall around your EC2 instances by defining the ports, protocols, and IP addresses that can be used to access the instance.

## IAM Best Practices

* Never us root account
* Follow the Principle of Least Privilege 
* One user per person - Don't share
* On role per application - don't reuse
* Never put credentials in code
* Never use root IAM credentials (create an admin user instead)
