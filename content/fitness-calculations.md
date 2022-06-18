---
date: 2022-06-05T08:53:47-04:00
description: "Calculators for assessing and improving physical fitness"
tags: [ "physical-fitness" ]
title: "Fitness Calculations"
draft: true
---

import BfpCalculator from "../src/components/fitness-calculators/bfp"
import FfmCalculator from "../src/components/fitness-calculators/ffm"
import RmrCalculator from "../src/components/fitness-calculators/rmr"
import MassInput from "../src/components/physics/mass-input"
import DistanceInput from "../src/components/physics/distance-input"

# Fitness calculations

**Fitness calculations** help estimate, assess, and plan to improve ones overall [physical fitness](physical-fitness.md).

## Fitness calculators

### Body fat percentage (BFP) and Lean mass percentage (LMP)

**Body fat percentage (BFP)** is one's total fat mass ($f$) divided by total body mass ($m$), or $BFP = f/m$. Conversely, **lean mass percentage (LMP)** is one's total lean mass ($l$) divided by total body mass, or $LMP = l/m$.

The most common way to determine BFP (and, by extension, LMP) is bioelectrical impedance because it is supported by many consumer products such as bathroom scales, smart watches, and other consumer health devices. Bioelectrical impedance may have high variability from day to day but can still give a good indication of BFP on average when measured under consistent conditions (particularly time of day, time since last meal, and hydration levels).

#### Navy seal formula for body composition

BFP can also be calculated using the **Navy seal formula for body composition** which tends to correlate strongly with bioelectrical impedance and only requires a measuring tape.

The formula differs for males and females. For males, the formula is $86.01 *log_{10} (a - n) - 70.041* log_{10}(h) + 36.76$ where $a$, $n$, and $h$ represent the abdomen circumference, neck circumference, and hight, respectively, measured in centimeters. For females, the formula is $163.205 * log_{10}(w + p - n) - 97.684 * log_{10}(h) - 104.912$ where $w$, $p$, $n$, and $h$ represent the waist circumference, hip circumference, neck circumference, and height, respectively, measured in centimeters.

The following calculator uses the Navy seal formula for body composition to calculate BFP and LMP:

<BfpCalculator style={{border: "solid", width: "40%", padding: "2em"}}/>

### Fat free mass (FFM)

**Fat free mass (FFM)** is simply your total body mass ($m$) multiplied by your body fat percentage, or $FFM = m * BFP$.

<FfmCalculator />

### Resting Metabolic Rate (RMR)

**Resting metabolic rate (RMR)** is the "bare minimum" number of calories used per day to support basic life functions; in other words, it's the number of calories you would burn if you stayed in bed doing absolutely nothing all day. RMR can be estimated by multiplying your weight in kilograms ($w$) by your BFP, or $RMR = BFP * w$

<RmrCalculator />

### Thermic effect of food (TEF)

### Non-exercise activity thermogenesis (NEAT)

### Non-workout energy expenditure (NEE)

### Exercise related activity thermogenesis (ERAT)

### Total energy demand (TED)

### Food macros calculator

## References

* [History of the U.S. Navy Body Composition Program](https://academic.oup.com/milmed/article/180/1/91/4159972)
* [Comparison of Bioelectrical Impedance and Navy Seal Formula to Measure Body Composition in Medical Students](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6650177/)
