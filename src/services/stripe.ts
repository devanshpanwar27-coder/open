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

export async function refundPayment(paymentIntentId: string): Promise<boolean> {
  console.log(`Refunding payment ${paymentIntentId}`);
  return true;
}