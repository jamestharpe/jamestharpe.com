---
title: "Serverless Framework: Contact form with TypeScript on AWS"
date: 2017-12-17T12:10:14-04:00
tools: [ "Hugo", "AWS SES" ]
techniques: [ "Serverless Architecture", "Static Site Generation" ]
projects: [ "Form2Email" ]
frameworks: [ "Serverless Framework" ]
languages: [ "TypeScript" ]
draft: false
---
# Create a Backend for a Static Frontend

<img alt="Serverless Framework logo" src="/img/serverless-framework-logo_150x150.png" style="float: right; padding:8px" /> We recently launched the [Crawlity](http://www.crawlity.com/) website which, like jamestharpe.com, uses [Hugo](/tools/hugo/) to generate a static site. There's no database or template engine running on the server - just static files. Unlike jamestharpe.com, crawlity.com needs a back-end to accept contact form submissions. So how does one create a dynamic back-end for a static, "serverless" front-end?

Short answer: With the **Serverless Framework**!

[Serverless Framework](/frameworks/serverless-framework/), or simply "Serverless", is a provider-agnostic framework for defining the **functions** and **events** that make up your application. Once defined, Serverless deploys your application to the target cloud provider by automatically provisioning the required infrastructure and deploying the application to it.

In this article, I'll create [**Form2Email**](https://github.com/Crawlity/svc-form2email), a microservice based on Serverless Framework and written in [TypeScript](https://www.jamestharpe.com/languages/typescript/) that:

* Accepts form submissions via HTTP POST (the event)
* Emails the submitted values as HTML (the function)

Unlike similar articles and examples of Serverless Framework on the web which throw everything into one function that's tightly-coupled to the cloud platform provider, I'm going to take extra care with the design so that it is cloud agnostic. That said, I'll only be filling in the AWS implementation; feel free to contribute additional provider implementations on the [Form2Email GitHub repository](https://github.com/Crawlity/svc-form2email)!

## Scaffold the Service with Serverless Framework

If you're not sure how to install Serverless Framework or get started using Serverless with TypeScript, read [Serverless with TypeScript and AWS: Getting Started](/serverless-typescript-getting-started/) to learn how to setup a basic project with unit tests. For the abbreviated version, just type in these commands:

```bash
mkdir svc-form2email
cd svc-form2email
npm install -g serverless
serverless create --template aws-nodejs-typescript
npm install
```

With the service created, we can rename our service and our handler function, add required permissions to send emails, and set some basic settings:

```yaml
# serverless.yaml
service:
  name: form2email

plugins:
  - serverless-webpack

provider:
  name: aws
  runtime: nodejs6.10
  memorySize: 128 # default is 1024MB, 128MB is minimum
  timeout: 5 # default is 6s, cold start takes about 4.5s, hot is about 0.5s
  iamRoleStatements: # permissions for ALL of your functions can be set here
    - Effect: "Allow"
      Action:
        - "ses:SendEmail"
        - "ses:SendRawEmail"
      Resource: "*"

functions:
  submitForm:
    handler: handler.submitForm
    events:
      - http:
          method: post
          path: forms
          cors: true
```

Next, let's outline the `submitForm` function in `handler.ts`:

```typescript
// handler.ts
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import * as qs from 'querystring';

export const submitForm : Handler = async (event : APIGatewayEvent, context : Context, cb : Callback) => {
  const headers = { "Access-Control-Allow-Origin" : "*" }; // Required for CORS support to work
  try{
    console.log("Received event:", JSON.stringify(event, null, 2));
    // todo: await Service.submitForm(qs.parse(event.body), ses, html);
    cb(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        message: "Success"
      })
    });
  }
  catch(err){
    cb(null, {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: err })
    });
  }
}
```

Scaffolding complete!

## Structure the Service

Though only targeting deployment on AWS for now, it seems wise to structure the project to be deployed to other platforms with minimal tinkering.

To accomplish this, I'll put the application code in the `src/` folder with AWS-specific code in `src/aws/`. After moving the files, the `serverless.yml` file needs to reflect the new handler path:

```yaml
functions:
  submitForm:
    handler: src/aws/handler.submitForm
```

The actual service will be implemented in a `Service` class and the wiring of platform-specific services will be kept in `handler.ts`. Later implementations can then confidently use the `Service` class while wiring up dependencies from the other platform.

Form2Email will have four basic components:

* **`service`** will contain the abstract service functionality
* **`handler`** will interface between AWS and the `service`
* **`formatter`** will format submitted data
* **`sender`** will send the email

The aim is that a call to `Service.submitForm(..)` will inject the dependencies needed to succesfully execute the action. For example, the final code should look something like this for AWS:

```typescript
service.submitForm(
  qs.parse(event.body), // The form data
  ses,                  // How to send it
  html                  // How to format it
);
```

Later, if we want to support a different cloud provider, we'll just need to develop the provider-specific implementations and inject them. Here's what the equivelant code for Azure might look like:

```typescript
service.submitForm(
  qs.parse(req.body), // The form data
  sendGrid,           // How to send it
  html                // How to format it
);
```

## Write the `Service` Class

Let's start with the core of our service by defining the `Service` class:

```typescript
// src/service.ts

const validate = (form : object) =>
    form &&
    Object.keys(form).length > 0;

export type Sender = (toAndFromEmail : string, subject : string, text: string) => Promise<void>;
export type Formatter = (form : object) => string;

export class Service {
  static submitForm(form : object, send : Sender, format : Formatter) : Promise<void>{
    const subjectFieldKey = process.env.SUBJECT_FIELD_KEY || "subject"
    const toAndFrom = process.env.TO_FROM_EMAIL || 'noreply@default.com';
    return validate(form)
      ? send(
          toAndFrom,
          form[subjectFieldKey] || process.env.DEFAULT_SUBJECT || "New message from Form2Email",
          format(form))
      : Promise.reject(
          "Validation error: No input or invalid input received");
  }
}
```

This code defines the `Sender` and `Formatter` dependencies to be injected into the `Service.submitForm` static function. If the `form` object is valid, the `submitForm` function determines the to and from email address and email subject, then formats the message using the injected `format` function. Finally it calls the injected `send` function to generate the email.

### Implement an SES `Sender`

With the `Service` class defined, the next logical step is to write a `Sender` function for [SES](/tools/aws-ses/):

```typescript
// src/aws/sender.ts

import * as aws from 'aws-sdk';
import { Sender } from '../service';
const awsSes = new aws.SES();

export const ses : Sender = (toAndFromEmail : string, subject : string, contents : string) : Promise<any> => {
  const charset = 'UTF-8';
  var params = {
    Destination: { ToAddresses: [toAndFromEmail] },
    Message: {
      Body: {
        Html: { Charset: charset, Data: contents },
        Text: { Charset: charset, Data: contents }
      },
      Subject: { Charset: charset, Data: subject }
    },
    ReplyToAddresses: [toAndFromEmail],
    Source: toAndFromEmail
  };

  return awsSes.sendEmail(params, null).promise();
};
```

This code uses the AWS SDK to invoke SES and send a message.

### Implement an HTML `Formatter`

The other function to be injected into `Service.submitForm` is `Formatter`, so let's implement that next:

```typescript
// src/formatter.ts
import { Formatter } from "./service";

const htmlFormatter = {
  null:   (n : any) => "",
  string: (s : String) => "<p>" + s.replace("\n", "</p>\n<p>") + "</p>",
  array:  (a : Array<any>) => a.reduce((result, item) => result + this.format(item) + "\n", ""),
  object: (o : object) =>
    Object.keys(o).reduce(
      (result, key) =>
        result +
        "  <tr>\n" +
        `    <td>${key}</td>\n` +
        `    <td>${o[key]}</td>\n` +
        "  </tr>\n",
      "<table>\n"
    ) + "</table>",
  format: (form : object) =>
    (form === null
      ? htmlFormatter.null
      : Array.isArray(form)
        ? htmlFormatter.array
        : htmlFormatter[typeof form])(form)
};

export const html : Formatter = htmlFormatter.format;
```

This works by specifying functions for each type of object that may be in a submitted form, looking up the appropriate function to convert it to HTML, then calling that function to build the result.

### Completing the Handler

To finish wiring everything up, all we need to do is call `Service.submitForm` from `handler.ts` and add the appropriate `import` statements. The completed `handler.ts` file now looks like this:

```typescript
// src/aws/handler.ts

import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import * as qs from 'querystring';
import { Service } from '../service';
import { ses } from './sender';
import { html } from '../formatter';

export const submitForm : Handler = async (event : APIGatewayEvent, context : Context, cb : Callback) => {
  const headers = { "Access-Control-Allow-Origin" : "*" }; // Required for CORS support to work
  try{
    console.log("Received event:", JSON.stringify(event, null, 2));
    await Service.submitForm(qs.parse(event.body), ses, html);
    cb(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "Success" })
    });
  }
  catch(err){
    cb(null, {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: err })
    });
  }
}
```

## Test and Deploy Form2Email

The Form2Email service is complete! Let's try it out locally using `serverless invoke local`:

```bash
$ serverless invoke local -f submitForm -d '{"body":"hello=world&hola=mundo"}'
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.2 and ~/code/svc-form2email/tsconfig.json
Time: 13200ms
             Asset     Size  Chunks                    Chunk Names
src/aws/handler.js  3.01 MB       0  [emitted]  [big]  src/aws/handler
   [0] ./node_modules/aws-sdk/lib/core.js 2.2 kB {0} [built]
   [1] ./node_modules/aws-sdk/lib/node_loader.js 3.08 kB {0} [built]
   [9] ./node_modules/aws-sdk/clients/sts.js 573 bytes {0} [built]
  [14] ./node_modules/aws-sdk/lib/model/shape.js 9.51 kB {0} [built]
  [15] ./node_modules/aws-sdk/lib/protocol/rest.js 4.39 kB {0} [built]
  [41] external "querystring" 42 bytes {0} [not cacheable]
  [89] ./src/aws/handler.ts 3.71 kB {0} [built]
  [90] ./src/service.ts 858 bytes {0} [built]
  [91] ./src/aws/sender.ts 675 bytes {0} [built]
  [92] ./node_modules/aws-sdk/lib/aws.js 134 bytes {0} [built]
 [225] ./node_modules/aws-sdk/lib/credentials/temporary_credentials.js 4.63 kB {0} [built] [253] ./node_modules/aws-sdk/clients/all.js 5.1 kB {0} [built]
 [684] ./node_modules/aws-sdk/clients/cloud9.js 562 bytes {0} [built]
 [687] ./node_modules/aws-sdk/clients/serverlessapplicationrepository.js 607 bytes {0} [built]
 [692] ./src/formatter.ts 941 bytes {0} [built]
    + 678 hidden modules
Received event: {
  "body": "hello=world&hola=mundo"
}
{
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{\"message\":\"Success\"}"
}
```

It worked! In fact, I got the email in my inbox:

![Form2Email SES Message Example](/img/form2email-ses-example_575x168.png)

Next, let's deploy:

```bash
$ serverless deploy
Serverless: Bundling with Webpack...
ts-loader: Using typescript@2.6.2 and ~/code/svc-form2email/tsconfig.json
Time: 12387ms
             Asset     Size  Chunks                    Chunk Names
src/aws/handler.js  3.01 MB       0  [emitted]  [big]  src/aws/handler
   [0] ./node_modules/aws-sdk/lib/core.js 2.2 kB {0} [built]
   [1] ./node_modules/aws-sdk/lib/node_loader.js 3.08 kB {0} [built]
   [9] ./node_modules/aws-sdk/clients/sts.js 573 bytes {0} [built]
  [14] ./node_modules/aws-sdk/lib/model/shape.js 9.51 kB {0} [built]
  [15] ./node_modules/aws-sdk/lib/protocol/rest.js 4.39 kB {0} [built]
  [41] external "querystring" 42 bytes {0} [not cacheable]
  [89] ./src/aws/handler.ts 3.71 kB {0} [built]
  [90] ./src/service.ts 858 bytes {0} [built]
  [91] ./src/aws/sender.ts 675 bytes {0} [built]
  [92] ./node_modules/aws-sdk/lib/aws.js 134 bytes {0} [built]
 [225] ./node_modules/aws-sdk/lib/credentials/temporary_credentials.js 4.63 kB {0} [built] [253] ./node_modules/aws-sdk/clients/all.js 5.1 kB {0} [built]
 [684] ./node_modules/aws-sdk/clients/cloud9.js 562 bytes {0} [built]
 [687] ./node_modules/aws-sdk/clients/serverlessapplicationrepository.js 607 bytes {0} [built]
 [692] ./src/formatter.ts 941 bytes {0} [built]
    + 678 hidden modules
Serverless: Packaging service...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: form2email
stage: dev
region: us-east-1
stack: form2email-dev
api keys:
  None
endpoints:
  POST - https://g3ayzx0iqf.execute-api.us-east-1.amazonaws.com/dev/forms
functions:
  submitForm: form2email-dev-submitForm
```

Note that near the end of the output is endpoint needed to integrate Form2Email with our website. Save that for later.

However, before integrating the service, let's try it out *live* using `serverless invoke`:

```bash
$ serverless invoke -f submitForm -d '{"body":"hello=world&hola=mundo"}'
{
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{\"message\":\"Success\"}"
}
```

Finally, we can integrate it with an HTML form. Here's a simple example:

```html
<form id="form2email" action="https://g3ayzx0iqf.execute-api.us-east-1.amazonaws.com/dev/forms" method="POST">
  <input type="text" id="Name" name="Name" placeholder="First and Last Name"> <br/>
  <input type="text" id="Email" name="Email" placeholder="Email Address"> <br/>
  <button type="submit">Submit</button>
</form>
```

Of course, when the form is submitted we'll get back the JSON response which is not the most user-friendly experience. Rather than adding a Thank You redirect, let's update the form to submit via AJAX and jQuery magic. Just add the following JavaScript to the page:

```javascript
let $form = $('#form2email');
$form.submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function (data) {
          console.log('Submission was successful.');
          console.log(data);
          $form.html("<h1>Thank you!</h1>");
      },
      error: function (data) {
          console.log('An error occurred.');
          console.error(data);
          alert("Something went wrong! Try emailing us.");
      },
  });
});
```

Now the form will be replaced with "Thank you!" upon succesful submission.

See it in action and learn about my upcoming product launch by filling out the [Contact Us form on Crawlity.com](http://www.crawlity.com/#fh5co-contact).