---
date: 2023-01-03T11:09:16-04:00
description: "How to re-order columns in a PySpark dataframe"
tags: ["pyspark-recipes"]
title: "PySpark Recipe: Re-order Columns in a Dataframe"
---

# PySpark: How to Re-order Columns in a Dataframe

When performing [data analysis](data-analysis.md) in [PySpark](pyspark.md), it is often useful to re-order the columns of a dataframe to make the output easier to read and understand, prepare the data for a specific visualization, match the order of columns in another data source, or follow a specific column order convention or team standard.

The most straightforward way to re-order the columns of a PySpark dataframe is to use the `select(..)` function:

```python
df = df.select("colum_a", "colum_c", "colum_c")
```

It may also be useful to use the `columns` property to apply a custom sort function:

```python
df = df.select(sorted(df.columns)) # Sorts ascending
df = df.select(sorted(df.columns, reverse = True)) # Sorts descending
```

Finally, it's common to only care about the first few columns but still include the remaining columns without wanting to tediously write out the list of columns for which you don't care about the order. Here's a utility function that allows you to specify the only the order first few columns, but still includes the remaining columns in their original order:

```python
def reorder_columns(on_df, first_cols: List[str]):
	remaining_columns = [column for column in on_df.columns if column not in first_cols]
	new_column_order = first_cols + remaining_columns 
	return on_df.select(*new_column_order)

# Example use:

df = reorder_columns(on_df=df, first_cols=["first", "second", "third"])
```
