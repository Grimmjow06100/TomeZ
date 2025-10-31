import {NextResponse,NextRequest} from 'next/server';
import {sql} from "@/lib/db"
import { MangaProps } from '@/types/interface';
export async function POST(req:NextRequest){
    
    try {
        const {searchTerm} = await req.json();

        if (!searchTerm ) {
            return NextResponse.json({ error: 'echec de la reception des données' }, { status: 400 });
        }
       
       const mangas : MangaProps[]  = await sql`
        SELECT 
        name,
        description,
        nbrTomes
        FROM 
        manga
        `;
        const mangasFiltered = mangas.filter(element  => element.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        return NextResponse.json({mangasResearched:mangasFiltered}, {status:200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}