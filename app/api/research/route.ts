import {NextResponse,NextRequest} from 'next/server';
import sql from '@/lib/postgres'

export async function POST(req:NextRequest){
    
    try {
        const {searchTerm} = await req.json();

        if (!searchTerm ) {
            return NextResponse.json({ error: 'echec de la reception des données' }, { status: 400 });
        }
       
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
        const mangasFiltered = mangas.filter(element => element.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        return NextResponse.json({mangasResearched:mangasFiltered}, {status:200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}