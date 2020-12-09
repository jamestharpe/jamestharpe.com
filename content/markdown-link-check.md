---
date: 2020-12-09T15:29:03-04:00
description: "Use markdown-link-check and Bash to detect broken links"
tags: [ "markdown", "cli", "bash" ]
title: "Markdown: Detect Broken links"
---

# How to Detect Broken Links in Markdown

The [`markdown-link-check` NPM package](https://www.npmjs.com/package/markdown-link-check) makes it easy to scan a markdown file for broken links, but what about a whole website?

This simple Bash script will scan all markdown links:

```bash
#!/usr/bin/env bash
for file in $(find . -name \"*.md\")
do 
	markdown-link-check --verbose --config .markdown-link-check.config.json \"$file\" || exit 1; 
done
```

## Static Site Generator Example with Gatsby

Though these instructions are written for Gatsby, they can be easily adapted to any static site generator.

### 1. Install `markdown-link-check` locally

```bash
npm install --save-dev markdown-link-check
```

### 2. Configure Crawling Options

[Gatsby](https://www.gatsbyjs.com/) stores static files in the `static/` folder, so we have to map references to these files to prefix them with `/static/`.

Create a file called `.markdown-link-check.config.json` in your project root to configure the mapping:

```json
{
	"replacementPatterns": [
    {
      "pattern": "^\/img\/",
      "replacement": "../static/img/"
    }
  ]
}
```

### 3. Add a `test:links` script to `package.json`

The `markdown-link-check` CLI only checks one file at a time, we need to loop through all markdown files and ignore the contents of the `node_modules` folder in our script:

```json
{
	...
	"scripts": {
		...
		"test:links": "for file in $(find . -path ./node_modules -prune -false -o -name \"*.md\"); do markdown-link-check --verbose --config .markdown-link-check.config.json \"$file\" || exit 1; done;",
		...
	}
	...
}
```

You can now integrate `npm run test:links` into your CI/CD process.
