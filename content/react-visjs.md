---
date: 2020-12-20T15:22:11-04:00
description: "A step-by-step recipe to use vis.js in a React application"
tags: [ "visjs", "react" ]
title: "React Recipe: Use vis.js in a React Application"
---

# Use `vis.js` in a React App

Vis visualizations can be added to React applications without any React-specific 3rd-party packages. For this recipe we'll use `vis-network`, though any `vis.js` package should easily substitute. These instructions assume you are starting with an existing React application. To get started from scratch, check out the [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html).

## Ingredients

* [`vis-network`](https://github.com/visjs/vis-network) or any `vis.js` package of your choosing
* [`vis-data`](https://github.com/visjs/vis-data)
* [`useEffect`](https://reactjs.org/docs/hooks-effect.html)
* [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref)

## Steps

### 1. Install dependencies into your React app

The `vis-network` package requires the `vis-data` package to function, so install both:

```bash
npm install --save vis-data vis-network
```

### 2. Hook into the DOM

Visualizations drawn by Vis libraries require direct access to the DOM. We can set that up in React with a combination of `useRef` and `useEffect`:

JavaScript (JSX) Example:

```jsx
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

const VisNetwork = () => {
	// Create a ref to provide DOM access
	const visJsRef = useRef(null);
	useEffect(() => {
		// Once the ref is created, we'll be able to use vis
	}, [visJsRef]);
	return <div ref={visJsRef} />;
};

export default VisNetwork;
```

TypeScript (TSX) Example:

```tsx
const VisNetwork: React.FC = () => {
	// Create a ref to provide DOM access
	const visJsRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// Once the ref is created, we'll be able to use vis
	}, [visJsRef]);
	return <div ref={visJsRef} />;
};

export default VisNetwork;
```

### 3. Use Vis!

Vis can now be used within the `useEffect` callback.

JavaScript (JSX) example:

```jsx
const VisNetwork = () => {
	const nodes = [
		{ id: 1, label: "Node 1" },
		{ id: 2, label: "Node 2" },
		{ id: 3, label: "Node 3" },
		{ id: 4, label: "Node 4" },
		{ id: 5, label: "Node 5" },
	];

	const edges = [
		{ from: 1, to: 3 },
		{ from: 1, to: 2 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 3 },
	];

	const visJsRef = useRef(null);
	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges } );
		// Use `network` here to configure events, etc
	}, [visJsRef, nodes, edges]);

	return <div ref={visJsRef} />;
};

export default VisNetwork;
```

TypeScript (TSX) example:

```tsx
const VisNetwork: React.FC = () => {
	const nodes = [
		{ id: 1, label: "Node 1" },
		{ id: 2, label: "Node 2" },
		{ id: 3, label: "Node 3" },
		{ id: 4, label: "Node 4" },
		{ id: 5, label: "Node 5" },
	];

	const edges = [
		{ from: 1, to: 3 },
		{ from: 1, to: 2 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 3 },
	];

	const visJsRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges } );
		// Use `network` here to configure events, etc
	}, [visJsRef, nodes, edges]);

	return <div ref={visJsRef} />;
};

export default VisNetwork;
```

## Full Example

A full example can be found on my website's [source code for the Related Network Graph](https://github.com/jamestharpe/jamestharpe.com/blob/main/src/components/related-network.tsx).

## Additional Resources for `vis.js` in React

* [React Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)
