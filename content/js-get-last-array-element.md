---
date: 2021-11-08T11:42:47-04:00
description: "Recipe to get the last element from a JavaScript Array"
tags: ["js-recipes"]
title: "JavaScript Recipe: Get the last element from an array"
---

# Get the last element from an array

Given an array with one or more elements, return only the last element from the array.

```javascript
const array = [1, 2, 3];
array.at(-1); // 3 (preferred, does NOT mutate)
array.pop(); // 3 (preferred, mutates array!)
array.slice(-1)[0]; // 3 (for older browsers and NodeJS versions, mutates array!)
```

## Related MDN Documentation

* [Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
* [Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
* [Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
