/*
  Warnings:

  - You are about to drop the column `processo` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "idPallet" TEXT NOT NULL,
    "linhasPickingVisitadas" INTEGER NOT NULL,
    "quantidadeCaixa" INTEGER NOT NULL,
    "quantidadeUnidade" INTEGER NOT NULL,
    "idDemanda" INTEGER NOT NULL,
    "transporte" TEXT NOT NULL,
    CONSTRAINT "Item_idDemanda_fkey" FOREIGN KEY ("idDemanda") REFERENCES "DadosTransporte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("empresa", "id", "idDemanda", "idPallet", "linhasPickingVisitadas", "quantidadeCaixa", "quantidadeUnidade", "transporte") SELECT "empresa", "id", "idDemanda", "idPallet", "linhasPickingVisitadas", "quantidadeCaixa", "quantidadeUnidade", "transporte" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_idPallet_transporte_key" ON "Item"("idPallet", "transporte");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
