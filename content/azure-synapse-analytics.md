---
date: 2022-08-23T11:17:29-04:00
description: "An integrated set of data services on Microsoft Azure"
tags: ["azure", "data-warehouses", "data-lakes", "data-lakehouses"]
title: "Azure Synapse Analytics"
---

# Azure Synapse Analytics

**Azure Synapse Analytics** is an integrated set of [data lake](data-lakes.md), [data warehouse](data-warehouses.md), and [analytics](data-analysis.md) services on [Azure](azure.md).

## Linked services

In Synapse, a **linked service** is a connection to a data store that makes it available within the Synapse environment, similar to the concept of a connection string. Each linked service defines the information needed to connect to the external resource. External data sources can include a wide variety of storage types including other databases, storage accounts, and application APIs.

## Integration datasets

An **integration dataset** specifies the specific location (e.g. the folder, file, table, etc.) and format (e.g. parquet, json, etc.) of data made available by a linked service so that it can be used in a pipeline or activity.

## Integration runtimes

An **integration runtime** is the compute infrastructure used by Synapse to execute pipelines. An integration run time executes data flows, copies data across data stores, dispatches transformation activities, and executes SSIS packages. Synapse pipelines support Azure-hosted or self-hosted integration runtimes.

<!-- 
Synapse Workspace / Studio ?

Storage:
	* Data Lake Gen2
  
Compute:
	* Dedicated SQL Pools
	* Serverless SQL
	* Apache Spark Pools

Ingestion:
	* Synapse Pipelines
	* Mapping Data Flows

Overall platform:
	* Monitoring
	* Management
	* Security (integrated with active directory)
-->

## Azure Synapse Analytics Resources

* [Azure Synapse Analytics Official Homepage](https://azure.microsoft.com/en-us/services/synapse-analytics/)
* [Azure Synapse Role-Based Access Controls](https://docs.microsoft.com/en-us/azure/synapse-analytics/security/synapse-workspace-synapse-rbac-roles)
* [Azure Synapse code examples](https://github.com/Azure-Samples/Synapse)
* [Use external tables with Synapse SQL](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql/develop-tables-external-tables?tabs=native)
