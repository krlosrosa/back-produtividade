-- CreateTable
CREATE TABLE "Center" (
    "centerId" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "token" TEXT,
    CONSTRAINT "User_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("centerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    CONSTRAINT "Funcionarios_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("centerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DadosTransporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transporte" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "caixas" INTEGER NOT NULL,
    "unidade" INTEGER NOT NULL,
    "visitado" INTEGER NOT NULL,
    "horaInicio" DATETIME NOT NULL,
    "horaFim" DATETIME
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "idPallet" TEXT NOT NULL,
    "linhasPickingVisitadas" INTEGER NOT NULL,
    "processo" TEXT NOT NULL,
    "quantidadeCaixa" INTEGER NOT NULL,
    "quantidadeUnidade" INTEGER NOT NULL,
    "idDemanda" INTEGER NOT NULL,
    "transporte" TEXT NOT NULL,
    CONSTRAINT "Item_idDemanda_fkey" FOREIGN KEY ("idDemanda") REFERENCES "DadosTransporte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Center_centerId_key" ON "Center"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_idPallet_transporte_key" ON "Item"("idPallet", "transporte");
