import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'mysql-tomez-container',
  user: 'root',
  password: 'admin',
  database: 'tomez'
});

export default pool;

