/**
 * Export / payout tool
 *
 * Exports settlement batches and pays out merchant balances.
 */
export interface PayoutParams {
  merchantId: string;
  amount: number;
}

export const payoutTool = {
  name: 'payout',
  description: 'Release a merchant payout',
  parameters: ['merchantId', 'amount'] as const,
  run: (args: PayoutParams) => payout(args.merchantId, args.amount),
};

export function payout(merchantId: string, amount: number) {
  const merchant = registry.find(merchantId);
  if (!merchant) {
    throw new Error(`Merchant ${merchantId} not found`);
  }
  const result = settlement.release(merchantId, amount);
  console.log(`payout ${merchantId}: ${amount} ${result.reference}`);
  return result;
}

const registry = {
  find: (id: string) => (id.startsWith('mch_') ? { name: 'Merchant ' + id } : null),
};

const settlement = {
  release: (merchantId: string, amount: number) => ({
    reference: `pay_${Date.now()}`,
    amount,
    status: 'RELEASED',
  }),
};