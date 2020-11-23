---
date: 2019-01-15T07:09:18-05:00
draft: false
redirect_from: ["/database-as-code-flyway/"]
title: "Database as Code: Flyway & MySQL on Cloud Foundry"
tags: ["cloud-foundry", "database-as-code", "flyway", "mysql", "pal-tracker"]
---

# Recipe: Database as Code with Flyway & MySQL on Cloud Foundry

This recipe is illustrated in the [PAL Tracker](https://github.com/jamestharpe/pal-tracker) example project.

## 1. Provision and Bind MySQL in Cloud Foundry

Use `cf marketplace` to find the appropriate service and provisioning options for MySQL, then use `cf create-service` to provision the service:

```bash
$ cf marketplace
Getting services from marketplace in org some-org / space develop as you@example.com...
OK

service               plans                  description
# ...
p-mysql               100mb, 1gb             A DBaaS
# ...
```

In the example above, the `p-mysql` service is available. Provision it with `cf create-service`:

```bash
cf create-service p-mysql 100mb pal-tracker-db
```

The `cf create-service` call will return immediately, before the service is provisioned. To check the status use `cf service`:

```bash
$ cf service pal-tracker-db

Service instance: pal-tracker-db
Service: p-mysql
Plan: 100mb
Description: MySQL databases on demand
Documentation url:
Dashboard: https://p-mysql.example.com/manage/instances/abcd-ef12-3456

Last Operation
Status: create succeeded
Message:
Started: 2019-01-15T22:59:07Z
Updated: 2019-01-15T22:59:26Z
```

Once the service is ready, bind it to the **pal-tracker** application:

```bash
cf bind-service pal-tracker pal-tracker-db # Service info added to VCAP_SERVICES env var
```

Once the service is bound, the **VCAP_SERVICES** environment variable will contain details about the service:

```bash
$ cf env my-app
Getting env variables for app pal-tracker in org some-org / space some-space as
you...
OK
System-Provided:

{
	"VCAP_SERVICES": {
		"p.mysql": [{
			"label": "p.mysql",
			"name": "pal-tracker-db",
			"plan": "db-small",
			"provider": null,
			"syslog_drain_url": null,
			"tags": [ "mysql" ],
			"credentials": {
			"hostname": "10.0.0.20",
			"jdbcUrl": "jdbc:mysql://10.0.0.20:3306/service_instance_db?user=fefcbe8360854a18a7994b870e7b0bf5\u0026password=z9z6eskdbs1rhtxt",
			"name": "service_instance_db",
			"password": "z9z6eskdbs1rhtxt",
			"port": 3306,
			"uri": "mysql://fefcbe8360854a18a7994b870e7b0bf5:z9z6eskdbs1rhtxt@10.0.0.20:3306/service_instance_db?reconnect=true",
			"username": "fefcbe8360854a18a7994b870e7b0bf5"
			},
			"volume_mounts": []
		}
	}
	...
}
```

## 2. Add the Database "as code" to the Project

Create a **databases/tracker** folder in the application root then create a file called **create_databases.sql** there:

```bash
mkdir -p database/tracker
touch database/tracker/create_databases.sql
```

Edit the **create_databases.sql** file to create **tracker_dev** and **tracker_test** databases:

```sql
-- Delete DBs if they exist
DROP DATABASE IF EXISTS tracker_dev;
DROP DATABASE IF EXISTS tracker_test;

-- Create the databases
CREATE DATABASE tracker_dev;
CREATE DATABASE tracker_test;

-- Add a user with full access to both DBs
CREATE USER IF NOT EXISTS 'tracker'@'localhost'
  IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON tracker_dev.* TO 'tracker' @'localhost';
GRANT ALL PRIVILEGES ON tracker_test.* TO 'tracker' @'localhost';
```

### Add the first Migration

Add a file called `V1__initial_schema.sql` to a folder called **migrations** in the **database/tracker** folder, then add a `CREATE TABLE` statement to store `TimeEntry` objects.

```sql
CREATE TABLE time_entries (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  project_id BIGINT(20), -- projectId on TimeEntry
  user_id    BIGINT(20), -- userId on TimeEntry
  date       DATE,
  hours      INT,

  PRIMARY KEY (id)
)
  ENGINE = innodb
  DEFAULT CHARSET = utf8;
```

## 3. Create and Migrate a Local MySQL Databases

To create the test and development databases, simply pass the **create_databases.sql** file to MySQL on the command line:

```bash
mysql -uroot < databases/tracker/create_databases.sql
```

Add the **time_entries** table to both databases using the Flyway CLI:

```bash
flyway -url="jdbc:mysql://localhost:3306/tracker_dev" -locations=filesystem:databases/tracker clean migrate
flyway -url="jdbc:mysql://localhost:3306/tracker_test" -locations=filesystem:databases/tracker clean migrate
```

The databases can now be inspected with MySQL.

Open MySQL on the CLI:

```bash
mysql -u tracker
```

Inspect the database:

```sql
use tracker_dev;
describe time_entries;

+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| project_id | bigint(20)   | YES  |     | NULL    |                |
| user_id    | bigint(20)   | YES  |     | NULL    |                |
| date       | date         | YES  |     | NULL    |                |
| hours      | int(11)      | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
```

Your local databases are ready to go!

## 4. Create and Migrate the Database on Cloud Foundry

The database provided by Cloud Foundry is behind a Firewall, so it's necessary to open an SSH tunnel. The following is a fully re-usable script for running the migration as part of a CI process:

```bash
#!/usr/bin/env bash

# Fail on error
set -e

# Get the GUID of the app - pass pal-tracker as first arg to script
app_guid=`cf app $1 --guid`
credentials=`cf curl /v2/apps/$app_guid/env | jq '.system_env_json.VCAP_SERVICES | .[] | .[] | select(.instance_name=="pal-tracker-db") | .credentials'`

# Get MySQL Connection info
ip_address=`echo $credentials | jq -r '.hostname'`
db_name=`echo $credentials | jq -r '.name'`
db_username=`echo $credentials | jq -r '.username'`
db_password=`echo $credentials | jq -r '.password'`

# Open SSH tunnel
echo "Opening ssh tunnel to $ip_address"
cf ssh -N -L 63306:$ip_address:3306 pal-tracker &
cf_ssh_pid=$!

echo "Waiting for tunnel"
sleep 5

# Run migrations
flyway-*/flyway -url="jdbc:mysql://127.0.0.1:63306/$db_name" -locations=filesystem:$2/databases/tracker -user=$db_username -password=$db_password migrate

kill -STOP $cf_ssh_pid
```

To run the script, pass the application name and root directory to the script:

```bash
./scripts/migrate-databases.sh pal-tracker .
```

Once the script has completed, the Cloud Foundry database is ready to go!