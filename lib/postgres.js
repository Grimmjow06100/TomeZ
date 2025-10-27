import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement





const sql = postgres({
  host: process.env.HOSTNAME_DB_LOCAL,
  port:  process.env.PORT_DB_LOCAL,
  database:  process.env.DATABASE_LOCAL,
  username:  process.env.USERNAME_LOCAL,
  password:  process.env.PASSWORD_LOCAL,
});



try {
  await sql`SELECT 1`;
  console.log('✅ Connexion local établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err.message);
}




export default sql;