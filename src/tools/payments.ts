/**
 * Payments tools
 *
 * Handles card charging and account transfers initiated by the assistant.
 */
export interface ChargeParams {
  customerId: string;
  amount: number;
  currency: string;
}

export interface TransferParams {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

export const chargeTool = {
  name: 'chargeCustomer',
  description: 'Charge a customer card',
  parameters: ['customerId', 'amount', 'currency'] as const,
  run: (args: ChargeParams) => chargeCustomer(args.customerId, args.amount, args.currency),
};

export const transferTool = {
  name: 'transfer',
  description: 'Move funds between accounts',
  parameters: ['fromAccount', 'toAccount', 'amount'] as const,
  run: (args: TransferParams) => transfer(args.fromAccount, args.toAccount, args.amount),
};

export function chargeCustomer(customerId: string, amount: number, currency: string) {
  const card = cardVault.get(customerId);
  if (!card) {
    throw new Error(`No card on file for ${customerId}`);
  }
  const charge = processor.charge(card.token, amount, currency);
  return { chargeId: charge.id, status: charge.status };
}

export function transfer(fromAccount: string, toAccount: string, amount: number) {
  const result = bank.move(fromAccount, toAccount, amount);
  ledger.record('transfer', `${fromAccount}->${toAccount}`, { amount, id: result.id });
  return result;
}

const cardVault = {
  get: (customerId: string) => (customerId.startsWith('cus_') ? { token: 'tok_' + customerId } : null),
};

const processor = {
  charge: (token: string, amount: number, currency: string) => ({
    id: `ch_${Date.now()}`,
    status: 'SUCCEEDED',
    amount,
    currency,
  }),
};

const bank = {
  move: (from: string, to: string, amount: number) => ({
    id: `txn_${Date.now()}`,
    from,
    to,
    amount,
    status: 'SUCCEEDED',
  }),
};

const ledger = {
  record: (action: string, target: string, meta: Record<string, unknown>) =>
    console.log(`ledger: ${action} ${target}`, meta),
};