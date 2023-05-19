---
date: 2023-05-19T14:13:41-04:00
description: "A superset of CSS that adds variables, mixins, functions, and more to CSS"
tags: [ "css", "web-dev" ]
title: "Sassy Cascading Stylesheets (SCSS)"
---

# Sassy Cascading Stylesheets (SCSS)

**Sassy Cascading Stylesheets (SCSS)** is a superset of [CSS](css.md) that addresses common [foot guns](foot-guns.md) and provides syntactic sugar to make CSS easier to organize and manage.

## Key features of SCSS

### Nested styles

A common cause of defects in CSS is that it _does not_ support style nesting, thus this:

```css
.menu {
	/* ... */
}

.menu ul {
	/* ... */
}

.menu ul li {
	/* ... */
}
```

Can easily and accidentally become this:

```css
/* Missing the .menu class! */

.menu ul {
	/* ... */
}

.menu ul li {
	/* ... */
}
```

Or this:

```css
.menu {
	/* ... */
}

.menu ul {
	/* ... */
}

.menu ul li {
	/* ... */
}

.menu {
	/* .. conflicting styles .. */
}
```

SCSS helps avoid this situation through nested styles, so that to style a `<ul>` element within a `.menu` class element, the preferred method is to use nesting:

```scss
.menu {
	/* ... */
	ul {
		/* ... */
	}
}
```

This approach makes the relationship between styles clearer and more compact.

### Variables

SCSS supports variables using the `$variable-name` syntax. For example:

```scss
$alert-info-color: green;
$alert-warning-color: yellow;
$alert-error-color: red;

.alert-info: {
	background-color: $alert-info-color;
}
/* ... */
```

This makes code more semantic and thus easier to understand, plus easier to manage by having only one place to change variable values.

<!-- 
TODO: Operators, inheritance
-->

## SCSS Resources

* [Official SCSS Website](https://sass-lang.com/)
