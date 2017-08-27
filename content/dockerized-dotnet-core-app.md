---
title: "Dockerized ASP.NET Core App"
date: 2017-08-26T11:37:56-04:00
languages: [ "CSharp", "Dockerfile" ]
tools: [ "Docker", "VS Code" ]
techniques: [ "Containerization", "Microservices" ]
frameworks: [ "ASP.NET Core"]
draft: true
---

# Building a Dockerized ASP.NET REST API

When we initially subbitted [Jibr](http://jibr.us/) to the [Apple App Store](https://itunes.apple.com/us/app/jibr/id1107405091?ls=1&mt=8) it was rejected because it lacked the ability to report spam. "No problem," we thought, "surely there's an existing open source soution used by social media startups everywhere!" but after multiple Google searches, we found nothing but email solutions.

We have therefore set out to create an open source anti-spam microservice for RESTful applications: SpamREST.

## What I'll be building: The SpamREST MVP

This article will focus on the minimum viable product (MVP) for SpamREST. The only features will be:

* Report Spam posted to a REST API
* Delete that Spam

Of course, to allow other REST APIs to integrate with SamREST, I'll need to add:

* Authentication
* Application registration

However, for this article I'm only going to focus on building the reporting and deletion functions. I'll follow-up on adding authentication and registration to a Dotnet Core Web API in a future article.

## Technology Selection

While I anticipate the finished product will use additional technolgies, I'm just getting started so I'm keeping the selections to a minium.

### Dotnet Core

The Jibr back-end is a mix of technologies, but most of it is written in .NET. Since Dotnet core came out, I've been eager to try it but despite a few half-hearted attempts I haven't had much success. However, Dotnet Core is much more "open source friendly" than classic .NET, so I've decided to go all-out with a Dotnet Core 2.0 back end.

### Docker