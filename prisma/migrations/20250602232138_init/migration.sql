/*
  Warnings:

  - A unique constraint covering the columns `[idPallet,transporte,processo]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Item_idPallet_transporte_key` ON `Item`;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `processo` VARCHAR(191) NOT NULL DEFAULT 'SEPARACAO';

-- CreateIndex
CREATE UNIQUE INDEX `Item_idPallet_transporte_processo_key` ON `Item`(`idPallet`, `transporte`, `processo`);
