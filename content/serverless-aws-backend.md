---
title: "Serverless Framework: Contact form with Node on AWS"
date: 2017-11-23T12:10:14-04:00
tools: [ "Hugo" ]
techniques: [ "Serverless Architecture" ]
projects: [ "Crawlity" ]
frameworks: [ "Serverless Framework" ]
languages: [ "TypeScript" ]
draft: true
---
# Use Serverless Framework to Create a Contact Form with Node on AWS

We recently launched the [Crawlity](http://www.crawlity.com/) website which, like this website, uses [Hugo](/tools/hugo/) to generate the site. However, unlike this website, Crawlity.com needs a back-end to accept contact form submissions. So how does one create a dynamic back-end for a static, "serverless" front-end?

Let's use the Serverless Framework to create **Form2Email**, a microservice that:

* Accepts form submissions via HTTP POST
* Formats the submission data into HTML
* Emails the submitted values

Unlike similar articles and examples on the web, I'm going to take extra care with the design so that it is cloud agnostic by using simple dependency injection. That said, I'll only be filling in the AWS implementation; readers are encouraged to contribute additional provider implementations on the [Form2Email GitHub repository](https://github.com/Crawlity/svc-form2email)!

## Get Started with Serverless Framework

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_150x150.png" style="float: right; padding:8px" /> [Serverless Framework](https://serverless.com/), or simply "Serverless", is a provider-agnostic framework for defining the **functions** and **events** that make up your application. Once defined, Serverless deploys your application to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

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

> Note, Serverless Framework does not allow dots (`.`) in service names, so let's change that to hyphens: `www-crawlity-com-backend`.

Technically speaking, we have a functioning, deployable Serverless service. However, before we can deploy we must configure our AWS credentials.

### Configuer Serverless Framework AWS Credentials

The [Serverless YouTube channel](https://www.youtube.com/channel/UCFYG383lawh9Hrs_DEKTtdg) has a great video walk-through to setup AWS credentials:

{{< youtube HSd9uYj2LJA >}}

---

For those of us who prefer to read, here's a walk-through of the steps to configure AWS credentials for Serverless:

1. Login to AWS and navigate to IAM
1. Create a new user called `serverless-admin`
1. Give `serverless-admin` **Programatic access**
1. Attach the `AdministratorAccess` policy

![Create account for Serverless Framework](/img/aws-server-less-account-create_600x317.gif)

You can copy the **Access key ID** and **Secret access key** to your clipboard for use in your Serverless Framework configuration.

To configure the Serverless Framework with your access keys, use the `serverless config credentials` command:

```bash
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret --profile crawlity-serverless-admin
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Serverless: Setting up AWS...
Serverless: Saving your AWS profile in "~/.aws/credentials"...
Serverless: Success! Your AWS access keys were stored under the "crawlity-serverless-admin" profile.
```

It's important to pass the `--profile` argument here so that you do not override your `[default]` AWS credentials. Unless you chose to use the `[default]` profile for your access keys, you'll need to remember the profile name later when you deploy your Serverless application.

### Deploying the Serverless Framework App for the First Time

We now have a "Hello World" application ready to be deployed on AWS with a single command, including the `-v` flag for "verbose" output:

```bash
$ serverless deploy -v
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - www-crawlity-com-backend-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - www-crawlity-com-backend-dev
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (553 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - www-crawlity-com-backend-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionkcNChWaTbIn998Pe433DMjmV1V50VoifikA7I6PJ7aA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionkcNChWaTbIn998Pe433DMjmV1V50VoifikA7I6PJ7aA
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersionkcNChWaTbIn998Pe433DMjmV1V50VoifikA7I6PJ7aA
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - www-crawlity-com-backend-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - www-crawlity-com-backend-dev
Serverless: Stack update finished...
Service Information
service: www-crawlity-com-backend
stage: dev
region: us-east-1
stack: www-crawlity-com-backend-dev
api keys:
  None
endpoints:
  None
functions:
  hello: www-crawlity-com-backend-dev-hello

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:735108174705:function:www-crawlity-com-backend-dev-hello:1
ServerlessDeploymentBucketName: www-crawlity-com-backend-serverlessdeploymentbuck-z6xzdj2ohyif
```

That was awesome! As can be seen in the output, the Serverless Framework packaged up the app then create and deployed a CloudFormation script.

Now, let's test the function:

```bash
$ serverless invoke -f hello -l
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
}
--------------------------------------------------------------------
START RequestId: fa46779b-c4e0-11e7-9ea2-b52cf5c00eff Version: $LATEST
END RequestId: fa46779b-c4e0-11e7-9ea2-b52cf5c00eff
REPORT RequestId: fa46779b-c4e0-11e7-9ea2-b52cf5c00eff  Duration: 2.48 ms       Billed Duration: 100 ms         Memory Size: 256 MB     Max Memory Used: 20 MB
```

It worked!

Of course, "hello world" is not the most useful service, so let's delete it:

```bash
$ serverless remove
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
..........
Serverless: Stack removal finished...
```

Now, on to something useful.

## Defining the Form Submission Service

Let's start by running `npm init` to scaffold our `package.json` file:

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (www.crawlity.com-backend)
version: (1.0.0)
description: Backend functions for the Crawlity website
entry point: (handler.js)
test command: mocha
git repository: (https://github.com/Crawlity/www.crawlity.com-backend.git)
keywords:
author: James Tharpe <jimmy.tharpe@gmail.com>
license: (ISC)
About to write to C:\Users\james\code\www.crawlity.com-backend\package.json:

{
  "name": "www.crawlity.com-backend",
  "version": "1.0.0",
  "description": "Backend functions for the Crawlity website",
  "main": "handler.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Crawlity/www.crawlity.com-backend.git"
  },
  "author": "James Tharpe",
  "bugs": {
    "url": "https://github.com/Crawlity/www.crawlity.com-backend/issues"
  },
  "homepage": "https://github.com/Crawlity/www.crawlity.com-backend#readme"
}


Is this ok? (yes)
```

With that out of the way, let's start by writing some tests. I'll be using Mocha and Chai:

TODO:

* Add tests using Mocha
* Make it work
* Deploy it
* Check logs / adjust provider settings (see below)

## Adjusting Provider Settings

The Serverless Framework comes with several defaults that may not be right for your application. For the Form Submission Service, not very much memory is required nor is a long timeout. We can adjust those in the `serverless.yml` file in the `provider:` section:

```yaml
provider:
  name: aws
  runtime: nodejs6.10
  memorySize: 128 # default is 1024MB
  timeout: 3 # default is 6 seconds
```