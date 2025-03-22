import prisma from "prisma/prisma";
import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get('session-id');
        const token = tokenCookie ? tokenCookie.value : null;

        if (!token) {
            return NextResponse.json({ error: "Aucun token trouvé" }, { status: 401 });
        }

        // Suppression sécurisée du token
        const deletedSession = await prisma.session.delete({
            where: { token },
        }).catch(err => {
            console.error("Erreur lors de la suppression de la session :", err);
            return null;
        });

        if (!deletedSession) {
            return NextResponse.json({ error: "Session introuvable ou déjà supprimée" }, { status: 404 });
        }

        // Suppression du cookie
        cookieStore.delete('session-id');

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Erreur inattendue :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}