/*
  Warnings:

  - The primary key for the `historiquedernierelecture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tomeMangaName` on the `historiquedernierelecture` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `manga` table. All the data in the column will be lost.
  - Added the required column `mangaName` to the `HistoriqueDerniereLecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `historiquedernierelecture` DROP FOREIGN KEY `HistoriqueDerniereLecture_tomeMangaName_tomeNumero_fkey`;

-- DropForeignKey
ALTER TABLE `manga` DROP FOREIGN KEY `Manga_userId_fkey`;

-- DropIndex
DROP INDEX `HistoriqueDerniereLecture_tomeMangaName_tomeNumero_fkey` ON `historiquedernierelecture`;

-- DropIndex
DROP INDEX `Manga_userId_fkey` ON `manga`;

-- AlterTable
ALTER TABLE `historiquedernierelecture` DROP PRIMARY KEY,
    DROP COLUMN `tomeMangaName`,
    ADD COLUMN `mangaName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `mangaName`, `tomeNumero`);

-- AlterTable
ALTER TABLE `manga` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `Mylist` (
    `userId` INTEGER NOT NULL,
    `mangaName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `mangaName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mylist` ADD CONSTRAINT `Mylist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mylist` ADD CONSTRAINT `Mylist_mangaName_fkey` FOREIGN KEY (`mangaName`) REFERENCES `Manga`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueDerniereLecture` ADD CONSTRAINT `HistoriqueDerniereLecture_mangaName_tomeNumero_fkey` FOREIGN KEY (`mangaName`, `tomeNumero`) REFERENCES `Tome`(`mangaName`, `numero`) ON DELETE CASCADE ON UPDATE CASCADE;
