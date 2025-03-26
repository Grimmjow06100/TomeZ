import fs from "fs";
import unzipper from "unzipper";
import path from "path";

export async function UnzipFile(filePath, outputPath, binPath) {
    return new Promise(async (resolve, reject) => {
        const ext = path.extname(filePath).toLowerCase(); // Récupère l'extension du fichier

        if (ext === ".cbz") {
            if (binPath) {
                const fileName = path.basename(filePath);
                const newFilePath = path.join(binPath, fileName);
                try {
                    await fs.promises.rename(filePath, newFilePath);
                    console.log(`❌ Fichier CBZ détecté et déplacé vers : ${newFilePath}`);
                    return resolve(); // On ne rejette pas, on continue
                } catch (moveError) {
                    console.error(`❌ Erreur lors du déplacement du CBZ :`, moveError);
                    return reject(moveError);
                }
            } else {
                console.error(`❌ Fichier CBZ détecté : ${filePath} (Aucun dossier de destination spécifié)`);
                return resolve();
            }
        }

        // Extraction des fichiers ZIP
        fs.createReadStream(filePath)
            .pipe(unzipper.Extract({ path: outputPath }))
            .on("close", () => {
                console.log(`✅ Extraction réussie : ${filePath}`);
                resolve();
            })
            .on("error", async (err) => {
                console.error(`❌ Erreur d'extraction : ${filePath}`);

                if (binPath) {
                    const fileName = path.basename(filePath);
                    const newFilePath = path.join(binPath, fileName);
                    try {
                        await fs.promises.rename(filePath, newFilePath);
                        console.log(`📦 Déplacement après échec : ${newFilePath}`);
                        return resolve(); // On ne rejette pas pour continuer
                    } catch (moveError) {
                        console.error(`❌ Impossible de déplacer ${filePath} -> ${newFilePath}: ${moveError.message}`);
                        return reject(moveError);
                    }
                }

                return reject(err);
            });
    });
}


export async function UnzipAll(basePath, outputPath,binPath="") {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    try {
        const files = fs.readdirSync(basePath).filter(file => {
            const fullPath = path.join(basePath, file);
            return fs.statSync(fullPath).isFile();
        });

        // On attend toutes les extractions en parallèle
        await Promise.all(files.map(file => {
            const filePath = path.join(basePath, file);
            return UnzipFile(filePath, outputPath,binPath); // Retourne une promesse
        }));

    } catch (error) {
        console.log(`Erreur lors de l'extraction : ${error.message}`);
    }
}
