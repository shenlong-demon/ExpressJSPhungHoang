# PhungHoangExpressJS
# DB Connection
- We are using DB Connection from env file with DB name is `phunghoangdb`
```shell
DATABASE_URL="postgres://postgres:123456@localhost:5432/phunghoangdb"
```

# Migration for INIT
## Remove all migrations
```shell
rm -rf ./prisma/migrations
```
## Drop all table
```shell
psql -U postgres -d phunghoangdb -c "DROP TABLE phorder,phbill ,phbooking, phoperation, phproduct, phcustomer, phgroup, phbrand, phuser, phemployee, _prisma_migrations;"
```
## Create migration file
```shell
npm run migrate_init
```
## Create default data with seed
```shell
npm run migrate_seed
```

# Migrate for updating
## Update schema.prisma file
## Create new migration file for updating
```shell
npx prisma migrate dev --name added_xxx
```

