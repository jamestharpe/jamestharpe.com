---
date: 2021-04-10T13:38:11-04:00
description: "Expressions of very large and very small numbers for engineers"
tags: [ "engineering", "scientific-notation", "si-units" ]
title: "Engineering Notation"
---

# Engineering Notation

**Engineering notation** is a form of [scientific notation](scientific-notation.md) used to express very small and very large numbers in engineering contexts. Whereas scientific notation formats numbers so that there is only one digit to the left of the decimal place, engineering notation expresses up to three digits to the left of the decimal place so long as the exponent is divisible by 3 (powers of 1,000).

To convert a number to engineering notation, the decimal point is moved three digits at a time. For example, the speed of light is $299,792,458$ meters per second, or $299.792458 \cdot 10^6$ when written in engineering notation.

This format can sometimes be misleading about significant digits. Tolerance can be noted with the $\pm$ sign, for example a large [resistance](ohms-law.md) value may be written as $34.5 \cdot 10^6Ω \pm 1\%$

[SI number prefixes](si-units.md) are commonly used in lieu of engineering or scientific notation. For example, rather than writing "$12.3 \cdot 10^3g$" (grams), we can write "$12.3kg$" (kilograms).
