-- CreateTable
CREATE TABLE `Center` (
    `centerId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `cluster` VARCHAR(191) NOT NULL DEFAULT 'distribuicao',

    UNIQUE INDEX `Center_centerId_key`(`centerId`),
    PRIMARY KEY (`centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `centerId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionarios` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `centerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DadosTransporte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transporte` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `processo` VARCHAR(191) NOT NULL,
    `caixas` INTEGER NOT NULL,
    `unidade` INTEGER NOT NULL,
    `visitado` INTEGER NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFim` DATETIME(3) NULL,
    `centerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `dataRegistro` DATETIME(3) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NOT NULL,
    `idPallet` VARCHAR(191) NOT NULL,
    `linhasPickingVisitadas` INTEGER NOT NULL,
    `quantidadeCaixa` INTEGER NOT NULL,
    `quantidadeUnidade` INTEGER NOT NULL,
    `idDemanda` INTEGER NOT NULL,
    `transporte` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Item_idPallet_transporte_key`(`idPallet`, `transporte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`centerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Funcionarios` ADD CONSTRAINT `Funcionarios_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`centerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosTransporte` ADD CONSTRAINT `DadosTransporte_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `Funcionarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosTransporte` ADD CONSTRAINT `DadosTransporte_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosTransporte` ADD CONSTRAINT `DadosTransporte_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`centerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_idDemanda_fkey` FOREIGN KEY (`idDemanda`) REFERENCES `DadosTransporte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
