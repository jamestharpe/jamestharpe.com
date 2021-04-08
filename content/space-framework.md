---
date: 2021-04-08T11:26:07-04:00
description: "SPACE Framework to Measure Developer Productivity: Satisfaction, Performance, Activity, Communication"
tags: [ "software-engineering", "personal-productivity" ]
title: "SPACE Framework"
---

# SPACE Framework

Developer productivity is notoriously difficult to measure, perhaps because there are so many tantalizing metrics that can be extracted from code, software, and project management tools. The **SPACE Framework** defines a wholistic approach to measuring productivity by demystifying common misconceptions of productivity measurement and providing a set of measurements and interpretive guidance for understanding productivity.

## Dispelled Myths

* Developer activity does not predict positive outcomes
* High-performing individuals can comprise a low-performing team
* Productivity cannot be reduced to a single metric
* Productivity measures are helpful to individual contributors, not just managers
* Humans are an important source of data, not just tools

## Developer Productivity Measures

### Satisfaction and Well-Being

Productivity and job satisfaction are strongly correlated according to the [What Predicts Software Developers' Productivity](https://ieeexplore.ieee.org/document/8643844) paper published in 2019 by the [IEEE](https://www.ieee.org/).

Employee satisfaction is most commonly measured through qualitative surveys and should target:

* Overall satisfaction: Would developers recommend their company and team to others as a place to work?
* Developer efficacy: Do developers have to resources and agency to do the right work in the right way?
* Burnout: Are developers exhausted by excessive, prolonged stress at work?

### Performance

Performance is based on outcomes, rather than output, which can make individual contributions difficult to measure. When it comes to code, quantity does not equate to quality. When it comes to business, successful execution of a project plan does not equate to customer value.

Performance can be measured through quality metrics and business outcomes, including:

* Customer satisfaction
* Feature adoption, retention, and utilization
* Cost reductions
* Defect rates
* SLA/SLO objectives such as up-time, response-time, etc.

## Activity

Activity counts the actions and outputs performed by an individual or team. The value of such measures is limited and can only be understood in context of the other measures, but can provide value as a starting point for new insights, such as [five whys](five-whys.md).

Examples of activity:

* Commits and merge requests
* Deployments
* Tests implemented/executed
* Documentation
* User stories entered/completed
* Incident responses
* On-call participation

The SPACE Framework warns these measures "should never be used in isolation to make decisions about individual or team productivity because of their known limitations."

## Communication and Collaboration

Effective communication and the ability to collaborate are key to identifying the right problems to work on, and implementing solutions effectively. To work together, teams require awareness of tasks and priorities, transparency of information and processes, and discoverability for the effective flow of information.

Communication and collaboration are difficult to measure, however valuable insights are still possible:

* Documentation discoverability and accuracy
* Peer reviews of work contributions
* Network metrics (who interacts with whom and how)
* On-boarding time and experience of new team members

## Efficiency and Flow

Efficiency and flow is a measure of the interruptions and delays (or lack thereof) to progress. Developers are known to talk about the importance of reaching and maintaining a "state of flow".

Efficiency and Flow can be measured through:

* Number of handoffs in a process or across teams
* Developers' perceived ability to reach and maintain "flow" to complete work
* The count, duration, and frequency of interruptions
* Lead and cycle time of project work and defects

<!-- TODO: Summarize Framework in Action and on -->

## References

* [The SPACE of Developer Productivity on ACM Queue](https://queue.acm.org/detail.cfm?id=3454124)
