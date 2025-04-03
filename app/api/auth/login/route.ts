import { NextResponse } from "next/server";
import { comparePasswords } from "lib/utils";
import crypto from 'crypto';
import prisma from 'prisma/prisma';
import { cookies} from "next/headers";

export async function POST(req: Request) {
  const { login , password } = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: login },
        { username: login },
      ],
    },
  });
  if (!user) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 });
  }
  const passwordMatch = await comparePasswords({
    password,
    salt: user.salt,
    hashedPassword: user.password,
  });
  if (!passwordMatch) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 });
  }
  const token = crypto.randomBytes(56).toString("hex").normalize();

  const cookieStore = await cookies();
  cookieStore.set({
      name: 'session-id',
      value: token,
      sameSite: 'lax',
      expires: Date.now()+60*60*24*7*1000,
      httpOnly: true,
      secure: true,
  });

  const ex=new Date(Date.now()+1000*60*60*24*7);
  await prisma.session.deleteMany({
    where:{
      userId:user.id
    }
  });
  await prisma.session.create({
        data: {
            token,
            userId:user.id,
            ex
        },
  });
  console.log("Utilisateur connecté :", user.username);
  console.log("Session valide jusqu'au :", ex);



  
  return NextResponse.json({ status: 200 });
}
  