import { NextResponse ,NextRequest} from "next/server";
import { getUserId } from "@/lib/cookie";
import prisma from "prisma/prisma";


export async function POST(req: NextRequest) {
    try{
        const {cover} = await req.json();
        const userId= await getUserId();
        if(!userId){
         return NextResponse.json({error:"Utilisateur non trouvé"},{status:404});   
        }

        const manga=await prisma.manga.findUnique({
            where:{
                cover:cover,
            }
        })
        if(!manga){
            return NextResponse.json({error:"Manga non trouvé"},{status:404});
        }
        const tomes= await prisma.tome.findMany({
            select:{
                numero:true,
                cover:true
            },
            where:{
                mangaName:manga.name
            },
            orderBy:{
                numero:"asc" 
            }
        });
        const tags= await prisma.mangaTag.findMany({
            select:{
                tagLabel:true
            },
            where:{
                mangaName:manga.name
            }
        });
        const historique= await prisma.historiqueDerniereLecture.findFirst({
            select:{
                tomeNumero:true,
                lastPage:true,
            },
            where:{
                mangaName:manga.name,
                userId:userId,
                fin:false
            }
        });
        const data={
            name:manga.name,
            covers:tomes.map((element)=>element.cover),
            description:manga.description,
            tags:tags.map((element)=>element.tagLabel),
            historique:historique
        }
        return NextResponse.json(data, { status: 200 });
        
        
    }catch(error){
        console.error("Erreur lors des mangas:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

}
