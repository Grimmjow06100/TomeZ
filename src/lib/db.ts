import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement



export const sql = postgres({
  host: process.env.HOSTNAME_LOCAL,
  port:  parseInt(process.env.DB_PORT || '5432', 10),
  database:  process.env.DATABASE_LOCAL,
  username:  process.env.USERNAME_LOCAL,
  password:  process.env.PASSWORD_LOCAL,
});


try {
  await sql`SELECT 1`;
  console.log('✅ Connexion local établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err);
}
