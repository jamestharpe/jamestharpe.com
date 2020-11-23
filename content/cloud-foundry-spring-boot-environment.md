---
date: 2019-01-14T20:25:15-05:00
redirect_from: ["/pcf-spring-boot-environment-basics/"]
tags: ["cloud-foundry", "gradle", "intellij", "java", "microservices", "pal-tracker"]
title: "Cloud Foundry Spring Boot Environment Basics"
---

# Recipe: Configure Spring Boot on Cloud Foundry

This recipe is illustrated in the [PAL Tracker](https://github.com/jamestharpe/pal-tracker) example project.

## 1. Inject Environment Variables into a Controller

Update the `WelcomeController` so that the `sayHello()` method returns a `message` field set by the constructor. Use the `@Value` annotation to inject the value from the environment:

```java
package io.pivotal.pal.tracker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

    private String message;

    public WelcomeController(
        // Injects the WELCOME_MESSAGE environment variable
        @Value("${welcome.message}") String message
    ) {
        this.message = message;
    }

    @GetMapping("/")
    public String sayHello() {
        return message;
    }
}
```

Running the app now will result in a failure: `Could not resolve placeholder 'welcome.message' in value "${welcome.message}"`.

To resolve this, update the **build.gradle** to set the `WELCOME_MESSAGE` environment variable in the `bootRun` configuration:

```groovy
bootRun.environment([
     "WELCOME_MESSAGE": "hello",
])
```

## 2. Built-in Cloud Foundry Environment Variables

Cloud Foundry comes with several [built-in environment variables](https://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html) accessible to your application. To show this, let's create a new controller called `EnvController`:

```java
package io.pivotal.pal.tracker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class EnvController {

	private final String port;
	private final String memoryLimit;
	private final String cfInstanceIndex;
	private final String cfInstanceAddress;

	public EnvController(
		// Injects the PORT environment variable, defaults to NOT SET
		@Value("${port:NOT SET}") String port,
		// Injects the MEMORY_LIMIT environment variable, defaults to NOT SET
		@Value("${memory.limit:NOT SET}") String memoryLimit,
		// Injects the CF_INSTANCE_INDEX environment variable, defaults to NOT SET
		@Value("${cf.instance.index:NOT SET}") String cfInstanceIndex,
		// Injects the CF_INSTANCE_ADDR environment variable, defaults to NOT SET
		@Value("${cf.instance.addr:NOT SET}") String cfInstanceAddress
	) {
		this.port = port;
		this.memoryLimit = memoryLimit;
		this.cfInstanceIndex = cfInstanceIndex;
		this.cfInstanceAddress = cfInstanceAddress;
	}

	// Maps GET requests to /env
	@GetMapping("/env")
	public Map<String, String> getEnv() {
		Map<String, String> result = new HashMap<>();
		result.put("PORT", port);
		result.put("MEMORY_LIMIT", memoryLimit);
		result.put("CF_INSTANCE_INDEX", cfInstanceIndex);
		result.put("CF_INSTANCE_ADDR", cfInstanceAddress);
		return result;
	}
}
```

Run the app and visit the `/env` end-point to see the output in your local environment:

```json
{
	"PORT": "NOT SET",
	"CF_INSTANCE_ADDR": "NOT SET",
	"CF_INSTANCE_INDEX": "NOT SET",
	"MEMORY_LIMIT": "NOT SET"
}
```

### Set Environment Variables in Cloud Foundry

Deploy the app to see what happens in production:

```bash
cf push -p build/libs/pal-tracker.jar
```

The app will crash because the `WELCOME_MESSAGE` environment variable isn't set. The environment variable can be set using `cf set-env` then restaging:

```bash
cf set-env pal-tracker WELCOME_MESSAGE hi
cf restage pal-tracker # no need to re-push
```

Now when you check the Cloud Foundry endpoint, it will have the actual values:

```json
{
    "PORT": "80",
    "CF_INSTANCE_ADDR": "1.2.3.4:80",
    "CF_INSTANCE_INDEX": "1",
    "MEMORY_LIMIT": "1GB"
}
```

## 3. Scale your Cloud Foundry App

Scaling can be done horizontally, vertically, or both using the `cf scale` command:

```bash
# Scale to 3 instances, 2GB storage, 1024M memory and force a restart
cf scale APP -i 3 -k 2G -m 1024M -f
```

Check on the process by running `cf app pal-tracker`.

## 4. Use a Manifest File

The [manifest.yml](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) specified an application's environment defaults, so they only need to be managed with the CLI if they need to be overridden. Rather than setting the `WELCOME_MESSAGE` value using `cf set-env`, the value can be specified in the **manifest.yml**:

```yaml
---
applications:
- name: pal-tracker
  path: build/libs/pal-tracker.jar
  env:
    WELCOME_MESSAGE: Hello from the Manifest
```

Run `cf push` again to see the updated `WELCOME_MESSAGE` value in the CF environment.
