/*
  Warnings:

  - Added the required column `images` to the `Tome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tome` ADD COLUMN `images` JSON NOT NULL;
