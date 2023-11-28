---
date: 2021-10-11T09:04:39-04:00
description: "A method for capturing architectural decisions"
tags: [ "software-architecture", "requirements", "system-qualities" ]
title: "Architectural Decision Records (ADRs)"
---

# Architectural Decision Records (ADRs)

An **architectural decision record (ADR)** is the record of a software design choice that addresses a significant [requirement](requirements.md) of a software system and answers "why?" the decision was made.

An ADR typically captures a single decision in a light-weight format tha captures the _context_ in which the decision is applicable, the _concern_ addressed by the decision, the [_system quality_](system-qualities.md) addressed/impacted, notable downsides to the decision, the _decision_ its self, and any additional rationale or commentary deemed necessary to ensure the ADR is easily understood.

## Qualities of Effective ADRs

In the article [Sustainable Architectural Design Decisions](https://www.infoq.com/articles/sustainable-architectural-design-decisions/), the authors coopt the [SMART mnemonic](smart-goals.md) to mean: Strategic, Measurable, Achievable, Requirements-driven, and Timeliness.

**Strategic** ADRs consider the the long-term consequences of each decision on extensibility, operational overhead, and business strategy.

**Measurable** ADRs are objectively verifiable both in implementation - is it implemented according to the decision? - and outcome - is the decision having the desired impact?

**Achievable** ADRs are reasonably followed because they are "good enough" but not necessarily "ideal". For example, the difference in cost and effort between 99.9%, 99.99%, and 99.999% availability can be exponential; while "five nines availability" may be the idea, three or four nines may be good enough.

**Requirements-driven** ADRs are take in the [requirements and constraints](requirements.md) of the project and avoid solutions to problems that aren't likely to be encountered (see also: [YAGNI](yagni.md)).

**Timeless** ADRs will remain relevant for a long time because they are based on real-world experience and apply across platforms, tools, and technology stacks. As with any requirement, ADRs describe what the solution must and must not do, without describing how the solution is achieved.

## ADR Templates

### Short-Form ADR Template

In the context of _\<use-case\>_, facing _\<concern\>_ we decided for _\<decision\>_ to achieve _\<quality\>_, accepting _\<down-sides\>_.

### Long-Form ADR Template

In the context of _\<use-case\>_, facing _\<concern\>_ we decided for _\<decision\>_ to achieve _\<quality\>_, accepting _\<down-sides\>_, because _\<rationale-and-commentary\>_.

### ADR Markdown Template

```markdown
# Title

Date: 

## Status

Accepted|Proposed|Deprecated|Superseded

<!-- Choose one of the above statuses. If Superseded, please link to the superseding ADRs -->

## Context

<!-- Describe the relevant context and terminology associated with this decision -->

## Decision

<!-- Detail the decision and how it can be verified -->

## Additional Rationale and Commentary

<!-- Provide secondary details that may be useful to understanding why this decision was made. If not needed, please delete this section. -->
```
