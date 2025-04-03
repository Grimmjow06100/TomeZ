import {NextResponse} from 'next/server';
import prisma from '@/prisma/prisma';
import { getUserId } from "@/lib/cookie";


export async function GET() {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'error' }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                username: true,
            },
        });
        if (!user)  return NextResponse.json({ message: 'error' }, { status: 404 }); 
        const myList = await prisma.mylist.findMany({
            select:{
                manga:{
                    select:{
                        cover:true,
                    },

                }
                
            },
            where: {
                userId: userId,
            },
        });
        if (!myList) {
            return NextResponse.json({ message: 'error' }, { status: 404 });
        }

        const data ={
            myList:myList.map((item) => ({
                cover: item.manga.cover,
                inMyList: true, 
            })),
            username: user.username,
        }
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'error' });
    }
}