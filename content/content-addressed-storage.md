---
date: 2021-11-28T05:58:25-04:00
description: "A method to store information so that it can be retrieved based on content rather than location"
tags: [ "swe-design-patterns", "distributed-systems", "hash-functions" ]
title: "Content-Addressed Storage (CAS)"
---

# Content-addressed storage (CAS)

**Content-addressed storage (CAS)** is a method to store information so that it can be retrieved based on content rather than location and is an important aspect of location independence and overall performance optimization in [distributed systems](distributed-systems.md).

Content-addressed storage typically works by [hashing](hash-functions.md) content to derive an identifier that can be used to retrieve the same content later.

## General benefits of CAS

* Reliable caching
* Simplified data versioning
* Naturally idempotent

## Real-world examples of content-addressed storage

* [Docker](docker.md) hashes each layer of a container image to identify it.
* [Git](git.md) uses the hash of each commit as its identity.
* [Angular](angular.md) uses output hashing in its compiled output to prevent version mismatches.
