---
date: 2021-11-27T13:16:25-04:00
description: "A software engineering design pattern to separate responsibility between commands and queries"
tags: [ "swe-design-patterns" ]
title: "Command Query Responsibility Segregation (CQRS)"
---

# Command query responsibility segregation (CQRS)

**Command query responsibility segregation (CQRS)** is a [software engineering](software-engineering.md) design pattern to separate the responsibilities of commands and queries. In this context, a **command** is a system call that persists a change and returns no information. A **query** is a system call that returns information and persists no changes. In other words, commands are write operations and queries are read operations. CQRS allows different [architectures](software-architecture.md) for each type of operation, a commonly desired characteristic in [distributed systems](distributed-systems.md).
