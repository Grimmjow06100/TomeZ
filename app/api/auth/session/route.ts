import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "prisma/prisma"; // Assure-toi que le chemin est correct

export async function GET() {
  try {
    // Récupération du cookie "session-id"
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("session-id");
    const token = tokenCookie ? tokenCookie.value : null;

    if (!token) {
      return NextResponse.json({ error: "Aucun token trouvé" }, { status: 401 });
    }

    // Vérification de la session
    const session = await prisma.session.findFirst({
      where: {
        token: token,
        ex: { gt: new Date() }, // Vérifie si la session est valide
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session invalide ou expirée" }, { status: 403 });
    }

    // Récupération de l'utilisateur
    const user = await prisma.user.findFirst({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const data={
      username: user.username,
      email: user.email,
      id: user.id
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la récupération de la session :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
