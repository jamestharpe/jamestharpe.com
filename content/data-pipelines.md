---
date: 2021-11-21T10:17:25-04:00
description: "Ways of making data available"
tags: [ "data-engineering", "data-products" ]
title: "Data Pipelines"
---

# Data Pipelines

A **data pipeline**, sometimes referred to as an **[ETL](etls.md) pipeline**, is a sequence of ETL jobs that work together to transforms [data](data.md) and [information](information.md) to be consumable by one or more [data products](data-products.md).

Generally, each ETL in a data pipeline will extract data from one or more data sources, transform it for some particular purpose, then load it to a new [data store](databases.md). Subsequent ETLs will consume data from that store, then transform and load it to their own data store, and so on.
