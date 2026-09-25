export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function getUser(userId: string): Promise<User | null> {
  console.log(`Fetching user ${userId}`);
  return null;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  console.log(`Creating user ${user.email}`);
  return { ...user, id: `usr_${Date.now()}` };
}