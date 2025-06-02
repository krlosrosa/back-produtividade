-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Center" (
    "centerId" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cluster" TEXT NOT NULL DEFAULT 'distribuicao'
);
INSERT INTO "new_Center" ("centerId", "description", "state") SELECT "centerId", "description", "state" FROM "Center";
DROP TABLE "Center";
ALTER TABLE "new_Center" RENAME TO "Center";
CREATE UNIQUE INDEX "Center_centerId_key" ON "Center"("centerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
