import postgres from 'postgres'


const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'tomezmok',
  username: 'postgres',
  password: 'root',
});

try {
  const result = await sql`SELECT 1`;
  console.log('✅ Connexion établie avec succès');
} catch (err) {
  console.error('❌ Échec de la connexion à PostgreSQL :', err.message);
}

export default sql;