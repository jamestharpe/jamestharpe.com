---
date: 2022-03-16T12:58:38-04:00
description: "A combination of data lakes and data warehouses"
tags: [ "data-lakes", "data-warehouses", "data-products" ]
title: "Data Lakehouses"
---

# Data lakehouses

A **data lakehouse** is a type of [data product](data-products.md) that serves as both a [data lake](data-lakes.md) and a [data warehouse](data-warehouses.md), with the idea that data lakes bring "the best of both worlds" together.

Typical data lake and data warehouse architecture treats each system independently, which increases the overall operational overhead and increases the overall data volume by requiring multiple copies of the same data. Data lakehouse architecture attempts to reduce that overhead by combining both architectures into a single system that can, when appropriate, share data in multiple contexts.

## Properties of an effective data lakehouse

An effective data lakehouse...

* Handles all types of data including structured, semi-structured, and unstructured
* Provides the ability to explore, preview, and query data through both visualizations and code (e.g. [SQL](sql.md))
* Reduces the need for [ETLs](etls.md) through the ability to query the same data in multiple contexts
* Manages meta data for searching, tracking, and sharing data.
* Stores data in open data formats such as Parquet, JSON, and CSV.
* Decouples storage from compute so that each can scale independently
* Includes integrated security and governance controls that allow data to be properly classified and protected.
* Serves all [data functions](data-teams.md) within the organization.
* Is cost effective compared to distinct data lakehouse and data warehouses solutions.
