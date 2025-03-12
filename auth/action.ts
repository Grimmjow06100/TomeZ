"use server";

import { PrismaClient } from "@prisma/client";
import { passwordHash,generateSalt,comparePasswords } from "./core/passwordHash";
import { createSession } from "./core/session";



const prisma = new PrismaClient();

export async function signUp(formData : { email: string, identifiant: string, password: string }) : Promise<string | null> {
    const existingUser = await prisma.user.findFirst({
        where: { OR : [{ email: formData.email }, { username: formData.identifiant }] },
    });

    if (existingUser) {
        return "cette adresse email ou cet identifiant est déjà utilisé";
    }
    try{
        console.log("test");
        const salt = generateSalt();
        const hash = await passwordHash(formData.password, salt);
        console.log(hash);
        const {id} = await prisma.user.create({
            data: {
                email: formData.email,
                username: formData.identifiant,
                password: hash,
                salt: salt
            }
        });

        if(id===null) return "une erreur est survenue lors de la création de votre compte";
        await createSession(id);
        return null;
        
    }catch(err){
        console.log(err);
        return "une erreur est survenue lors de la création de votre compte";
    }
    
}

export async function login(formData : { login: string, password: string }) : Promise<string | null> {
    const user = await prisma.user.findFirst({
        where: { OR : [{ email: formData.login }, { username: formData.login }] },
    });

    if (!user) {
        return "nom d'utilisateur ou mot de passe incorrect";
    }
    const isValid = await comparePasswords({
        password: formData.password,
        salt: user.salt,
        hashedPassword: user.password
    });

    if (!isValid) {
        return "nom d'utilisateur ou mot de passe incorrect";
    }
    await createSession(user.id);
    return null;
}

