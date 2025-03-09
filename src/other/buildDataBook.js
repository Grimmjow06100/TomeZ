import { pdfToImage } from './pdfToImage.js';
import { cbzToImage } from './cbzToImage.js';
import { escapeWindowsPath } from './utils.js';
import path from 'path';
import { UnzipAll } from './unzip.js';
import fs from 'fs';
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function buildDataBook(dataBookPath, zipFilePath, binPath) {
    if (zipFilePath && !fs.existsSync(zipFilePath)) {
        console.log("❌ Le chemin du fichier ZIP est invalide ou n'existe pas.");
        return;
    } else if (zipFilePath) {
        console.log("📦 Extraction du fichier ZIP...");
        const promise = await UnzipAll(zipFilePath, dataBookPath);
        if (promise) {
            console.log("✔️ Extraction réussie !");
        }
    } else if (!zipFilePath && !fs.existsSync(dataBookPath)) {
        console.log("❌ Le chemin du dossier de sortie est invalide ou n'existe pas.");
        return;
    }

    try {
        const mangaFolders = fs.readdirSync(dataBookPath).filter(folder =>
            fs.statSync(path.join(dataBookPath, folder)).isDirectory()
        );

        console.log("----------------------------------------");
        for (const mangaFolder of mangaFolders) {
            console.log(`📖 Traitement du manga : ${mangaFolder}`);
            const tomePath = path.join(dataBookPath, mangaFolder);
            const tomeFiles = fs.readdirSync(tomePath).filter(file => {
                const fullPath = path.join(tomePath, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    fs.rmSync(fullPath, { recursive: true });
                    return false; // Exclure les dossiers
                }
                return /\.(pdf|cbz)$/i.test(file); // Garde uniquement PDF & CBZ
            });

            if (tomeFiles.length === 0) {
                console.warn(`⚠️ Aucun fichier PDF ou CBZ trouvé dans ${tomePath}`);
                if (binPath) {
                    console.warn(`📂 Déplacement de ${mangaFolder} vers ${binPath}`);
                    fs.renameSync(tomePath, path.join(binPath, mangaFolder));
                }
                continue;
            }

            let index = 0;
            for (const tome of tomeFiles) {
                index++;
                console.log(`📜 Traitement du tome : ${tome}`);
                let output = path.join(tomePath, `Tome${index}`);

                if (/\.pdf$/i.test(tome)) {
                    await pdfToImage(tomePath, output, tome);
                } else if (/\.cbz$/i.test(tome)) {
                    await cbzToImage(tomePath, output, tome);
                }

                // Supprime le fichier traité
                fs.unlinkSync(path.join(tomePath, tome));
            }

            console.log("----------------------------------------");
        }
    } catch (error) {
        console.error("❌ Erreur :", error);
    }
}

async function fixMangaFormat(filePath) {
    console.log(`📂 Recherche de dossiers de manga dans : ${filePath}`);
    if (!fs.existsSync(filePath)) {
        console.warn("❌ Le dossier spécifié n'existe pas.");
        return;
    }

    let files = fs.readdirSync(filePath).filter(file =>
        fs.statSync(path.join(filePath, file)).isDirectory()
    );

    if (files.length === 0) {
        console.warn("⚠️ Aucun dossier de manga trouvé !");
        return;
    }
    let index = 0;
    for (const tome of files) {
        index++;
        let tomePath = path.join(filePath,  `Tome${index}`);
        fs.renameSync(path.join(filePath, tome),tomePath);
        let images= fs.readdirSync(tomePath).filter(file => /\.(png|jpe?g|webp)$/i.test(file));
        if (images.length === 0) {
            console.warn("⚠️ Aucun fichier image trouvé !");
            return;
        }
        await Promise.all(images.map((image, index) =>
            fs.promises.rename(path.join(tomePath, image), path.join(tomePath, `${index + 1}.png`))
        ));

    }


}

yargs(hideBin(process.argv))
    .command(
        "run",
        "Exécute le traitement des mangas",
        (yargs) => {
            yargs.option("zip", {
                alias: "z",
                describe: "Chemin du fichier zip",
                type: "string",
                default: "",
                demandOption: false
            })
            .option("output", {
                alias: "o",
                describe: "Chemin du dossier de sortie",
                type: "string",
                demandOption: true
            })
            .option("bin", {
                alias: "b",
                describe: "Chemin du dossier contenant les fichiers non traités",
                type: "string",
                default: "",
                demandOption: false
            });
        },
        (argv) => {
            const dataBookPath = escapeWindowsPath(argv.output);
            const zipFilePath = escapeWindowsPath(argv.zip);
            const binPath = escapeWindowsPath(argv.bin);
            buildDataBook(dataBookPath, zipFilePath, binPath);
        }
    )
    .command(
        "fix",
        "Renomme les fichiers de manga",
        (yargs) => {
            yargs.option("path", {
                alias: "p",
                describe: "Chemin du dossier contenant les fichiers à renommer",
                type: "string",
                demandOption: true
            });
        },
        (argv) => {
            const mangaPath = escapeWindowsPath(argv.path);
            fixMangaFormat(mangaPath);
        }
    )
    .help()
    .argv;
