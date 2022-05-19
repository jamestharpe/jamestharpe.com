---
date: 2022-05-19T14:44:53-04:00
description: "Data that partially adheres to a schema"
tags: [ "data" ]
title: "Semi-Structured Data"
---

# Semi-structured data

**Semi-structured data** are [data](data.md) that contain entities that partially conform to a schema, or contain elements internally consistent enough to derive a partial schema.

## Example of semi-structured data

```json
[
	{ name: "John Doe", age: 27 },
	{ name: "Jane Doe", age: 28, height: 66 },
]
```

Note that the common elements `name` and `age` can be used to derive a schema, however `height` is unique to the second record and thus creates ambiguity in what could otherwise be a rigidly defined schema.
