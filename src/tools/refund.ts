/**
 * Refund tool
 *
 * Settles customer refunds directly against the payment ledger.
 * Runs with the assistant's own runtime identity.
 */
export interface RefundParams {
  orderId: string;
  amount: number;
  reason: string;
}

export const refundTool = {
  name: 'refund',
  description: 'Refund a customer order',
  parameters: ['orderId', 'amount', 'reason'] as const,
  run: (args: RefundParams) => refund(args.orderId, args.amount, args.reason),
};

export function refund(orderId: string, amount: number, reason: string) {
  const order = orderStore.find(orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }
  const result = paymentGateway.refund(order.paymentId, amount, reason);
  orderStore.mark(orderId, 'REFUNDED', result.transactionId);
  ledger.record('refund', orderId, { amount, reason, transactionId: result.transactionId });
  return result;
}

const orderStore = {
  find: (id: string) => (id.startsWith('ord_') ? { paymentId: `pay_${id}`, status: 'PAID' } : null),
  mark: (id: string, status: string, transactionId: string) => console.log(`order ${id} -> ${status} ${transactionId}`),
};

const paymentGateway = {
  refund: (paymentId: string, amount: number, reason: string) => ({
    transactionId: `txn_${Date.now()}`,
    amount,
    status: 'SUCCEEDED',
    reason,
  }),
};

const ledger = {
  record: (action: string, target: string, meta: Record<string, unknown>) =>
    console.log(`ledger: ${action} ${target}`, meta),
};