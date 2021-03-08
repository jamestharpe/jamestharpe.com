---
date: 2020-12-30T14:07:46-04:00
description: "A model where an actor is the fundamental unit of computation including processing, storage, and communication"
tags: [ "math", "computer-science" ]
title: "Actor Model"
---

# Actor Model

The **actor model** is a model for computation in which the "actor" is the primitive element of system design (in the actor model, "everything is an actor"). Each actor embodies processing, storage, and communication for a specific purpose.

Each actor in a system can:

* Send messages to other actors
* Create additional actors
* Change internal state

Each actor has an address to which messages can be sent. A single address can represent multiple actors or a single actor can have multiple addresses.

To avoid deadlocks, **futures** are actors that represents a computation result, potentially before it is computed.

## Video: Hewitt Meijer, and Szyperski: The Actor Model (everything you wanted to know)

<iframe width="560" height="315" src="https://www.youtube.com/embed/1zVdhDx7Tbs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
