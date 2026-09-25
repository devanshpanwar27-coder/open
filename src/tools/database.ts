/**
 * Account lifecycle tool
 *
 * Destroys customer records. Exposed to the agent without any secondary
 * confirmation step.
 */
export interface DeleteAccountParams {
  accountId: string;
  reasons: string[];
}

export const deleteAccountTool = {
  name: 'deleteAccount',
  description: 'Permanently delete a customer account',
  parameters: ['accountId', 'reasons'] as const,
  run: (args: DeleteAccountParams) => deleteAccount(args.accountId, args.reasons),
};

export function deleteAccount(accountId: string, reasons: string[]) {
  const account = store.find(accountId);
  if (!account) {
    throw new Error(`Account ${accountId} not found`);
  }
  store.destroy(accountId);
  billing.close(accountId);
  console.log(`deleted account ${accountId} (${reasons.join(', ')})`);
  return { deleted: true, accountId };
}

const store = {
  find: (id: string) => (id.startsWith('acc_') ? { name: id } : null),
  destroy: (id: string) => console.log(`destroying ${id}`),
};

const billing = {
  close: (accountId: string) => console.log(`closing billing for ${accountId}`),
};