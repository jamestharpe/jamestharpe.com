---
date: 2020-12-24T12:04:11-04:00
description: "A triage scheme for new tasks: Delegate, Do, Defer, Drop"
tags: [ "personal-productivity" ]
title: "4D Time Management"
---

# Delegate, Do, Defer, Drop

**4D Time Management** is a decision framework to triage incoming tasks from "Getting Things Done: The Art of Stress-Free Productivity" by David Allen. Tasks might come from email, chat, phone calls, and other places. Handling the task quickly can help keep focus on priorities and help reduce distractions.

The following flow-chart combines 4D Time Management with [Stephen Covey's Time Management Matrix](covey-time-management-matrix.md) from his [Seven Habits](7-habits.md) book.

```mermaid
graph TD
  Task["New Task"] --> Important{Important?}
  Important --> |No| Drop["Drop It"]
  Important --> |Yes| Urgent{Urgent?}
  Urgent --> |No| SomeoneNotUrgent{"Can Someone <br/> Else Do It?"}
  Urgent --> |Yes| SomeoneUrgent{"Should Someone <br/> Else Do It?"}
  SomeoneNotUrgent --> |Yes| DelegateAsync["Delegate Asynchronously"]
  SomeoneNotUrgent --> |No| Time{"Time bound?"}
  SomeoneUrgent --> |Yes| DelegateSync["Delegate Synchronously"]
  SomeoneUrgent --> |No| Do["Do It"]
  Time -->|No| Tasks[("Task List")]
  Time -->|Yes| Calendar["Schedule it"]
```
