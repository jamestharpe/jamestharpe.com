---
date: 2022-10-26T14:28:14-04:00
description: "Database transactions that are atomic, consistent, isolated, and durable"
tags: ["databases"]
title: "ACID Transactions"
---

# ACID Transactions

ACID transactions are a common [database](databases.md) feature to guarantee that transactions within the database are:

* **Atomic transactions** which guarantee either the entire transaction is executed, or none of the transaction is executed.
* **Consistent transactions** which guarantee changes are made in predefined, predictable ways to guard against corruption and errors.
* **Isolated transactions** prevent parallel operations from affecting one another.
* **Durable transactions** ensure successful transactions are persisted even in the event of a system failure.
