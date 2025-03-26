import {NextResponse,NextRequest} from 'next/server'
import prisma from 'prisma/prisma'

export async function POST(req:NextRequest){
    try{
        const params = await req.json();
        console.log(params);

        const countTome = await prisma.tome.count({
            where:{
                mangaName: params.mangaName    
            }
        });

        const images = await prisma.tome.findUnique({
            where: {
                mangaName_numero: {
                  mangaName: params.mangaName,
                  numero: params.numero, // Exemple de numéro
                }
              },
              select: {
                images: true,
                // Autres champs nécessaires
              }
        })

        if(countTome === 0 || !images){
            return NextResponse.json({error:"Tome non trouvé"},{status:404});
        }
        const data={
            images:images.images,
            nombre:countTome
        }

        return NextResponse.json(data,{status:200});

    }catch(error){
        console.error("Erreur lors des mangas:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

}