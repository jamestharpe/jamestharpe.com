---
date: 2021-09-26T14:32:47-04:00
description: "Quick and easy to copy recipes for CSS"
tags: ["css", "code-recipes"]
title: "CSS recipes"
---

# CSS recipes

## Center elements horizontally

There are many ways to center elements horizontally using CSS; two of the most common ones are using `display: flex` and `margin: 0px auto`.

### Center elements using `display: flex`

```css
.flex-centered {
	display: flex;
	align-items: center;
	flex-direction: column;
}
```

### Center elements using `margin: 0px auto`

```css
.margin-centered {
	margin: 0px auto; /* sets left and right margins to auto */
	width: 80%;
	/* display: block; */ /* Uncomment for non-block elements */
}
```

## Collapsible list (without [JavaScript](javascript.md))

```html
<html>
	<head>
		<style type="text/css">
			[type="checkbox"],
			[type="checkbox"]:checked + label .open,
			[type="checkbox"] ~ ul,
			[type="checkbox"] ~ label .close {
				display: none;
			}

			[type="checkbox"]:checked + label .close,
			[type="checkbox"] ~ ul,
			[type="checkbox"] ~ label .close {
				display: inline-block;
			}
		</style>
	</head>
	<body>
		<input id="toggle" type="checkbox" />
		<label for="toggle">
			<span class="open">➕</span>
			<span class="close">➖</span>
		</label>
		<ul>
			<li>Item One</li>
			<li>Item Two</li>
			<li>Item Three</li>
		</ul>
	</body>
<html>
```

A simpler alternative using HTML5 elements is to use the `<summary>` and `<details>` tags:

```html
<details>
	<summary>Menu</summary>
	<ul>
		<li>Item One</li>
		<li>Item Two</li>
		<li>Item Three</li>
	</ul>
</details>
```
