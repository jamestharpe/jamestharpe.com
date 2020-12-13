---
date: 2019-03-15T13:17:45-04:00
description: "The art and science of writing unit tests"
title: "Unit Testing"
tags: []
---

# Unit Tests

Unit tests are tests that run in isolation from other tests. Unit tests are typically written by developers to test their own code and expected to run frequently and quickly.

## Semantics: The "Unit" in Unit Tests

The "unit" of isolation for a unit test _is the test its self_. Some developers _wrongly_ consider the unit of isolation to be the system under test (the class, module, or function). This semantic difference of understanding can sometimes overwhelm otherwise productive discussions, especially when the difference is not explicitly stated.

### Why is it Wrong to Consider the System Under Test the Unit of Isolation?

The test is a more practical unit of isolation because it does not encourage needless isolation of the system under test, and instead focuses the developer on the desired _behavior_ to be tested.

Software's behavior, not code, is what gives it value. Code may be endlessly refactored and rewritten, but it is only valuable as long as the _behavior_ is correct. We therefore find more value in a definition that encourages us to test _behavior_ in isolation over one that encourages us to test code - which can change endlessly - in isolation.

### Practical Conversations with Purists

When discussing unit tests, I occasionally run into a purist that insists that the system under test, not the test its self, is the unit of isolation. Rather than argue, I'm happy to accept their definition if I can be allowed to introduce one of my own: Developer Test.

> **Developer Test**: An automated test written by a developer to test the behavior of their application.

This generally helps to focus on what's important without requiring a concession.

## Unit Test Structure

Though not strictly required, it's generally best for unit tests to follow a three-step pattern that resembles a small finite state machine consisting of an initial state, a single action, then finally a desired state.

This pattern usually goes by either of two mnemonics:

* Arrange, Act, Assert
* Given, When, Then

In both cases we define an initial state, perform an action, and confirm the result. I personally prefer the declarative "Given, When, Then" over the imperative "Arrange, Act, Assert" because it more easily forms a sentence: _Given a bank balance of $100, when I withdraw $20, then the bank balance is $80_.

## Effective Unit Tests

An effective unit test suite...

* Is likely to catch a regression error
* Won't often produce false positives (including during a refactor)
* Saves more time than it requires to maintain

### Characteristics of Good Unit Tests

Good unit tests...

* Cover a single behavior, observable from the end user's perspective
* Are deterministic, predictable, and repeatable
* Verify _business_ requirements
* Are run frequently without disrupting workflow

### Tips to Write Effective Unit Tests

* Write the tests first
* Focus on the _behavior_ you want rather, not internals
* Use natural language to name tests
* Don't couple tests to implementation details unless absolutely necessary
* Don't mock dependencies unless there's an obvious benefit (e.g. speed, determinism)
* Don't rely on a test unless you've seen if fail
* Don't bother to test trivial code (e.g. property getters/setters)

### Ineffective Unit Test "Smells"

* Failing tests are difficult to debug
* Tests fail randomly or unpredictably
* Changes in implementation require changes in tests (tightly coupled)
* Developers avoid running tests
* Test failures aren't a priority
* You must mock the internals of your domain model to write tests

## Additional Resources

* [Extreme Programming: Unit Tests](http://www.extremeprogramming.org/rules/unittests.html)
* [Unit Test by Martin Fowler](https://www.martinfowler.com/bliki/UnitTest.html)
* [The Test Pyramid by Martin Fowler](https://martinfowler.com/bliki/TestPyramid.html)
