---
date: 2021-12-17T17:03:25-04:00
description: "Databases that organize data into tables and support relationships through distinct keys"
tags: ["databases", "structured-data"]
title: "Relational Databases"
---

# Relational databases

A **relational database** is a [database](databases.md) that organizes data into one or more tables. A **table** is a collection of rows and columns. A **column** defines the name, size, format, and type of [data](data.md) stored for that column in each row. A **row** is a related set of values that adhere to the constraints of the columns.

Relational databases require that each row be uniquely identifiable by a **key** made up of one or more columns. Rows can refer to other rows in the same database by a **foreign key** to form relationships that are validated and enforced by the underlying database. The vast majority of relational databases support [SQL](sql.md) for data selection and manipulation.
