import {NextResponse} from 'next/server';
import prisma from "@/prisma/prisma";
import {getUserId} from "@/lib/cookie";
import { use } from 'react';

export async function GET(){
    
    try {
        const userId= await getUserId();
        if(!userId){
            return NextResponse.json({error:"user not found"},{status:404});
        }
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                username:true,
            }
        })
        if(!user){
            return NextResponse.json({error:"user not found"},{status:404});
        }
        const manga = await prisma.manga.findMany({
            select:{
                name:true,
                cover:true,
            }
        })
        const mylist = await prisma.mylist.findMany({
            select:{
                mangaName:true,
            },
            where:{
                userId:userId
            }

        });
        const data={
            list:manga.map((element)=>{
                const isInMyList = mylist.some((manga) => manga.mangaName === element.name);
                return {
                    cover:element.cover,
                    inMyList:isInMyList,
                    name:element.name,
                };
            }),
            username:user.username,
        }
        if(!manga) return NextResponse.json({error:"Erreur lors de la récupération des mangas"})
        console.log(data.username)
        return NextResponse.json(data, {status:200})

    }catch(error){
        console.error(error)
        return NextResponse.json({error:"Erreur lors de la récupération des listes"})
    }
}