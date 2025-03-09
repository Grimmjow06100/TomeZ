-- CreateTable
CREATE TABLE "HistoriqueDerniereLecture" (
    "userId" INTEGER NOT NULL,
    "tomeMangaId" INTEGER NOT NULL,
    "tomeNumero" INTEGER NOT NULL,
    "lastPage" INTEGER,

    CONSTRAINT "HistoriqueDerniereLecture_pkey" PRIMARY KEY ("userId","tomeMangaId","tomeNumero")
);

-- AddForeignKey
ALTER TABLE "HistoriqueDerniereLecture" ADD CONSTRAINT "HistoriqueDerniereLecture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueDerniereLecture" ADD CONSTRAINT "HistoriqueDerniereLecture_tomeMangaId_tomeNumero_fkey" FOREIGN KEY ("tomeMangaId", "tomeNumero") REFERENCES "Tome"("mangaId", "numero") ON DELETE CASCADE ON UPDATE CASCADE;
