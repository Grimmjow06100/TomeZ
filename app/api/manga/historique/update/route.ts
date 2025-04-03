import { NextRequest,NextResponse } from "next/server";
import { getUserId } from "@/lib/cookie";
import prisma from "@/prisma/prisma";


export async function PUT(req:NextRequest){
    try{
        const {mangaName,numero} = await req.json();
        const userId= await getUserId();
        if(!userId){
            return NextResponse.json({error:"Utilisateur non trouvé"},{status:404});
        }
        const historique = await prisma.historiqueDerniereLecture.findFirst({
            where:{
                mangaName:mangaName,
                userId:userId
            }
        })
        if(historique){
            await prisma.historiqueDerniereLecture.update({
                where:{
                    userId_mangaName:{
                        userId:userId,
                        mangaName:mangaName,
                    }
                },
                data:{
                    time:new Date(Date.now()),
                    tomeNumero:numero,
                }
            })
        }
        else{
            await prisma.historiqueDerniereLecture.create({
                data:{
                    userId:userId,
                    mangaName:mangaName,
                    tomeNumero:numero,
                    fin:false,
                    time:new Date(Date.now()),
                }
            });
        }
        return NextResponse.json({message:"Historique mis à jour"},{status:200});
    }catch(e){
        return NextResponse.json({error:"Erreur serveur"},{status:500});
    }
    
}