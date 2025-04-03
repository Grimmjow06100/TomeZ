

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function passwordHash(password: string, salt: string): Promise<string> {
    
    return new Promise((resolve,reject)=>{
    crypto.scrypt(password.normalize(),salt,64,(err,hash)=>{
        if(err) reject(err);
        resolve(hash.toString('hex').normalize());
    })
})
    
}

export async function comparePasswords({
    password,
    salt,
    hashedPassword,
  }: {
    password: string
    salt: string
    hashedPassword: string
  }) {
    const inputHashedPassword = await passwordHash(password, salt)
  
    return crypto.timingSafeEqual(
      Buffer.from(inputHashedPassword, "hex"),
      Buffer.from(hashedPassword, "hex")
    )
  }
  
  export function generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize()
  }

 