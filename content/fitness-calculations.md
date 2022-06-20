---
date: 2022-06-20T08:53:47-04:00
description: "Calculators for assessing and improving physical fitness"
tags: [ "physical-fitness" ]
title: "Fitness Calculations"
---

import BfpCalculator from "../src/components/fitness-calculators/bfp"
import FfmCalculator from "../src/components/fitness-calculators/ffm"
import RmrCalculator from "../src/components/fitness-calculators/rmr"
import TefCalculator from "../src/components/fitness-calculators/tef"
import NeatCalculator from "../src/components/fitness-calculators/neat"
import NeeCalculator from "../src/components/fitness-calculators/nee"
import EratCalculator from "../src/components/fitness-calculators/erat"
import TedCalculator from "../src/components/fitness-calculators/ted"
import MacrosCalculator from "../src/components/fitness-calculators/macros"
import MassInput from "../src/components/physics/mass-input"
import DistanceInput from "../src/components/physics/distance-input"

# Fitness calculations

**Fitness calculations** help estimate, assess, and plan to improve ones overall [physical fitness](physical-fitness.md).

## Fitness calculators

### Body fat percentage (BFP) and Lean mass percentage (LMP)

**Body fat percentage (BFP)** is one's total fat mass ($f$) divided by total body mass ($m$), or $BFP = f/m$. Conversely, **lean mass percentage (LMP)** is one's total lean mass ($l$) divided by total body mass, or $LMP = l/m$.

The most common way to estimate BFP (and, by extension, LMP) is bioelectrical impedance because it is supported by many consumer products such as bathroom scales, smart watches, and other consumer health devices. Bioelectrical impedance may have high variability from day to day but can still give a good indication of BFP on average when measured under consistent conditions (particularly time of day, time since last meal, and hydration levels).

#### Navy seal formula for body composition

BFP can also be estimated using the **Navy Seal formula for body composition** which tends to correlate strongly with bioelectrical impedance and only requires a measuring tape.

The formula differs for males and females. For males, the formula is $86.01 *log_{10} (a - n) - 70.041* log_{10}(h) + 36.76$ where $a$, $n$, and $h$ represent the abdomen circumference, neck circumference, and hight, respectively, measured in centimeters. For females, the formula is $163.205 * log_{10}(w + p - n) - 97.684 * log_{10}(h) - 104.912$ where $w$, $p$, $n$, and $h$ represent the waist circumference, hip circumference, neck circumference, and height, respectively, measured in centimeters.

The following calculator uses the Navy seal formula for body composition to calculate BFP and LMP:

<BfpCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}}/>

### Fat free mass (FFM)

**Fat free mass (FFM)** is simply your total body mass ($m$) multiplied by your body fat percentage, or $FFM = m * BFP$.

<FfmCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Resting Metabolic Rate (RMR)

**Resting metabolic rate (RMR)** is the "bare minimum" number of calories used per day to support basic life functions; in other words, it's the number of calories you would burn if you did absolutely nothing all day. RMR can be estimated by multiplying your weight in kilograms ($w$) by your body fat percentage times $100$, or $RMR = BFP *w* 100$. RMR is sometimes referred to as **basal metabolic rate**.

<RmrCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Thermic effect of food (TEF)

The **thermic effect of food (TEF)** is the amount of [energy](physics.md) required to digest, absorb, and metabolize the food you eat each day. Different foods require different amounts of energy to process, with foods high in protein generally requiring the most energy. The TEF is usually around 10% to 15% of your total energy expenditure.

The TEF can be (very roughly) estimated by multiplying your resting metabolic rate by anywhere from 10% (for low protein diets) to 15% (for high protein diets).

<TefCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Non-exercise activity thermogenesis (NEAT)

**Non-exercise activity thermogenesis (NEAT)** is the amount of energy you use in a day for everything beyond basic life functions, *except* exercise. This includes activities like walking, working, and brushing your teeth. NEAT is similar to RMR, but includes activities beyond basic life functions.

NEAT can be estimated based on your typical daily activity level (not including exercise) and generally ranges from $20%$ (for bed-ridden individuals) to $210%$ (for people with physically strenuous occupations) of your resting metabolic rate.

<NeatCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Non-workout energy expenditure (NEE)

**Non-workout energy expenditure (NEE)** is the total amount of energy used on days you do *not* workout. As you might guess, it's the sum of your RMR, TEF, and NEAT, or ($NEE = RMR + TEF + NEAT$).

<NeeCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Exercise related activity thermogenesis (ERAT)

**Exercise related activity thermogenesis (ERAT)** is the amount of energy you use in a day for exercise. ERAT is based on your body weight, the duration of exercise, and the intensity of the exercise. Exercise intensity is based on **metabolic equivalent of task (MET)** units, which are the ratio between a person's mass and the energy expended, thus $1 MET$ is equal to the amount of energy expanded when resting. ERAT is calculated my multiplying body mass ($w$), exercise duration in hours ($t$), and MET value, or $ERAT = w *t* MET$

MET can be estimated based on exercise intensity. Use the following table to estimate the MET for your workout:

| Activity            | Examples                                                              | METs    |
| ------------------- | --------------------------------------------------------------------- | ------- |
| Resting             | sitting, standing, typing, eating                                     | 1 - 2   |
| Very light exercise | leisurely walk, light weight training                                 | 2 - 3   |
| Light exercise      | low intensity cycling, swimming, or lifting/carrying                  | 3 - 5   |
| Moderate exercise   | climbing stairs, jogging, weight lifting                              | 5 - 8   |
| Vigorous exercise   | High-impact aerobics, running, circuit training, heavy weight lifting | 8 - 12  |
| Intense exercise    | Heavy weight circuit training, high-intensity cycling, sprinting      | 12 - 18 |

#### ERAT Calculator

<EratCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Total energy demand (TED)

**Total energy demand (TED)** is the total number of calories you use in a day for any purpose. In other words, TED is the sum of your NEE and ERAT, or $TED = NEE + ERAT$.

<TedCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

### Food macros calculator

The general wisdom to build and maintain lean mass is to eat roughly one gram of protein per pound of bodyweight or 1.6 grams of protein per pound of lean mass, depending on who you listen to. Assuming an appropriate amount of protein is being consumed:

* Eating fewer calories per day than are expended should reduce body fat faster than it reduces muscle mass
* Eating the same number of calories per day that are expended should simultaneously cause fat loss and muscle gain proportional to the intensity and duration of exercise
* Eating more calories per day than are expended should increase muscle mass faster than body fat

The "ideal" makeup of other macro nutrients in your diet are determined by a mix of genetics and personal preferences. Whether they should come primarily from carbohydrates, fats, or are roughly balanced between the two is beyond the scope of this article. However, general advice for diet is to get your nutrients from whole, minimally processed and unprocessed foods, using supplements as a "last resort" and as a safety net to get nutrients.

<MacrosCalculator style={{ border: "solid", width: "80%", padding: "2em", margin: "auto"}} />

## References

* [History of the U.S. Navy Body Composition Program](https://academic.oup.com/milmed/article/180/1/91/4159972)
* [Comparison of Bioelectrical Impedance and Navy Seal Formula to Measure Body Composition in Medical Students](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6650177/)
