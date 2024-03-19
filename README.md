# PhungHoangExpressJS

# Migration
## Create migration file 
```
npm run migrate create my first migration
```
and run Up Migration
## Up migration
```
DATABASE_URL=postgres://postgres:123456@localhost:5432/postgres npm run migrate up
```
## Drop all Tables
```
DROP TABLE products, groups, brands, users, pgmigrations;
```

# Run
## Debug
```shell
yarn start
```
## Localhost
```shell
ngrok http 3000
```
