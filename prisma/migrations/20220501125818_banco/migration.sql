/*
  Warnings:

  - You are about to drop the column `ibge` on the `cidades` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `cidades` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `cidades` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to drop the column `ddd` on the `estados` table. All the data in the column will be lost.
  - You are about to drop the column `ibge` on the `estados` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `estados` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `estados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `uf` on the `estados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to drop the `paises` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_estado` to the `cidades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cidades` DROP FOREIGN KEY `cidades_ibfk_1`;

-- DropForeignKey
ALTER TABLE `estados` DROP FOREIGN KEY `estados_ibfk_1`;

-- AlterTable
ALTER TABLE `cidades` DROP COLUMN `ibge`,
    DROP COLUMN `uf`,
    ADD COLUMN `id_estado` INTEGER NOT NULL,
    MODIFY `nome` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `estados` DROP COLUMN `ddd`,
    DROP COLUMN `ibge`,
    DROP COLUMN `pais`,
    MODIFY `nome` VARCHAR(100) NOT NULL,
    MODIFY `uf` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `paises`;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
