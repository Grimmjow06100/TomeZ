// app/api/hello/route.ts
import { NextResponse } from 'next/server'
import pool from '@/script/mysql'


export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM user'); // Remplace 'user' par le vrai nom de ta table
    return NextResponse.json({ users: rows }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
