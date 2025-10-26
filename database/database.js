import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement
const root=process.env.MANGA_LOCAL

function InsertMangaName(erase=false){
  const filePath='database/init_scripts/03-data_dynamic.sql';

  try{
    if(erase){
      fs.writeFileSync(filePath,"");
    } 
    let template = `-- Insert data into manga\nINSERT INTO manga (name,description) VALUES\n`
    const mangas=fs.readdirSync(root);
    let size=mangas.length;
    for(let i=0;i<size;i++){
      (i==size-1)?template+=`('${mangas[i]}','Aucune données') ON CONFLICT (name) DO NOTHING;\n`:template+=`('${mangas[i]}','Aucune données'),`;
    }
    
    fs.appendFileSync(filePath,template);
  }catch(e){
    console.log(e);
  }
}

function InsertTome(erase=false){
  const filePath='database/init_scripts/03-data_dynamic.sql';
  try{
    if(erase){
      fs.writeFileSync(filePath,"");
    }
    let template = `-- Insert data into tome\nINSERT INTO tome (mangaName,numero,nbrPages) VALUES\n `
    const mangas=fs.readdirSync(root);
    let sizeManga=mangas.length;
    for(let i=0;i<sizeManga;i++){  
      const manga=mangas[i];        
      const tomes=fs.readdirSync(path.join(root,manga));
      let sizeTome = tomes.length;
      for(let j=0;j<sizeTome;j++){
        const numero=j+1;
        const dirPath=path.join(root,manga,`Tome${numero}`);
        const nbrPages=fs.readdirSync(dirPath).length;
        (i==sizeManga-1&&j==sizeTome-1) ? template+=`('${manga}','${numero}','${nbrPages}') ON CONFLICT (mangaName,numero) DO NOTHING;\n`:
        template+=`('${manga}','${numero}','${nbrPages}'),`;
      }
    }
    fs.appendFileSync(filePath,template);

  }catch(e){
    console.log(e)
  }
}


function InsertSelection(erase=false){
  const filePath='database/init_scripts/03-data_dynamic.sql';

  try{
    if(erase){
      fs.writeFileSync(filePath,"");
    } 
    let template = `-- Insert data into selection\nINSERT INTO selection (name,mangaName) VALUES\n `
    const mangas=fs.readdirSync(root);
    let size=mangas.length;
    for(let i=0;i<size;i++){
      (i==size-1)?template+=`('Selection','${mangas[i]}') ON CONFLICT (name,mangaName) DO NOTHING;\n`:template+=`('Selection','${mangas[i]}'),`;
    }
    
    fs.appendFileSync(filePath,template);
  }catch(e){
    console.log(e);
  }
}
function resetInsert(){
  InsertMangaName(true);
  InsertTome();
  InsertSelection();
}


