---
date: 2022-11-07T12:26:22-04:00
description: "A PySpark recipe to select rows with a null value in any column"
tags: [ "pyspark-recipes", "exploratory-data-analysis" ]
title: "PySpark Recipe: Select rows where any column contains a null value"
---

# PySpark: How to select rows where any column contains a null value

When performing [exploratory data analysis](exploratory-data-analysis.md) in [PySpark](pyspark.md), it is often useful to find rows that contain nulls in any column. This recipe filters a dataframe to include only rows in which one or more columns is null. It works by generating a condition for each column to check for null and combining each condition through a series of OR (`|`) statements.

```python
from pyspark.sql.functions import col
from functools import reduce

def select_rows_with_nulls(from_df):
	return from_df.where(
		reduce(
			lambda col1, col2: col1 | col2, 
			[col(col_name).isNull() for col_name in from_df.columns]
		)
	)
```

## Example usage

In the following example, the dataframe will only contain rows in which at least one column contains a null value.

```python
df = select_rows_with_nulls(from_df=df)
```
