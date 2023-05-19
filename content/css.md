---
date: 2023-05-19T15:07:41-04:00
description: "Cascading Style Sheets (CSS)"
tags: [ "computer-languages", "web-dev" ]
title: "Cascading Style Sheets (CSS)"
---

# Cascading Style Sheets (CSS)

Cascading Style Sheets (CSS) is a [computer-language](computer-languages.md) that describes how XML and [HTML](html.md) documents should be visually presented. One of the best ways to learn CSS is through the [MDN CSS Learning Arena](https://developer.mozilla.org/en-US/docs/Learn/CSS).

## CSS Best Practices

* Use a CSS Reset or Normalizer: Establish consistent styles across browsers by using a CSS reset, such as [normalize.css](https://github.com/necolas/normalize.css).
* Avoid inline CSS: Use external CSS files for better flexibility, reusability, and maintainability.
* Avoid overly specific selectors: Use classes and IDs instead of relying heavily on complex nested selectors.
* Optimize and minify: Optimize and minify CSS prior to deployment to reduce file size and improve loading performance.
* Keep it responsive: Use media queries to adjust styles based on different screen sizes and resolutions to ensure a functional user experience across devices.

## Lesser known CSS selectors

### Peer element selector

Use `+` as the **peer element selector** to select an adjacent peer element. For example, to select a `<span>` that immediately follows a `<div>`, use this CSS:

```css
div + span {
	/* ... */
}
```

The code above will select the span in this HTML because the `<span>` appears _immediately after_ the `<div>`:

```html
<div>...</div>
<span>...</span>
```

### Subsequent sibling selector

Use `~` as the **subsequent sibling selector** to select elements that appear after, not not necessarily adjacent to, another element. For example, to select a `<span>` that follows a `<div>` but has one or more elements in between the `<div>` and the `<span>`, use this CSS:

```css
div ~ span {
	/* ... */
}
```

The code above will select the span in this HTML:

```html
<div>...</div>
<p>...</p>
<span>...</span>
```

## CSS Resources

* [CSS: Cascading Style Sheets on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [CSS Official Definition on W3C](https://www.w3.org/TR/CSS/#css)
* [CSS Zen Garden](http://www.csszengarden.com/)
