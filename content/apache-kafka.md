---
date: 2021-11-27T11:19:54-04:00
description: "A distributed event streaming platform for data-pipelines and analytics"
tags: [ "data-pipelines", "microservices", "apache" ]
title: "Apache Kafka"
---

# Apache Kafka

**Apache Kafka** is an [open-source](open-source.md), real-time event streaming platform from [Apache](apache.md), used for [microservice](microservices.md) architectures and [data-pipelines](data-pipelines.md). 

**Kafka servers** are run in [clusters](distributed-systems.md) that can consist of a single server, or multiple servers that span data centers. **Kafka clients** are applications that read, write, and process events from Kafka. **Kafka Connect** imports and exports data as event streams from various data sources to the cluster and between clusters.

Conceptually, Kafka is centered on **events**: records or messages that consist of a key, value, timestamp, and optional metadata. **Producers** are client applications that publish events to Kafka, whereas **consumers** are client applications that subscribe to and process events. To enable scalability and parallel processing, Kafka can provide guarantees such as to ensure an event is processed exactly once.

Events are organized by **topics** which consist of a persisted, ordered series of related events. Persistence means that these events can be processed by consumers immediately or retroactively. Topics are further organized into **partitions**, which are determined by the event key. Partitioning plays a key role in how Kafka scales as well as in functionality behind guarantees.

## Video: What is Apache Kafka

<iframe width="560" height="315" src="https://www.youtube.com/embed/FKgi3n-FyNU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Kafka resources

* [Official Kafka homepage](https://kafka.apache.org/)
* [Kafka tutorials](https://kafka-tutorials.confluent.io/)
