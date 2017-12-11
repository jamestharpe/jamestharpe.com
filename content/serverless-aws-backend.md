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

In this article, I'll create **Form2Email**, a microservice based on Serverless Framework and written in TypeScript that:

* Accepts form submissions via HTTP POST (the event)
* Emails the submitted values as HTML (the function)

Unlike similar articles and examples of Serverless Framework on the web which throw everything into one function that's tightly-coupled to the cloud platform provider, I'm going to take extra care with the design so that it is cloud agnostic. That said, I'll only be filling in the AWS implementation; feel free to contribute additional provider implementations on the [Form2Email GitHub repository](https://github.com/Crawlity/svc-form2email)!

## Get Started with Serverless Framework

If you're not sure how to install Serverless Framework, read [Serverless with TypeScript and AWS: Getting Started](/serverless-typescript-getting-started/) to learn how to setup a basic project, with unit tests. For the abbreviated version, just type in these commands:

```bash
mkdir svc-form2email
cd svc-form2email
npm install -g serverless
serverless create --template aws-nodejs-typescript && npm install
```

With the service created, we can rename our service and our handler function. Let's update `severless.yaml` and `handler.ts` with sensical names:

**`serverless.yaml`:**

```yaml
service:
  name: form2email

plugins:
  - serverless-webpack

provider:
  name: aws
  runtime: nodejs6.10

functions:
  submitForm:
    handler: handler.submitForm
    events:
      - http:
          path: submitForm
          method: post
          integration: LAMBDA
          cors: true

```

Next, let's rename the handler function to something more relevant than `hello`:

**`handler.ts`:**

```typescript
export const submitForm = (event, context, cb) => {
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

## Writing the Service

Let's start by getting the [typescript types for AWS Lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) and AWS libraries installed:

```bash
npm install @types/aws-lambda --save-dev
npm install aws-sdk --save
```

> **Warning:** When I first installed `@types/aws-lambda` I got the following error when testing using `severless invoke local`:
>
> > `ERROR in ~/codesvc-form2email/node_modules/aws-sdk/lib/config.d.ts
> (39,37): error TS2693: 'Promise' only refers to a type, but is being used as a value here.`
>
> The fix was to follow the [`aws-sdk-js` TypeScript documentation](https://github.com/aws/aws-sdk-js#usage-with-typescript) documentation and add the following to `compilerOptions` in `tsconfig.json`:
> ```json
 "lib": [
     "es5",
     "es2015.promise"]
```

Next, let's plan to break the service into it's core responsabilities:

* **`service`** will contain the abstract service functionality
* **`handler`** will interface between AWS and the service
* **`formatter`** will format submitted data
* **`sender`** will send the formatted data

What we're aiming to achieve is a simple call to `service.submitForm`, injecting the dependencies we need to succesfully execute the action. For example, the final code should look something like this:

```typescript
service.submitForm(
  event.body,    // The form data
  sender.ses,    // How to send it
  formatter.html // How to format it
);
```

This way, if we wanted to support a different cloud provider, say Azure, we would just need to develop the functions needed to interface with Azure and wire up new code that looks something like this:

```typescript
service.submitForm(
  qs.parse(req.body), // The form data
  sender.sendGrid,    // How to send it
  formatter.html      // How to format it
);
```

### Writing `sender`

Let's write a function that sends an email via AWS SES:

```typescript
import * as aws from 'aws-sdk';
const awsSes = new aws.SES();

export const ses = (subject : string, contents : string) : Promise<any> => {
  const toAndFromAddress = process.env.TO_FROM_EMAIL || 'default@email.address.com';
  const charset = 'UTF-8';
  var params = {
    Destination: { ToAddresses: [toAndFromAddress] },
    Message: {
      Body: {
        Html: { Charset: charset, Data: contents },
        Text: { Charset: charset, Data: contents }
      },
      Subject: { Charset: charset, Data: subject || 'Crawlity form submission' }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress
  };

  return awsSes.sendEmail(params, null).promise();
};
```



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