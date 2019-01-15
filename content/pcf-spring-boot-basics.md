---
title: "Pivotal Cloud Foundry (PCF) with Spring Boot Basics"
date: 2019-01-14T17:06:34-05:00
languages: ["Java"]
tools: ["IntelliJ", "Gradle"]
techniques: ["Microservices"]
frameworks: ["Spring", "Pivotal Application Services (PAS)"]
projects: ["PAL Tracker"]
draft: false
---

# PCF Cloud Native Developer

I took the [PCF Cloud Native Developer four day course](https://courses.education.pivotal.io/c/349802825/) to prepare for the [Pivotal Certified Java Developer](https://pivotal.io/training/certification/pivotal-developer-certification) exam. This was my first in-depth exposure to PCF and Spring (Boot, MVC, Cloud), so there was a lot to learn with little experience. I learned a lot and enjoyed the course.

The course is very hands-on: The instructors introduce a concept at a high level, then you and a pairing partner must implement it in a real application. At the end of each lab, the instructors give an in-depth debriefing and go over the questions and challenges that arose for students. It's a great format and I highly recommend it for anyone working with Pivotal's cloud tools.

The example project is called PAL Tracker and the [code is available on my GitHub](https://github.com/jamestharpe/pal-tracker).

The following are my notes, which I'm using as my study guide for the certification exam.

## The PCF Developer Environment

Developing Spring apps for PAL "the Pivotal way" requires [Git](https://git-scm.com/), Java 8 or above, [IntelliJ](https://www.jetbrains.com/idea/), the [Cloud Foundry CLI](https://github.com/cloudfoundry/cli/releases), [Gradle](https://gradle.org/), [MySQL](https://www.mysql.com/downloads/), and [Flyway](https://flywaydb.org/).

Once the tools are installed, log in to Cloud Foundry (CF):

```bash
cf login -a ${CF_API_ENDPOINT}
# ... follow prompts ...
```

From there, the CLI can be used to explore the Cloud Foundry environment. Here are a few useful commands:

```bash
cf target # View the targeted organiziation or space
cf apps # List applications in the target CF space
cf services # List services in the target CF space
cf marketplace # List services that can added to the target CF space
```

Additional information: [Platform Acceleration Lab](https://prerequisites.pal.pivotal.io/)

## Create a Spring Boot Application

Start with Gradle:

```bash
gradle wrapper
touch build.gradle
```

Open the project in IntelliJ using **File > Open** rather than the import feature.

In IntelliJ, update the **build.gradle** file to use the Java plug-in, reference the Maven Central repository, and apply the latest [Spring Boot Gradle plug-in](https://docs.spring.io/spring-boot/docs/2.1.2.RELEASE/gradle-plugin/reference/html/):

```groovy

// Gradle Configuration

buildscript {
    ext {
        // Set Spring Boot version as variable
        springBootVersion = "2.0.6.RELEASE"
    }

    repositories {
        // Use Maven Central to get required packages
        mavenCentral()
    }

    dependencies {
        // Add specified version of Spring Boot to class path
        classpath "org.springframework.boot:spring-boot-gradle-plugin:$springBootVersion"
    }
}


// PAL Tracker Configuration

plugins {
    // It's a Java Project!
    id "java"
}

// Apply the Spring Framework plug-in
apply plugin: 'org.springframework.boot'

repositories {
    // Use Maven Central to get required packages
    mavenCentral()
}

dependencies {
    // Add specified version of Spring Boot to class path
    compile("org.springframework.boot:spring-boot-starter-web:$springBootVersion")
}

```

Next, create a file **settings.gradle** to set the name of the Gradle project. This determines the name of the JAR file when the application is built:

```groovy
rootProject.name = "pal-tracker"
```

### Gradle Project Structure

Create a minimal [standard Maven directory layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html):

```bash
mkdir -p src/main/java
```

Use IntelliJ to create a new package called `io.pivotal.pal.tracker`. This might require setting 'src/main/java` as the "Sources Root" first:

![Set IntelliJ sources root](/img/intellij-sources-root.png)

With the basic project structure established, we can create a class for our application called `PalTrackerApplication`:

```java
package io.pivotal.pal.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Tell Spring Boot that this is our main entry point
@SpringBootApplication
public class PalTrackerApplication {

    public static void main(String[] args) {
        // Start the app
        SpringApplication.run(PalTrackerApplication.class, args);
    }

    // Later: Register beans with @Bean
}
```

The `@SpringBootApplication` annotation tells Spring Boot that this class contains the main entrypoint of the application. The call to `SpringApplication.run(...)` is boiler-plate to tell Spring to scan for the necessary components that will be [injected](https://martinfowler.com/articles/injection.html) into the controllers and other classes that make up the applicaiton.

It's now possible to run the application, though you'll receive the generic Spring Boot Whitelabel Error Page.

To make running the application, and later tests, easier you can delegate these actions to Gradle in IntelliJ under **File > Settings > Build, Execution, Deployment > Gradle > Runner**:

![Delegate build run and test actions to Gradle in IntelliJ](/img/intellij-delegate-buid-run-gradle.png)

### Create a REST Controller

With the basic project structure in place, we can create a simple REST controller by generating a new Java class and annotating it:

```java
package io.pivotal.pal.tracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Tells spring that this controller provides REST end-points
@RestController
public class WelcomeController {

    // Maps "GET" requests to the application root
    @GetMapping("/")
    public String sayHello() {
        return "hello";
    }
}
```

When the application is run and launched in the browser, the "hello" string is returned.

## Push to Cloud Foundry

Build and deploy the application to Cloud Foundry:

```bash
./gradlew build # build the JAR
cf push -p build/libs/pal-tracker.jar # deploy to CF
```

Get the application status:

```bash
cf app pal-tracker # Get application status
```

Get recent log output from the app:

```bash
cf logs --recent
```

The output of `cf push` will include a URL. Opening the URL in a web browser should bring up the application.