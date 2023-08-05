---
date: 2021-03-08T11:09:30-04:00
description: "A security mechanism for servers to indicate valid resource origins for HTTP requests"
tags: ["web-dev"]
title: "Cross-Origin Resource Sharing (CORS)"
---

# Cross-Origin Resource Sharing (CORS)

**Cross-Origin Resource Sharing**, or simply **CORS**, is a security mechanism that allows servers to use HTTP headers to indicate to clients origins it deems valid.  Client applications, typically web browsers, then permit or deny web apps running on one origin from loading resources from other origins. Without CORS, malicious websites could make requests to another site on your behalf without your consent, possibly leading to security vulnerabilities.

## What is an origin?

An **origin** is a combination of a scheme (http, https), host (for example, jamestharpe.com), and port (80, 443). Two URLs with the same origin have the same scheme, host, and port.

## CORS Resources

* [CORS on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
