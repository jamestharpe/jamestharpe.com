---
date: 2020-01-25T08:39:26-04:00
description: "A library to create state machines and state charts written in JavaScript"
tags: [ "javascript", "reactive-programming" ]
title: "RxJS"
---

# RxJS

[RxJS](https://rxjs.dev/) is a JavaScript library for composing observable sequences of events into a [reactive](reactive-programming.md) model.

## Terminology

| Term         | Meaning                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------ |
| Observable   | An object that emits events                                                                |
| Observer     | A collection call-backs invoked by an Observable when an event is emitted                  |
| Operator     | A [pure function](functional-programming.md) that transforms data emitted by an observable |
| Pipe         |                                                                                            |
| Scheduler    |                                                                                            |
| Subject      |                                                                                            |
| Subscription | The connection between an observable and observer                                          |

### Observables

**Observables** are sometimes referred to as "observable sequences" or "streams" and emit events either synchronously (immediately, when the event occurs) or asynchronously (some time after the event occurs).

### Observers

**Observers** "observe" events emitted by observables.

| Function     | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| `next()`     | Provide a callback to process an event emitted by an observable |
| `error()`    | Provide a callback to process an error emitted by an observable |
| `complete()` | Provide a callback to process the end of the observable stream  |

### Subscriptions

**Subscriptions** connect observables to observers and are created by calling the `subscribe` method on an observable and passing it an observer. Events are only emitted to an observer that has subscribed to an observable.

Subscriptions are stopped when:

* The `complete()` method is called on the observer
* A completing operator is used (for example, `of`, `from`, or `take`)
* An uncaught error occurs
* When `unsubscribe()` is called on a subscription
