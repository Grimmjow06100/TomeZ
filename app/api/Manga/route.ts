import sql from "lib/postgres"
import { NextResponse } from "next/server";


export async function GET() {
    try {
       
        const mangas = await sql`
        SELECT 
        m.name,
        m.description,
        COUNT(t.numero) AS nbrTomes
        FROM 
        manga m
        LEFT JOIN 
        tome t ON m.name = t.mangaName
        GROUP BY 
        m.name, m.description
        ORDER BY 
        m.name;
        `;
        
        return NextResponse.json({mangas:mangas},{status:200});
    }catch (error){
        return NextResponse.json({message:error},{status:500})
    }
}