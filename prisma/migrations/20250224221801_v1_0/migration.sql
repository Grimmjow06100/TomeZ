/*
  Warnings:

  - You are about to drop the column `content` on the `Tome` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `Tome` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tome" DROP COLUMN "content",
DROP COLUMN "format",
ADD COLUMN     "images" TEXT[];

-- DropEnum
DROP TYPE "TomeFormat";
