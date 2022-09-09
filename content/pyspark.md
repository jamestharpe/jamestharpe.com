---
date: 2022-09-09T10:53:58-04:00
description: "Recipes for using PySpark"
tags: [ "python-data-libs", "open-source-software", "data-analysis", "data-science" ]
title: "PySpark Recipes for Data Cleansing, Analysis, and Science"
---

# PySpark Recipes

PySpark is an [open source](open-source-software.md) [Python](python.md) [library](python-data-libs.md) used to access [Apache Spark](apache-spark.md). Here are a few useful recipes for using PySpark.

## Remove columns that contain only null values

Datasets occasionally contain columns that are useless because they only contain null values. The following `drop_null_columns` function will remove all such columns:

```python
import pyspark.sql.functions as sqlf

def drop_null_columns(from_df):
    """
    This function drops columns that only contain null values.
    :param from_df: A PySpark DataFrame
    """

    null_counts = from_df.select(
        [
            sqlf.count(
				sqlf.when(sqlf.col(column).isNull(), column)
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
