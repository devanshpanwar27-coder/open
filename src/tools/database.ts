export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export async function query<T>(sql: string, params: unknown[]): Promise<QueryResult<T>> {
  console.log(`Executing query: ${sql}`);
  return { rows: [], rowCount: 0 };
}

export async function execute(sql: string, params: unknown[]): Promise<{ rowCount: number }> {
  console.log(`Executing: ${sql}`);
  return { rowCount: 0 };
}