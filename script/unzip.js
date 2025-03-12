import fs from "fs";
import unzipper from "unzipper";
import path from "path";

export async function UnzipFile(filePath,outputPath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(unzipper.Extract({ path: outputPath }))
            .on("close", () => {
                console.log(`Extraction réussie : ${filePath}`);
                resolve();
            })
            .on("error", (err) => {
                console.error(`Erreur d'extraction : ${filePath}`);
                reject(err);
            });
    });
}

export async function UnzipAll(basePath,outputPath) {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    try {
        const files = fs.readdirSync(basePath).filter(file => {
            const fullPath = path.join(basePath, file);
            return fs.statSync(fullPath).isFile(); // Vérifie si c'est un fichier
        });
        for (const file of files) {
            const filePath = path.join(basePath, file); // Assure un bon chemin
            
            try {
                await UnzipFile(filePath,outputPath); // Extraction
                fs.unlinkSync(filePath); // Suppression après extraction
                console.log(`Suppression réussie : ${filePath}`);
            } catch (error) {
                console.error(`Erreur avec le fichier ${filePath} :`, error);
            }
        }
    } catch (error) {
        console.error("Erreur de lecture du dossier :", error);
    }
}