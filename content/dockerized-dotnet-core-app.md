---
title: "Create a Dockerized REST API with ASP.NET Core"
date: 2017-08-26T11:37:56-04:00
languages: [ "CSharp", "Dockerfile" ]
tools: [ "Docker", "VS Code" ]
techniques: [ "Containerization", "Microservices", "Test Driven Development" ]
frameworks: [ "Dotnet Core"]
projects: [ "SpamREST" ]
draft: true
---
# Build a Dockerized ASP.NET REST API

When we initially subbitted [Jibr](http://jibr.us/) to the [Apple App Store](https://itunes.apple.com/us/app/jibr/id1107405091?ls=1&mt=8) it was rejected because it lacked the ability to report spam. "No problem," we thought, "surely there's an existing open source soution used by social media startups everywhere!" but after multiple Google searches, we found nothing but email solutions.

We have therefore set out to create an [open source anti-spam microservice for RESTful applications: **SpamREST**](https://github.com/jamestharpe/SpamREST).

## What We'll Build: The SpamREST Prototype

This article will focus on the minimum viable product (MVP) for SpamREST. The only features will be:

* Report Spam posted to a REST API
* Delete that Spam by issuing an HTTP DELETE

Of course, to be production ready, I'll need to add:

* Storage
* Authentication
* Client app registration

However, for this article I'm only going to focus on building the reporting and deletion functions so that I have something to get up and running in [Docker](/tools/docker/). I'll follow-up on adding storage, authentication, and registration to a ASP [Dotnet Core](/frameworks/dotnet-core/) Web API in a future article.

## Technology Selections

While I anticipate the finished product will use additional technolgies, I'm just getting started so I'm keeping the selections to a minium.

### Docker

I started using Docker to create a [local WordPress development environment](https://github.com/jamestharpe/docker-compose-wordpress) and found it rediculously easy to use. I've since used it "here and there" in various experiments and I'm with SpamREST I'm looking to do my first Docker-based app deployment at scale.

[//]: # (Write-up article about using Docker to run local WP Install)

We'll use Docker to:

* Build a containerized development environment
* Containerize the SpamREST production environment

### Dotnet Core 2.0

The Jibr back-end is a mix of technologies (including Node and Python), but the core REST API is written in .NET. Since Dotnet core came out, I've been eager to try it. Dotnet Core is much more "open source friendly" (not to mention Docker friendly) than classic .NET, so I've decided to go all-out with a Dotnet Core 2.0 back end.

We'll use .NET core to:

* Build a RESTful API for SpamREST
* Automate testing

## Scaffold the ASP.NET Core Web API project

To get started creating the ASP.NET Core Web API project, I simply make a new directory and run the `dotnet new webapi` command:

```bash
mkdir SpamREST 
cd SpamREST
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

### Add Tests with xUnit

Let's follow[Test Driven Development (TDD)](/techniques/test-driven-development) to write some failing controller tests before we start writing the actual REST API.

> Quick note: While the [Red-Green-Refactor approach to TDD](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) is useful when writing code, it makes for a choppy article. I'm therefore presenting the tests in this article together, followed by the passing controller implementation, rather than the back-and-forth of Red-Green-Refactor.

We'll start by making a new directory and initializing an xUnit project, referencing the SpamREST project in the SpamREST.Test project, then installing the SpamREST.Test dependencies [xUnit](https://xunit.github.io/) and [Moq](https://github.com/moq/moq4):

```bash
mkdir SpamREST.Tests
cd SpamREST.Tests
dotnet new xunit
dotnet add reference ../SpamREST/SpamREST.csproj
dotnet add package Moq
dotnet restore
```

Now we can write some tests! The `SpamsController` just needs to maintain some simple CRUD operations for now, so let's test GET, PUT, POST, and DELETE happy-paths:

```C#
public class SpamsControllerTests : IDisposable {
    #region Plumbing
    private readonly SpamsController sut;
    private readonly ISpamRESTRepository repo;

    private static IEnumerable<Spam> SpamsList(int count) {
        for(int i = 0; i < count; i++) {
            yield return new Spam(){
                EndPointUri = $"https://localhost/spam-example{i}",
                ReporterId = $"spamrest{i}",
                ReporteeId = $"spammer{i}",
                Content = $"Spam Content {i}",
                Created = DateTime.UtcNow,
            };
        }
    }

    public SpamsControllerTests(){
        sut = new SpamsController(
            repo = new SpamRESTRepositoryMock());
    }

    public void Dispose(){
        sut.Dispose();
    }
    #endregion Plumbing

    [Fact]
    public async Task Get_ReturnsSpams_FromRepository(){
        repo.Add(SpamsList(2).ToArray());
        var response = Assert.IsType<OkObjectResult>(await sut.Get());
        var actual = Assert.IsType<EnumerableQuery<Spam>>(response.Value);
        Assert.Equal(actual.Count(), 2);
    }

    [Fact]
    public async Task Get_ReturnsSpam_ById(){
        repo.Add(SpamsList(2).ToArray());
        var response = Assert.IsType<OkObjectResult>(await sut.Get("https://localhost/spam-example1"));
        var actual = Assert.IsType<Spam>(response.Value);
        Assert.Equal(actual.Content, "Spam Content 1");
    }

    [Fact]
    public async Task Post_AddsNewSpam(){
        await sut.Post(SpamsList(1).First());
        var response = Assert.IsType<OkObjectResult>(await sut.Get());
        var actual = Assert.IsType<EnumerableQuery<Spam>>(response.Value);
        Assert.Equal(1, actual.Count());
    }

    [Fact]
    public async Task Put_UpsertsSpam(){
        var spamToCreateViaPUT = SpamsList(1).Single();
        await sut.Put(spamToCreateViaPUT.EndPointUri, spamToCreateViaPUT);
        var response = Assert.IsType<OkObjectResult>(await sut.Get());
        var actual = Assert.IsType<EnumerableQuery<Spam>>(response.Value);
        Assert.Equal("Spam Content 0", actual.Single().Content);

        var spamToUpdateViaPUT = SpamsList(1).Single();
        spamToUpdateViaPUT.Content = "Spam Modified Content 0";
        await sut.Put(spamToUpdateViaPUT.EndPointUri, spamToUpdateViaPUT);
        response = Assert.IsType<OkObjectResult>(await sut.Get());
        actual = Assert.IsType<EnumerableQuery<Spam>>(response.Value);
        Assert.Equal("Spam Modified Content 0", actual.Single().Content);
    }

    [Fact]
    public async Task Delete_DeletesSpamById(){
        repo.Add(SpamsList(1).Single());
        var actual = Assert.IsType<NoContentResult>(await sut.Delete("https://localhost/spam-example0"));
        Assert.False(repo.Spams.Any());
    }
}
```

### Adding the `Spam` Model and `SpamsController`

Our tests require a model and controller to pass, so let's create them.

To add a model for spam objects, just create a `Models` folder in the `SpamREST` project with a file called `Spam.cs` and add code:

```C#
using System;

namespace SpamREST.Models {
  public class Spam {
      public string ReporterId { get; set; }
      public string ReporteeId { get; set; }
      public string EndPointUri { get; set; }
      public string Content { get; set; }
      public DateTime Created { get; set; }
  }
}
```

Next, let's rename `ValuesController.cs` to `SpamsController.cs` and add enough code to make the tests pass:

```C#
[Route("api/[controller]")]
public class SpamsController : Controller {
    private readonly ISpamRESTRepository repository;

    public SpamsController(ISpamRESTRepository repository) {
        this.repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Get() {
        return Ok(await Task.FromResult(repository.Spams.Take(10)));
    }

    [HttpGet("{endPointUri}")]
    public async Task<IActionResult> Get(string endPointUri) {
        return Ok(
            await Task.FromResult(
                repository.Spams
                    .Where(s => s.EndPointUri.Equals(endPointUri))
                    .Single()));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]Spam spam) {
        await Task.FromResult(repository.Add(spam));
        return Created($"/api/spams/{spam.EndPointUri}", spam);
    }

    [HttpPut("{endPointUri}")]
    public async Task<IActionResult> Put(string endPointUri, [FromBody]Spam spam) {
        var existing = repository.Spams
            .SingleOrDefault(s => s.EndPointUri.Equals(endPointUri));
        if(existing == null){
            return await Post(spam);
        } else {
            repository.Update(spam);
            return Ok(spam);
        }
    }

    [HttpDelete("{endPointUri}")]
    public async Task<IActionResult> Delete(string endPointUri) {
        var spam = repository.Spams
            .Single(s => s.EndPointUri.Equals(endPointUri));
        await Task.FromResult(repository.Delete(spam));
        return NoContent();
    }
}
```

To wire-up the `ISpamRESTRepository` injection, we'll created an in-memory version to use for now:

```C#
public class SpamRESTRepositoryInMemory : ISpamRESTRepository{
    private List<Spam> storage = new List<Spam>();

    private Spam ByEndPointUri(string endPointUri) =>
      storage
        .Where(s => 
          s.EndPointUri.Equals(endPointUri))
        .Single();

    IQueryable<Spam> ISpamRESTRepository.Spams =>
      storage.AsQueryable();

    ISpamRESTRepository ISpamRESTRepository.Add(params Spam[] spams) {
      foreach(var spam in spams){ storage.Add(spam); }
      return this;
    }

    ISpamRESTRepository ISpamRESTRepository.Delete(params Spam[] spams) {
      foreach(var spam in spams){ storage.Remove(ByEndPointUri(spam.EndPointUri)); }
      return this;
    }

    ISpamRESTRepository ISpamRESTRepository.Update(params Spam[] spams) {
      foreach(var spam in spams){
        var index = storage.IndexOf(ByEndPointUri(spam.EndPointUri));
         storage[index] = spam;
      }
      return this;
    }
  }
```

Then hook it into the ASP Dotnet Core `IServiceCollection` in `Startup.ConfigureServices`:

```C#
public void ConfigureServices(IServiceCollection services) {
    services.AddMvc();
    services.AddScoped<ISpamRESTRepository, SpamRESTRepositoryInMemory>();
}
```

The call to `dotnet test` now produces the following output:

```bash
...
Starting test execution, please wait...
[xUnit.net 00:00:01.1323893]   Discovering: SpamREST.Tests
[xUnit.net 00:00:01.2409641]   Discovered:  SpamREST.Tests
[xUnit.net 00:00:01.3330373]   Starting:    SpamREST.Tests
[xUnit.net 00:00:01.5901650]   Finished:    SpamREST.Tests

Total tests: 5. Passed: 5. Failed: 0. Skipped: 0.
Test Run Successful.
Test execution time: 2.3348 Seconds
```

## Dockerize the ASP Dotnet REST API

Though our application isn't finished, it has working end-points and is functional enough to "dockerize". We'll setup containers to be used during development and production.

### Dockerize the Development Environment

Docker images are created from [Dockerfiles](https://docs.docker.com/engine/reference/builder/) which define a set of [layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/), starting with a base image and then "layering" in the components (files, volumes, commands) that make up the image.

Fortunarly for us, Microsoft provides an [ASP Dotnet Core Build image](https://hub.docker.com/r/microsoft/aspnetcore-build/) we can use as our base image. The `microsoft/aspnetcore-build` image can be used to build and run an ASP Dotnet Core application, which is exactly what we want to do in our development environment.

To get started, let's create a new Dockerfile called `Dockerfile.dev`:

```Dockerfile
# Stage One: Compile & Publish
FROM microsoft/aspnetcore-build
VOLUME /SpamREST
WORKDIR /SpamREST
EXPOSE 80/tcp
ENTRYPOINT dotnet restore \
  && dotnet run --environment=Development
```

Here's a step-by-step breakdown of what the Dockerfile is doing:

1. Start with `microsoft/aspnetcore-build` as the base image
1. Create a volumecalled `/SpamREST`
1. Set the working directory to `/SpamREST` within the container
1. Expose port 80
1. Run 'dotnet restore && dotnet run --environment=Development` when the container starts to build and run our application

If you're developing locally outside of docker, you don't want local build artifacts copied over, so let's also create a `.dockerignore` file:

```dockerfile
 bin/
 obj/
```

> **Testing Dockerfiles**: If `Dockerfile.dev` fails to build, copy the last container ID that was output and run `docker run --rm -it THE_ID sh` (replacing `THE_ID` with the container ID) to connect to the container created just before the failed step. You can then attempt to run the failed step manually in the container to diagnose the issue.

[//]: # (Might also need `node_modules/` in above snippet if npm packages get installed)

Now let's build, run, and test the image:

```bash
# Build
docker build -f Dockerfile.dev -t spamrest .
# Run
docker run -it -v /$(pwd)/SpamREST:/SpamREST -p 5000:80 spamrest
# Test
start http://localhost:5000/api/spams
```

> **Specifying volumes on Windows**: Note in the above code snippet, the `/` proceeding the `-v` (volume) argument. This is a necessary escape character if you're running Git Bash on Windows.

Our initial dockerized environment is now setup!

#### Monitor for Code Changes

If you've gotten this far, you've probably noticed that when you make changes to your local file system, they aren't reflected in the container until you re-run it. That's not very useful for development, so let's fix that using [dotnet-watch](https://github.com/aspnet/DotNetTools/tree/dev/src/Microsoft.DotNet.Watcher.Tools). The dotnet-watch tool monitors source code and restarts the application whenever changes are detected.

To install, add `Microsoft.DotNet.Watcher.Tools` to the `csproj` under `Project/ItemGroup`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  ...
  <ItemGroup>
    ...
    <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="2.0.0" />
  </ItemGroup>
</Project>
```

With that, we can now run `dotnet watch [command]` instead of `dotnet [command]` and dotnet-watch will re-run the command whenever it detects a change in source code. Let's update our Dockerfile.dev to support dotnet-watch:

```Dockerfile
  # Stage One: Compile & Publish
FROM microsoft/aspnetcore-build
# RUN echo "hello world" | tee greeting.txt
VOLUME /SpamREST
WORKDIR /SpamREST
EXPOSE 80/tcp
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
ENTRYPOINT dotnet restore \
  && dotnet watch run --environment=Development
```

Note the addition of `ENV DOTNET_USE_POLLING_FILE_WATCHER=true` to enable the file watcher and the change of `dotnet run` to `dotnet watch run`.

Next, rebuild and rerun the container:

```bash
docker build -f Dockerfile.dev -t spamrest .
docker run -it -v /$(pwd)/SpamREST:/SpamREST -p 5000:80 spamrest
```

We can now make changes to the ASP Dotnet Core project and quickly see them reflected in our container:



#### Connect the Debugger
Hi