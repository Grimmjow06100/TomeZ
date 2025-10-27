import postgres from 'postgres'


const sql = postgres({
  host: 'postgres',
  port: 5432,
  database: 'tomez',
  username: 'samy',
  password: 'root',
});


try {
  await sql`SELECT 1`;
  console.log('✅ Connexion local établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err.message);
}




export default sql;