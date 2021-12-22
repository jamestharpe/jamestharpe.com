---
date: 2021-12-22T06:43:25-04:00
description: "A technique to create views and calculations from multi-dimensional data"
tags: [ "data-analysis", "data-warehouses" ]
title: "Online Analytical Processing (OLAP)"
---

# Online Analytical Processing (OLAP)

**Online Analytical Processing (OLAP)** is a technique for storing and accessing [data](data.md) in a [data warehouse](data-warehouses.md) for multi-dimensional [data analysis](data-analysis.md) and is the foundational theory behind [star schema](star-schemas.md) design.

OLAP works by forming data into **OLAP cubes**, which are multi-dimensional arrays of interrelated data, then performing operations on those cubes. An **operation** is an extraction of data from an OLAP cube.

## OLAP cubes

A **dimension** is an attribute of interest in the data that can be summarized numerically. For example, as part of an analysis an analyst may wish to summarize orders by customer segment, product, and location; these are the dimensions of data being analyzed. Each **cell** of an OLAP cube represents some measure at the intersection of each dimension; for example, the order revenue for a specific product, for a specific customer segment, at a specific time.

## Types of OLAP cubes

**Multidimensional OLAP (MOLAP) cubes** store pre-computed data directly into a multidimensional database. This allows for excellent performance on complex calculations, slicing, and dicing, but can be difficult to scale for [large datasets](big-data.md).

**Relational OLAP (ROLAP) cubes** store data as [relational data](relational-databases.md) in columns and rows and retrieves data on-demand to perform aggregate functions, meaning performance is directly related to the size of the queried dataset. ROLAP uses less storage than MOLAP because it does not store pre-computed data.

**Hybrid OLAP (HOLAP) cubes** combine MOLAP and ROLAP to get the benefits of both approaches.

## OLAP operations

A **slice** operation retrieves a subset of data from a cube that consists of data in which one dimension is filtered to have a single value. For example, summarizing orders for a single customer segment. Similarly, a **dice** operation filters data to form a cube within a cube, such as summarizing orders for a specific product in a specific location.

A **roll-up** operation aggregates data from a cube by combining dimension data. For example, by combining zip code data to form state-level data or by computing average sales revenue. Conversely, a **drill-down** operation breaks down rolled up data into finer-grained dimensions.

A **pivot** or **rotation** operation swaps two axises, such as the columns and rows.
