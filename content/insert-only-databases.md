---
date: 2021-11-28T5:46:25-04:00
description: "A database design approach that requires deletes and updates to be performed as inserts"
tags: [ "databases", "distributed-systems" ]
title: "Insert-only Databases"
---

# Insert-only Databases

**Insert-only databases** are [databases](databases.md) that are designed so that update and delete operations are performed as inserts, generally through the [snapshot](snapshot-pattern.md) and [tombstone](tombstone-pattern.md) [design patterns](swe-design-patterns.md). This pattern is key to solving challenges related to [distributed systems](distributed-systems.md), including eventual consistency, parallel processing, and event-driven communication.

<!-- TODO: Combined snapshot and tombstone example -->
