-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phcloseoutreport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" INTEGER NOT NULL,
    "numberOfBill" INTEGER NOT NULL,
    "totalBill" INTEGER NOT NULL,
    "totalProfit" REAL NOT NULL,
    "totalDiscount" REAL NOT NULL,
    "numberOfExpense" INTEGER NOT NULL DEFAULT 0,
    "totalExpense" REAL NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "appKey" TEXT
);
INSERT INTO "new_phcloseoutreport" ("appKey", "createdAt", "date", "id", "numberOfBill", "totalBill", "totalDiscount", "totalProfit", "updatedAt") SELECT "appKey", "createdAt", "date", "id", "numberOfBill", "totalBill", "totalDiscount", "totalProfit", "updatedAt" FROM "phcloseoutreport";
DROP TABLE "phcloseoutreport";
ALTER TABLE "new_phcloseoutreport" RENAME TO "phcloseoutreport";
CREATE UNIQUE INDEX "phcloseoutreport_id_key" ON "phcloseoutreport"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
