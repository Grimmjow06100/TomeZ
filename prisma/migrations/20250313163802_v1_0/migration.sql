-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manga` (
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoriqueDerniereLecture` (
    `userId` INTEGER NOT NULL,
    `tomeMangaName` VARCHAR(191) NOT NULL,
    `tomeNumero` INTEGER NOT NULL,
    `lastPage` INTEGER NULL,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fin` BOOLEAN NOT NULL,

    PRIMARY KEY (`userId`, `tomeMangaName`, `tomeNumero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MangaTag` (
    `mangaName` VARCHAR(191) NOT NULL,
    `tagLabel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mangaName`, `tagLabel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tome` (
    `mangaName` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,

    PRIMARY KEY (`mangaName`, `numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`label`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expiration` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_token_key`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manga` ADD CONSTRAINT `Manga_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueDerniereLecture` ADD CONSTRAINT `HistoriqueDerniereLecture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueDerniereLecture` ADD CONSTRAINT `HistoriqueDerniereLecture_tomeMangaName_tomeNumero_fkey` FOREIGN KEY (`tomeMangaName`, `tomeNumero`) REFERENCES `Tome`(`mangaName`, `numero`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MangaTag` ADD CONSTRAINT `MangaTag_mangaName_fkey` FOREIGN KEY (`mangaName`) REFERENCES `Manga`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MangaTag` ADD CONSTRAINT `MangaTag_tagLabel_fkey` FOREIGN KEY (`tagLabel`) REFERENCES `Tag`(`label`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tome` ADD CONSTRAINT `Tome_mangaName_fkey` FOREIGN KEY (`mangaName`) REFERENCES `Manga`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
