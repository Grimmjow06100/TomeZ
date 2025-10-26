import sql from "lib/postgres"
import { NextResponse,NextRequest } from "next/server";


export async function GET(req:NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const mangaName = searchParams.get("mangaName");
        const numero = searchParams.get("numero");
       
        const pageQuery = await sql`
        SELECT 
        nbrPages 
        from tome
        where numero =${numero} and 
        mangaName=${mangaName}
        `;
        const tomeQuery = await sql`
            SELECT 
            count(*) AS nbrTomes
            FROM 
            tome
            where mangaName=${mangaName}
        `
        return NextResponse.json({totalPages:pageQuery[0].nbrpages,totalTomes:tomeQuery[0].nbrtomes},{status:200});
    }catch (error){
        return NextResponse.json({message:error},{status:500})
    }
}


