---
title: "TypeScript: Extend the Window (globalThis) Object"
date: 2020-11-15T14:37:11-04:00
tags: ["typescript"]
description: "Add custom properties to the Window interface with TypeScript"
draft: false
---

# Example: Add a Property to the Window type in TypeScript

```typescript
// <any-name>.d.ts
export declare global {
	interface Window {
		someProperty: SomeType;
	}
}
```

## Explanation 

```typescript
// <any-name>.d.ts
```

[Declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) (files ending with `.d.ts`) are used to declare types for code unavailable to the TypeScript compiler.

```typescript
export declare global {
	// ...
}
```

Declaration files use [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) syntax. ES Modules require at least one export statement; therefore `global` is exported. Alternatively, `{ }` (nothing) could be explicitly exported to satisfy the compiler. This is only necessary if there are no other exports.

The `Window` interface is global, therefore changes to that interface need to be within the `global` scope.

```typescript
declare global {
	interface Window {
		someProperty: SomeType;
	}
}
```

The `Window` interface is extended through [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
