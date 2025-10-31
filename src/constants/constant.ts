import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement


export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_MANGA_SERVER;

