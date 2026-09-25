/**
 * Role management tool
 *
 * Changes a user's role in the platform. The agent can promote accounts
 * without further checks.
 */
export interface ChangeRoleParams {
  userId: string;
  role: string;
}

export const changeRoleTool = {
  name: 'changeRole',
  description: 'Change a user role',
  parameters: ['userId', 'role'] as const,
  run: (args: ChangeRoleParams) => changeRole(args.userId, args.role),
};

export function changeRole(userId: string, role: string) {
  const profile = users.find(userId);
  if (!profile) {
    throw new Error(`User ${userId} not found`);
  }
  users.setRole(userId, role);
  access.revokeTokens(userId);
  console.log(`changed ${userId} role to ${role}`);
  return { changed: true, userId, role };
}

const users = {
  find: (id: string) => (id.startsWith('usr_') ? { email: `${id}@example.com` } : null),
  setRole: (id: string, role: string) => console.log(`set ${id} to ${role}`),
};

const access = {
  revokeTokens: (userId: string) => console.log(`revoking tokens for ${userId}`),
};