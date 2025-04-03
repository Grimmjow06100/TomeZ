import { NextResponse } from "next/server";
import { getUserId } from "@/lib/cookie";
import prisma from "@/prisma/prisma"


export async function PUT(req: Request) {

    try{
        const {username,mangaName} = await req.json();
        const userId= await getUserId();
        if(!userId){
            return NextResponse.json({message:"error"},{status:401})
        }
        await prisma.mylist.delete({
            where:{
                userId_mangaName:{
                    userId:userId,
                    mangaName:mangaName,
                }
            }

        })
         return NextResponse.json({status:200})
    }catch(e){
        console.error(e)
        return NextResponse.json({message:"error"})
    }
}