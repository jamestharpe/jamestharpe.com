---
date: 2022-06-23T12:44:25-04:00
description: "Transforming \"raw\" data into a more easily analyzed form through normalization and format standardization"
tags: [ "data-science", "machine-learning" ]
title: "Data Wrangling"
---

# Data wrangling

**Data wrangling** is the process of cleaning, selecting, and preparing data sets for [data science](data-science.md) and [machine learning](machine-learning.md).

The process for data wrangling is:

1. **Understand:** Defining the meaning and relationships for each field. Summary statistics, data visualizations, and guidance from SMEs are used to scrutinize the data.
2. **Cleanse:** Detect and address corrupt and missing data. Outlier detection and imputation are used to cleanse the data.
3. **Select:** Remove unneeded data from the data set, and gather missing data that cannot be reliably inferred. Data sampling is used to systematically create smaller representative samples of larger datasets and feature selection is used to automatically identify the variables most relevant to the outcome variable.
4. **Prepare:** Standardize and normalize the data into a consistent structure and format. Integer encoding and one-hot encoding are used to convert categorical data to numerical data to make it easier for a machine learning model to process.

## Outlier Detection

The most common approaches to outlier detection are to use [standard deviation (STD)](standard-deviation.md) or [interquartile range (IQR)](interquartile-range.md).

The following steps are a simple example using standard deviation, but interquartile-range could be used just as easily:

1. Calculate the mean and standard deviation (alternatively, interquartile range) of the data collection
2. Set a cutoff ($c$) of three standard deviations ($\sigma$), or $c = 3\sigma$
3. Set a lower-bound ($l$) of the mean minus the cutoff ($l = \overline{x} - c$) and an upper-bound ($u$) of the mean plus the cutoff ($u = \overline{x} + c$)

All data points less than the lower-bound or greater than the upper-bound can be considered outliers.

## Imputation Options

The basic options for imputation are to do nothing, remove records with missing/corrupt values, or replace the missing/corrupt values (usually with the mean or mode value), or some combination of these options. It's generally best to test each option and compare the outcomes to determine the best approach.
