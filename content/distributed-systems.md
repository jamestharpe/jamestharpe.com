---
date: 2021-11-27T13:16:25-04:00
description: "Software systems distributed and coordinated over a network"
tags: [ "computer-science" ]
title: "Distributed Systems"
---

# Distributed systems

A **distributed system** is a set of software applications that communicate via network to coordinate their actions and achieve a common goal.

## Core concepts of distributed systems

### Idempotence

An operation is **idempotent** when only the first received call can cause any change to the system. Thus, if repetitive calls are made then no change occurs. For example, when a file is saved with no changes the operation is idempotent if the save operation does nothing but it is not idempotent of the "modified" date is changed.

Idempotence is important in distributed systems because retries may be necessary if system calls over the network fail. For example, if a "create" operation succeeds for a record in a database but the success message never reaches the client, the client has no way of knowing about the success and may therefore retry. If the "create" operation is not idempotent, this would undesirably result in the creation of duplicate objects.

<!-- TODO: Mermaid diagram of the above example -->

### Immutability

[Data](data.md) is **immutable** when it can be created, but not destroyed (meaning modified or deleted). Immutability is valuable for parallel processing, as well as for business needs such as the need to generate detailed audit logs.

> Pat Helland's paper,  [Immutability Changes Everything](http://cidrdb.org/cidr2015/Papers/CIDR15_Paper16.pdf), goes into detail on the types of problems solved with immutability.

<!-- TODO: Insert-only databases

snapshots and tombstones 
-->

<!-- TODO:
### Location independence
 
#### Content addressed storage

-->

<!-- TODO:
### Versioning

#### Additive structure

* Add tables instead of columns (see snapshot pattern)
* Add new objects to API responses rather than extending existing objects

-->

## The eight fallacies of distributed computing

When it comes to distributed systems, [developers](software-engineering.md) often unknowingly make bad assumptions about the underlying risks and limitations to that system. Peter Deutsch famously listed seven of these assumptions in 1994 while at Sun Microsystems and James Gosling added another to the list in 1997. Collectively, these assumptions are now known as **the eight fallacies of distributed computing**.

> See also: [Episode 470L L. Peter Deutsch on the Fallacies of Distributed Computing](https://www.se-radio.net/2021/07/episode-470-l-peter-deutsch-on-the-fallacies-of-distributed-computing/) from Software Engineering Radio.

Those fallacies are:

1. The network is reliable
2. Bandwidth is infinite
3. The network is secure
4. Topology doesn't change
5. There is one administrator
6. Transport cost is zero
7. The network is homogeneous

<!--  TODO: Expand

### 1. The network is reliable

Example: Treat a web service call as a function call. Instead, assume the call may not make it to the service and the response may not make it back to the client.

### 2. Latency is zero

### 3. Bandwidth is infinite

### 4. The network is secure

### 5. Topology doesn't change

### 6. There is one administrator

### 7. Transport cost is zero

### 8. The network is homogeneous

Different versions of the same application may be deployed at different locations at different times.

-->

<!-- TODO: Articles in these areas

* CQRS, 
* Event storming
* Microservices

-->