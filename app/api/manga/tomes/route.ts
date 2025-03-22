import { NextResponse ,NextRequest} from "next/server";
import prisma from "prisma/prisma";


export async function POST(req: NextRequest) {
    try{
        const {cover} = await req.json();

        const manga=await prisma.manga.findUnique({
            where:{
                cover:cover
            }
        })
        if(!manga){
            return NextResponse.json({error:"Manga non trouvé"},{status:404});
        }
        const tomes= await prisma.tome.findMany({
            select:{
                cover:true
            },
            where:{
                mangaName:manga.name
            }
        });
        const data={
            images:tomes.map((element)=>element.cover)
        }
        return NextResponse.json(data, { status: 200 });
        
        
    }catch(error){
        console.error("Erreur lors des mangas:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

}
