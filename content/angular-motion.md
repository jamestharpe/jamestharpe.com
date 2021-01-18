---
date: 2021-01-09T15:34:24-04:00
description: "The basics of angular motion"
tags: [ "physics", "radians" ]
title: "Angular Motion"
---

# Angular Motion

**Angular motion** is the motion of an object around a fixed axis point, such as a swinging pendulum or an orbiting planet. By convention, measurements of angular motion are considered positive when the motion is counter-clockwise and negative when the motion is clockwise.

## Angular Displacement

**Angular displacement** ($\theta$) is the change ($\Delta$) in angle in [radians](radians.md) ($rad$) of the arc length ($S$) traveled by an object along a circular path. The angular displacement of an arc length equal to the radius ($r$) of a circle is, by definition, $1\ rad$. Angular displacement can therefore be calculated as $\theta = \Delta S/r$, though the $\Delta$ is often omitted for brevity.

Angular displacement is the basis for angular motion because it allows all points on a rotating line to be measured, rather than just a single point by solving for the missing variable in the angular displacement calculation.

| Variable             | Solution       |
| -------------------- | -------------- |
| Angular displacement | $\theta = S/r$ |
| Arc length           | $S = r\theta$  |
| Radius               | $r = S/\theta$ |

## Angular Velocity

**Angular velocity** ($\omega$) is the change in angular displacement over the change in time ($t$), or $\omega = \Delta\theta/\Delta t$ (again, the $\Delta$ is often omitted). Essentially, "radians per second".

Angular velocity can be converted to speed (note that speed is not the same as velocity) by substituting arc length for angular displacement. Given $S = r\theta$ and $\omega = \theta/t$, therefore $r\omega = r\theta/ t$ which equals $S/t$ and $S/t$ is distance over time, which is speed.

## Angular Acceleration

**Angular acceleration** ($\alpha$) is the change in angular velocity over time, or $\alpha=\Delta\omega/\Delta t$. Essentially, "radians per second per second" or "radians per second squared".

Angular acceleration can be converted to tangential acceleration ($A_{tan}$), which is acceleration which doesn't account for the change in direction in circular motion, by substituting arc length for angular displacement. Given $S = r\theta$ and $\alpha=\omega/t$, therefore $r\alpha=r\omega/t$, which is the change in angular velocity over time.

## Conversion Tables

| From                 | To                      | Formula                      |
| -------------------- | ----------------------- | ---------------------------- |
| Angular velocity     | Speed                   | $S/t$ or $r\theta/t$         |
| Angular acceleration | Tangential acceleration | $r\omega/t$ or $r\theta/t^2$ |

## Resources to Lean about Angular Motion

* [Introduction to Rotational Motion on Khan Academy](https://www.khanacademy.org/science/high-school-physics/torque-and-angular-momentum#introduction-to-rotational-motion)
