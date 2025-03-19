import { NextResponse } from "next/server";
import prisma from "prisma/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  
    const { email, username, password } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé." },
        { status: 400 }
      );
    }

    // Génération du sel et hashage du mot de passe
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, hash) => {
        if (err) reject(err);
        else resolve(hash.toString("hex"));
      });
    });

    // Enregistrer l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        salt,
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès!", user: newUser },
      { status: 201 }
    );

}
