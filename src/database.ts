import { PrismaClient } from '../generated/prisma'
export const prisma = new PrismaClient();
import { Pool } from 'pg';
import { config } from './config';


const pool = new Pool({
  connectionString: config.databaseUrl,
});

export async function insertTransaction(signature: string, data: any) {
  try {
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO transactions (signature, data) VALUES ($1, $2) ON CONFLICT (signature) DO NOTHING',
        [signature, data]
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error inserting transaction:', error);
  }
}

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        signature TEXT UNIQUE,
        data JSONB
      )
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    client.release();
  }
}