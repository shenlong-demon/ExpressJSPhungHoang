# SETUP

## PRISMA

### Init

```shell
npx prisma init --datasource-provider sqlite
```

- Update schema file `prisma/schema.prisma` with using adapter d1 and result is

```
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- Continue update schema file `prisma/schema.prisma` with adding models and command

```shell
 npx prisma generate
```

- It will generate class/type based on our models in `.\node_modules\@prisma\client `
- Now we can access table via generated class/type based on models like

```typescript
await prisma.phuser.findFirst();
```

# D1 DATABASE
## Setup
- Login
```shell
npx wrangler login
```
## CREATE
- Create D1 database
```shell
npx wrangler d1 create phd1
```

# APPLY TO PRISMA

## MIGRATION

We are using D1 database with SQLite

### Create first migration

```shell
npx wrangler d1 migrations create phd1 init
```

- After running, we hava a file sql with path is `./migrations/0001_init.sql`
- And we will run below command to fill sql command into file `./migrations/0001_init.sql`

```shell
 npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_init.sql
```

### Or creating update migration

```shell
npx wrangler d1 migrations create phd1 create_or_update_table
```

- After running, we hava a file sql with path is `./migrations/0002_create_or_update_table.sql`
- And run command to compare with database source on local and generate new mogration file

```shell
npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0002_create_or_update_table.sql
```

- Now the file `migrations/0002_create_or_update_table.sql` is filled with full SQL command and ready to apply

## Run / Deploy / Migrate

We run command `apply` to modify database with the migration files

- On Local

```shell
npx wrangler d1 migrations apply phd1 --local
```

- On Server

```shell
npx wrangler d1 migrations apply phd1 --remote
```

## UPDATE

# List all tables

```shell
npx wrangler d1 execute phd1 --local --command="SELECT name FROM sqlite_master WHERE type='table'"
```

# Select

npx wrangler d1 execute phd1 --local --command="SELECT * from phuser"


# EXECUTE SQL
## Execute sql file
npx wrangler d1 execute phd1 --local --file="./prisma/seed_init.sql"
