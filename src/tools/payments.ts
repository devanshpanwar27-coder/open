export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export async function createPaymentIntent(amount: number, currency: string): Promise<PaymentIntent> {
  console.log(`Creating payment intent for ${amount} ${currency}`);
  return { id: `pi_${Date.now()}`, amount, currency, status: 'requires_payment_method' };
}

export async function confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
  console.log(`Confirming payment ${paymentIntentId}`);
  return { id: paymentIntentId, amount: 0, currency: 'usd', status: 'succeeded' };
}