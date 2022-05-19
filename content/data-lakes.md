---
date: 2022-03-16T12:57:35-04:00
description: "Centralized repositories of raw data from a wide range of sources"
tags: [ "data-products" ]
title: "Data Lakes"
---

# Data lakes

A **data lake** is a type of [data product](data-products.md) that serves as a centralized repository of raw data sourced from a wide range of sources and stored for convenient retrieval for [analysis](data-analysis.md).

Data lakes generally store data "as is" - whether [structured](structured-data.md), [semi-structured](semi-structured-data.md), or [unstructured](unstructured-data.md) - with little or no transformation during ingestion. This makes data lakes relatively easy and inexpensive to create, especially compared with the highly formalized structures of [data warehouses](data-warehouses.md).

Data lakes can also be especially useful in [data science](data-science.md) because they can store data not traditionally kept in [databases](databases.md), such as audio and video files that may contain important data to train machine learning models alongside more "traditional", tabular data.

## Data swamps: Challenges with data lakes

Poorly maintained data lakes are often referred to as **data swamps**. When data in a data lake is not subject to effective [governance](data-governance.md) or gains a reputation for being unreliable, the usefulness of a data lake can quickly decline.

Additionally, access controls can be difficult to establish in data lakes due to their centralized nature. Personally identifiable information, intellectual property, and other secure data can be easily leaked if not carefully controlled. This need to control access on a granular level can negate some of the apparent simplicity of a data lake. This means that most data lakes are not suitable for [business intelligence](business-intelligence.md) workloads.
