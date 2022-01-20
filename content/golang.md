---
date: 2020-08-19T16:02:11-04:00
description: "An open-source, statically typed, compiled programming language"
tags: ["computer-languages", "open-source-languages"]
title: "Go"
---

# Go

**Go** is an [open-source programming language](open-source-languages.md) with memory safety, structural typing, type safety, type inference, built-in package management (`go get`), and built-in concurrency primitives. Programs compiled with Go do not have external dependencies by default.

In Go, a **package** is a collection of source files in the same directory. Functions, types, variables, etc, in a source file are visible to _all_ other source files in the same package. Package members that start with an uppercase letter are exported by that package.

A **module** is a collection of related packages. Modules are defined in `go.mod` at the repository root. A repository typically contains a single module, but may contain multiple modules.

To initialize a new module, run `go mod init`. To build the module and copy the binary to the `$GOPATH/bin`, run `go install`.

## Resources

* [Official Go website](https://golang.org/)
