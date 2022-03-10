-- CreateTable
CREATE TABLE `anuncios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_tipo_anuncio` INTEGER NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,
    `valor` INTEGER NOT NULL,
    `data_criado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` TINYINT NOT NULL,
    `patrocinado` TINYINT NOT NULL,
    `cep` VARCHAR(255) NULL,
    `rua` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(255) NOT NULL,
    `complemento` VARCHAR(255) NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(255) NOT NULL,

    INDEX `id_tipo_anuncio`(`id_tipo_anuncio`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,
    `caminho` VARCHAR(255) NULL,
    `id_anuncio` INTEGER NOT NULL,
    `principal` BOOLEAN NULL,
    `data_criado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_anuncio`(`id_anuncio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_anuncios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,
    `data_criado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,
    `ativo` INTEGER NULL DEFAULT 1,
    `id_senha` INTEGER NOT NULL,
    `email` VARCHAR(255) NULL,
    `telefone` VARCHAR(255) NULL,
    `data_nasc` DATE NULL,
    `cpf` VARCHAR(255) NULL,
    `login` VARCHAR(255) NULL,
    `senha` VARCHAR(255) NULL,
    `data_criado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` INTEGER NULL,
    `ativo` INTEGER NULL DEFAULT 1,
    `id_anuncio` INTEGER NOT NULL,
    `data_criado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizado` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_anuncio`(`id_anuncio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_ibfk_2` FOREIGN KEY (`id_tipo_anuncio`) REFERENCES `tipo_anuncios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `imagens` ADD CONSTRAINT `imagens_ibfk_1` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `valores` ADD CONSTRAINT `valores_ibfk_1` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
