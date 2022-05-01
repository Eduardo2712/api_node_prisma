-- CreateTable
CREATE TABLE `paises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `nome_ptbr` VARCHAR(255) NOT NULL,
    `sigla` VARCHAR(255) NOT NULL,
    `bacen` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `uf` VARCHAR(255) NOT NULL,
    `ibge` INTEGER NOT NULL,
    `pais` INTEGER NOT NULL,
    `ddd` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `uf` INTEGER NOT NULL,
    `ibge` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estados` ADD CONSTRAINT `estados_ibfk_1` FOREIGN KEY (`pais`) REFERENCES `paises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`uf`) REFERENCES `estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
