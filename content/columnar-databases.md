---
date: 2021-11-28T5:46:25-04:00
description: ""
tags: ["databases"]
title: "Columnar Databases"
---

# Columnar databases

**Columnar databases**, also knowns as **column-oriented databases**, are [databases](databases.md) that store [data](data.md) on disk as columns, as opposed to rows. Data stored as columns reduces disk I/O and seeks for aggregate functions (sum, average, count, and so on), which can make columnar databases optimal for [analytical data](data-analysis.md) and [data warehouses](data-warehouses.md). However, operations that operate on entire rows of data are less optimal.

For example, take the following data:

| Id  | Name  | FavoriteColor |
| --- | ----- | ------------- |
| 1   | James | Red           |
| 2   | Kim   | Green         |
| 3   | David | Blue          |
| 4   | Liz   | Blue          |

While a relational database would store the above data by row, for example:

```text
1:	James 	Red
2:	Kim 	Green
3:	David 	Blue
4:	Liz 	Blue
```

A columnar will store the above data as columns:

```text
James: 1 	Kim: 2 		David:3, 	Liz:4
Red: 1		Green: 2 	Blue:3,4
```

To retrieve the most popular favorite color in the above data requires fewer steps in the columnar format than in the row format. However, retrieval of a specific record requires fewer steps in the row format than the columnar format.
