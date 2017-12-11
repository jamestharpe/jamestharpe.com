---
title: "Serverless Framework with TypeScript and AWS: Getting Started"
date: 2017-12-10T18:08:22-05:00
languages: ["TypeScript"]
# tools: []
techniques: [ "Serverless Architecture" ]
frameworks: [ "Serverless Framework" ]
projects: [ "Form2Email" ]
draft: true
---
# Serverless and TypeScript

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_150x150.png" style="float: right; padding:8px" /> [Serverless Framework](https://serverless.com/), or simply "Serverless", is an excellent provider-agnostic framework for defining the **functions** and **events** that make up your service. Once defined your events and functions are defined, Serverless deploys your service to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

While getting started with Serverless, I found that most examples are in JavaScript. However, I prefer the strong-typing and smarter tooling of TypeScript so I made it my mission to write a simple Serverless microservice using Serverless and TypeScript.

In this article, I'll explain how to scaffold a Serverless Framework service with TypeScript and unit tests (using Mocha).

## Starting a Serverless TypeScript Project

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

> Note: A broad set of [`serverless create` templates](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates) are available for AWS, including C#, Groovy, Python, and others.

We now have a boilerplate Serverless application that is *almost* ready to be deployed! Let's explore the created project:

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

The `plugins` section defines any Serverless plugins the service uses. In this case, the `aws-nodejs-typescript` template includes the [`serverless-webpack` plugin](https://github.com/serverless-heaven/serverless-webpack) to package and optimize the service using [Webpack](https://webpack.js.org/).

The `functions` section defines the functions for the service. In this case, there's just one function, called `hello`, and it's handled by `handler.hello` (the `hello` function exported by `handler.ts`). The function is set to be triggered on an HTTP GET event to `/hello`.

Now that we undertsand the basic structure, let's invoke the function locally:

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

Here's a walk-through of the steps, for those that don't want to watch the video:

1. Login to AWS and navigate to IAM
1. Create a new user called `serverless-admin`
1. Give `serverless-admin` **Programatic access**
1. Attach the `AdministratorAccess` policy

![Create account for Serverless Framework](/img/aws-server-less-account-create_600x317.gif)

You can copy the **Access key ID** and **Secret access key** to your clipboard for use in your Serverless Framework configuration.

To configure the Serverless Framework with your access keys, use the `serverless config credentials` command:

```bash
$ serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret --profile serverless-admin
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Serverless: Setting up AWS...
Serverless: Saving your AWS profile in "~/.aws/credentials"...
Serverless: Success! Your AWS access keys were stored under the "serverless-admin" profile.
```

It's important to pass the `--profile` argument here so that you do not override your `[default]` AWS credentials. To ensure Serverless uses this profile, update the `provider.profile` in `serverless.yml` with the profile name:

```yaml
profile: serverless-admin
```

Of course, you can name the profile anything you want but generally speaking you probably do **not** want the serverless profile to be the default, since that is what is used for the AWS CLI.

### Deploy the Serverless Framework Service for the First Time

Though it doesn't do much, our application is scaffolded, configured, and ready for deployment. So let's deploy it using `serverless deploy -v` to see what happens (`-v` enables verbose output):

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

As you can see from the output, Serverless packages up the application, creates a CloudFormation stack, and uploads a generated CloudFormation script to a specially provisioned S3 bucket. The CloudFormation script then provisions the IAM Roles, Log Groups, ApiGateway end points, and Lambda function needed to run the `form2email` service. By default, the `dev` stage is assumed.

The live service can now be invoked using `serverless invoke`:

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

## Take Advantage of TypeScript

The `package.json` file of the service already includes `@types/node` as a development dependency. This causes types associated with node to be automatically included by the compiler.

When writing a service for AWS, it's handy to include type definitions for the AWS services you'll consume, for instance:

* [`@types/aws-lambda`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) for writing AWS Lambda functions.
* [`a@types/ws-serverless-express`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-serverless-express) for writing Serverless Express applications
* [`@types/aws-iot-device-sdk`](https://www.github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-iot-device-sdk) for integrating with AWS's IoT SDK.

### Installing and Using `@types/aws-lambda`

Let's improve the generated `handler.ts` code by installing and using `@types/aws-lambda`:

```bash
npm install --save-dev @types/aws-lambda
```