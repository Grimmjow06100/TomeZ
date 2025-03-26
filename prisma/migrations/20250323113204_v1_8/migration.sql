/*
  Warnings:

  - A unique constraint covering the columns `[cover]` on the table `Tome` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tome_cover_key` ON `Tome`(`cover`);
