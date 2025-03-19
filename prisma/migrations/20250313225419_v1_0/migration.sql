/*
  Warnings:

  - You are about to drop the column `expiration` on the `session` table. All the data in the column will be lost.
  - Added the required column `ex` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `expiration`,
    ADD COLUMN `ex` TIMESTAMP(0) NOT NULL;
