---
date: 2023-07-04T09:18:11-04:00
description: "An overview of Google's quality signal metrics"
tags: [ "web-dev" ]
title: "Core Web Vitals"
---

# Core web vitals

**Core web vitals** are a set of [web development](web-dev.md) [metrics](data-analysis.md) developed by Google as guidance on quality signals for user experience on the web. These metrics include Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).

## Largest Contentful Paint (LCP)

**Largest Contentful Paint (LCP)** measures how quickly the largest block of content on a webpage loads. Generally, LCP should occur within 2.5 seconds of when the page first starts loading. More information can be found on [web.dev/lcp](https://web.dev/lcp/) site.

## First Input Delay (FID)

**First Input Delay (FID)** measures the time it takes from when the page contents are downloaded until the browser is first able to process user input. Generally, FID should be 100 milliseconds or less.  More information can be found on [web.dev/fid](https://web.dev/fid/).

## Cumulative Layout Shift (CLS)

**Cumulative Layout Shift (CLS)** measures the largest visible element position change during rendering. Generally, CLS should be 0.1 or less. More information can be found on [web.dev/cls](https://web.dev/cls/).

## Resources

* [Core web vitals overview](https://web.dev/vitals/)
