---
title: "DynamoDB: Add a Local Secondary Index to an Existing Table using CloudFormation"
date: 2019-01-16T09:05:47-05:00
languages: ["yaml"]
tools: ["CloudFormation", "DynamoDB"]
techniques: ["Infrastructure as Code"]
frameworks: []
projects: []
draft: true
---

Add the index:

```yaml
LocalSecondaryIndexes:
  -
    IndexName: jobId-modified-index
    KeySchema:
      -
        AttributeName: jobId
        KeyType: HASH
      -
        AttributeName: modified
        KeyType: RANGE
    Projection:
      ProjectionType: ALL
```

Fail with:
   An error occurred: JobsDynamoDBTable - Property AttributeDefinitions is inconsistent with the KeySchema of the table and the secondary indexes.

Add column to table.properties.attributedefinitions:

```yaml
        -
          AttributeName: modified
          AttributeType: N
```

Fail with:
  An error occurred: JobsDynamoDBTable - CloudFormation cannot update a stack when a custom-named resource requires replacing. Rename hvh.jobtracker.devnext.jobs and update the stack again..

Add `DeletionPolicy: Retain` to table object and deploy.

Rename table, add `.v1` to table name and object name (JobsDynamoDBTableTemp). New table deployed, old table retained. TAKE BACKUPS

Remove `temp` and deploy again.

Faile with:
  The CloudFormation template is invalid: Template error: instance of Fn::GetAtt references undefined resource JobsDynamoDBTable

Update CloudFormation to point to the JobsDynamoDBTableV1 (will need to undo later).