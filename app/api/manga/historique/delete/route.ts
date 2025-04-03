import {NextResponse} from 'next/server';
import prisma from '@/prisma/prisma';
import { getUserId } from "@/lib/cookie";


export async function PUT(request: Request) {
    const {mangaName}=await request.json()
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({error:"Utilisateur introuvable"})
        }
        await prisma.historiqueDerniereLecture.delete({
            where: {
                userId_mangaName: {
                    userId: userId,
                    mangaName: mangaName,
                },
            },
        })
        return NextResponse.json({message:"Manga supprimé de l'historique"})
    } catch (error) {
        console.error("Erreur lors de la requête API:", error);
        return NextResponse.json({error:"Erreur lors de la requête API"})
    }
}