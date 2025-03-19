/*
  Warnings:

  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `session` DROP PRIMARY KEY,
    MODIFY `token` VARCHAR(512) NOT NULL,
    ADD PRIMARY KEY (`token`);
