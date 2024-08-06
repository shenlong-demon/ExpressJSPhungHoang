-- CreateTable
CREATE TABLE "phcloseoutreport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" INTEGER NOT NULL,
    "numberOfBill" INTEGER NOT NULL,
    "totalBill" INTEGER NOT NULL,
    "totalProfit" REAL NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "appKey" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "phcloseoutreport_id_key" ON "phcloseoutreport"("id");
