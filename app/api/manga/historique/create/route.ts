import {NextResponse,NextRequest} from "next/server";
import { getUserId } from "@/lib/cookie";
import prisma from "prisma/prisma";


export async function PUT(req:NextRequest){
    try{
        const {mangaName,numero}=await req.json();

        const userId= await getUserId();
        if(!userId){
         return NextResponse.json({error:"Utilisateur non trouvé"},{status:404});   
        }
        await prisma.historiqueDerniereLecture.create({
            data:{
                userId:userId,
                mangaName:mangaName,
                tomeNumero:numero,
                fin:false,
                time:new Date()
            }
        });

        
        
        return NextResponse.json({message:"Historique mis à jour"},{status:200});
    }catch(error){
        console.error(error);
        return NextResponse.json({error:"Erreur lors de la requête"},{status:500});
    }
}