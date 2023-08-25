---
date: 2021-02-06T19:26:12-04:00
description: "How to use the popular 16x3 LCD included with many Arduino kits"
tags: [ "arduino" ]
title: "Arduino 16x2 LCD"
---

# Arduino 16x2 LCD

The official Arduino Starter Kit includes, among other things, a 15x2 Liquid Crystal Display (LCD) that can be used to show simple text output.

## Wiring the Arduino 16x2 LCD

The Contrast pin (labeled `VO`) can be wired into a [potentiometer](https://en.wikipedia.org/wiki/Potentiometer) for contrast control, or directly into the 5V rail which will maximize the contrast and may make the display difficult to read.

![wiring diagram](/img/arduino-lcd-16x2-wiring-diagram.svg)

## "Hello World" with Arduino 16x2 LCD and `LiquidCrystal`

```cpp
#include <LiquidCrystal.h>

// LCD Configuration
const int
	LCD_PIN_RS = 11,
	LCD_PIN_EN = 12,
	LCD_PIN_D4 = 2,
	LCD_PIN_D5 = 3,
	LCD_PIN_D6 = 4,
	LCD_PIN_D7 = 5;

LiquidCrystal lcd(LCD_PIN_RS, LCD_PIN_EN, LCD_PIN_D4, LCD_PIN_D5, LCD_PIN_D6, LCD_PIN_D7);

void setup() {
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Hello World!");
}

void loop() {
  // Do nothing
}
```
