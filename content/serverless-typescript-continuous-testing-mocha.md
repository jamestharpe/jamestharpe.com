---
title: "Continuously Test Serverless Service with VS Code and Mocha"
date: 2018-05-05T10:47:33-04:00
languages: ["TypeScript"]
techniques: [ "Serverless Architecture" ]
frameworks: [ "Serverless Framework", "Mocha", "Chai" ]
projects: []
draft: true
---

```bash
npm install -g serverless
serverless create --template aws-nodejs-typescript && npm install
npm install ts-node mocha @types/mocha chai @types/chai --save-dev
```

Write fist test...

Configure `npm test`

```json
"test": "mocha -r ts-node/register ./**/*.spec.ts"
```

Install `maty.vscode-mocha-sidebar` for VS Code

Configure VS Code, Workspace settings:

```json
{
  "mocha.files.glob": "**/*.spec.ts",
  "mocha.requires": [
    "ts-node/register",
    "source-map-support/register"
  ],
  "mocha.runTestsOnSave": "true",
  "mocha.options": {
    "compilers": {
        "ts": "ts-node/register"
      }
    }
}
```