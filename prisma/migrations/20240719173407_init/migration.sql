-- CreateTable
CREATE TABLE "phuser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "token" VARCHAR(255) DEFAULT '',
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phbrand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phbrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phgroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phproduct" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50),
    "name" VARCHAR(255) NOT NULL,
    "otherName" VARCHAR(255),
    "image" VARCHAR(500),
    "price" DOUBLE PRECISION NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "brandId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phproduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phcustomer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nickName" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "image" VARCHAR(500),
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phcustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phoperation" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "customerId" INTEGER,
    "employeeId" INTEGER,
    "estimation" TIMESTAMP(3),
    "appKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phoperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phbooking" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,
    "operationId" INTEGER NOT NULL,

    CONSTRAINT "phbooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phbill" (
    "id" SERIAL NOT NULL,
    "operationId" INTEGER NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "customerId" INTEGER,
    "employeeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estimation" TIMESTAMP(3),
    "appKey" TEXT,
    "total" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "phbill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phorder" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "productId" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,
    "billId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "phorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phemployee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "phemployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phuser_id_key" ON "phuser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phuser_phone_key" ON "phuser"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "phbrand_id_key" ON "phbrand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phgroup_id_key" ON "phgroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phproduct_id_key" ON "phproduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phcustomer_id_key" ON "phcustomer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phoperation_id_key" ON "phoperation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phbooking_id_key" ON "phbooking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phbill_id_key" ON "phbill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phorder_id_key" ON "phorder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phemployee_id_key" ON "phemployee"("id");

-- AddForeignKey
ALTER TABLE "phproduct" ADD CONSTRAINT "phproduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "phbrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phproduct" ADD CONSTRAINT "phproduct_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "phgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phoperation" ADD CONSTRAINT "phoperation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "phcustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phoperation" ADD CONSTRAINT "phoperation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "phemployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phbooking" ADD CONSTRAINT "phbooking_productId_fkey" FOREIGN KEY ("productId") REFERENCES "phproduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phbooking" ADD CONSTRAINT "phbooking_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "phoperation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phbill" ADD CONSTRAINT "phbill_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "phcustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phbill" ADD CONSTRAINT "phbill_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "phemployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phorder" ADD CONSTRAINT "phorder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "phproduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phorder" ADD CONSTRAINT "phorder_billId_fkey" FOREIGN KEY ("billId") REFERENCES "phbill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
