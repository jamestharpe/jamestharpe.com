---
date: 2021-09-05T17:28:27-04:00
description: "A cryptographic system"
tags: ["cryptography" ]
title: "Asymmetric (public-key) Cryptography"
---

# Asymmetric Cryptography (Public Key Cryptography)

**Asymmetric cryptography**, or **public-key cryptography** is [cryptography](cryptography.md) system that uses key pairs to encrypt and decrypt messages. A key pair includes a public key and a private key. The public key can be distributed without compromising the security of messages, however the private key must be kept secret for the scheme to work.

Any message encrypted with the public key may only be read by decrypting it using the private key. This means that the sender and receiver do not require a shared secret in order to [securely](cybersecurity.md) exchange messages.

Conversely, a message may be signed with the private key and validated with the public key, thus authenticating the message source.
