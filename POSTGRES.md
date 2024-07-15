# Local
## Login
```shell
psql -U postgres
```
```shell
username: postgres
password: 123456
```
# Command
### List all datables
```shell
\l
```
### Using database
```shell
\c phunghoangdb
```
### List all tables
```shell
\dt
```
### View table info
```shell
\d+ [tables name]
```
### SELECT
```shell
select * from phuser;
```

## Drop all Tables
```
DROP TABLE phproduct, phgroup, phbrand, phuser, _prisma_migrations;
```
