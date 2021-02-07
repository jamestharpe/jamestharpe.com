---
date: 2021-01-03T14:49:11-04:00
description: "Knowledge about programming Arduino boards"
tags: [ "arduino", "cpp" ]
title: "Arduino Programming"
---

# Arduino Programming

Code for Arduino is typically written in [C++](cpp.md) in the [Arduino IDE](https://www.arduino.cc/en/software) or [Arduino Web Editor](https://create.arduino.cc/editor).

The web editor is preferred over the IDE because it is always current and makes code sharing easier. To enable communication from the browser to a local Arduino device requires [installation of the Arduino Create Plugin](https://create.arduino.cc/getting-started/plugin).

## Enable Serial Logging

Serial logging is useful for debugging. To start serial logging, call the [`Serial.begin()` function](https://www.arduino.cc/reference/en/language/functions/communication/serial/begin/) in the `setup` function:

```cpp
void setup() {
  Serial.begin(9600);
}
```

The [`Serial.println()` function](https://www.arduino.cc/reference/en/language/functions/communication/serial/println/) can then print values to the serial monitor.
