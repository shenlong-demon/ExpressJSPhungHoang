-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phbill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationId" INTEGER NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "discount" REAL NOT NULL DEFAULT 0,
    "customerId" INTEGER,
    "employeeId" INTEGER,
    "receiptedAt" INTEGER NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "estimation" INTEGER,
    "appKey" TEXT,
    "total" REAL NOT NULL,
    "profit" REAL NOT NULL,
    CONSTRAINT "phbill_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "phcustomer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "phbill_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "phemployee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_phbill" ("appKey", "createdAt", "customerId", "discount", "employeeId", "estimation", "id", "name", "note", "operationId", "phone", "profit", "total", "updatedAt") SELECT "appKey", "createdAt", "customerId", "discount", "employeeId", "estimation", "id", "name", "note", "operationId", "phone", "profit", "total", "updatedAt" FROM "phbill";
DROP TABLE "phbill";
ALTER TABLE "new_phbill" RENAME TO "phbill";
CREATE UNIQUE INDEX "phbill_id_key" ON "phbill"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
