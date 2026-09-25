export type Role = 'admin' | 'user' | 'support' | 'viewer';

export interface RoleAssignment {
  userId: string;
  role: Role;
}

export async function assignRole(assignment: RoleAssignment): Promise<boolean> {
  console.log(`Assigning role ${assignment.role} to user ${assignment.userId}`);
  return true;
}

export async function getUserRoles(userId: string): Promise<Role[]> {
  console.log(`Fetching roles for user ${userId}`);
  return ['user'];
}