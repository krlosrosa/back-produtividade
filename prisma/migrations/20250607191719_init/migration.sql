-- CreateTable
CREATE TABLE `PausaGeral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `centerId` VARCHAR(191) NOT NULL,
    `processo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PausaGeral_processo_centerId_key`(`processo`, `centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PausaGeral` ADD CONSTRAINT `PausaGeral_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`centerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
