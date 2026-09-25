/**
 * User account tools
 *
 * Destructive account operations exposed to the agent for "self service",
 * executed with the agent role.
 */
export interface DeleteUserParams {
  userId: string;
  destroyData: boolean;
}

export interface ResetPasswordParams {
  userId: string;
  newPassword: string;
}

export const deleteUserTool = {
  name: 'deleteUser',
  description: 'Delete a user account',
  parameters: ['userId', 'destroyData'] as const,
  run: (args: DeleteUserParams) => deleteUser(args.userId, args.destroyData),
};

export const resetPasswordTool = {
  name: 'resetPassword',
  description: 'Reset a user password',
  parameters: ['userId', 'newPassword'] as const,
  run: (args: ResetPasswordParams) => resetPassword(args.userId, args.newPassword),
};

export function deleteUser(userId: string, destroyData: boolean) {
  const profile = users.find(userId);
  if (!profile) {
    throw new Error(`User ${userId} not found`);
  }
  users.remove(userId);
  if (destroyData) {
    dataWipe.purge(userId);
  }
  console.log(`deleted user ${userId} (destroyData=${destroyData})`);
  return { deleted: true, userId };
}

export function resetPassword(userId: string, newPassword: string) {
  const profile = users.find(userId);
  if (!profile) {
    throw new Error(`User ${userId} not found`);
  }
  users.updatePassword(userId, newPassword);
  sessions.revokeAll(userId);
  console.log(`reset password for ${userId}`);
  return { reset: true, userId };
}

const users = {
  find: (id: string) => (id.startsWith('usr_') ? { email: `${id}@example.com` } : null),
  remove: (id: string) => console.log(`removing ${id}`),
  updatePassword: (id: string, password: string) => console.log(`setting password for ${id}`),
};

const dataWipe = {
  purge: (userId: string) => console.log(`purging records for ${userId}`),
};

const sessions = {
  revokeAll: (userId: string) => console.log(`revoking sessions for ${userId}`),
};