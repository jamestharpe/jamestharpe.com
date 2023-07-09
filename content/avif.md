---
date: 2023-07-04T09:18:11-04:00
description: "Basics of the AVIF image file format applications"
tags: [ "web-dev" ]
title: "AVIF Images"
---

# AVIF Image File Format

**AVIF** is an open and free image file format that can provide over 50% file size savings compared to JPEG and over 30% savings compared to WebP and is supported by most major web browsers. These smaller file sizes reduce storage needs and help pages load faster which improves [Largest Contentful Paint (LCP) times](core-web-vitals.md) and represents how quickly the largest block of content on a [webpage](web-dev.md) has loaded. Using modern codecs to compress images is one of the key techniques to reduce LCP. Lighthouse is a great Chrome developer tool for testing your web site and to see how much savings AVIF would bring.

## Resources

* [AVIF Image Format](https://aomediacodec.github.io/av1-avif/)
* [Official AVIF implementation](https://github.com/AOMediaCodec/libavif)
