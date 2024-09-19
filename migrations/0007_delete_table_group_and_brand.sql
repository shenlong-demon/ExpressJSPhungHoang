-- DropIndex
DROP INDEX "phbrand_id_key";

-- DropIndex
DROP INDEX "phgroup_id_key";



-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phproduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "otherName" TEXT,
    "image" TEXT,
    "price" REAL NOT NULL,
    "basePrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "appKey" TEXT
);
INSERT INTO "new_phproduct" ("appKey", "basePrice", "code", "createdAt", "id", "image", "name", "otherName", "price", "quantity", "status", "updatedAt") SELECT "appKey", "basePrice", "code", "createdAt", "id", "image", "name", "otherName", "price", "quantity", "status", "updatedAt" FROM "phproduct";
DROP TABLE "phproduct";
ALTER TABLE "new_phproduct" RENAME TO "phproduct";
CREATE UNIQUE INDEX "phproduct_id_key" ON "phproduct"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "phbrand";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "phgroup";
PRAGMA foreign_keys=on;
