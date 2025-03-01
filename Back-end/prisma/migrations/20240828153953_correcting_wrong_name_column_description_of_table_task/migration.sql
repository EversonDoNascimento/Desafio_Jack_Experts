/*
  Warnings:

  - You are about to drop the column `descripion` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `descripion`,
    ADD COLUMN `description` LONGTEXT NULL;
