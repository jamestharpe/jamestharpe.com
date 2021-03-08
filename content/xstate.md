---
date: 2020-12-30T14:03:46-04:00
description: "A library to create state machines and state charts written in JavaScript"
tags: [ "javascript", "state-machines", "statecharts", "actor-model" ]
title: "XState (JavaScript Library)"
---

# XState

[XState](https://xstate.js.org/) is a JavaScript framework for managing [state machines](state-machines.md) and [statecharts](statecharts.md).

## Example XState Project: Gas Pump

The [**gas pump example project**](https://codesandbox.io/s/fervent-noyce-yhnrc) uses XState to implement a basic gas pump as if it were an integration of three separate applications, each using a statechart unknown to the other applications, but potentially dependent on them. This was important to prove conceptually for potential use in a multi-team enterprise setting.

This was accomplished by using two separate registries:

1. A Statechart Registry for each application's statecharts
2. A UI Component Registry to map UI Components (plain HTML & JS - no framework) to available actions

The Statechart Registry is used to assemble a "Super Statechart" to manage shared context and cross-statechart communication. This was easily achieved by virtue of each application's statechart being subjugated to the Super Statechart, which gave each app's statechart a shared context and enabled communication via the [`send` action](https://xstate.js.org/docs/guides/actions.html#send-action).

It was also necessary to merge the configuration options, which also provided a rudimentary opportunity to detect conflicts. For example, if two independent statecharts defined a `hasCredit` [guard](https://xstate.js.org/docs/guides/guards.html#guarded-transitions), the conflict needed to be detected to fail the formation of the Super Statechart.

## XState Resources

* [XState Documentation](https://xstate.js.org/docs/)
* [XState Visualizer](https://xstate.js.org/viz/)
* [XState Statecharts Tools](https://statecharts.io/)

### XState Tutorials and Presentations

* [Working with State Machines in Angular](https://medium.com/angular-athens/working-with-state-machines-in-angular-2817441e26bf)
* [Formal Forms with State Machines by David Khourshid | React Next 2019](https://www.youtube.com/watch?v=hiT4Q1ntvzg&list=WL&index=8)
