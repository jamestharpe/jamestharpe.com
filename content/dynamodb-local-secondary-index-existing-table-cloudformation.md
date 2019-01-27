---
title: "DynamoDB & CloudFormation: Add a Local Secondary Index to Existing Table"
date: 2019-01-16T09:05:47-05:00
languages: ["yaml", "bash"]
tools: ["CloudFormation", "DynamoDB", "AWS CLI", "jq"]
techniques: ["Infrastructure as Code", "Database as Code"]
frameworks: []
projects: []
draft: true
---

# DynamoDB Local Secondary Index

A Local Secondary Index essentially gives applications an additional sort key by which to query data in [DynamoDB](/tools/dynamodb). I recently needed to add a local secondary index to an existing DynamoDB table through [CloudFormation](/tools/cloudformation) so that I could query objects by the `modified` column value without scanning. Unfortunatly, this isn't as easy as simply adding the `LocalSecondaryIndexes` element to the CloudFormation script.

Adding a local secondary index requires replacing the table, which creates the challenge of preserving the table data during the upgrade. Here's what I learned.

## Initial Jobs Table Schema

The original schema for the Jobs table consisted of a generated `jobId` partition key and `jobName` sort key. The system is used for invoicing, so its important for users to quickly find a Job by its ID or name so they made a good choice fot they key schema.

Here is the CloudFormation code that originally defined the Jobs table

```yaml
  JobsDynamoDBTable:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      AttributeDefinitions:
        -
          AttributeName: jobId
          AttributeType: S
        -
          AttributeName: name
          AttributeType: S
      KeySchema:
        -
          AttributeName: jobId
          KeyType: HASH
        -
          AttributeName: name
          KeyType: RANGE
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      TableName: Jobs
```

Recently, the client asked for some reporting to be added to the application that would pull jobs by their last modified date. No problem, that's what [local secondary indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html) were built for.

## Add the LocalSecondaryIndex to the CloudFormation Script

The `LocalSecondaryIndexes` element for DynamoDB in CloudFormation is straight-forward. Provide a descriptive key name, alternate key schema, and Projection (columns that should be available in the index).

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

An attempt to deploy this change will result in an error:

```bash
An error occurred: JobsDynamoDBTable - Property AttributeDefinitions is inconsistent with the KeySchema of the table and the secondary indexes.
```

Of course! The AttributeDefinitions must be updated to include the `modified` property:

```yaml
  -
    AttributeName: modified
    AttributeType: N
```

The entire CloudFormation resource element now looked like this:

```yaml
JobsDynamoDBTable:
  Type: 'AWS::DynamoDB::Table'
  Properties:
    AttributeDefinitions:
      -
        AttributeName: jobId
        AttributeType: S
      -
        AttributeName: name
        AttributeType: S
      # Required for LocalSecondaryIndex
      -
        AttributeName: modified
        AttributeType: N
    KeySchema:
      -
        AttributeName: jobId
        KeyType: HASH
      -
        AttributeName: name
        KeyType: RANGE
    # Make modified available as a sort key
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
          ProjectionType: ALL # Make All columns available in index
    ProvisionedThroughput:
      ReadCapacityUnits: 1
      WriteCapacityUnits: 1
    TableName: Jobs
```

Though the CloudFormation template now seems complete, deploying fales:

```bash
An error occurred: JobsDynamoDBTable - CloudFormation cannot update a stack when a custom-named resource requires replacing. Rename Jobs and update the stack again.
```

## Replace the a DynamoDB Resource

CloudFormation refuses to add the index to the DynamoDB table, so it must be replaced with a new table. However, with application data in the table, it can't simply be deleted. The plan, then, is to create a new table called `Jobs.v1` with the index, then to move data from `Jobs` to `Jobs.v1` and finally delete the original `Jobs` table.

### Retain the Original Table

Simply renaming the table will result in the original Jobs table being deleted. To prevent this, add `DeletionPolicy: Retain` to table object in your CloudFormation script and deploy. For safety sake, make a backup as well. Backups can be created in the AWS Console or via the CLI.

#### Create a DynamoDB Backup with the AWS CLI

Here's an example of how to create a backup using the AWS CLI:

```bash
$ aws dynamodb create-backup \
  --region=YOUR_REGION_HERE \
  --table-name Jobs \
  --backup-name Jobs-$(date '+%Y%m%d_%H%M%S')
{
    "BackupDetails": {
        "BackupCreationDateTime": 1548578121.641,
        "BackupName": "Jobs-20190127_033734",
        "BackupStatus": "CREATING",
        "BackupType": "USER",
        "BackupSizeBytes": 123456,
        "BackupArn": "arn:aws:dynamodb:us-east-1:123456789012:table/Jobs/backup/01548578121641-f46bes63"
    }
}
```

It's important to let the backup finish before proceeding with further changes, but the `aws dynamodb backup` command returns almost instantly because the backup operaiton is asynchromous. 

Waiting on the backup to complete can be done with a simple script and a little help from the [jq library](https://stedolan.github.io/jq/).

First, parse out the ARN using jq:

```bash
$ backup_arn=$(aws dynamodb create-backup \
  --region=YOUR_REGION_HERE \
  --table-name Jobs \
  --backup-name Jobs-$(date '+%Y%m%d_%H%M%S')) \
| jq '.BackupDetails.BackupArn' -r) # -r for "raw" returns value w/ out quotes
```

Next, loop until the backup is no longer in a `CREATING` state:

```bash
$ backup_status="CREATING"
$ while [ "$backup_status" = "CREATING" ]; do \
  echo "... Waiting for backup to complete, backup_status="$backup_status \
  backup_status=$(aws dynamodb describe-backup \
    --backup-arn $backup_arn \
    --region=YOUR_REGION_HERE \
  | jq '.BackupDescription.BackupDetails.BackupStatus' -r)\
  sleep 2 \
done
... Waiting for backup to complete, backup_status=CREATING
... Waiting for backup to complete, backup_status=CREATING
... Waiting for backup to complete, backup_status=CREATING

$
```

### Rename the Table

With the `Retain` policy and backup in place it's safe to rename the Jobs table and deploy. The first time I did this, I had forgottent to deploy the `DeletionPolicy: Retain` change in my CloudFormation and deleted the original table, along with all the data. **Take backups!**

The entire table definition now looks like this:

```yaml
JobsDynamoDBTableV1:
  Type: 'AWS::DynamoDB::Table'
  # Retain the table when deleting from CF Stack!
  DeletionPolicy: Retain
  Properties:
    AttributeDefinitions:
      -
        AttributeName: jobId
        AttributeType: S
      -
        AttributeName: name
        AttributeType: S
      # Required for LocalSecondaryIndex
      -
        AttributeName: modified
        AttributeType: N
    KeySchema:
      -
        AttributeName: jobId
        KeyType: HASH
      -
        AttributeName: name
        KeyType: RANGE
    # Make modified available as a sort key
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
    ProvisionedThroughput:
      ReadCapacityUnits: 1
      WriteCapacityUnits: 1
    # New table name!
    TableName: Jobs.v1
```

Update references to the `Jobs` table and `JobsDynamoDBTable` resource to `Jobs.v1` and `JobsDynamoDBTableV1`, respectivly throughout your applicatoin and CloudFormation script.

## Deploy in Two Steps