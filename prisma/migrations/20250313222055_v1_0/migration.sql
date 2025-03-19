/*
  Warnings:

  - Added the required column `expiration` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` ADD COLUMN `expiration` DATETIME(3) NOT NULL;
