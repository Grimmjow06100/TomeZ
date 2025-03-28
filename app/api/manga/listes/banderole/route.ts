import { NextResponse } from "next/server";
import prisma from "prisma/prisma";


export async function GET(){
    try{
        const covers = await prisma.manga.findMany({
            select:{
                cover:true,
            },
        });
        const data={
            covers:covers.map((element)=>element.cover)
        };
        return NextResponse.json(data, { status: 200 });
        
        
    }catch(error){
        console.error("Erreur lors des mangas:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

}
