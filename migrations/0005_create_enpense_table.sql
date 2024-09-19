-- CreateTable
CREATE TABLE "phexpense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "appKey" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "phexpense_id_key" ON "phexpense"("id");
