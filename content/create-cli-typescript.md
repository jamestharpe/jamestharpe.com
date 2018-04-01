---
title: "How to create a CLI with TypeScript and Yeoman"
date: 2018-03-31T20:25:17-04:00
languages: ["TypeScript"]
tools: ["Yeoman", "Commander", "Mocha", "Mocha-Chai", "ts-node"]
projects: [ "taskorithm" ]
draft: true
---
# Create a CLI from Scratch with TypeScript

Starting almost any new Node-based project too much work in my opinion, and even more work if you're using TypeScript. Command line interfaces (CLIs) are among the simplest types of applications you can write, and yet the process is long and remembering all the steps isn't easy.

Let's see what it takes by writing a "hello world" CLI using TypeScript and Node. Not a minimal example, but a real-world example written as if it were going to be maintained for a year or more.

## Start the Project

To start the project, we need to create the `packages.json`, then install all the development and app dependencies.

### Initialize the Project with `npm init`

Start the project by running `npm init` and filling in the blanks:

```bash
$ mkdir hello-world && cd hello-world/

$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (hello-world)
version: (1.0.0) 0.1.0
description: Hello workd CLI with TypeScript
entry point: (index.js)
test command: mocha -r ts-node/register test/**/*.spec.ts
git repository:
keywords:
author: James Tharpe
license: (ISC)
About to write to C:\Users\james\code\hello-world\package.json:

{
  "name": "hello-world",
  "version": "0.1.0",
  "description": "Hello workd CLI with TypeScript",
  "main": "index.js",
  "scripts": {
    "test": "mocha -r ts-node/register test/**/*.spec.ts"
  },
  "author": "James Tharpe",
  "license": "ISC"
}


Is this ok? (yes)

$
```

### Install dev dependencies: `mocha`, `chai`, `chai-as-promised`, `sinon`, `sinon-chai` - oh, and don't forget the `@types/` packages!

```bash
npm install mocha @types/mocha chai @types/chai chai-as-promised @types/chai-as-promised sinon @types/sinon sinon-chai @types/sinon-chai @types/node --save-dev
```

Whew 😅, okay, what's next?

### Install app dependencies: `commander`, `pjson`

```bash
npm install commander pjson --save
```

Finally! An app that... does nothing.

## Write the App

Create the entry point and first test:

```bash
$ mkdir src && mkdir test

$ touch index.ts && touch test/index.spec.js
```

### Add the Boilerplate Code

