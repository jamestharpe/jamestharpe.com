---
date: 2022-11-25T14:49:58-04:00
description: "An open source machine learning library for Python"
tags: [ "python-ml-libs" ]
title: "Scikit-learn Python Library"
---

# Scikit-learn

**Scikit-learn** is an [open source](open-source-software.md) [Python](python.md) [library](python-ml-libs.md) that efficiently implements multiple [machine learning](machine-learning.md) algorithms for [classification](ml-supervised-classification-learning.md), [regression](ml-supervised-regression-learning.md), and clustering.

## Compute the [root mean square error (RMSE)](rmse.md) with Scikit-learn

```python
import math
import sklearn.metrics

setA = [5, 10, 15, 20]
setB = [4, 8, 16, 20]

rmse = math.sqrt(
	sklearn.metrics.mean_squared_error(setA, setB)
)

print(rmse)
```

## Scikit-learn resources

* [Official scikit-learn website](https://scikit-learn.org/)
* [Scikit-learn GitHub repository](https://github.com/scikit-learn/scikit-learn)
