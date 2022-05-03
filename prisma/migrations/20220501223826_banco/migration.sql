/*
  Warnings:

  - You are about to drop the column `cidade` on the `anuncios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `anuncios` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `id_cidade` to the `anuncios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_estado` to the `anuncios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_cidade` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_estado` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `anuncios` DROP COLUMN `cidade`,
    DROP COLUMN `estado`,
    ADD COLUMN `id_cidade` INTEGER NOT NULL,
    ADD COLUMN `id_estado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `cidade`,
    DROP COLUMN `estado`,
    ADD COLUMN `id_cidade` INTEGER NOT NULL,
    ADD COLUMN `id_estado` INTEGER NOT NULL;
