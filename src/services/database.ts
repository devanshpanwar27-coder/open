import { query, execute, QueryResult } from '../tools/database';

export interface DbUser {
  id: string;
  email: string;
  created_at: Date;
}

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await query<DbUser>('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export async function createUser(email: string): Promise<DbUser> {
  const result = await query<DbUser>(
    'INSERT INTO users (email) VALUES ($1) RETURNING *',
    [email]
  );
  return result.rows[0];
}

export async function updateUser(id: string, data: Partial<DbUser>): Promise<boolean> {
  const result = await execute('UPDATE users SET email = $1 WHERE id = $2', [data.email, id]);
  return result.rowCount > 0;
}