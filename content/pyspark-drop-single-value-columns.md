---
date: 2022-11-07T12:26:22-04:00
description: "How to drop columns in a dataframe that contain only a single value or all nulls"
tags: ["pyspark-recipes"]
title: "PySpark Recipe: Drop single-value columns"
---

# PySpark: How to drop single-value columns

When data cleansing in [PySpark](pyspark.md), it can be useful to drop columns that only contain a single value; for example, columns with a single value are not typically useful when training a [machine learning](machine-learning.md) model. It works by retrieving the first row from the dataframe, then counting the number of rows containing columns with the same value as the corresponding column in the first row. Columns for which the count is equal to the count of the entire dataframe contain only a single value and may be dropped.

```python
def drop_mono_columns(from_df):
    first_row = from_df.limit(1).collect()[0]
    candidates = from_df.select([
		count(
			when(col(column) != first_row[column], column)
		).alias(column)
		for column in from_df.columns
	]).collect()[0].asDict()

    mono_cols = [key for key, value in candidates.items() if value == 0]

    return from_df.drop(*mono_cols) if len(mono_cols) > 0 else from_df
```

## Drop columns containing only `null` values

The code above can be modified slightly so that only columns containing all null values are dropped. The following `drop_null_columns` function will remove only columns in which all values are `null`:

```python
from pyspark.sql.functions import col, count, when

def drop_null_columns(from_df):
    """
    This function drops columns that only contain null values.
    :param from_df: A PySpark DataFrame
    """

    null_counts = from_df.select(
        [
            count(
				when(col(column).isNull(), column)
			).alias(column)
            for column in from_df.columns
        ]
    ).collect()[0].asDict()

	row_count = from_df.count()
    cols_to_drop = [
        col_name 
		for col_name, col_val in null_counts.items() 
        if col_val == row_count
    ]

    return from_df.drop(*col_to_drop)
```
