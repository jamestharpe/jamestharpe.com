---
date: 2019-01-27T09:05:47-05:00
description: "Steps to add a local secondary index to an existing DynamoDB table"
redirect_from: ["/dynamodb-local-secondary-index-existing-table-cloudformation/"]
tags: ["aws-cloudformation", "aws-dynamodb", "aws-cli", "database-as-code", "infrastructure-as-code"]
title: "DynamoDB & CloudFormation: Add a Local Secondary Index to Existing Table"
---

# DynamoDB Local Secondary Index

A [local secondary index](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html) essentially gives DynamoDB tables an additional sort key by which to query data. I recently needed to add a local secondary index to an existing DynamoDB table through CloudFormation so that I could query objects by the `modified` column value without scanning. Unfortunately, this isn't as easy as simply adding the [`LocalSecondaryIndexes` element](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-lsi.html) to the CloudFormation script.

Adding a local secondary index requires replacing the table, which creates the challenge of preserving the table data during the upgrade.

**Here's what I learned:**

* LocalSecondaryIndex CloudFormation YAML Syntax
* How to troubleshoot the error `Property AttributeDefinitions is inconsistent with the KeySchema of the table and the secondary indexes`.
* How to take DynamoDB table backups with the AWS CLI
* A work-around to prevent the error `CloudFormation cannot update a stack when a custom-named resource requires replacing...`.
* Basic JSON parsing with [`jq`](jq.md)

## Initial Table Schema: `Jobs` Table

The original schema for the `Jobs` table consisted of a generated `jobId` partition key and `jobName` sort key. The system is used for invoicing, so its important for users to quickly find a Job by its ID or name so they made a good choice fot they key schema.

Here is the CloudFormation code that originally defined the `Jobs` table

```yaml
# app.cloudformation.yaml
JobsDynamoDBTable:
	Type: 'AWS::DynamoDB::Table'
	Properties:
		TableName: Jobs
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
```

Recently, the client asked for some reporting to be added to the application that requires querying jobs by their last modified date. No problem, that's what local secondary indexes were built for.

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

Of course! The `AttributeDefinitions` must be updated to include the `modified` property. Once updated, the entire `JobsDynamoDBTable` CloudFormation resource element now looked like this:

```yaml
# app.cloudformation.yaml
JobsDynamoDBTable:
	Type: 'AWS::DynamoDB::Table'
	Properties:
		TableName: Jobs
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
```

Though the CloudFormation template now seems complete, deploying fails:

```bash
An error occurred: JobsDynamoDBTable - CloudFormation cannot update a stack when a custom-named resource requires replacing. Rename Jobs and update the stack again.
```

## Replace the a DynamoDB Resource

CloudFormation refuses to add the index to the DynamoDB table, so it must be replaced with a new table. However, with application data in the table, it can't simply be deleted. The plan, then, is to create a new table called `Jobs.v1` with the index, then to move data from `Jobs` to `Jobs.v1` and finally (optionally) delete the original `Jobs` table.

### Retain the Original Table

A rename of the table will result in the original `Jobs` table being deleted. To prevent this, add `DeletionPolicy: Retain` to table object in your CloudFormation script and deploy. For safety sake, make a backup as well. Backups can be created in the AWS Console or via the CLI.

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

It's important to let the backup finish before proceeding with further changes, but the `aws dynamodb backup` command returns almost instantly because the backup operation is asynchronous.

Waiting on the backup to complete can be done with a simple script and a little help from the `jq` utility.

First, parse out the ARN using `jq`:

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
done \
echo "Backup complete"
... Waiting for backup to complete, backup_status=CREATING
... Waiting for backup to complete, backup_status=CREATING
... Waiting for backup to complete, backup_status=CREATING
Backup complete

