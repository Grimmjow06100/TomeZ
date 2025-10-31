import {sql} from "@/lib/db"
import { NextResponse } from "next/server";


export async function GET() {
    try {
       
        const mangas = await sql`
        SELECT 
        name,
        description,
        nbrTomes
        FROM 
        manga
        `;
        
        return NextResponse.json({mangas:mangas},{status:200});
    }catch (error){
        return NextResponse.json({message:error},{status:500})
    }
}