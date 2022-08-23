---
date: 2022-08-23T09:38:58-04:00
description: "Research into an unfamiliar dataset, aimed at pattern discovery, assumption verification, and data summarization"
tags: [ "data-wrangling" ]
title: "Exploratory Data Analysis (EDA)"
---

# Exploratory data analysis (EDA)

**Exploratory data analysis (EDA)** an aspect of [data wrangling](data-wrangling.md) that consists of preliminary investigations into an unfamiliar dataset that aim to detect patterns, identify anomalies, check assumptions, and summarize the data to ensure it is well understood before using it in a broader context, such as using it as [machine learning](machine-learning.md) input.

EDA often starts simply, by determining the numbers of columns (characteristics) and rows (observations), whether data is missing or corrupt, and the data type of each column. Basic aggregate functions can be applied to values to determine the count, mean, standard deviation, minimum, and maximum values for each characteristic. Data may also be broken down into quartiles or other bins to note various tendencies the data may have.

> Note: In [Pandas](pandas.md), the `data_frame.shape()` and `data_frame.describe()` functions can help make quick work of the first few steps of exploratory data analysis.

Visualizations can help with additional analysis. Common visualizations include:

* A **correlation matrix** plots the correlations between characteristics in the dataset
* A **box-and-whisker plot** illustrates the distribution of data for easy comparison between variables
* A **distribution plot** visualizes how each characteristic is distributed within the dataset

<!-- TODO: Pages for each visualization above -->

> Note: [Seaborn](seaborn.md) is a useful data visualization library for [Python](python.md).
