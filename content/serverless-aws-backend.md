---
title: "Serverless Framework: Contact form with TypeScript on AWS"
date: 2017-11-23T12:10:14-04:00
tools: [ "Hugo" ]
techniques: [ "Serverless Architecture", "Static Site Generation" ]
projects: [ "Crawlity" ]
frameworks: [ "Serverless Framework" ]
languages: [ "TypeScript" ]
draft: true
---
# Create a Backends for Static Frontends

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_150x150.png" style="float: right; padding:8px" /> We recently launched the [Crawlity](http://www.crawlity.com/) website which, like jamestharpe.com, uses [Hugo](/tools/hugo/) to generate a static site. There's no database or template engine running on the server - just static files. Unlike jamestharpe.com, crawlity.com needs a back-end to accept contact form submissions. So how does one create a dynamic back-end for a static, "serverless" front-end?

Short answer: With the **Serverless Framework**!

[Serverless Framework](https://serverless.com/), or simply "Serverless", is a provider-agnostic framework for defining the **functions** and **events** that make up your application. Once defined, Serverless deploys your application to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

In this article, I'll create **Form2Email**, a microservice based on Serverless Framework that:

* Accepts form submissions via HTTP POST (the event)
* Emails the submitted values as HTML (the function)

Unlike similar articles and examples of Serverless Framework on the web which throw everything into one function that's tightly-coupled to the cloud platform provider, I'm going to take extra care with the design so that it is cloud agnostic. That said, I'll only be filling in the AWS implementation; feel free to contribute additional provider implementations on the [Form2Email GitHub repository](https://github.com/Crawlity/svc-form2email)!

## Get Started with Serverless Framework

To get started, let's install Serverless and create a new project using TypeScript and targeted at AWS:

Installing Serverless is a simple call to `npm install`:

```bash
npm install -g serverless
```

Next, let's create a new project using the `aws-nodejs-typescript` template:

```bash
$ serverless create --template aws-nodejs-typescript && npm install
Serverless: Generating boilerplate...
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.24.1
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs-typescript"
Serverless: NOTE: Please update the "service" property in serverless.yml with your service name
```

> Note: I chose to use [TypeScript](http://www.typescriptlang.org/) rather than JavaScript because strong typing makes dependincy injection a lot safer, if not easier. A broad set of [`serverless create` templates](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates) are available for AWS, including C#, Groovy, Python, and others.

We now have a boilerplate Serverless application, ready to be deployed! Let's explore the created project:

```bash
$ ls
handler.ts    package-lock.json  webpack.config.js
node_modules  serverless.yml
package.json  tsconfig.json

```

That's it, just a few files! The contents of each file is relativly simple and easy to understand. Let's explore the files specific to Serverless Framework: `handler.ts` and `serverless.yml`.

### `handler.ts` 

The `handler.ts` file exports a single function called `hello` that creates a simple `HTTP 200` response with a hard-coded message:

```typescript
export const hello = (event, context, cb) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
}
```

Let's go ahead and change the exported function name to `submitForm`:

```typescript
export const submitForm = (event, context, cb) => {
```

### `serverless.yml` 

The `serverless.yml` file defines the service name as `aws-nodejs-typescript`, configures Serverless Framework to target Node on AWS, and defines the `hello` function as responding to an `HTTP GET` event:

```yaml
service:
  name: aws-nodejs-typescript

# Add the serverless-webpack plugin
plugins:
  - serverless-webpack

provider:
  name: aws
  runtime: nodejs6.10

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          path: hello

```

The `service.name` property defines the name of our service. As suggested by the Serverless CLI, let's give it the right name:

```yaml
service:
  name: form2email
```

The `plugins` section defines any Serverless plugins our service uses. In this case, the `aws-nodejs-typescript` template included the [`serverless-webpack` plugin](https://github.com/serverless-heaven/serverless-webpack) for us. This plugin helps package and optimize the service using [Webpack](https://webpack.js.org/).

The `functions` section defines the functions for our service. Let's update the `hello` function to reflect the function name change we made in `handler.ts`:

```yaml
functions:
  submitForm:
    handler: handler.submitForm
```

Finally, the `functions.submitForm.events` section defines the events that will trigger our function. Let's update that so that we accept HTTP POST events (the default is HTTP GET) to the `/forms` path:

```yaml
    events:
      - http:
          method: post
          path: forms
```

Now that we undertsand the basic structure, let's try invoking the function locally:

```bash
$ serverless invoke local -f submitForm
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.1 and ~/code/svc-form2email/tsconfig.json
Time: 1421ms
     Asset     Size  Chunks             Chunk Names
handler.js  2.91 kB       0  [emitted]  handler
   [0] ./handler.ts 355 bytes {0} [built]
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!\",\"input\":\"\"}"
}
```

It works! Technically speaking, we have a functioning, deployable Serverless service. However, before we can deploy we must configure our AWS credentials.

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
$ serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret --profile crawlity-serverless-admin
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Serverless: Setting up AWS...
Serverless: Saving your AWS profile in "~/.aws/credentials"...
Serverless: Success! Your AWS access keys were stored under the "crawlity-serverless-admin" profile.
```

It's important to pass the `--profile` argument here so that you do not override your `[default]` AWS credentials. To ensure Serverless uses this profile, update the `provider.profile` in `serverless.yml` with the profile name:

```yaml
profile: crawlity-serverless-admin
```

### Deploying the Serverless Framework App for the First Time

Though it doesn't do much yet, our application is scaffolded, configured, and ready for deployment. So let's deploy it using `serverless deploy -v` to see what happens (`-v` enables verbose output):

```bash
$ serverless deploy -v
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.1 and ~/code/svc-form2email/tsconfig.json
Time: 2126ms
     Asset     Size  Chunks             Chunk Names
handler.js  2.91 kB       0  [emitted]  handler
   [0] ./handler.ts 355 bytes {0} [built]
Serverless: Zip service: ~/code/svc-form2email/.webpack/service [44 ms]
Serverless: Packaging service...
Serverless: Remove ~/code/svc-form2email/.webpack
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - form2email-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - form2email-dev
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - form2email-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - SubmitFormLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - SubmitFormLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - SubmitFormLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - SubmitFormLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - SubmitFormLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - SubmitFormLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - SubmitFormLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - SubmitFormLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - SubmitFormLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - SubmitFormLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - SubmitFormLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - SubmitFormLambdaPermissionApiGateway
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - form2email-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - form2email-dev
Serverless: Stack update finished...
Service Information
service: form2email
stage: dev
region: us-east-1
stack: form2email-dev
api keys:
  None
endpoints:
  POST - https://a12b3cdef4.execute-api.us-east-1.amazonaws.com/dev/forms
functions:
  submitForm: form2email-dev-submitForm

Stack Outputs
ServiceEndpoint: https://a12b3cdef4.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: form2email-dev-serverlessdeploymentbucket-12abcdefg3hij
SubmitFormLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:123456789012:function:form2email-dev-submitForm:1
```

As you can see from the output, Serverless packeges up the application then creates a CloudFormation stack and uploads a generated CloudFormation script to a specially provisioned S3 bucket. The CloudFormation script then provisions the IAM Roles, Log Groups, ApiGateway end points, and Lambda function needed to run the `form2email` service. By default, the `dev` stage is used.

Let's test the live service using `serverless invoke`:

```bash
$ serverless invoke -f submitForm -l
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!\",\"input\":{}}"
}
--------------------------------------------------------------------
START RequestId: 123456a7-bcd8-90e1-f234-56g7890hi123 Version: $LATEST
END RequestId: 123456a7-bcd8-90e1-f234-56g7890hi123
REPORT RequestId: 123456a7-bcd8-90e1-f234-56g7890hi123  Duration: 0.42 ms       Billed Duration: 100 ms         Memory Size: 1024 MB    Max Memory Used: 21 MB
```

It works, we're live! The `-f` argument specifies the function to invoke and the `-l` flag tells serverless to output the logs to the console.

Of course, our service is not yet useful, so let's delete it using `serverless remove`:

```bash
$ serverless remove
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
..............
Serverless: Stack removal finished...
```

## Defining the `submitForm` Function

---


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