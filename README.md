# PhungHoangExpressJS

# Migration
## Create migration file 
1. Update prisma/schema.prisma
2. Run migrate to update
```
DATABASE_URL=postgres://postgres:123456@localhost:5432/postgres prisma migrate dev --name added-xxxxxx
```

## Seed default data
```shell
npx prisma db seed
```

# Run
## Debug
```shell
yarn start
```
## Localhost
```shell
ngrok http --domain=fresh-recently-bedbug.ngrok-free.app 3000 
```
