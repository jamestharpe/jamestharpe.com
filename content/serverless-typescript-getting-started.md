---
title: "Serverless Framework with TypeScript and AWS: Getting Started"
date: 2017-12-10T18:08:22-05:00
languages: ["TypeScript"]
# tools: []
techniques: [ "Serverless Architecture" ]
frameworks: [ "Serverless Framework", "Mocha", "Chai" ]
projects: [ "Form2Email" ]
draft: false
---
# Serverless and TypeScript

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_150x150.png" style="float: right; padding:8px" /> [Serverless Framework](https://serverless.com/), or simply "Serverless", is an excellent provider-agnostic framework for defining the **functions** and **events** that make up your service. Once defined your events and functions are defined, Serverless deploys your service to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

While getting started, I found that most [Serverless Framework examples](http://www.jamestharpe.com/frameworks/serverless-framework/) are in JavaScript. However, I prefer the strong-typing and smarter tooling of TypeScript so I made it my mission to write a simple Serverless microservice using Serverless and TypeScript.

In this article, I'll explain how to scaffold a Serverless Framework service with TypeScript and unit tests (using Mocha). In a later article, I'll actually code something useful.

## Starting a Serverless TypeScript Project

To get started, install Serverless and create a new project using TypeScript targeted at AWS:

```bash
npm install -g serverless
```

Next, create a new project using the `aws-nodejs-typescript` template:

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

> Note: A broad set of [`serverless create` templates](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates) are available for AWS, including C#, Groovy, Python, and others.

This creates a boilerplate Serverless application that is *technically* ready to be deployed. Let's explore the created project:

```bash
$ ls
handler.ts    package-lock.json  webpack.config.js
node_modules  serverless.yml
package.json  tsconfig.json
```

That's it, just a few files! The contents of each file is relativly simple and easy to understand. Let's explore the files specific to Serverless Framework: `handler.ts` and `serverless.yml`.

#### `handler.ts` 

The `handler.ts` file exports a single function called `hello` that creates a simple `HTTP 200` response with a hard-coded message:

```typescript
// handler.ts
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

#### `serverless.yml`

The `serverless.yml` file defines the service name as `aws-nodejs-typescript` (which you'll probably want to change), configures Serverless Framework to target the Node 6.10 runtime on AWS, and defines the `hello` function as responding to an `HTTP GET` event:

```yaml
# serverless.yml
service:
  name: aws-nodejs-typescript

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

The `plugins` section defines any Serverless plugins the service uses. In this case, the `aws-nodejs-typescript` template includes the [`serverless-webpack` plugin](https://github.com/serverless-heaven/serverless-webpack) to package and optimize the service using [Webpack](https://webpack.js.org/).

The `functions` section defines the functions for the service. In this case, there's just one function, called `hello`, and it's handled by the `hello` function exported by `handler.ts`. The function is set to be triggered on an HTTP GET event to `/hello`.

With the basic structure in mind, invoke the function locally to see the service in action:

```bash
$ serverless invoke local -f hello
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.1 and ~/code/aws-nodejs-typescript/tsconfig.json
Time: 1421ms
     Asset     Size  Chunks             Chunk Names
handler.js  2.91 kB       0  [emitted]  handler
   [0] ./handler.ts 355 bytes {0} [built]
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!\",\"input\":\"\"}"
}
```

It works!

### Configuer Serverless Framework AWS Credentials

Technically speaking, the service is fully functional and deployable. However, before deploying the service, AWS credentials must be configured. To configure AWS credentials for Serverless, start by creating an IAM user for Serverless to use:

1. Login to AWS and navigate to IAM
1. Create a new user called `serverless-admin`
1. Give `serverless-admin` **Programatic access**
1. Attach the `AdministratorAccess` policy

![Create account for Serverless Framework](/img/aws-server-less-account-create_600x317.gif)

Next, copy the **Access key ID** and **Secret access key** to your clipboard for use in your Serverless Framework configuration. Configure the Serverless Framework with your access keys using the `serverless config credentials` command:

```bash
$ serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY --profile serverless-admin
Serverless: Setting up AWS...
Serverless: Saving your AWS profile in "~/.aws/credentials"...
Serverless: Success! Your AWS access keys were stored under the "serverless-admin" profile.
```

It's important to pass the `--profile` argument here so that you do not override your `[default]` AWS credentials. To ensure Serverless uses this profile for deployment, update the `provider.profile` in `serverless.yml` with the profile name:

```yaml
profile: serverless-admin
```

Of course, you can name the profile anything you want but generally speaking you probably do **not** want the serverless profile to be the default, since that is what is used for the AWS CLI.

### Deploy the Serverless Framework Service for the First Time

Though it doesn't do much, our application is scaffolded, configured, and ready for deployment. So let's deploy it using `serverless deploy -v` to see what happens (`-v` enables verbose output):

```bash
$ serverless deploy -v
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.1 and ~/code/aws-nodejs-typescript/tsconfig.json
Time: 2126ms
     Asset     Size  Chunks             Chunk Names
handler.js  2.91 kB       0  [emitted]  handler
   [0] ./handler.ts 355 bytes {0} [built]
Serverless: Zip service: ~/code/aws-nodejs-typescript/.webpack/service [44 ms]
Serverless: Packaging service...
Serverless: Remove ~/code/aws-nodejs-typescript/.webpack
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-typescript-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - aws-nodejs-typescript-dev
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-typescript-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceForms
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersionwABCde12fGH3lJKlm4nOpqrSt56uvwxYZa7bcdEFg
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodFormsPost
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1234567890123
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-typescript-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - aws-nodejs-typescript-dev
Serverless: Stack update finished...
Service Information
service: aws-nodejs-typescript
stage: dev
region: us-east-1
stack: aws-nodejs-typescript-dev
api keys:
  None
endpoints:
  POST - https://a12b3cdef4.execute-api.us-east-1.amazonaws.com/dev/forms
functions:
  hello: aws-nodejs-typescript-dev-hello

Stack Outputs
ServiceEndpoint: https://a12b3cdef4.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: aws-nodejs-typescript-dev-serverlessdeploymentbucket-12abcdefg3hij
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:123456789012:function:aws-nodejs-typescript-dev-hello:1
```

As you can see from the output, Serverless packages up the application, creates a [CloudFormation](https://aws.amazon.com/documentation/cloudformation/) stack, and uploads it to a specially provisioned S3 bucket. The CloudFormation script then provisions the IAM Roles, Log Groups, ApiGateway end points, and Lambda function needed to run the `aws-nodejs-typescript` service. By default, the `dev` stage is assumed.

The live service can now be invoked using `serverless invoke`:

```bash
$ serverless invoke -f hello -l
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

> Note: You can also test the service directly in API Gateway

Of course, the service is not yet useful, so let's delete it using `serverless remove`:

```bash
$ serverless remove
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
..............
Serverless: Stack removal finished...
```

## Take Advantage of TypeScript with Node and AWS Lambda Types

> **Note:** At the time of this writing, the `aws-nodejs-typescript` did not include type definitions for Node or AWS Lambda. I submitted pull requests to [include `@types/node`](https://github.com/serverless/serverless/pull/4547) and to [include `@types/aws-lambda`](https://github.com/serverless/serverless/pull/4552). Hopefully by the time you're reading this, they will have been accepted!

When writing a service for AWS, it's handy to include type definitions for the AWS services you'll consume. At a minimum you should include:

* [`@types/node`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node) for any Node based applicaiton.
* [`@types/aws-lambda`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) for writing AWS Lambda functions.

Depending on the type of service you're writing, you might also consider these type definitions:

* [`@types/ws-serverless-express`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-serverless-express) for writing Serverless Express applications
* [`@types/aws-iot-device-sdk`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-iot-device-sdk) for integrating with AWS's IoT SDK.

### Installing and Using `@types/aws-lambda`

Let's improve the generated `handler.ts` code by installing and using `@types/aws-lambda`:

```bash
npm install --save-dev @types/aws-lambda
```

We can now add type checking via TypeScript by importing AWS Lambda types into the handler:

```typescript
// handler.ts
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';

export const hello : Handler = (event : APIGatewayEvent, context : Context, cb : Callback) => {
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

In addition to type safety, this also improves tooling such as code completion in VS Code and other editors:

![AWS Lambda TypeScript code completion in VS Code](/img/aws-lambda-typescript-vscode_600x230.png)

## Test with Mocha and Chai

Getting started with Mocha and Chai in TypeScript is easy: Just install them and add type definitions using `npm install`:

```bash
npm install mocha @types/mocha chai @types/chai --save-dev
```

To run tests directly, without having to manually compile the TypeScript first, it also helps to have `ts-node` installed:

```bash
npm install ts-node --save-dev
```

`ts-node` provides TypeScript execution in one step for Node apps.

It is now straight-forward to write unit tests for the handler:

```typescript
// handler.spec.ts
import * as mocha from 'mocha';
import * as chai from 'chai';
import { APIGatewayEvent, Handler, Callback, Context } from 'aws-lambda';
import { hello } from '../handler';

const expect = chai.expect;
const should = chai.should();

describe("handler", () => {
  describe("hello", () => {
    it("should return Serverless boilerplate message", () => {
      hello(null, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');
      })
    });
  });
});
```

The easiest way to run the test is to edit the `test` script in `package.json:

```json
"test": "mocha -r ts-node/register ./**/*.spec.ts"
```

This tells `npm` to alias `npm test` to `mocha -r ts-node/register ./**/*.spec.ts` which in turn runs `mocha` with the `-r` flag to require the `ts-node/register` module which registers the TypeScript compiler for `.ts` (and other) files. The final argument of `./**/*.spec.ts` tells Mocha that files ending with `.spec.ts` contain the tests to be run.

## What's Next

That's everything you need to know to start a basic Serverless Framework project with TypeScript. In an up-coming article, I'll apply this knowledge to write a simple service for accepting form submissions from a static [Hugo](/tools/hugo/) website.