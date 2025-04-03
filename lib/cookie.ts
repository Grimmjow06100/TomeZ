"use server"

import { cookies } from "next/headers";
import prisma from "@/prisma/prisma";


export async function getUserId(){
    const cookieStore = await cookies();
    const token = cookieStore.get("session-id")?.value;
    if(!token) return null;
    const session = await prisma.session.findUnique({
        where:{
            token:token
        },
        select:{
            userId:true
        }
    })
    return session?.userId || null;
  }