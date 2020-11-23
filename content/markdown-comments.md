---
date: 2017-10-26T18:17:11-04:00
redirect_from: ["/code-comments-markdown/"]
tags: ["markdown"]
title: "Markdown Code Comments"
---

# How to Comment a Markdown File

Markdown doesn't include specific syntax for comments, but there is a workaround using the [reference style links](https://daringfireball.net/projects/markdown/syntax#link) syntax. Using this syntax, the **comments will not be output to the resulting HTML**. 

Here are a few examples:

```markdown
[]: # (This is a comment)
[]: # "And this is a comment"
[]: # 'Also this is a comment'
[//]: # (Yet another comment)
[comment]: # (Still another comment)
```

Each of these lines works the same way:

* `[...]:` identifies a reference link (that won't be used in the article)
* `#` defines the destination, in this case `#` is the shortest valid value for a URL
* `(...)`, `"..."`, and `'...'`define the reference title, which we repurpose to make a comment

While this is the best approach that I'm aware of, it doesn't allow multi-line comments and each comment must appear on it's own line.

I personally prefer to use `[//]: #` since, as a software developer, I tend to associate `//` with comment syntax.

## Adding HTML Comments in Markdown

If you'd like for your comments to show up in the HTML output, a simple modified HTML comment syntax will work:

```markdown
<!--- This is an HTML comment in Markdown -->
```

Unlike a "normal" HTML comment which opens with `<!--` (two dashes), an HTML comment in Markdown opens with `<!---` (three dashes). Some Markdown parsers support two-dash HTML comments, but the three-dash version is more universally compatible.

[//]: # (Test:)
<!--- This is an HTML comment in Markdown -->