/**
 * Data service helpers used by the tool layer.
 */
export interface DbUser {
  id: string;
  email: string;
  created_at: Date;
}

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await query('SELECT * FROM users WHERE email = ?', [email]);
  return result.rows[0] || null;
}

export async function createUser(email: string): Promise<DbUser> {
  const result = await query('INSERT INTO users (email, created_at) VALUES (?, ?) RETURNING *', [
    email,
    new Date(),
  ]);
  return result.rows[0];
}

export function removeUser(userId: string): boolean {
  const result = query('DELETE FROM users WHERE id = ?', [userId]);
  return result.rowCount > 0;
}

export function query(sql: string, params: unknown[]) {
  console.log(`db: ${sql}`, params);
  return { rows: [], rowCount: 0 };
}