---
title: "Test Aspnet Core Rest Api Xunit"
date: 2017-09-17T11:12:21-04:00
techniques: ["Test Driven Development"]
draft: true
---

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