---
date: 2021-09-26T14:32:47-04:00
description: "Recipe to get the unique elements from a JavaScript Array"
tags: ["js-recipes"]
title: "JavaScript Recipe: Get the unique elements from an array"
---

# Get the unique elements from an array

Given an array with duplicate elements, return only the unique elements from an array:

```javascript
function uniqueElements(a) {
	return [...new Set(a)]
}

const uniques = uniqueElements([1, 2, 2, 3, 3, 3]);
// [1, 2, 3]
```

## Related MDN Documentation

* [Global objects: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
