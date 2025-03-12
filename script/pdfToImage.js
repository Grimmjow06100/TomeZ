import path from "path";
import fs from "fs";
import pdfPoppler from "pdf-poppler";

export async function pdfToImage(basePath, output, fileName) {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output, { recursive: true });
    }

    let pdfPath = path.join(basePath, fileName);
    console.log(`Conversion de : ${pdfPath} vers ${output}`);

    let opts = {
        format: "png", 
        out_dir: output,  // ✅ Utiliser le chemin absolu
        out_prefix: "page",   // ✅ Pas de préfixe
        scale: 1024       // ✅ Meilleure qualité d'image
    };

    try {
        await pdfPoppler.convert(pdfPath, opts);
        let files = fs.readdirSync(output).filter(file => /\.(png|jpe?g|webp)$/i.test(file));
        if (files.length === 0) {
            console.warn("⚠️ Aucun fichier image trouvé après conversion !");
            return;
        }
         // Renommer les fichiers en ordre
        await Promise.all(files.map((file, index) =>
            fs.promises.rename(path.join(output, file), path.join(output, `${index + 1}.png`))
        ));
        
        console.log("✔️ Conversion réussie !");
    } catch (err) {
        console.error("❌ Erreur de conversion :", err);
    }
}