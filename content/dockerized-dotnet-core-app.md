---
title: "Creating a Dockerized REST API with ASP.NET Core"
date: 2017-08-26T11:37:56-04:00
languages: [ "CSharp", "Dockerfile" ]
tools: [ "Docker", "VS Code" ]
techniques: [ "Containerization", "Microservices", "Test Driven Development" ]
frameworks: [ "ASP.NET Core"]
projects: [ "SpamREST" ]
draft: true
---
# Building a Dockerized ASP.NET REST API

When we initially subbitted [Jibr](http://jibr.us/) to the [Apple App Store](https://itunes.apple.com/us/app/jibr/id1107405091?ls=1&mt=8) it was rejected because it lacked the ability to report spam. "No problem," we thought, "surely there's an existing open source soution used by social media startups everywhere!" but after multiple Google searches, we found nothing but email solutions.

We have therefore set out to create an [open source anti-spam microservice for RESTful applications: **SpamREST**](https://github.com/jamestharpe/SpamREST).

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

### Dotnet Core 2.0

The Jibr back-end is a mix of technologies, but most of it is written in .NET. Since Dotnet core came out, I've been eager to try it but despite a few half-hearted attempts I haven't had much success. However, Dotnet Core is much more "open source friendly" than classic .NET, so I've decided to go all-out with a Dotnet Core 2.0 back end.

### Docker

### TODO: Storage?

### VS Code

Though most tutorials on Dotnet Core use Visual Studio, I'll be braving the Visual Studio Code editor.

## Creating the ASP.NET Core Web API project

To get started creating the ASP.NET Core Web API project, I simply make a new directory and run the `dotnet new webapi` command:

```bash
mkdir SpamREST
dotnet new webapi
```

A quick call to `dotnet run` makes sure everything is working:

```bash
dotnet run
Hosting environment: Production
Content root path: ~/code/SpamREST
Now listening on: http://localhost:5000
Application started. Press Ctrl+C to shut down.
```

Then navigate to localhost:5000/api/values and see the results:

![ASP.NET Core Web API First Run](/img/asp-dotnet-core-web-api-first-run_300x77.png)

### Adding the `Spam` Model

To add a model for spam objects, just create a `Models` folder with a file called `Spam.cs` and add code:

```C#
using System;

namespace SpamREST.Models
{
  public class Spam
  {
      public string ReporterId { get; set; }
      public string ReporteeId { get; set; }
      public string EndPointUri { get; set; }
      public string Content { get; set; }
      public DateTime Created { get; set; }
  }
}
```

Next, let's rename `ValuesController.cs` to `SpamsController.cs` and hard-code a simple result to see the model in action:

```C#
[HttpGet]
public IEnumerable<Spam> Get()
{
    return new Spam[] {
        new Spam(){
            Content = "Spam 1",
            ReporteeId = "Spammer123",
            ReporterId = "GoodCitizen456",
            EndPointUri = "http://localhost/api/spammer123/nigerian-prince",
            Created = DateTime.UtcNow
        },
        new Spam(){
            Content = "Spam 2",
            ReporteeId = "Spammer123",
            ReporterId = "GoodCitizen456",
            EndPointUri = "http://localhost/api/spammer123/nigerian-princess",
            Created = DateTime.UtcNow
        },
    };
}
```

Visiting localhost:5000/api/spams now gives:

[![SpamREST hardcoded result](/img/spamrest-spams-endpoint-hardcoded_600x82.png)](/img/spamrest-spams-endpoint-hardcoded_857x118.png)

The result is a bit hard to read, but a quick install of the [JSON Formatter Chrome extension](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) makes things easier to read:

![SpamREST hardcoded result, formatted](/img/spamrest-spams-endpoint-hardcoded_formatted_567x343.png)

To complete our scaffold, we'll define a repository interface but save the implementation for later:

```C#
public interface ISpamRESTRepository
{
  IQueryable<Spam> Spams { get; }
  ISpamRESTRepository Add(Spam spam);
  ISpamRESTRepository Update(Spam spam);
  ISpamRESTRepository Delete(Spam spam);
}
```

### Adding Controller Tests with xUnit

Now that we have a basic model and controller, let's follow[Test Driven Development (TDD)](/techniques/test-driven-development) to write some failing controller tests.

> Quick note: While the [Red-Green-Refactor approach to TDD](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) is useful when writing code, it makes for a choppy article. I'm therefore presenting the tests in this article together, followed by the implementations, rather than demonstrating Red-Green-Refactor.

We'll start by making a new directory and initializing an xUnit project, referencing the SpamREST project in the SpamREST.Test project, then installing the SpamREST.Test dependencies [xUnit](https://xunit.github.io/) and [Moq](https://github.com/moq/moq4):

```bash
mkdir SpamREST.Tests
cd SpamREST.Tests
dotnet new xunit
dotnet add reference ../SpamREST/SpamREST.csproj
dotnet add package Moq
dotnet restore
```

Now we can write some tests! The `SpamsController` just needs to maintain some simple CRUD operations for now, so let's test GET, PUT, POST, and DELETE:

