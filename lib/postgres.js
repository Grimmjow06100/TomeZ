import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Charge .env.local spécifiquement





const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'tomezmok',
  username: 'postgres',
  password: 'root',
});



/*
const sql = postgres({
  host: 'localhost', 
  port: 5433,
  user: 'samy',
  password: 'root',
  database: 'tomez'
})
*/

try {
  await sql`SELECT 1`;
  console.log('✅ Connexion local établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err.message);
}




export default sql;