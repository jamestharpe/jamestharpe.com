---
date: 2019-01-15T06:18:03-05:00
redirect_from: ["/spring-mvc-crud-operations/"]
title: "Spring MVC CRUD Operations"
tags: ["java", "intellij", "gradle", "cloud-foundry", "pal-tracker", "spring-boot", "microservices"]
---

# Recipe: Create, Retrieve, Update, and Delete with Spring MVC

This recipe is based on the [PAL Tracker](https://github.com/jamestharpe/pal-tracker) example project.

## 1. Create the Model

We'll stick with the [PAL Tracker](https://github.com/jamestharpe/pal-tracker) example and create a simple `TimeEntry` class to be serialized for CRUD operations:

```java
package io.pivotal.pal.tracker;

import java.time.LocalDate;

public class TimeEntry {
	private long id;
	private long projectId;
	private long userId;
	private int hours;
	private LocalDate date;

	public TimeEntry() {
	}

	public TimeEntry(long projectId, long userId, LocalDate date, int hours) {
		this.projectId = projectId;
		this.userId = userId;
		this.date = date;
		this.hours = hours;
	}

	public TimeEntry(long id, long projectId, long userId, LocalDate date, int hours) {
		this.id = id;
		this.projectId = projectId;
		this.userId = userId;
		this.date = date;
		this.hours = hours;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getProjectId() {
		return projectId;
	}

	public long getUserId() {
		return userId;
	}

	public LocalDate getDate() {
		return date;
	}

	public int getHours() {
		return hours;
	}

	// Required for equality comparisons
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		TimeEntry timeEntry = (TimeEntry) o;

		if (id != timeEntry.id) return false;
		if (projectId != timeEntry.projectId) return false;
		if (userId != timeEntry.userId) return false;
		if (hours != timeEntry.hours) return false;
		return date != null ? date.equals(timeEntry.date) : timeEntry.date == null;
	}

	// Required for equality comparisons
	@Override
	public int hashCode() {
		int result = (int) (id ^ (id >>> 32));
		result = 31 * result + (int) (projectId ^ (projectId >>> 32));
		result = 31 * result + (int) (userId ^ (userId >>> 32));
		result = 31 * result + (date != null ? date.hashCode() : 0);
		result = 31 * result + hours;
		return result;
	}

	@Override
	public String toString() {
		return "TimeEntry{" +
			"id=" + id +
			", projectId=" + projectId +
			", userId=" + userId +
			", date='" + date + '\'' +
			", hours=" + hours +
			'}';
	}
}
```

## 2. Create an in-memory Repository

I'll cover using JDBC in my next article. For now, create an in-memory repository for time entries by implementing a `TimeEntryRepository` interface. Using an interface will make it easy to swap out later.

First, create the `TimeEntryRepository` interface:

```java
package io.pivotal.pal.tracker;

import java.util.List;

public interface TimeEntryRepository {
	TimeEntry create(TimeEntry timeEntry);
	TimeEntry find(Long id);
	List<TimeEntry> list();
	TimeEntry update(Long id, TimeEntry timeEntry);
	void delete(Long id);
}
```

Next, implement it by storing `TimeEntry` objects in a `HashMap`:

```java
package io.pivotal.pal.tracker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class InMemoryTimeEntryRepository implements TimeEntryRepository {
	// Store entries in a HashMap for onw
	private HashMap<Long, TimeEntry> timeEntries = new HashMap<>();

	private long currentId = 1L;

	@Override
	public TimeEntry create(TimeEntry timeEntry) {
		Long id = currentId++;

		TimeEntry newTimeEntry = new TimeEntry(
			id,
			timeEntry.getProjectId(),
			timeEntry.getUserId(),
			timeEntry.getDate(),
			timeEntry.getHours()
		);

		timeEntries.put(id, newTimeEntry);
		return newTimeEntry;
	}

	@Override
	public TimeEntry find(Long id) {
		return timeEntries.get(id);
	}

	@Override
	public List<TimeEntry> list() {
		return new ArrayList<>(timeEntries.values());
	}

	@Override
	public TimeEntry update(Long id, TimeEntry timeEntry) {
		TimeEntry updatedEntry = new TimeEntry(
			id,
			timeEntry.getProjectId(),
			timeEntry.getUserId(),
			timeEntry.getDate(),
			timeEntry.getHours()
		);

		timeEntries.replace(id, updatedEntry);
		return updatedEntry;
	}

	@Override
	public void delete(Long id) {
		timeEntries.remove(id);
	}
}
```

## Wire up the `TimeEntryRepository` Bean

The `@Bean` annotation allows an application to provide an implementation of a class or interface at run-time. To supply a `TimeEntryRepository`, update the `PalTrackerApplication` class:

```java
	@Bean
	TimeEntryRepository timeEntryRepository() {
		return new InMemoryTimeEntryRepository();
	}
```

Since the `TimeEntry` class contains a `LocalDate`, we also need to supply an `ObjectMapper` which can properly serialize dates into `LocalDate` objects, so add another `@Bean` to supply a `Jackson2ObjectMapperBuilder` instance:

```java
	@Bean
	public ObjectMapper jsonObjectMapper() {
		return Jackson2ObjectMapperBuilder.json()
			.serializationInclusion(JsonInclude.Include.NON_NULL) // Don’t include null values
			.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS) //ISODate
			.modules(new JavaTimeModule())
			.build();
	}
```

For this to build, the Jackson dependency must be added to the `dependencies` closure in **build.gradle**:

```groovy
compile("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.9.7")
```

## 3. Create a Controller for CRUD Operations

The controller is a simple Java class with the appropriate annotations: `@PostMapping` for POST requests that will handle Create operation, `@GetMapping` for GET requests to handle Retrieve operations, `@PutMapping` for PUT requests that will handle Update operations, and `@DeleteMapping` for DELETE requests to handle Delete operations.

```java
package io.pivotal.pal.tracker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Sets the "root" for all TimeEntryController end-points
@RequestMapping("/time-entries")
public class TimeEntryController {

	private TimeEntryRepository timeEntriesRepo;

	public TimeEntryController(TimeEntryRepository timeEntriesRepo) {
		this.timeEntriesRepo = timeEntriesRepo;
	}

	// Create
	@PostMapping
	public ResponseEntity<TimeEntry> create(@RequestBody TimeEntry timeEntry) {
		TimeEntry createdTimeEntry = timeEntriesRepo.create(timeEntry);

		// Returning a ResponseEntity allows us to control the resulting HTTP status code
		return new ResponseEntity<>(createdTimeEntry, HttpStatus.CREATED);
	}

	// Retrieve a single record
	@GetMapping("{id}")
	public ResponseEntity<TimeEntry> read(@PathVariable Long id) {
		TimeEntry timeEntry = timeEntriesRepo.find(id);
		if (timeEntry != null) {
			return new ResponseEntity<>(timeEntry, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Retrieve all records
	@GetMapping
	public ResponseEntity<List<TimeEntry>> list() {
		return new ResponseEntity<>(timeEntriesRepo.list(), HttpStatus.OK);
	}

	// Update
	@PutMapping("{id}")
	public ResponseEntity<TimeEntry> update(@PathVariable Long id, @RequestBody TimeEntry timeEntry) {
		TimeEntry updatedTimeEntry = timeEntriesRepo.update(id, timeEntry);
		if (updatedTimeEntry != null) {
			return new ResponseEntity<>(updatedTimeEntry, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Delete
	@DeleteMapping("{id}")
	public ResponseEntity<TimeEntry> delete(@PathVariable Long id) {
		timeEntriesRepo.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
```

Returning a `ResponseEntity` allows us to control the resulting HTTP status code.

## 4. Test and Deploy the Changes

Use PostMan, curl, or unit tests to test the end-points. Here's a sample set of end-to-end tests for the TimeEntryController:

```java
package test.pivotal.pal.trackerapi;

import com.jayway.jsonpath.DocumentContext;
import io.pivotal.pal.tracker.PalTrackerApplication;
import io.pivotal.pal.tracker.TimeEntry;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.Collection;

import static com.jayway.jsonpath.JsonPath.parse;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

// Wire up the Spring application
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PalTrackerApplication.class, webEnvironment = RANDOM_PORT)
public class TimeEntryApiTest {

	// Use to call the TimeEntryController end-points
	@Autowired
	private TestRestTemplate restTemplate;

	// Sample/test data
	private final long projectId = 123L;
	private final long userId = 456L;
	private TimeEntry timeEntry = new TimeEntry(projectId, userId, LocalDate.parse("2017-01-08"), 8);

	@Test
	public void testCreate() throws Exception {
		ResponseEntity<String> createResponse = restTemplate.postForEntity("/time-entries", timeEntry, String.class);

		assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

		// com.jayway.jsonpath.JsonPath.parse makes it easy to read JSON
		DocumentContext createJson = parse(createResponse.getBody());
		assertThat(createJson.read("$.id", Long.class)).isGreaterThan(0);
		assertThat(createJson.read("$.projectId", Long.class)).isEqualTo(projectId);
		assertThat(createJson.read("$.userId", Long.class)).isEqualTo(userId);
		assertThat(createJson.read("$.date", String.class)).isEqualTo("2017-01-08");
		assertThat(createJson.read("$.hours", Long.class)).isEqualTo(8);
	}

	@Test
	public void testList() throws Exception {
		Long id = createTimeEntry();

		ResponseEntity<String> listResponse = restTemplate.getForEntity("/time-entries", String.class);

		assertThat(listResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		DocumentContext listJson = parse(listResponse.getBody());

		Collection timeEntries = listJson.read("$[*]", Collection.class);
		assertThat(timeEntries.size()).isEqualTo(1);

		Long readId = listJson.read("$[0].id", Long.class);
		assertThat(readId).isEqualTo(id);
	}

	@Test
	public void testRead() throws Exception {
		Long id = createTimeEntry();

		ResponseEntity<String> readResponse = this.restTemplate.getForEntity("/time-entries/" + id, String.class);

		assertThat(readResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		DocumentContext readJson = parse(readResponse.getBody());
		assertThat(readJson.read("$.id", Long.class)).isEqualTo(id);
		assertThat(readJson.read("$.projectId", Long.class)).isEqualTo(projectId);
		assertThat(readJson.read("$.userId", Long.class)).isEqualTo(userId);
		assertThat(readJson.read("$.date", String.class)).isEqualTo("2017-01-08");
		assertThat(readJson.read("$.hours", Long.class)).isEqualTo(8);
	}

	@Test
	public void testUpdate() throws Exception {
		Long id = createTimeEntry();
		long projectId = 2L;
		long userId = 3L;
		TimeEntry updatedTimeEntry = new TimeEntry(projectId, userId, LocalDate.parse("2017-01-09"), 9);

		ResponseEntity<String> updateResponse = restTemplate.exchange("/time-entries/" + id, HttpMethod.PUT, new HttpEntity<>(updatedTimeEntry, null), String.class);

		assertThat(updateResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		DocumentContext updateJson = parse(updateResponse.getBody());
		assertThat(updateJson.read("$.id", Long.class)).isEqualTo(id);
		assertThat(updateJson.read("$.projectId", Long.class)).isEqualTo(projectId);
		assertThat(updateJson.read("$.userId", Long.class)).isEqualTo(userId);
		assertThat(updateJson.read("$.date", String.class)).isEqualTo("2017-01-09");
		assertThat(updateJson.read("$.hours", Long.class)).isEqualTo(9);
	}

	@Test
	public void testDelete() throws Exception {
		Long id = createTimeEntry();


		ResponseEntity<String> deleteResponse = restTemplate.exchange("/time-entries/" + id, HttpMethod.DELETE, null, String.class);


		assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

		ResponseEntity<String> deletedReadResponse = this.restTemplate.getForEntity("/time-entries/" + id, String.class);
		assertThat(deletedReadResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
	}

	private Long createTimeEntry() {
		HttpEntity<TimeEntry> entity = new HttpEntity<>(timeEntry);

		ResponseEntity<TimeEntry> response = restTemplate.exchange("/time-entries", HttpMethod.POST, entity, TimeEntry.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);

		return response.getBody().getId();
	}
}
```

Now that basic CRUD operations are complete, they can be deployed to Cloud Foundry:

```bash
./gradlew build # build the JAR
cf push -p build/libs/pal-tracker.jar # deploy to CF
```
