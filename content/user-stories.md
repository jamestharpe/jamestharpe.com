---
date: 2021-09-07T11:49:45-04:00
description: "The philosophy behind gathering, writing, and using user stories"
tags: [ "requirements", "agile" ]
title: "User Stories"
---

# User Stories

A **user story** is a (often _partial_) [requirement](requirements.md) written from the perspective of the customer (or preferably _written by the customer_) to directly relate user needs (marketing requirements) to implementation details (engineering requirements). Most [agile](agile.md) methods use user stories to guide the development of the product.

Though a key objective of requirements is to be complete enough to be understood independently by anyone working on the solution, most agile methodologies suggest that only enough detail be provided that an estimate of the work to implement it is reasonably low risk. This intentional lack of detail is primarily a means of fostering direct discussions between customers and solution teams but should also help reduce excessive time spent on planning, eliminate requirements that aren't _really_ required, and deepen the solution team's understanding of the customer's needs through direct interactions.

Most methodologies that utilize user stories suggest that the full details behind a story be collected immediately prior to implementation, rather than as part of an up-front requirements gathering "step" in which all (or even most) requirements are gathered before [project](project-management.md) work begins. Once details are collected they formalized into [acceptance tests](acceptance-testing.md), which provide an objective - often automated - assessment of whether the customer's described needs were met. With the story and acceptance tests in place, the project team can start the solution implementation.

## Common Elements of User Stories

User stories can be expressed in a wide variety of ways, but most well written user stories will include:

* The role of persona of the user(s) that will most benefit from the request
* An abstract description of the desired solution
* A justification for the usefulness of having a solution

Though user stories are typically best expressed as a narrative, a common device to remember everything that needs to be captured is the following template:

> As a _`user role or persona`_ I want _`engineering requirement`_ so that _`marketing requirement`_.

## Resources for using user stories

* [Extreme Programming: User Stories](http://www.extremeprogramming.org/rules/userstories.html)