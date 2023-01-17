---
date: 2023-01-17T08:34:47-04:00
description: "A performance measure for regression problems in machine learning"
tags: [ "ml-supervised-regression-learning" ]
title: "Root Mean Square Error (RMSE)"
---

# Root Mean Square Error (RMSE)

The **root mean square error (RMSE)** is a performance measure often used to evaluate [machine learning regression models](ml-supervised-regression-learning.md) by determining the similarity between two sets. The formula for RMSE is:

$$$
RMSE(X, h) = \sqrt{\frac{1}{m}\sum_{i=1}^{m}(h(x^{(i)}) - y^{(i)})^{2}}
$$$

Where $X$ is a matrix containing all of the feature values (excluding labels) in the test dataset with one row per instance, $h$ is the prediction function, $m$ is the number of records in the validation dataset, $X^{(i)}$ is a vector of all feature values of the i<sup>th</sup> instance (within $X$), $y^{(i)}$ is a vector of all the desired outputs (the labels).

<!-- TODO: Example https://learn.64bitdragon.com/articles/mathematics/statistics/root-mean-squared-error -->