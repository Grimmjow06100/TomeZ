/*
  Warnings:

  - The primary key for the `HistoriqueDerniereLecture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tomeMangaId` on the `HistoriqueDerniereLecture` table. All the data in the column will be lost.
  - The primary key for the `Manga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Manga` table. All the data in the column will be lost.
  - The primary key for the `MangaTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mangaId` on the `MangaTag` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `MangaTag` table. All the data in the column will be lost.
  - The primary key for the `MyListManga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mangaId` on the `MyListManga` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `Tome` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mangaId` on the `Tome` table. All the data in the column will be lost.
  - Added the required column `tomeMangaName` to the `HistoriqueDerniereLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mangaName` to the `MangaTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagLabel` to the `MangaTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mangaName` to the `MyListManga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mangaName` to the `Tome` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoriqueDerniereLecture" DROP CONSTRAINT "HistoriqueDerniereLecture_tomeMangaId_tomeNumero_fkey";

-- DropForeignKey
ALTER TABLE "MangaTag" DROP CONSTRAINT "MangaTag_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "MangaTag" DROP CONSTRAINT "MangaTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "MyListManga" DROP CONSTRAINT "MyListManga_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Tome" DROP CONSTRAINT "Tome_mangaId_fkey";

-- DropIndex
DROP INDEX "Manga_name_key";

-- DropIndex
DROP INDEX "Tag_label_key";

-- AlterTable
ALTER TABLE "HistoriqueDerniereLecture" DROP CONSTRAINT "HistoriqueDerniereLecture_pkey",
DROP COLUMN "tomeMangaId",
ADD COLUMN     "tomeMangaName" TEXT NOT NULL,
ADD CONSTRAINT "HistoriqueDerniereLecture_pkey" PRIMARY KEY ("userId", "tomeMangaName", "tomeNumero");

-- AlterTable
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Manga_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "MangaTag" DROP CONSTRAINT "MangaTag_pkey",
DROP COLUMN "mangaId",
DROP COLUMN "tagId",
ADD COLUMN     "mangaName" TEXT NOT NULL,
ADD COLUMN     "tagLabel" TEXT NOT NULL,
ADD CONSTRAINT "MangaTag_pkey" PRIMARY KEY ("mangaName", "tagLabel");

-- AlterTable
ALTER TABLE "MyListManga" DROP CONSTRAINT "MyListManga_pkey",
DROP COLUMN "mangaId",
ADD COLUMN     "mangaName" TEXT NOT NULL,
ADD CONSTRAINT "MyListManga_pkey" PRIMARY KEY ("mangaName", "userId");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("label");

-- AlterTable
ALTER TABLE "Tome" DROP CONSTRAINT "Tome_pkey",
DROP COLUMN "mangaId",
ADD COLUMN     "mangaName" TEXT NOT NULL,
ADD CONSTRAINT "Tome_pkey" PRIMARY KEY ("mangaName", "numero");

-- AddForeignKey
ALTER TABLE "MyListManga" ADD CONSTRAINT "MyListManga_mangaName_fkey" FOREIGN KEY ("mangaName") REFERENCES "Manga"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueDerniereLecture" ADD CONSTRAINT "HistoriqueDerniereLecture_tomeMangaName_tomeNumero_fkey" FOREIGN KEY ("tomeMangaName", "tomeNumero") REFERENCES "Tome"("mangaName", "numero") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaTag" ADD CONSTRAINT "MangaTag_mangaName_fkey" FOREIGN KEY ("mangaName") REFERENCES "Manga"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaTag" ADD CONSTRAINT "MangaTag_tagLabel_fkey" FOREIGN KEY ("tagLabel") REFERENCES "Tag"("label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tome" ADD CONSTRAINT "Tome_mangaName_fkey" FOREIGN KEY ("mangaName") REFERENCES "Manga"("name") ON DELETE CASCADE ON UPDATE CASCADE;
