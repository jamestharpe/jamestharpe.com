---
title: "Serverless Framework: Create a contact form on AWS"
date: 2017-10-31T12:10:14-04:00
tools: [ "Hugo" ]
techniques: [ "Serverless Architecture" ]
projects: [ "Crawlity" ]
frameworks: [ "Serverless Framework" ]
draft: true
---
# Use Serverless Framework to Create a Contact Form on AWS

We recently launched the [Crawlity](http://www.crawlity.com/) website which, like this website, uses [Hugo](/tools/hugo/) to generate the site. However, unlike this website, Crawlity.com needs a back-end to accept contact form submissions. So how does one create a dynamic back-end for a static, "serverless" front-end?

## Introducing Serverless Framework

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_300x87.png" style="float: right; padding:8px" /> [Serverless Framework](https://serverless.com/), or simply "Serverless", is a provider-agnostic framework for defining the *functions* and *events* that make up your application. Once defined, Serverless deploys your application to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

## Get Started with Serverless Framework and AWS

For the Crawlity website, all I need is to send an email with the contact form data. On AWS that means setting up a Lambda function, triggered by an HTTP POST to API Gateway, that sends an email via Simple Email Service (SES). However, with Serverless, we shouldn't have to worry about most of those details.

### Install Serverless

Installing Serverless is a simple call to `npm install`:

```bash
npm install -g serverless
```

### Create a Node JS Serverless Project for AWS

To create our project, we'll use the `serverless create` command, specifying the `aws-nodejs` template and the desired project directory name:

```bash
$ serverless create --template aws-nodejs --path www.crawlity.com-backend
Serverless: Generating boilerplate...
Serverless: Generating boilerplate in "~/code/www.crawlity.com-backend"
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.23.0
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
```

Though I chose Node on AWS, a broad set of [`serverless create` templates](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates) are available for AWS, including C#, Groovy, Python, and others.

We can now `cd` into the project directory and list the contents:

```bash
~/code
$ cd www.crawlity.com-backend/

~/code/www.crawlity.com-backend
$ ls
handler.js  serverless.yml
$
```

That's it, just those two files! The contents of both files are relativly simple and easy to understand.

#### handler.js

```bash
'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
```

(comments omitted for brevity)

As you can see, the application currently consists of only one module explorted from `handler.js`, which defines a "Hello World" function that should look familiar to anyone that works with AWS Lambda.

#### serverless.yml

```YAML
# Welcome to Serverless!
# ...

service: www.crawlity.com-backend

provider:
  name: aws
  runtime: nodejs6.10

functions:
  hello:
    handler: handler.hello
```

(comments omitted for brevity)

Here we have our service (the Serverless Framework's unit of organization) defined as  `www.crawlity.com-backend` and the provider set to AWS with the `nodejs6.10` runtime.

Technically speaking, we have a functioning, deployable Serverless service. However, before we can deploy we must configure our AWS credentials.

### Configuer Serverless Framework AWS Credentials

The [Serverless YouTube channel](https://www.youtube.com/channel/UCFYG383lawh9Hrs_DEKTtdg) has a great video walk-through to setup AWS credentials:

{{< youtube HSd9uYj2LJA >}}

For those of us who prefer to read, here's a walk-through of the steps to configure AWS credentials for Serverless:

