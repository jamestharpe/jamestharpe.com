---
date: 2022-03-08T14:33:30-04:00
description: "Microsoft's flagship relational database"
tags: ["relational-databases"]
title: "Microsoft SQL Server  (MSSQL)"
---

# Microsoft SQL Server  (MSSQL)

**Microsoft SQL Server (MSSQL)** is a [relational database](relational-databases.md) from Microsoft, known for its exceptional developer experience. MSSQL can be run on [Windows](windows.md) or [Linux](linux.md).

## MSSQL Recipes

### Install MSSQL on Ubuntu

See [How to install MSSQL on Ubuntu](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu).

### List all stored procedures in a database

```sql
SELECT * 
FROM <database>.INFORMATION_SCHEMA.ROUTINES -- replace <database> with the name of the database you're querying
WHERE ROUTINE_TYPE = 'PROCEDURE'
```

### Start MSSQL Server on WSL2

[WSL2](wsl.md) does not include [`systemd`](systemd.md), therefore the `systemctl` command will not work to start the `mssql-server` service on WSL2-hosted Linux instances:

```bash
$ systemctl status mssql-server --no-pager
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

To remedy that, start the service directly:

```bash
sudo /opt/mssql/bin/sqlservr
```
