import fs from "fs";
import { PrismaClient } from '@prisma/client'
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import dotenv from "dotenv";
dotenv.config();



const prisma = new PrismaClient();

function pickCover(mangaPath) {
  try {
      console.log(`On récupère la couverture du manga ${mangaPath}`);
      const baseUrl = `${process.env.PROTOCOL}://${process.env.HOSTNAME}:${process.env.PORT}${process.env.ROUTE}/`;
      const manga = path.basename(mangaPath);

      if (!fs.existsSync(mangaPath)) {
          console.error(`Erreur : Le dossier du manga "${mangaPath}" n'existe pas.`);
          return null;
      }

      // Lire et trier les tomes correctement
      const tomeFiles = fs.readdirSync(mangaPath)
          .filter(tome => fs.statSync(path.join(mangaPath, tome)).isDirectory()) // Filtrer pour ne garder que les dossiers
          .sort((a, b) => {
              const numA = parseInt(a.replace(/\D/g, ''), 10) || 0; // Extraire le numéro
              const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
              return numA - numB;
          });

      if (tomeFiles.length === 0) {
          console.error(`Erreur : Aucun tome trouvé pour "${mangaPath}".`);
          return null;
      }

      const randomCover = Math.floor(Math.random() * tomeFiles.length);
      console.log(`On récupère la couverture du tome ${randomCover + 1}:`);

      const tomePath = path.join(mangaPath, tomeFiles[randomCover]);
      if (!fs.existsSync(tomePath)) {
          console.error(`Erreur : Le dossier du tome "${tomePath}" n'existe pas.`);
          return null;
      }

      const images = fs.readdirSync(tomePath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)); // Filtrer les images

      if (images.length === 0) {
          console.error(`Erreur : Aucune image trouvée dans "${tomePath}".`);
          return null;
      }

      const url = `${baseUrl}${manga}/${tomeFiles[randomCover]}/${images[0]}`;
      console.log(`Voici son URL : ${url}`);
      return url;
  } catch (error) {
      console.error(`Erreur dans pickCover(): ${error.message}`);
      return null;
  }
}

async function updateCover(mangaPath) {
    try {
        const url= pickCover(mangaPath);
        if (url === null) {
            return;
        }
        else {
            const manga=path.basename(mangaPath);
            await prisma.manga.update({
                where: { name: manga },
                data: { cover: url }
            });
            console.log(`✅ Couverture ajoutée avec succès pour le manga "${manga}" !`);
        }
    } catch (error) {
        console.error(`Erreur dans addCoverToJson(): ${error.message}`);
    }
    
}

async function createManga(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`Erreur : Le fichier "${filePath}" n'existe pas.`);
            return;
        }

        const rawData = fs.readFileSync(filePath, 'utf-8');
        let data;

        try {
            data = JSON.parse(rawData);
        } catch (jsonError) {
            console.error(`Erreur de parsing JSON : ${jsonError.message}`);
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Erreur : Le fichier JSON ne contient pas un tableau valide.");
            return;
        }

        const manga = await prisma.manga.createMany({ data });

        console.log(`✅ Manga(s) créé(s) avec succès (${manga.count} enregistrements) !`);
    } catch (error) {
        console.error(`❌ Erreur lors de la création du manga : ${error.message}`);
    }
}

async function createTome(jsonPath) {
    try {
        if (!fs.existsSync(jsonPath)) {
            console.error(`Erreur : Le fichier "${jsonPath}" n'existe pas.`);
            return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        let data;

        try {
            data = JSON.parse(rawData);
        } catch (jsonError) {
            console.error(`Erreur de parsing JSON : ${jsonError.message}`);
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Erreur : Le fichier JSON ne contient pas un tableau valide.");
            return;
        }

        const tome = await prisma.tome.createMany({ data });

        console.log(`✅ Tome(s) créé(s) avec succès (${tome.count} enregistrements) !`);
    } catch (error) {
        console.error(`❌ Erreur lors de la création du tome : ${error.message}`);
    }
}

async function createTag(jsonPath) {
    try {
        if (!fs.existsSync(jsonPath)) {
            console.error(`Erreur : Le fichier "${jsonPath}" n'existe pas.`);
            return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        let data;

        try {
            data = JSON.parse(rawData);
        } catch (jsonError) {
            console.error(`Erreur de parsing JSON : ${jsonError.message}`);
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Erreur : Le fichier JSON ne contient pas un tableau valide.");
            return;
        }

        const tag = await prisma.tag.createMany({ data });

        console.log(`✅ Tag(s) créé(s) avec succès (${tag.count} enregistrements) !`);
    } catch (error) {
        console.error(`❌ Erreur lors de la création du tag : ${error.message}`);
    }
}

async function createMangaTag(jsonPath){
    try {
        if (!fs.existsSync(jsonPath)) {
            console.error(`Erreur : Le fichier "${jsonPath}" n'existe pas.`);
            return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        let data;

        try {
            data = JSON.parse(rawData);
        } catch (jsonError) {
            console.error(`Erreur de parsing JSON : ${jsonError.message}`);
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Erreur : Le fichier JSON ne contient pas un tableau valide.");
            return;
        }

        const mangaTag = await prisma.mangaTag.createMany({ data });

        console.log(`✅ MangaTag(s) créé(s) avec succès (${mangaTag.count} enregistrements) !`);
    } catch (error) {
        console.error(`❌ Erreur lors de la création du mangaTag : ${error.message}`);
    }
}
 yargs(hideBin(process.argv))
    .command("manga", "Create the manga table", (yargs) => {
        yargs.option("path", {
            alias: "p",
            type: "string",
            demandOption: true,
            description: "The path to the manga json file"
        });
    },
    (argv) => {
        createManga(argv.path);
    })
    .command("tome", "Create the tome table", (yargs) => {
        yargs.option("path", {
            alias: "p",
            type: "string",
            demandOption: true,
            description: "The path to the tome json file"
        });
    },
    (argv) => {
        createTome(argv.path);
    })
    .command("tag", "Create the tag table", (yargs) => {
        yargs.option("path", {
            alias: "p",
            type: "string",
            demandOption: true,
            description: "The path to the tag json file"
        });
    },
    (argv) => {
        createTag(argv.path);
    })
    .command("cover", "Update the cover of the manga table", (yargs) => {
        yargs.option("path", {
            alias: "p",
            type: "string",
            demandOption: true,
            description: "The path to the manga folder"
        });
    },
    (argv) => {
        updateCover(argv.path);
    })
    .command("mangaTag", "Create the mangaTag table", (yargs) => {
        yargs.option("path", {
            alias: "p",
            type: "string",
            demandOption: true,
            description: "The path to the mangaTag json file"
        });
    },
    (argv) => {
        createMangaTag(argv.path);
    })
    .argv;







