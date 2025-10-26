import fs from "fs";
import path from "path";




function update_Tomez(erase ){
    if(erase){
        fs.writeFileSync('update.sql','',{flag:'a'})
    }
    try{
        const basePath="C:/Users/samy0/OneDrive/Manga"
        const mangaDir=fs.readdirSync(basePath)

        for (let manga of mangaDir){
            const mangaPath=path.join(basePath,manga)
            const tomeDir=fs.readdirSync(mangaPath)

            const data_Manga = {
                name:manga,
                nombreTome:fs.readdirSync(mangaPath).length
            }
            const request_Manga = `UPDATE manga SET nombreTome =${data_Manga.nombreTome} WHERE name  = \"${data_Manga.name}\";\n`
            fs.writeFileSync('update.sql', request_Manga, { flag:'a' });
            console.log(manga)
            let index = 0;
            for (let tome of tomeDir){
                console.log(tome)
                const tomePath = path.join(mangaPath,tome)
                const data_Tome ={
                    mangaName:manga,
                    numero:index+1,
                    nombrePage:fs.readdirSync(tomePath).length
                }
                const request_Tome = `UPDATE tome SET nombrePage =${data_Tome.nombrePage} WHERE mangaName  = \"${data_Tome.mangaName}\" and numero = ${data_Tome.numero} ;\n`
                fs.writeFileSync('update.sql', request_Tome, { flag: 'a' });

                index++;
                
            }

    }

    }
    catch (error){
    console.log(error)
    }


}

update_Tomez(true)