$
```

### Rename the Table

With the `Retain` policy and backup in place it's safe to rename the Jobs table and deploy. The first time I did this, I had forgotten to deploy the `DeletionPolicy: Retain` change in my CloudFormation and deleted the original table, along with all the data. **Take backups!**

The entire table definition now looks like this:

```yaml
# app.cloudformation.yaml
JobsDynamoDBTableV1: # Renamed
	Type: 'AWS::DynamoDB::Table'
	# Retain the table when deleting from CF Stack!
	DeletionPolicy: Retain
	Properties:
		TableName: Jobs.v1 # Renamed
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
```

Before deploying, update references to the `Jobs` table and `JobsDynamoDBTable` resource to `Jobs.v1` and `JobsDynamoDBTableV1`, respectively throughout your application and CloudFormation script.

## Deploy and Migrate

The deployment will consist of two steps: The deployment its self, then the migration of the Jobs DynamoDB table to the Jobs.v1 table.

The deployment of the CloudFormation template is simple:

```bash
aws cloudformation deploy --template-file app.cloudformation.yaml --stack-name app
```

Once completed, the migration from the `Jobs` table to `Jobs.v1` can begin.

### Copy All Rows from one DynamoDB Table to Another via CLI

To copy all the rows from one DynamoDB table to another uses two primary commands with the AWS CLI: `aws dynamodb scan` to retrieve rows from the source table and `aws dynamodb batch-write-item` to write records to the destination.

#### Limitations of `batch-write-item`

Complicating matters is that `batch-write-item` can perform a maximum of 25 operations per call. Since the source table contains more than 25 records, we'll have to loop through.

#### Paginating Reads, 25 at a Time

Our migration script will retrieve 25 items at a time, write them to a file, then use `batch-write-item` to copy them to the destination. To [paginate](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html) through the data, both the `--page-size` and `--max-items` commands must be set to 25:

```bash
aws dynamodb scan --profile hvh --region=us-east-1 \
  --table-name Jobs \
  --page-size 25 \
  --max-items 25
```

This call can be wrapped in a loop to page through the data and the variables needed parsed using `jq`:

```bash
# migrate.sh
set -e
page=1
while : ; do # do .. while equivalent
  echo "  Scanning page $page, up to 25 records in Jobs table"
  scan_result=$(aws dynamodb scan --profile hvh --region=us-east-1 \
    --table-name Jobs \
    --page-size 25 \
    --max-items 25 \
    $starting_token)
  echo "$scan_result"

  # Get pagination token:
  next_token=$(echo "$scan_result" | jq '.NextToken' -r)
  # Set starting_token for next iteration (blank on first iteration)
  starting_token="--starting-token $next_token"

  # Break loop, if no more pages
  [[ "$next_token" != "null" ]] || break
  # Increment page count
  ((page++))
done
```

#### Transforming DynamoDB Scan Results to `PutRequest` Elements

Each item returned from `aws dynamodb scan` must be transformed into a `PutRequest` element for compatibility with `batch-write-item`. Each set of 25 scan results can be written to a temporary file then passed to `batch-write-item` to perform the insert. The entire, finished script now looks like this:

```bash
# migrate.sh
set -e
page=1

echo "Copying all rows from Jobs to Jobs.v1, 25 rows at a time"
while : ; do # do .. while equivalent
    echo "  Scanning page $page, up to 25 records in Jobs table"
    scan_result=$(aws dynamodb scan --profile hvh --region=us-east-1 \
        --table-name Jobs \
        --page-size 25 \
        --max-items 25 \
        $starting_token)

    # Transform the scan result to a PutRequest:
    put_req_json=$(echo $scan_result | jq '[.Items | .[] | { PutRequest: { Item: . } }]')
    # Get number of records:
    rec_count=$(echo $put_req_json | jq 'length')
    # Get pagination token:
    next_token=$(echo "$scan_result" | jq '.NextToken' -r)
    # Set starting_token for next iteration (blank on first iteration)
    starting_token="--starting-token $next_token"

    echo "  Writing $rec_count records to temporary file"
    tmp_file_name="Jobs.v1.$page.json"
    echo '{
        "Jobs.v1": '"${put_req_json}"'
    }' > "Jobs.v1.$page.json"

    echo "  Writing $rec_count to Jobs.v1"
    aws dynamodb batch-write-item \
        --region=YOUR_REGION_HERE \
        --request-items file://"$tmp_file_name" \
    | sed 's/^/  /' # Indent output

    echo "  Deleting temporary file"
    rm "$tmp_file_name"

    # Break loop, if no more pages
    [[ "$next_token" != "null" ]] || break
    # Increment page count
    ((page++))
done

echo "Copied all rows from Jobs to Jobs.v1"
```

## Clean Up: Delete the Original Table (optional)

The original `Job` table is no longer in use, and may be deleted safely at this point:

```bash
aws dynamodb delete-table \
  --region=YOUR_REGION_HERE \
  --table-name Jobs
```

That's it! The original `Jobs` table has been migrated to `Jobs.v1` with a Local Secondary Index applied and the original table removed.
