---
date: 2021-11-21T18:00:25-04:00
description: "Challenges related to data variety, velocity, and volume"
tags: [ "data-analysis", "data-engineering" ]
title: "Big Data"
---

# Big data

**Big data** is a blanket term for the [data engineering](data-engineering.md) and [data analysis](data-analysis.md) challenges that arise from working with extremely large datasets.

As [tweeted by Jeff Xiong](https://mobile.twitter.com/gigix/status/174086466950021120):

> "big data" is when the size of the data itself becomes part of the problem

In other words, if you ask an analytics team for a report and the report takes too long to run, will slow down a production system, requires too many steps to complete, or if the data is too difficult to identify and access, then it's probably a "big data" problem.

## Challenges with big data: Variety, velocity, volume

Often referred to as the **three 'V's**, the challenges of big data center on variety, velocity, and volume.

**Variety of data** refers to the formats and sources of raw [data](data.md). Data can come in "typical" forms - like [databases](databases.md), spreadsheets, and other tabular forms (e.g. CSV files) - but also from sources like audio, video, and unstructured text. Data can also be sourced from a variety of sources in addition to databases, including: APIs, IoT devices, and biomedical devices. Each format and source of data requires additional effort to capture and process.

**Velocity of data** refers to the rate at which data is generated and processed. Data may be generated and processed in real-time, in batches, or sporadically. As the velocity of data increases, so does the complexity and effort required to process it dependably.

**Volume of data** refers to the sheer size of the data to be processed. It's common for enterprises to require petabytes of storage to house all the data required to help shape the company's future. This level of storage requires significant architecture to ensure availability and accessibility of data.

## Big Data Resources

* [Thinking about Big Data by Martin Fowler](https://martinfowler.com/articles/bigData/)
