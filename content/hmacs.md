---
date: 2021-09-01T08:09:27-04:00
description: "Hash-based Message Authentication Codes"
tags: ["cybersecurity", "cryptography", "hash-functions"]
title: "Hash-based Message Authentication Codes (HMAC)"
---

# Hash-based Message Authentication Codes (HMACs)

A **Hash-based Message Authentication Code (HMAC)** is a method to verify the sender of a message and that the message has not been tampered with, often used in combination with [public-key cryptography](asymmetric-cryptography.md).

HMAC works by using a [cryptographic](cryptography.md) [hash function](hash-functions.md) and a shared secret, or **salt**. The sender computes the the hash value for the original message using the salt, then sends the original message and hash value to the receiver as a single message. The receiver then recomputes the hash value of the original message using the same hash function and salt. If the message was tampered with or if a different salt was used, a different hash value will result thus invalidating the message.
