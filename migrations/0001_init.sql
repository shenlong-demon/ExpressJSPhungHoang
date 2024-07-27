-- CreateTable
CREATE TABLE "phuser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT DEFAULT '',
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT
);

-- CreateTable
CREATE TABLE "phbrand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT
);

-- CreateTable
CREATE TABLE "phgroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT
);

-- CreateTable
CREATE TABLE "phproduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "otherName" TEXT,
    "image" TEXT,
    "price" REAL NOT NULL,
    "basePrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "brandId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    CONSTRAINT "phproduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "phbrand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "phproduct_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "phgroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phcustomer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "total" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "phoperation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "discount" REAL NOT NULL DEFAULT 0,
    "customerId" INTEGER,
    "employeeId" INTEGER,
    "estimation" DATETIME,
    "appKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "phoperation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "phcustomer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "phoperation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "phemployee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phbooking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "operationId" INTEGER NOT NULL,
    CONSTRAINT "phbooking_productId_fkey" FOREIGN KEY ("productId") REFERENCES "phproduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "phbooking_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "phoperation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phoperationissue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "operationId" INTEGER NOT NULL,
    CONSTRAINT "phoperationissue_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "phoperation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phbill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationId" INTEGER NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "discount" REAL NOT NULL DEFAULT 0,
    "customerId" INTEGER,
    "employeeId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "estimation" DATETIME,
    "appKey" TEXT,
    "total" REAL NOT NULL,
    "profit" REAL NOT NULL,
    CONSTRAINT "phbill_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "phcustomer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "phbill_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "phemployee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phorder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookingId" INTEGER NOT NULL,
    "productId" INTEGER,
    "price" REAL NOT NULL,
    "basePrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "billId" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "profit" REAL NOT NULL,
    CONSTRAINT "phorder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "phproduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "phorder_billId_fkey" FOREIGN KEY ("billId") REFERENCES "phbill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phbillissue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationIssueId" INTEGER NOT NULL,
    "note" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "billId" INTEGER NOT NULL,
    CONSTRAINT "phbillissue_billId_fkey" FOREIGN KEY ("billId") REFERENCES "phbill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "phemployee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appKey" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1
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
CREATE UNIQUE INDEX "phoperationissue_id_key" ON "phoperationissue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phbill_id_key" ON "phbill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phorder_id_key" ON "phorder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phbillissue_id_key" ON "phbillissue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phemployee_id_key" ON "phemployee"("id");
