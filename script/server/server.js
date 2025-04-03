import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT);

// Servir le dossier contenant les mangas
app.use("/mangas", express.static(process.env.MANGA_LOCATION));

app.  listen(PORT, () => {
    console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️ 
        ################################################
      `)
});