/*
  Warnings:

  - Made the column `id_senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `id_senha` INTEGER NOT NULL,
    MODIFY `data_nasc` DATE NULL;
