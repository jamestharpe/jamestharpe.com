---
date: 2022-11-07T12:26:22-04:00
description: "How to Conditionally replace a column's values in PySpark"
tags: ["pyspark-recipes"]
title: "PySpark Recipe: Conditionally replace a column's values"
---

# PySpark: How to Conditionally replace a column's values

When data cleansing in [PySpark](pyspark.md), it is often useful to replace inconsistent values with consistent values. For example: "M" and "m" may both be values in a `gender` column. This recipe replaces values in a data frame column with a single value based on a condition:

```python
from pyspark.sql.functions import col

def replace_values(in_df, in_column_name, on_condition, with_value):
    return in_df.withColumn(
        in_column_name,
        when(
            on_condition, 
			with_value
        ).otherwise(
            col(in_column_name)
        )
    )
```

## Example usage

In this example, we replace multiple possible values for  `gender` with `"unspecified"`.

```python
from pyspark.sql.functions import lower, col, trim

df = replace_values(
	in_df=df,
	in_column_name="gender",
	on_condition=(
		(lower(trim(col("gender"))) == "unknown") |
		(lower(trim(col("gender"))) == "not set") |
		(lower(trim(col("gender"))) == "prefer not to say") |
		(col("gender").isNull())
	),
	with_value="unspecified"
)
```
