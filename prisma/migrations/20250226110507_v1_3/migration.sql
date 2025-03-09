/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingListTome` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingListTome" DROP CONSTRAINT "ReadingListTome_readingListId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingListTome" DROP CONSTRAINT "ReadingListTome_tomeMangaId_tomeNumero_fkey";

-- AlterTable
ALTER TABLE "HistoriqueDerniereLecture" ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "ReadingList";

-- DropTable
DROP TABLE "ReadingListTome";

-- CreateTable
CREATE TABLE "MyListManga" (
    "mangaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MyListManga_pkey" PRIMARY KEY ("mangaId","userId")
);

-- AddForeignKey
ALTER TABLE "MyListManga" ADD CONSTRAINT "MyListManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyListManga" ADD CONSTRAINT "MyListManga_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
