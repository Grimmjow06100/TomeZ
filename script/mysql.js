import mysql from 'mysql2/promise'

/*
//App lancé avec docker 
const pool = mysql.createPool({
  host: 'mysql-tomez-container',
  user: 'root',
  password: 'admin',
  database: 'tomez'
});

*/

//App lancé en dehors de docker
const pool = mysql.createPool({
  host: 'localhost',
  port:3307,
  user: 'root',
  password: 'admin',
  database: 'tomez'
});



export default pool;

