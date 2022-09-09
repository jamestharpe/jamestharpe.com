---
date: 2022-09-02T13:00:19-04:00
description: "Usage and calculations for range, standard deviation, and variance on a set of numbers"
tags: [ "statistics", "averages" ] 
title: "Dispersions: Measures of Spread"
---

# Dispersions: Measures of spread

A **dispersion** is a [statistical](statistics.md) method to summarize the spread, as opposed to [central tendency](averages.md), of a set of numerical [data](data.md). The primary types of dispersion are range, variance, and standard deviation.

## Range

**Range** is the difference between the maximum and minimum value in a set of numbers.

## Variance ($\sigma^2$)

$$$
\sigma^2 = \frac{\displaystyle\sum_{i=1}^{n}(x_i - \mu)^2} {n}
$$$

**Variance ($\sigma^2$)** is the mean of the squared differences of each data point from the mean of the full dataset. To calculate variance:

1. Find the mean of the data
2. Subtract the mean from each number in the dataset, then square the result (to make it positive).
3. Find the mean of the squared differences

## Standard Deviation ($\sigma$, $STD$)

$$$
\sigma = \sqrt {\mu _2 }
$$$

Standard deviation ($\sigma$ or $STD$) is the square root of the variance. If a standard deviation is low, the values tend to be close to the [mean](averages.md). If the standard deviation is high, the values tend to be spread out.
