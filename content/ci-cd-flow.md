---
date: 2020-12-14T14:28:11-04:00
draft: true
description: "Learn about CI/CD \"flow\": What it is and how it's useful"
tags: [ "ci-cd" ]
title: "CI/CD Flow"
---

# CI/CD Flow

CI/CD pipelines are the couriers between development efforts and production, which makes it an ideal target for inspection to better understand the needs of the software development lifecycle (SDLC).

## Terminology

| Term           | Definition                                                                            |
| -------------- | ------------------------------------------------------------------------------------- |
| Desired Flow   | The flow measure that aligns with _throughput_ according to the theory of constraints |
| Effective Flow | The actual flow achieved for a given set of changes                                   |
| Flow           | A measure of how fast changes _can_ be deployed                                       |
| Ideal Flow     | The greatest possible flow measure for a single pipeline run                          |

## What is CI/CD Flow?

CI/CD pipeline can be thought of as being similar to a circuit. Whereas [electricity](electricity.md) flows through a circuit, [code](computer-languages.md) flows through a pipeline. Circuits have [Ohm's Law](ohms-law.md) and the [Power Law](watts-law.md), but what do pipelines have to help understand the flow of code?

Given code flows through a pipeline, we can liken that flow to current in an electrical circuit. Let's map it out:

| Electrical Measure | CI/CD Equivalent | Definition                                        |
| ------------------ | ---------------- | ------------------------------------------------- |
| Volts              | Changes ($C$)    | Total added, removed, or modified lines of code   |
| Ohms               | Approvals ($A$)  | Total approval steps required to go to production |
| Amps               | Flow ($F$)       | $F = C/A$                                         |

While one might be tempted to think "the higher flow, the better", the desired flow is actually subject to the [Theory of Constraints](the-goal-graphic-novel.md) and should be aligned with _throughput_. In other words, if changes outpace the system's ability to make use of those changes then they decrease, not increase the amount of value delivered.

It's worth noting that _failed deployments effectively increase approvals_ because if a deployment fails, the changes required to fix it must go through the pipeline again.

### An Example of Flow

Let's say a dev team has changed 100 lines of code. The pipeline consists of simple Build ➡ Test ➡ Deploy steps, with the Deploy step requiring an email approval. Changes is easy to calculate - it's 100. The value for Approvals might at first appear to be 4: Build, Test, Approve, Deploy but the actual number is higher. The email must, at a minimum, be: Request sent, request received, approval sent, approval received (four steps). Our Approvals number is therefore $7$.

If the deployment succeeds on the first time, our flow is simple to calculate:

$$$
F = 100/7
$$$

$$$
F = 14.29
$$$

I call this "ideal flow" since it assumes that everything works the first time.

However, if our deployment  then the flow reduces quickly. The changes must again go through the pipeline, effectively doubling the number of approvals. If we assume no change in the number of lines of code, our flow is easily cut in half by a failed deployment:

$$$
F = 100/14
$$$

$$$
F = 7.41
$$$

To understand our pipeline's effective flow, we can combine our deployment success rate with the ideal flow. If our deployments succeed 70% of the time, and our ideal flow is $14.29$ then our "effective flow" is $0.70 * 14.29 = 10.00$

### Examples of How CI/CD Flow is Useful

The primary benefit of measuring CI/CD Flow is that it provides a framework for making predictions and performing experiments. It's often difficult to demonstrate the value of best practices that teams "don't have time for," but flow can start to quantify the value of these efforts. Here are a few examples.

#### Automated Approvals

If we replace the 4-step manual approval process with a single automated step, our flow can dramatically increase. Using the previous example, our Approvals drop from 7 to 4 and the ideal flow rises from 14.29 to 25. Similarly, the effective flow - assuming deployment success rate remains the same - rises from $10$ to $17.5$.

> Executive translation: With automated approvals, we can deploy between 57% to 75% faster.

#### Quality Gates

Another example is in adding quality gates, such as linting. While this decreases ideal flow, it may increase effective flow by catching issues that would have decreased the deployment success rate.

## Limitations and Responses

### Lines of Code is a Terrible Measure of Progress!

Though using lines of code to measure change is not ideal, it's the closest thing we have to an atomic unit of change. Here are some of the limitations to be aware of:

* Not all "lines" of code are equal, in fact the disparity can be huge
* Changes in lines of code do not account for changes to other types of files, e.g. binary files
* External library changes, such as changing to a new version, are not practical to account for

One might be tempted to use an even lower-level measure, such as bytes, but the number of bytes of changes are also subject to the same limitations. A more sophisticated approach may be to use number of statements to account for multi-statement lines and other complexities.
