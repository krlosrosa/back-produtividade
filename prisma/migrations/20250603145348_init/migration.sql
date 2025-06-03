/*
  Warnings:

  - A unique constraint covering the columns `[idPallet,transporte,processo,segmento]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Item_idPallet_transporte_processo_key` ON `Item`;

-- CreateIndex
CREATE UNIQUE INDEX `Item_idPallet_transporte_processo_segmento_key` ON `Item`(`idPallet`, `transporte`, `processo`, `segmento`);
