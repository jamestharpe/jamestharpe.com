---
date: 2021-09-05T08:09:27-04:00
description: "A method to represent claims based security values, defined by RFC 7519"
tags: ["json", "jws", "base64url", "jose", "ietf-standards"]
title: "JSON Web Tokens (JWT)"
---

# JSON Web Tokens (JWT)

**JSON Web Token (JWT)** is an open standard for representing passing claims securely between two parties as three concatenated base64url-encoded strings of [JSON](json.md) data, joined by dots (`.`). JWTs are used for authentication, authorization, and information exchange.

The first string is the **[JOSE](jose.md) Header**, which describes the digital signature or [HMAC](hmacs.md) applied to the second string. The second string is a [JWS](jws.md) payload, which contains JSON-encoded **claims** which are the information to be exchanged. Finally, the third string is a JWS signature that can be used to validate that the header and payload segments were not altered.

<!-- TODO: Add decoder? -->

## JWT Resources

* [JSON Web Token (JWT), RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)
* [JWT Decoder and Debugger](https://jwt.io/)
