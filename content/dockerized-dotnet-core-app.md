---
title: "Create a Dockerized REST API with ASP.NET Core"
date: 2017-08-26T11:37:56-04:00
languages: [ "CSharp", "Dockerfile" ]
tools: [ "Docker", "VS Code" ]
techniques: [ "Containerization", "Microservices" ]
frameworks: [ "ASP.NET Core"]
projects: [ "SpamREST" ]
draft: true
---
# Build a Dockerized ASP.NET Core Application

[//]: # (TODO: Write-up article about using Docker to run local WP Install)

Using [SpamREST](/projects/spamrest/) as an example, this article will focus on how to:

* Scaffold an [ASP Dotnet Core](/frameworks/asp.net-core/) REST API
* Build, run, and debug the application in [Docker](/tools/docker/) using [VS Code](/tools/vs-code/)
* Publish the application to [Docker Hub](https://hub.docker.com/)
* Deploy the application to [AWS](https://aws.amazon.com/) and [Azure](https://azure.microsoft.com/)

## What We'll Build: SpamREST Prototype

When we initially submitted [Jibr](http://jibr.us/) to the [Apple App Store](https://itunes.apple.com/us/app/jibr/id1107405091?ls=1&mt=8) it was rejected because it lacked the ability to report spam. "No problem," we thought, "surely there's an existing open source soution used by social media startups everywhere!" but after multiple Google searches, we found nothing but email solutions.

We have therefore set out to create an [open source anti-spam microservice for RESTful applications: **SpamREST**](https://github.com/jamestharpe/SpamREST). The "MVP" of SpamREST consists of just two simple features:

* Report Spam that was posted to a REST API to the SpamREST REST API
* Delete that Spam by issuing an HTTP DELETE to the reported end-point

Since this project will be open source, we didn't want to tie it to Azure or AWS as we've done for our proprietary code bases. We've therefore based the application on Linux containers to allow it to run virtually anywhere.

## Scaffold the ASP.NET Core Application

The Jibr back-end is a mix of technologies (mostly Node and Python), but the core REST API is written in .NET. Since Dotnet Core came out, we've wanted to migrate to it but version 1.0 just wasn't mature enough. Given that Dotnet Core is much more "open source friendly" (and Docker friendly) than classic .NET, and with the release of 2.0 we're optimistic that we can begin migrating the .NET back-end of Jibber to Dotnet Core. SpamREST will be our first microservice built on Dotnet Core.

To get started creating the ASP.NET Core Web API project, I simply make a new directory and run the `dotnet new webapi` command:

```bash
$ dotnet new webapi
The template "ASP.NET Core Web API" was created successfully.
This template contains technologies from parties other than Microsoft, see https://aka.ms/template-3pn for details.

Processing post-creation actions...
Running 'dotnet restore' on ~/SpamREST/SpamREST.csproj...
  Restoring packages for ~/SpamREST/SpamREST.csproj...
  Restore completed in 301.18 ms for ~/SpamREST/SpamREST.csproj.
  Generating MSBuild file ~/SpamREST/SpamREST.csproj.nuget.g.props.
  Generating MSBuild file ~/SpamREST/obj\SpamREST.csproj.nuget.g.targets.
  Restore completed in 7.42 sec for ~/SpamREST/SpamREST.csproj.

Restore succeeded.
```

A quick call to `dotnet run` makes sure everything is working:

```bash
$ dotnet run
Hosting environment: Production
Content root path: ~/code/SpamREST
Now listening on: http://localhost:5000
Application started. Press Ctrl+C to shut down.
```

Then navigate to localhost:5000/api/values and see the results:

![ASP.NET Core Web API First Run](/img/asp-dotnet-core-web-api-first-run_300x77.png)

We can now create the basic classes and placeholders needed to complete the scaffold.

To add a model for `Spam` objects, just create a `Models` folder in the `SpamREST` project with a file called `Spam.cs` and add code:

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

Next, let's rename `ValuesController.cs` to `SpamsController.cs` and add CRUD code:

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

We now have a "functional" application. It's time to start dockerizing.

## Dockerize the ASP Dotnet REST API

Though our application isn't finished, it has working end-points and is functional enough to "dockerize". We'll setup containers to be used during development and production.

### Dockerize the Development Environment

Docker images are created from [Dockerfiles](https://docs.docker.com/engine/reference/builder/) which define a set of [layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/), starting with a base image and then "layering" in the components (files, volumes, commands) that make up the image.

Fortunarly for us, Microsoft provides an [ASP Dotnet Core Build image](https://hub.docker.com/r/microsoft/aspnetcore-build/) we can use as our base image. The `microsoft/aspnetcore-build` image can be used to build and run an ASP Dotnet Core application, which is exactly what we want to do in our development environment.

To get started, let's create a new Dockerfile called `Dockerfile.dev`:

```Dockerfile
FROM microsoft/aspnetcore-build
VOLUME /SpamREST
WORKDIR /SpamREST
EXPOSE 80/tcp
ENTRYPOINT dotnet restore \
  && dotnet run --environment=Development
```

Here's a step-by-step breakdown of what the `Dockerfile.dev` code is doing:

1. Start with `microsoft/aspnetcore-build` as the base Docker image
1. Create a volume called `/SpamREST`
1. Set the working directory to `/SpamREST` within the container
1. Expose port 80
1. Run 'dotnet restore && dotnet run --environment=Development` when the container starts to build and run our application

You can now build the Docker image we'll be using:

```bash
$ docker build -f Dockerfile.dev -t spamrest .
Sending build context to Docker daemon  890.9kB
Step 1/5 : FROM microsoft/aspnetcore-build
latest: Pulling from microsoft/aspnetcore-build
# ... Output omitted for brevity ...
Successfully built 6c9375fef63b
Successfully tagged spamrest:latest
```

Here's how the `docker build -f Dockerfile.dev -t spamrest .` command works:

* `docker build` tells docker to build an image from a Dockerfile
* `-f` specifies the Dockerfile
* `-t` specfies how to tag the created image
* `.` specifies the PATH, which defines the context of the build, as the current working directory

> **Testing Dockerfiles**: If a Dockerfile fails to finish building, copy the last container ID that was output and run `docker run --rm -it THE_ID sh` (replacing `THE_ID` with the container ID), for example `docker run --rm -it be316a24db3e sh`, to connect to the container created just before the failed step. You can then attempt to run the failed step manually in the container to diagnose the issue.

[//]: # (Might also need `node_modules/` in above snippet if npm packages get installed)

With the image built, we can now run it:

```bash
$ docker run -it -v /$(pwd):/SpamREST -p 5000:80 spamrest
  Restoring packages for /SpamREST/SpamREST.csproj...
# ... Output omitted for brevity ...
Hosting environment: Production
Content root path: /SpamREST
Now listening on: http://[::]:80
Application started. Press Ctrl+C to shut down.

```

Here's how the `docker run -it -v /$(pwd):/SpamREST -p 5000:80 spamrest` command works:

* `docker run` tells Docker to run a container
* `-it` allows interactive processes (namely, shell) to work on the container
  * `i` keeps STDIN open
  * `t` allocates a pseudo tty
* `-v /$(pwd):/SpamREST` tells Docker to mount the `/SpamREST` volume to the current working directory (`/$(pwd)`)
* `-p` argument maps our host computer's port 5000 to the container's port 80
* `spamrest`specifies the image to base the container on

> **Specifying volumes on Windows**: Note in the above code snippet, the `/` proceeding the `$(pwd)` is a necessary escape character if you're running Git Bash on Windows.

With the image built and container running, we can now visit localhost:5000/api/spams to see our application runnning in Docker!

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
FROM microsoft/aspnetcore-build
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

![Hugo override template demo](/img/dotnet-watch-auto-rerun_600x633.gif)

#### Connect the Debugger
We now have a Docker container that automatically builds and runs an ASP Dotnet Core project on our local machine, automatically rebuilding and rerunning the project whenever there's a code change. The last step to a dockerized development environment is to enable debugging.

To enable debugging, first we'll need to install [CLRDBG](https://github.com/Microsoft/MIEngine/wiki/What-is-CLRDBG)





If you're developing locally outside of Docker, you don't want local build artifacts copied over, so let's also create a `.dockerignore` file:

```dockerfile
 bin/
 obj/
```

This prevents our local `bin` and `obj` directories