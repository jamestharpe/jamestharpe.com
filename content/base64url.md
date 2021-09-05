---
date: 2021-09-05T18:06:27-04:00
description: "The URL-compatible form of base64 encoding"
tags: [ "base64" ]
title: "Base64url"
---

# Base64url

**Base64url** is a [base64](base64.md)-based method to encode [binary](binary.md) data as URL-encoded ASCII text so that the data can be transported in a URL.

It differs from base64 in that it forbids line separators and provides alternative character mappings for characters that have special meaning in URLs. For example, `+` in base64 becomes `-` in base64url and `/` in base64 becomes `_` in base64url.

<!-- TODO: Make an encoder/decoder -->
