-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DadosTransporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transporte" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "caixas" INTEGER NOT NULL,
    "unidade" INTEGER NOT NULL,
    "visitado" INTEGER NOT NULL,
    "horaInicio" DATETIME NOT NULL,
    "horaFim" DATETIME,
    "centerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dataRegistro" DATETIME NOT NULL,
    CONSTRAINT "DadosTransporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DadosTransporte_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("centerId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DadosTransporte" ("caixas", "centerId", "dataRegistro", "empresa", "horaFim", "horaInicio", "id", "processo", "transporte", "unidade", "userId", "visitado") SELECT "caixas", "centerId", "dataRegistro", "empresa", "horaFim", "horaInicio", "id", "processo", "transporte", "unidade", "userId", "visitado" FROM "DadosTransporte";
DROP TABLE "DadosTransporte";
ALTER TABLE "new_DadosTransporte" RENAME TO "DadosTransporte";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
