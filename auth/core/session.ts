import crypto from 'crypto';
import { redisClient } from 'redis/redis';
import { cookies} from "next/headers";



const sessionDuration = 60 * 60 * 24 * 7; // 7 days

export async function createSession(id: number) {
    const token = crypto.randomBytes(512).toString("hex").normalize();
    console.log(token);
    await redisClient.set(`session:${token}`, id),{EX: sessionDuration};
    await setCookie(token);
    
}

async function setCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'session-id',
        value: token,
        sameSite: 'lax',
        expires: Date.now()+sessionDuration*1000,
        httpOnly: true,
        secure: true,
    });
}

export async function getUserFromSession() : Promise<string|null> {
    const cookieStore = await cookies();
    const token= cookieStore.get('session-id');
    if(!token) return null;
    const userId = await redisClient.get(`session:${token}`);
    return userId ? userId : null;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const token =cookieStore.get('session-id');
    if(token){
        await redisClient.del(`session:${token}`);
        cookieStore.delete('session-id');
    }
    else return null;   
}