/*
  Warnings:

  - Added the required column `bairro` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `bairro` VARCHAR(255) NOT NULL,
    ADD COLUMN `cep` VARCHAR(255) NULL,
    ADD COLUMN `cidade` VARCHAR(255) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(255) NULL,
    ADD COLUMN `estado` VARCHAR(255) NOT NULL,
    ADD COLUMN `numero` VARCHAR(255) NOT NULL,
    ADD COLUMN `rua` VARCHAR(255) NOT NULL;
