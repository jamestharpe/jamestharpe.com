---
date: 2021-11-21T18:00:25-04:00
description: "Challenges related to data variety, velocity, and volume"
tags: [ "data-analysis", "data-engineering", "distributed-systems" ]
title: "Big Data"
---

# Big data

**Big data** is a blanket term for the [data engineering](data-engineering.md) and [data analysis](data-analysis.md) challenges that arise from working with extremely large datasets over [distributed systems](distributed-systems.md).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;big data&quot; is when the size of the data itself becomes part of the problem</p>&mdash; Jeff Xiong (@gigix) <a href="https://twitter.com/gigix/status/174086466950021120?ref_src=twsrc%5Etfw">February 27, 2012</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In other words, if you ask an analytics team for a report and the report takes too long to run, will slow down a production system, requires too many steps to complete, or if the data is too difficult to identify and access, then it's probably a "big data" problem.

## Challenges with big data: Variety, velocity, veracity, volume

Often referred to as the **four 'V's**, the challenges of big data center on variety, velocity, veracity, and volume.

**Variety of data** refers to the formats and sources of raw [data](data.md). Data can come in "typical" forms - like [databases](databases.md), spreadsheets, and other tabular forms (e.g. CSV files) - but also from sources like audio, video, and unstructured text. Data can also be sourced from a variety of sources in addition to databases, including: APIs, IoT devices, and biomedical devices. Each format and source of data requires additional effort to capture and process.

**Velocity of data** refers to the rate at which data is generated and processed. Data may be generated and processed in real-time, in batches, or sporadically. As the velocity of data increases, so does the complexity and effort required to process it dependably.

**Veracity of data** refers to the trustworthiness, accuracy, and consistency of data. Sources of data may be biased in various ways, contain errors or conflicts, or be full of abnormalities. This translate to a lot of potential work to validate, explain, and compensate for issues in the data or with data sources.

**Volume of data** refers to the sheer size of the data to be processed. It's common for enterprises to require petabytes of storage to house all the data required to help shape the company's future. This level of storage requires significant architecture to ensure availability and accessibility of data.

## Big Data Resources

* [Thinking about Big Data by Martin Fowler](https://martinfowler.com/articles/bigData/)
