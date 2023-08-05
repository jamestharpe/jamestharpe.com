---
date: 2023-08-05T01:16:52-04:00
description: "Architectural considerations for building a white-labeled SaaS application"
tags: ["software-architecture"]
title: "Designing a Scalable White-Label SaaS Application"
---

# Designing a Scalable White-Label SaaS Application

A **white-label software as a service (SaaS) application** is a [software](software-engineering.md) [product](product-management.md) created by one company and then re-branded and customized by other companies to make it appear as their own. When building a white-label SaaS application, there are a lot of design, [architecture](software-architecture.md), and development practice considerations required for a successful build and launch.

## Customization support

The UI/UX and backend must easily incorporate brand-specific customizations for customers. This could involve changes in logo, color schemes, layouts, templates, domain-specific content, or other customizations. Consider using a theme-based system that can apply different styles based on the domain name.

## Multiple integration options

Each customer may require the same feature to be implemented using different providers or custom settings. This could include payment gateway configurations, user roles and permissions, specific business rules, or other features of the application. These should be easy to connect and configure via an administration interface that is not coupled to a single provider or approach.

## Domain-based routing

The application's routing must be able to recognize the client-specific domain and route traffic accordingly. This includes setting the application context and applying the relevant brand settings based on the incoming domain name. Domain-based routing is often achieved through reverse-proxies such as NGinx

## Data isolation

Each tenant's data must be secure and inaccessible to other tenants. Isolation strategies commonly include using a separate database instance or schema for each tenant (physical isolation), having a shared schema that carefully incorporates a tenant identifier (logical isolation), or a hybrid approach. For logical isolation designs, consider row-level security to keep tenant data isolated.

## Security

Consider solutions like Let's Encrypt for automated SSL certificate management for various domains, strict [CORS](cors.md) policies to prevent unauthorized cross-domain requests.

### Scalability

As the number number of brands (tenants) increases, they are likely to increase volume considerably. [Cloud-based solutions](cloud-platforms.md) that make use of [distributed systems architecture](distributed-systems.md) are the most common way to provide scale and fault tolerance. Consider strategies that include load balancing, [content-addressed storage](content-addressed-storage.md), [database](databases.md) indexes, caching, and asynchronous processing.

### Automation

New brands should be able to onboard quickly through automation. This can include configuring a custom domain, [initializing the database](database-as-code.md), and providing reasonable defaults for initial configuration.
