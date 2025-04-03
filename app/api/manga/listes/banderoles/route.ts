import { NextResponse } from "next/server";
import { getUserId } from "@/lib/cookie";
import prisma from "prisma/prisma";


export async function GET(){
    try{
        const userId= await getUserId();
        console.log("userId",userId)
        if(!userId){
            return NextResponse.json({error:"user not found"},{status:404});
        }
    
        const pepites = await prisma.manga.findMany({
            select:{
                cover:true,
                name:true,
            },
            where:{
                OR:[
                    {name:"Attaque des titans"},
                    {name:"Black Clover"},
                    {name:"Blue Exorcist"},
                    {name:"Boruto"},
                    {name:"Demon Slayer"},
                    {name:"Mashle"},
                    {name:"Parasite"},
                    {name:"The Promised Neverland"},
                    {name:"Tokyo Revengers"},
                    {name:"Vinland saga"},
                ]
                
            }
        });
        const classiques = await prisma.manga.findMany({
            select:{
                cover:true,
                name:true,
            },
            where:{
                OR:[
                    {name:"Berserk"},
                    {name:"Death Note"},
                    {name:"Naruto"},
                    {name:"Bleach"},
                    {name:"Dragon Ball"},
                    {name:"Vagabond"},
                    {name:"Hokuto No Ken"},
                    {name:"Fairy Tail"},
                    {name:"One Piece"},
                    {name:"Beelzebub"},

                ]
                
            }
        });
        const historique= await prisma.historiqueDerniereLecture.findMany({
            where:{
                userId:userId
            },
            select:{
                time:true,
                mangaName:true,
                tomeNumero:true, 
            },
            orderBy:{
                time:"desc"
            }
           
        })
        const tomes = await prisma.tome.findMany({
            select: {
                cover: true,
                numero: true,
                mangaName: true,
            },
            where: {
                OR: historique.map((element) => ({
                    mangaName: element.mangaName,
                    numero: element.tomeNumero,
                })),
            },
        });
        const mylist = await prisma.mylist.findMany({
            select:{
                mangaName:true,
            },
            where:{
                userId:userId
            }

        });
        const data={
            pepites:pepites.map((element)=>{
                const isInMyList = mylist.some((manga) => manga.mangaName === element.name);
                return {
                    cover:element.cover,
                    inMyList:isInMyList,
                };
            }),
            classiques:classiques.map((element)=>{
                const isInMyList = mylist.some((manga) => manga.mangaName === element.name);
                return {
                    cover:element.cover,
                    inMyList:isInMyList,
                };
            }),
            historique:historique.map((element)=>{
                return {
                    name:element.mangaName,
                    numero:element.tomeNumero,
                    cover:tomes.find((tome)=>tome.mangaName===element.mangaName && tome.numero===element.tomeNumero)?.cover,
                }
            })

        };

        return NextResponse.json(data, { status: 200 });
        
        
    }catch(error){
        console.error("Erreur lors des mangas:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

}
