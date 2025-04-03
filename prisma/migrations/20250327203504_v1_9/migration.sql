/*
  Warnings:

  - The primary key for the `historiquedernierelecture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `historiquedernierelecture` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`userId`, `mangaName`);
