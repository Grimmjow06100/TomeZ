import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import dotenv from 'dotenv';
import { hideBin } from "yargs/helpers";

dotenv.config();


function buildTomeJson(folderPath, jsonPath) {
  try {
      const baseUrl = `${process.env.PROTOCOL}://${process.env.HOSTNAME}:${process.env.PORT}${process.env.ROUTE}/`;

      if (!fs.existsSync(folderPath)) {
          console.error(`Erreur : Le dossier "${folderPath}" n'existe pas.`);
          return;
      }

      const mangaFolders = fs.readdirSync(folderPath).filter(manga => fs.statSync(path.join(folderPath, manga)).isDirectory());
      let mangaData = [];

      for (const manga of mangaFolders) {
          const mangaPath = path.join(folderPath, manga);
          const tomeFiles = fs.readdirSync(mangaPath).filter(tome => fs.statSync(path.join(mangaPath, tome)).isDirectory()).sort((a, b) => {
              // Extraire le numéro avant l'extension
              const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
              const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
              return numA - numB; // Trier numériquement
          });

          console.log(tomeFiles);
          let j = 1;
          for (const tome of tomeFiles) {
              const tomePath = path.join(mangaPath, tome);
              if (!fs.existsSync(tomePath)) {
                  console.error(`Erreur : Le dossier du tome "${tomePath}" n'existe pas.`);
                  continue;
              }
              const images = fs.readdirSync(tomePath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).sort((a, b) => {
                // Extraire le numéro avant l'extension
                const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
                const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
                return numA - numB; // Trier numériquement
            });

              if (images.length === 0) {
                  console.error(`Erreur : Aucune image trouvée dans "${tomePath}".`);
                  continue;
              }

              // Construction de l'URL des images
              const imageUrls = images.map(image => `${baseUrl}${manga}/${tome}/${image}`);

              mangaData.push({
                  mangaName: manga,
                  numero: j,
                  images: imageUrls,
                  cover: `${baseUrl}${manga}/${tome}/${images[0]}`
              });

              j++;
          }
      }
      fs.writeFileSync(jsonPath, JSON.stringify(mangaData, null, 2));
      console.log(`Fichier JSON créé avec succès : ${jsonPath}`);
  } catch (error) {
      console.error(`Erreur dans buildTomeJson(): ${error.message}`);
  }
}

yargs(hideBin(process.argv))
  .command("tome", "Build the json file for the tome tables", (yargs) => {
    yargs.option("path", {
      alias: "p",
      type: "string",
      demandOption: true,
      description: "The path to the manga folder"
    });
    yargs.option("json", {
      alias: "j",
      type: "string",
      demandOption: true,
      description: "The path to the json file"
    });
  },
  (argv) => {
    buildTomeJson(argv.path, argv.json);
  })
  .argv;