import {NextRequest,NextResponse} from 'next/server'
import {sql} from "@/lib/db"
import { MangaProps } from '@/types/interface';

export async function POST(req : NextRequest){
    try{
        
        const data=await req.json();
        if (!data || !Array.isArray(data.list)) {
            return NextResponse.json({ error: 'Liste invalide' }, { status: 400 });
        }
        const {list}= data;


        const mangas : MangaProps[] = await sql`
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

        const mangasFiltered = mangas.filter(element => list.includes(element.name ))

        return NextResponse.json({mangas:mangasFiltered},{status:200});
    }catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}