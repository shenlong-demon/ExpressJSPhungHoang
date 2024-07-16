rm -rf ./prisma/migrations
psql -U postgres -d phunghoangdb -c "DROP TABLE phorder,phbill ,phbooking, phoperation, phproduct, phcustomer, phgroup, phbrand, phuser, phemployee, _prisma_migrations;"
npx prisma migrate dev --name init
psql -U postgres -d phunghoangdb -c "SET client_encoding TO 'UTF8'"
