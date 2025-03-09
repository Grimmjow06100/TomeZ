/*
  Warnings:

  - You are about to drop the column `pages` on the `Tome` table. All the data in the column will be lost.
  - Added the required column `content` to the `Tome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Tome` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TomeFormat" AS ENUM ('IMAGES', 'PDF', 'CBZ');

-- AlterTable
ALTER TABLE "Tome" DROP COLUMN "pages",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "format" "TomeFormat" NOT NULL;
