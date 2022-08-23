---
date: 2021-11-22T12:39:54-04:00
description: "An object-oriented and functional programing language where whitespace matters"
tags: [ "computer-languages", "open-source-languages" ]
title: "Python (Programming Language)"
---

# Python

**Python** is a general purpose, dynamically typed, object oriented and functional, [open-source software](open-source-software.md) [programming language](computer-languages.md). Python is known as a good first programming language to learn, it's usefulness in [data science](data-science.md), and for the use of indentation to delimit blocks of code.

## Key Python language features

### Truthiness

Python coercing variables to boolean values. Falsy values include `None`, an empty list (`[]`), an empty dictionary (`{}`), an empty string (`""`), an empty set (`set()`), and zero (`0` or `0.0`).

### Type annotations

Though Python is dynamically typed, it supports type annotations as metadata but does not enforce them at runtime.

```python
def say_hello(name: str) -> str: # Specifies the name argument and the return value are strings
	return f"Hello, {name}!";

print(say_hello(5)) # Hello, 5!
```

However, types can still serve as useful documentation and leveraged by code editors to provide features like auto-completion. There are also external tools like [mypy](mypy.md) that can provide or enforce type validation.

### F-strings

**F-strings** are how Python provides string interpolation.

```python
def say_hello(name):
	return f"Hello, {name}!";

print(say_hello("James")) # "Hello, James!"
```

### Tuples

**Tuples** in Python can be thought of as immutable lists and support most non-mutating list functions. Tuples can also be destructured.

```python
titanic_gps_coordinates = (41.7325, 49.9469) # Tuple
lat, lon = titanic_gps_coordinates # lat is 41.7325, lon is 49.9469
```

### First-class functions

[**Functions**](functional-programming.md) can be assigned to variables and passed to other functions.

```python
def say_hello(name):
	return f"Hello, {name}!";

def say_hi(name):
	return f"Hi, {name}!";

def ask_how_are_you(greet, name):
	return f"{greet(name)} How are you?"

print(ask_how_are_you(say_hello, "James")) # "Hello, James!"
print(ask_how_are_you(say_hi, "James")) # "Hi, James!"
```

This means that it's easy to create [higher-order functions](functional-programming.md):

```python
def greeter(greeting):
	def greet(name):
		return greeting(name)

	return greet

def say_hello(name):
	return f"Hello, {name}!";

hello = greeter(say_hello)

print(hello("James")) # Hello, James!
```

### Classes

Python supports classes to encapsulate related data and functions. Notably, Python has the somewhat unusual convention of accepting `self` as the first argument of each function of a class. The `self` argument refers to the current class instance.

```python
class Person:
	# In Python, the constructor function is named __init__
	def __init__(self, name)
		self.name = name

	def greet(self):
		return f"Hello, {self.name}"

me = Person("James")
print(me.name) # James
```

### Dictionaries

Python syntactically supports **dictionaries**, which are groups of key-value pairs. Dictionaries can also be nested.

```python
contact = {
	name: "James",
	website: "https://www.jamestharpe.com",
	location: {
		city: "Atlanta"
		state: "Georgia"
	}
}

name = contact["name"] # "James"
city = contact["location"]["city"] # Atlanta

website = contact.get("website", "unknown") # "https://www.jamestharpe.com"

address = contact.get("address", "not provided")  # "not provided"
address = contact["address"] # Throws a KeyError exception
contact["address"] = "1234 Fake St."
address = contact["address"] # "1234 Fake St."
```

### Sets

Python supports **sets**, which are collections of distinct elements. The `in` operator is very fast for sets.

```python
baby_names = { "olivia", "emma", "amelia" }
"olivia" in baby_names # true
"abby" in baby_names # false
```

Sets are also a useful way to find the distinct elements of an array:

```python
baby_name_suggestions = [ "olivia", "emma", "amelia", "emma" ]
unique_suggestions = set(baby_name_suggestions) # { "olivia", "emma", "amelia" }
```

### Comprehensions

In Python, **comprehension** create lists, sets, or dictionaries from iterables.

List example:

```python
def squares(max):
	return [n * n for n in range(max)]

first_five_squares = squares(5) # [0, 1, 4, 9, 16]
```

Set example:

```python
def squares(max):
	return {n * n for n in range(max)}

first_five_squares = squares(5) # {0, 1, 4, 9, 16}
```

Dictionary example:

```python
def squares(max)
	return {n: n * n for n in range(max)}

first_five_squares = squares(5) # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Generators

In Python, **generators** are functions that mimic **iterators**, which are objects that represent streams of data. This is accomplished through the `yield` keyword:

```python
def count_to_infinity(start = 1): # This function is a generator
	while True:
		yield start # generates the next value, similar to "return" but without exiting
		start += 1

for i in count_to_infinity(10)
	print(f"{i}") 
# 10, 11, 12, 13...
```

Generators are "lazy" and do nothing until iterated upon. A useful application of this is to use comprehensions to create generators from other generators.

```python
def count_to_infinity(start = 1):
	while True:
		yield start
		start += 1

even_numbers = (i for i in count_to_infinity() if i % 2 == 0) # does nothing until iterated

for i in even_numbers
	print(f"{i}") 
# 2, 4, 6, 8 ...
```

## Argument unpacking

**Argument unpacking** converts lists to arguments.

```python
def add(n1, n2):
	return n1 + n2

add(*[1, 2]) # Equivalent to add(1, 2), returns 3
add([1, 2]) # TypeError, fails
```

### Arguments (`args`) and keyword arguments (`kwargs`)

Python allows functions to accept arbitrary arguments as a tuple using `args` or as a dictionary using `kwargs`.

```python
def print_args(*args, **kwargs):
	print("args: ", args)
	print("kwargs: ", kwargs)

print_args("a", "b", "c", one=1, two=2, three=3);
# prints
# args: ("a", "b", "c")
# kwargs: {"one": 1, "two": 2, "three": 3}
```

## Python tips and best practices

* Always work inside a [virtual environment](python-venvs.md)
* Don't use `pip` with `sudo`

## Python resources

* [Official Python website](https://www.python.org/)
