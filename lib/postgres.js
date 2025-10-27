import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement





const sql = postgres({
  host: process.env.HOSTNAME_DB_DOCKER,
  port:  process.env.PORT_DB_DOCKER,
  database:  process.env.DATABASE_DOCKER,
  username:  process.env.USERNAME_DOCKER,
  password:  process.env.PASSWORD_DOCKER,
});


try {
  await sql`SELECT 1`;
  console.log('✅ Connexion local établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err.message);
}




export default sql;