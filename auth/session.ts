
import prisma from 'prisma/prisma';
import { cookies} from "next/headers";




export async function deleteSession() {
    const cookieStore = await cookies();
    const tokenCookie= cookieStore.get('session-id');
    const token = tokenCookie ? tokenCookie.value : null;
    if(token){
        await prisma.session.delete({
            where: {token: token}
        })
        cookieStore.delete('session-id');
    }
    else return null;   
}