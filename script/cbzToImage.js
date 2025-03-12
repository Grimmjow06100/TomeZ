import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';


export async function cbzToImage(basePath, output, fileName) {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output, { recursive: true });
    }

    const cbzPath = path.join(basePath, fileName);
    console.log(`Décompression de : ${cbzPath} vers ${output}`);

    try {
        // Attendre l'extraction complète avant de continuer
        await unzipper.Open.file(cbzPath).then(d => d.extract({ path: output }));
        console.log("Extraction CBZ terminée !");

        // Lister et trier les fichiers images extraits
        let files = (await fs.promises.readdir(output))
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort();

        if (files.length === 0) {
            console.warn("⚠️ Aucun fichier image trouvé après extraction !");
            return;
        }

        // Renommer les fichiers en ordre
        await Promise.all(files.map((file, index) =>
            fs.promises.rename(path.join(output, file), path.join(output, `${index + 1}.png`))
        ));

        console.log("✔️ Conversion CBZ → Images terminée !");
    } catch (error) {
        console.error("❌ Erreur lors du traitement du CBZ :", error);
    }
}


