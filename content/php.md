---
date: 2023-06-24T15:39:57-04:00
description: "WordPress"
tags: [ "computer-languages", "web-dev" ]
thumbnail: "/img/mind-blown-coder_256x256.jpg"
title: "PHP (Programming Language)"
---

# Pre Hypertext Processor (PHP)

**PHP** is a widely-used [open source scripting language](open-source-languages.md), primarily used for [web development](web-dev.md).

## PHP Syntax overview

PHP's syntax is similar to other C-style languages with its use of braces for block structuring. A typical script starts with `<?php` and ends with `?>`, which allows PHP code to be interspersed within HTML.

### Variables

Variables in PHP are dynamically types. Variable declarations start with a `$` sign, followed by the name of the variable.

For example:

```php
<?php
$greeting = "Hello, world!";
echo $greeting;
?>
```

### Functions

PHP has thousands of built-in functions for various tasks, and also supports user-defined functions using a straightforward syntax.

User-defined functions are declared using the `function` keyword, for example:

```php
<?php
function multiply($num1, $num2) {
  return $num1 * $num2;
}

echo multiply(5, 6);
?>
```

### Control Flow

PHP supports similar control flow as other languages, including:

#### Conditional logic

Basic conditional logic is supported in PHP by the `if`, `elsif`, and `else` keywords, for example:

```php
<?php
$number = 10;
if ($number > 5) {
  echo "The number is greater than 5.";
} elseif ($number == 5) {
  echo "The number is 5.";
} else {
  echo "The number is less than 5.";
}
?>
```

PHP also supports switch-case statements using the `switch` and `case` keywords, for example:

```php
<?php
$fruit = "apple";
switch ($fruit) {
  case "apple":
    echo "It's an apple.";
    break;
  case "banana":
    echo "It's a banana.";
    break;
  default:
    echo "It's neither an apple nor a banana.";
}
?>
```

#### Loops

Classic `for` loop example:

```php
<?php
for ($i = 0; $i < 5; $i++) {
  echo $i;
}
?>
```

Iterator (`foreach`) loop example:

```php
<?php
$fruits = array("apple", "banana", "cherry");
foreach ($fruits as $fruit) {
  echo $fruit;
}
?>
```

### Object oriented features of PHP

PHP supports classes with single-inheritance, interfaces, and traits.

Example of declaring a class using the `class` keyword and using it to instantiate an object using the `new` keyword:

```php
<?php
class Car {
  public $color;

  public function __construct($color) {
    $this->color = $color;
  }

  public function getColor() {
    return $this->color;
  }
}

$redCar = new Car("red");
echo $redCar->getColor(); // Outputs: red
?>
```

Example of inheriting one class from another with the `extends` keyword:

```php
<?php
class SportsCar extends Car {
  public $topSpeed;

  public function __construct($color, $topSpeed) {
    $this->color = $color;
    $this->topSpeed = $topSpeed;
  }

  public function getTopSpeed() {
    return $this->topSpeed;
  }
}

$mySportsCar = new SportsCar("red", 200);
echo $mySportsCar->getTopSpeed(); // Outputs: 200
?>
```

Interfaces can be declared with the `interface` keyword and implemented with the `implements` keyword, for example:

```php
<?php
interface Vehicle {
  public function getColor();
}

class Bicycle implements Vehicle {
  private $color;

  public function __construct($color) {
    $this->color = $color;
  }

  public function getColor() {
    return $this->color;
  }
}

$myBike = new Bicycle("blue");
echo $myBike->getColor(); // Outputs: blue
?>
```

**Traits** are another mechanism for code reuse, similar to mixins in other languages. They allow classes to re-use methods from multiple sources in a single class. Traits are declared using the `trait` keyword, and included in a class definition using the `use` keyword, for example:

```php
<?php
trait Engine {
  public function startEngine() {
    echo "Engine started";
  }
}

class Motorcycle {
  use Engine;
}

$myBike = new Motorcycle();
$myBike->startEngine(); //

```
