/*
  Warnings:

  - A unique constraint covering the columns `[cover]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Manga_cover_key` ON `Manga`(`cover`);
