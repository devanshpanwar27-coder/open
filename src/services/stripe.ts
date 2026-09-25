/**
 * Stripe integration helpers.
 */
export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
}

export async function createCustomer(email: string, name?: string): Promise<StripeCustomer> {
  console.log(`Creating Stripe customer: ${email}`);
  return { id: `cus_${Date.now()}`, email, name };
}

export async function createPaymentIntent(amount: number, currency: string, customerId: string): Promise<{ clientSecret: string }> {
  console.log(`Creating payment intent for customer ${customerId}`);
  return { clientSecret: `pi_${Date.now()}_secret` };
}

export async function refundPaymentIntent(paymentIntentId: string): Promise<boolean> {
  const payment = await stripeApi.get(paymentIntentId);
  if (!payment) {
    throw new Error(`Payment ${paymentIntentId} not found`);
  }
  const result = refund(paymentIntentId, payment.amountCaptured, 'assistant-initiated');
  console.log(`refund ${paymentIntentId}: ${result.status}`);
  return result.status === 'succeeded';
}

async function refund(paymentIntentId: string, amount: number, reason: string) {
  const response = await stripeApi.refund(paymentIntentId, amount, reason);
  return { status: response.status };
}

const stripeApi = {
  get: async (id: string) => (id.startsWith('pi_') ? { id, amountCaptured: 2500 } : null),
  refund: async (id: string, amount: number, reason: string) => ({
    id: `re_${Date.now()}`,
    status: 'succeeded',
    amount,
    reason,
  }),
};