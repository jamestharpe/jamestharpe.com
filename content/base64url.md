---
date: 2021-12-26T06:28:27-04:00
description: "The URL-compatible form of base64 encoding"
tags: [ "base64" ]
title: "Base64url"
---

import Coder from "../src/components/coder"

# Base64url

**Base64url** is a [base64](base64.md)-based method to encode [binary](binary.md) data as URL-encoded ASCII text so that the data can be transported in a URL.

It differs from base64 in that it forbids line separators and provides alternative character mappings for characters that have special meaning in URLs. For example, `+` in base64 becomes `-` in base64url and `/` in base64 becomes `_` in base64url.

<div style={{float: "right", border: "solid", width: "40%", padding: "2em"}}>

## Base64 Encoder / Decoder

<Coder type="base64url" />
</div>

## Base64url Resources

* [The Base16, Base32, and Base64 Data Encodings](https://datatracker.ietf.org/doc/html/rfc4648)
