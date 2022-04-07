/*
  Warnings:

  - Made the column `nome` on table `imagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `caminho` on table `imagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `principal` on table `imagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `tipo_anuncios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ativo` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nasc` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `login` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valor` on table `valores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ativo` on table `valores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `anuncios` MODIFY `data_criado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `data_atualizado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `imagens` MODIFY `nome` VARCHAR(255) NOT NULL,
    MODIFY `caminho` VARCHAR(255) NOT NULL,
    MODIFY `principal` BOOLEAN NOT NULL,
    MODIFY `data_criado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `data_atualizado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `tipo_anuncios` MODIFY `nome` VARCHAR(255) NOT NULL,
    MODIFY `data_criado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `data_atualizado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `usuarios` MODIFY `nome` VARCHAR(255) NOT NULL,
    MODIFY `ativo` INTEGER NOT NULL DEFAULT 1,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `telefone` VARCHAR(255) NOT NULL,
    MODIFY `data_nasc` DATE NOT NULL,
    MODIFY `cpf` VARCHAR(255) NOT NULL,
    MODIFY `login` VARCHAR(255) NOT NULL,
    MODIFY `senha` VARCHAR(255) NOT NULL,
    MODIFY `data_criado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `data_atualizado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `valores` MODIFY `valor` INTEGER NOT NULL,
    MODIFY `ativo` INTEGER NOT NULL DEFAULT 1,
    MODIFY `data_criado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `data_atualizado` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);
