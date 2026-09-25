export interface RefundRequest {
  orderId: string;
  amount: number;
  reason: string;
}

export async function processRefund(request: RefundRequest): Promise<{ success: boolean; refundId?: string }> {
  console.log(`Processing refund for order ${request.orderId}`);
  return { success: true, refundId: `ref_${Date.now()}` };
}